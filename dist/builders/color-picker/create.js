import { derived, get, readonly, writable } from 'svelte/store';
import { addMeltEventListener, createElHelpers, disabledAttr, effect, executeCallbacks, makeElement, omit, overridable, styleToString, toWritableStores, } from '../../internal/helpers/index.js';
import { createHiddenInput } from '../hidden-input/create.js';
import { channelValue, clamp, equalColor, formatChannel, formatSerializedHex, getChannelBounds, hsvaToHsl, hsvaToRgb, normalizeColor, parseColorString, parseHex, serializeColor, } from './color.js';
const defaults = {
    defaultValue: { hue: 0, saturation: 0, value: 0, alpha: 1 },
    defaultFormat: 'hex',
    disabled: false,
    readonly: false,
    dir: 'ltr',
    orientation: 'horizontal',
    name: undefined,
};
const formats = ['hex', 'rgb', 'hsl', 'hsv', 'oklch'];
const channelSets = {
    hex: ['hex', 'alpha'],
    rgb: ['red', 'green', 'blue', 'alpha'],
    hsl: ['hue', 'saturation', 'lightness', 'alpha'],
    hsv: ['hue', 'saturation', 'value', 'alpha'],
    oklch: ['lightness', 'chroma', 'hue', 'alpha'],
};
const prefix = 'color-picker';
const { name, selector } = createElHelpers(prefix);
const cssAlpha = (alpha) => String(Math.round(alpha * 1000) / 1000);
function cssColor(color) {
    const { red, green, blue } = hsvaToRgb(color);
    return `rgb(${red} ${green} ${blue} / ${cssAlpha(color.alpha)})`;
}
function cssOpaqueColor(color) {
    const { red, green, blue } = hsvaToRgb(color);
    return `rgb(${red} ${green} ${blue})`;
}
function cssHueColor(color) {
    return `hsl(${Math.round(color.hue)} 100% 50%)`;
}
function getEyeDropperCtor() {
    if (typeof window === 'undefined' || !('EyeDropper' in window))
        return null;
    const ctor = window.EyeDropper;
    return typeof ctor === 'function' ? ctor : null;
}
function updateAreaPosition(node, clientX, clientY, dir) {
    const rect = node.getBoundingClientRect();
    const x = rect.width ? clamp((clientX - rect.left) / rect.width, 0, 1) : 0;
    const y = rect.height ? clamp((clientY - rect.top) / rect.height, 0, 1) : 0;
    return {
        saturation: (dir === 'rtl' ? 1 - x : x) * 100,
        value: (1 - y) * 100,
    };
}
function updateTrackPosition(node, clientX, clientY, dir, orientation) {
    const rect = node.getBoundingClientRect();
    if (orientation === 'vertical') {
        const y = rect.height ? clamp((clientY - rect.top) / rect.height, 0, 1) : 0;
        return (1 - y) * 100;
    }
    const x = rect.width ? clamp((clientX - rect.left) / rect.width, 0, 1) : 0;
    return (dir === 'rtl' ? 1 - x : x) * 100;
}
export function createColorPicker(props) {
    const withDefaults = {
        ...defaults,
        ...props,
        defaultValue: props?.defaultValue ?? defaults.defaultValue,
        defaultFormat: props?.defaultFormat ?? defaults.defaultFormat,
    };
    const initialValue = normalizeColor(withDefaults.defaultValue);
    const options = toWritableStores(omit(withDefaults, 'value', 'onValueChange', 'onValueCommitted', 'defaultValue', 'format', 'onFormatChange', 'defaultFormat', 'previousValue'));
    const { disabled, readonly: readonlyOption, dir, orientation, name: nameProp, } = options;
    const valueWritable = withDefaults.value ?? writable(initialValue);
    const value = overridable(valueWritable, withDefaults.onValueChange);
    const previousValue = withDefaults.previousValue ?? writable(normalizeColor(value.get()));
    const formatWritable = withDefaults.format ?? writable(withDefaults.defaultFormat);
    const format = overridable(formatWritable, withDefaults.onFormatChange);
    const active = writable(null);
    const activeAreaAxis = writable(null);
    const colorInputDraft = writable(null);
    const channelDrafts = writable({});
    effect(value, ($value) => {
        const normalized = normalizeColor($value);
        if (!equalColor(normalized, $value))
            value.set(normalized);
    });
    effect(format, ($format) => {
        if (!formats.includes($format))
            format.set('hex');
    });
    const updateValue = (next) => {
        if (disabled.get() || readonlyOption.get())
            return false;
        const normalized = normalizeColor(next);
        if (equalColor(normalized, value.get()))
            return false;
        value.set(normalized);
        return true;
    };
    const commit = () => withDefaults.onValueCommitted?.(value.get());
    const root = makeElement(name(), {
        stores: [value, format, disabled, readonlyOption, dir],
        returned: ([$value, $format, $disabled, $readonly, $dir]) => ({
            role: 'group',
            dir: $dir,
            'data-format': $format,
            'data-disabled': disabledAttr($disabled),
            'data-readonly': disabledAttr($readonly),
            'aria-disabled': disabledAttr($disabled),
            'aria-readonly': $readonly ? true : undefined,
            style: styleToString({
                '--melt-color-picker-color': cssColor($value),
                '--melt-color-picker-opaque-color': cssOpaqueColor($value),
                '--melt-color-picker-hue-color': cssHueColor($value),
                '--melt-color-picker-saturation': `${$value.saturation}%`,
                '--melt-color-picker-value': `${$value.value}%`,
                '--melt-color-picker-alpha': `${$value.alpha * 100}%`,
            }),
        }),
    });
    const area = makeElement(name('area'), {
        stores: [disabled, readonlyOption],
        returned: ([$disabled, $readonly]) => ({
            role: 'group',
            'aria-disabled': disabledAttr($disabled),
            'aria-readonly': $readonly ? true : undefined,
            style: 'touch-action:none;position:relative;',
        }),
        action: (node) => {
            let pointerId = null;
            let changed = false;
            const apply = (event) => {
                if (pointerId !== (event.pointerId ?? 0))
                    return;
                changed =
                    updateValue({
                        ...value.get(),
                        ...updateAreaPosition(node, event.clientX ?? 0, event.clientY ?? 0, dir.get()),
                    }) || changed;
            };
            const finish = (event) => {
                if (pointerId !== (event.pointerId ?? 0))
                    return;
                apply(event);
                if (node.hasPointerCapture?.(event.pointerId ?? 0))
                    node.releasePointerCapture(event.pointerId ?? 0);
                pointerId = null;
                active.set(null);
                if (changed)
                    commit();
                changed = false;
            };
            return {
                destroy: executeCallbacks(addMeltEventListener(node, 'pointerdown', (event) => {
                    if (disabled.get() ||
                        readonlyOption.get() ||
                        (event.button !== undefined && event.button !== 0))
                        return;
                    pointerId = event.pointerId ?? 0;
                    node.setPointerCapture?.(pointerId);
                    active.set('area');
                    changed = false;
                    apply(event);
                }), addMeltEventListener(node, 'pointermove', apply), addMeltEventListener(node, 'pointerup', finish), addMeltEventListener(node, 'pointercancel', finish)),
            };
        },
    });
    const areaThumb = makeElement(name('area-thumb'), {
        stores: [value],
        returned: ([$value]) => ({
            role: 'presentation',
            style: `position:absolute;inset-inline-start:${$value.saturation}%;top:${100 - $value.value}%;`,
        }),
    });
    const areaInput = (axis, part) => makeElement(name(part), {
        stores: [value, disabled, readonlyOption, activeAreaAxis],
        returned: ([$value, $disabled, $readonly, $activeAxis]) => {
            const current = axis === 'x' ? $value.saturation : $value.value;
            return {
                type: 'range',
                min: 0,
                max: 100,
                step: 1,
                value: current,
                'aria-valuemin': 0,
                'aria-valuemax': 100,
                'aria-valuenow': current,
                'aria-valuetext': `${Math.round(current)}%`,
                'aria-orientation': axis === 'x' ? 'horizontal' : 'vertical',
                'aria-label': axis === 'x' ? 'Saturation' : 'Value',
                'aria-disabled': disabledAttr($disabled),
                'aria-readonly': $readonly ? true : undefined,
                disabled: $disabled,
                tabindex: $disabled
                    ? -1
                    : $activeAxis === null || $activeAxis === axis
                        ? 0
                        : -1,
                style: 'position:absolute;inset:0;opacity:0.001;pointer-events:none;',
            };
        },
        action: (node) => {
            const focusAxis = (nextAxis) => {
                const rootNode = node.closest(selector());
                const next = rootNode?.querySelector(nextAxis === 'x'
                    ? selector('area-x-input')
                    : selector('area-y-input'));
                next?.focus();
            };
            const keyboard = (event) => {
                const mutationKey = event.key === 'ArrowLeft' ||
                    event.key === 'ArrowRight' ||
                    event.key === 'ArrowUp' ||
                    event.key === 'ArrowDown' ||
                    event.key === 'PageUp' ||
                    event.key === 'PageDown' ||
                    event.key === 'Home' ||
                    event.key === 'End';
                if (readonlyOption.get()) {
                    if (mutationKey)
                        event.preventDefault();
                    return;
                }
                if (disabled.get() || !mutationKey)
                    return;
                const horizontal = event.key === 'ArrowLeft' || event.key === 'ArrowRight';
                const vertical = event.key === 'ArrowUp' || event.key === 'ArrowDown';
                const delta = event.shiftKey ? 10 : 1;
                if (axis === 'x' && vertical) {
                    const current = value.get().value;
                    const next = current + (event.key === 'ArrowUp' ? delta : -delta);
                    event.preventDefault();
                    updateValue({ ...value.get(), value: clamp(next, 0, 100) });
                    focusAxis('y');
                    return;
                }
                if (axis === 'y' && horizontal) {
                    const current = value.get().saturation;
                    const direction = dir.get() === 'rtl' ? -1 : 1;
                    const next = current +
                        (event.key === 'ArrowRight'
                            ? delta * direction
                            : -delta * direction);
                    event.preventDefault();
                    updateValue({ ...value.get(), saturation: clamp(next, 0, 100) });
                    focusAxis('x');
                    return;
                }
                if (event.key === 'PageUp' || event.key === 'PageDown') {
                    const current = axis === 'x' ? value.get().saturation : value.get().value;
                    const next = current + (event.key === 'PageUp' ? 10 : -10);
                    event.preventDefault();
                    updateValue(axis === 'x'
                        ? { ...value.get(), saturation: clamp(next, 0, 100) }
                        : { ...value.get(), value: clamp(next, 0, 100) });
                    return;
                }
                const direction = horizontal && dir.get() === 'rtl' ? -1 : 1;
                const current = axis === 'x' ? value.get().saturation : value.get().value;
                const next = event.key === 'Home'
                    ? 0
                    : event.key === 'End'
                        ? 100
                        : axis === 'x'
                            ? current +
                                (event.key === 'ArrowRight'
                                    ? delta * direction
                                    : -delta * direction)
                            : current + (event.key === 'ArrowUp' ? delta : -delta);
                event.preventDefault();
                updateValue(axis === 'x'
                    ? { ...value.get(), saturation: clamp(next, 0, 100) }
                    : { ...value.get(), value: clamp(next, 0, 100) });
            };
            const input = (event) => {
                if (readonlyOption.get()) {
                    node.value = String(axis === 'x' ? value.get().saturation : value.get().value);
                    return;
                }
                const next = Number(event.currentTarget.value);
                if (!Number.isFinite(next))
                    return;
                updateValue(axis === 'x'
                    ? { ...value.get(), saturation: clamp(next, 0, 100) }
                    : { ...value.get(), value: clamp(next, 0, 100) });
            };
            return {
                destroy: executeCallbacks(addMeltEventListener(node, 'focus', () => {
                    active.set('area');
                    activeAreaAxis.set(axis);
                }), addMeltEventListener(node, 'keydown', keyboard), addMeltEventListener(node, 'input', input)),
            };
        },
    });
    const areaXInput = areaInput('x', 'area-x-input');
    const areaYInput = areaInput('y', 'area-y-input');
    const track = (kind, part) => makeElement(name(part), {
        stores: [disabled, readonlyOption, orientation],
        returned: ([$disabled, $readonly, $orientation]) => ({
            'aria-disabled': disabledAttr($disabled),
            'aria-readonly': $readonly ? true : undefined,
            'data-orientation': $orientation,
            style: `touch-action:${$orientation === 'vertical' ? 'pan-x' : 'pan-y'};position:relative;`,
        }),
        action: (node) => {
            let pointerId = null;
            let changed = false;
            const apply = (event) => {
                if (pointerId !== (event.pointerId ?? 0))
                    return;
                const next = updateTrackPosition(node, event.clientX ?? 0, event.clientY ?? 0, dir.get(), orientation.get());
                changed =
                    updateValue(kind === 'hue'
                        ? { ...value.get(), hue: next * 3.6 }
                        : { ...value.get(), alpha: next / 100 }) || changed;
            };
            const finish = (event) => {
                if (pointerId !== (event.pointerId ?? 0))
                    return;
                apply(event);
                if (node.hasPointerCapture?.(event.pointerId ?? 0))
                    node.releasePointerCapture(event.pointerId ?? 0);
                pointerId = null;
                active.set(null);
                if (changed)
                    commit();
                changed = false;
            };
            return {
                destroy: executeCallbacks(addMeltEventListener(node, 'pointerdown', (event) => {
                    if (disabled.get() ||
                        readonlyOption.get() ||
                        (event.button !== undefined && event.button !== 0))
                        return;
                    pointerId = event.pointerId ?? 0;
                    node.setPointerCapture?.(pointerId);
                    active.set(kind);
                    changed = false;
                    apply(event);
                }), addMeltEventListener(node, 'pointermove', apply), addMeltEventListener(node, 'pointerup', finish), addMeltEventListener(node, 'pointercancel', finish)),
            };
        },
    });
    const hueTrack = track('hue', 'hue-track');
    const alphaTrack = track('alpha', 'alpha-track');
    const thumb = (kind, part) => makeElement(name(part), {
        stores: [value, orientation],
        returned: ([$value, $orientation]) => {
            const percent = kind === 'hue' ? $value.hue / 3.6 : $value.alpha * 100;
            return {
                role: 'presentation',
                style: `position:absolute;${$orientation === 'vertical'
                    ? `inset-inline-start:50%;inset-block-start:${100 - percent}%;`
                    : `inset-inline-start:${percent}%;`}`,
            };
        },
    });
    const hueThumb = thumb('hue', 'hue-thumb');
    const alphaThumb = thumb('alpha', 'alpha-thumb');
    const sliderInput = (kind, part) => makeElement(name(part), {
        stores: [value, disabled, readonlyOption, orientation],
        returned: ([$value, $disabled, $readonly, $orientation]) => {
            const current = kind === 'hue' ? $value.hue : $value.alpha * 100;
            const max = kind === 'hue' ? 360 : 100;
            return {
                type: 'range',
                min: 0,
                max,
                step: 1,
                value: current,
                'aria-valuemin': 0,
                'aria-valuemax': max,
                'aria-valuenow': current,
                'aria-valuetext': `${Math.round(current)}${kind === 'hue' ? '°' : '%'}`,
                'aria-orientation': $orientation,
                'aria-label': kind === 'hue' ? 'Hue' : 'Alpha',
                'aria-disabled': disabledAttr($disabled),
                'aria-readonly': $readonly ? true : undefined,
                disabled: $disabled,
                style: 'position:absolute;inset:0;opacity:0.001;pointer-events:none;',
            };
        },
        action: (node) => {
            const currentValue = () => kind === 'hue' ? value.get().hue : value.get().alpha * 100;
            const keyboard = (event) => {
                const mutationKey = [
                    'ArrowLeft',
                    'ArrowRight',
                    'ArrowUp',
                    'ArrowDown',
                    'PageUp',
                    'PageDown',
                    'Home',
                    'End',
                ].includes(event.key);
                if (readonlyOption.get()) {
                    if (mutationKey)
                        event.preventDefault();
                    return;
                }
                if (disabled.get() || !mutationKey)
                    return;
                const delta = event.key === 'PageUp' || event.key === 'PageDown'
                    ? 10
                    : event.shiftKey
                        ? 10
                        : 1;
                const sign = event.key === 'ArrowRight' ||
                    event.key === 'ArrowUp' ||
                    event.key === 'PageUp'
                    ? 1
                    : -1;
                const max = kind === 'hue' ? 360 : 100;
                const next = event.key === 'Home'
                    ? 0
                    : event.key === 'End'
                        ? max
                        : clamp(currentValue() + sign * delta, 0, max);
                event.preventDefault();
                updateValue(kind === 'hue'
                    ? { ...value.get(), hue: next }
                    : { ...value.get(), alpha: next / 100 });
            };
            const input = (event) => {
                if (readonlyOption.get()) {
                    node.value = String(currentValue());
                    return;
                }
                const next = Number(event.currentTarget.value);
                if (!Number.isFinite(next))
                    return;
                updateValue(kind === 'hue'
                    ? { ...value.get(), hue: next }
                    : { ...value.get(), alpha: next / 100 });
            };
            return {
                destroy: executeCallbacks(addMeltEventListener(node, 'focus', () => active.set(kind)), addMeltEventListener(node, 'keydown', keyboard), addMeltEventListener(node, 'input', input)),
            };
        },
    });
    const hueInput = sliderInput('hue', 'hue-input');
    const alphaInput = sliderInput('alpha', 'alpha-input');
    const channels = derived(format, ($format) => channelSets[$format]);
    const channelInput = makeElement(name('channel-input'), {
        stores: [value, format, disabled, readonlyOption, channelDrafts],
        returned: ([$value, $format, $disabled, $readonly, $drafts]) => {
            return ({ channel, format: override }) => {
                const numeric = channel !== 'hex';
                const activeFormat = override ?? $format;
                const fractional = activeFormat === 'oklch' && numeric && channel !== 'alpha';
                const [min, max] = getChannelBounds(channel);
                return {
                    type: numeric && !fractional ? 'number' : 'text',
                    value: $drafts[`${activeFormat}:${channel}`] ??
                        formatChannel($value, channel, activeFormat),
                    min: numeric && !fractional ? min : undefined,
                    max: numeric && !fractional ? max : undefined,
                    step: numeric && !fractional ? 1 : undefined,
                    inputmode: numeric ? 'decimal' : 'text',
                    maxlength: channel === 'hex' ? 8 : undefined,
                    'aria-label': channel,
                    disabled: $disabled,
                    readonly: $readonly ? true : undefined,
                    'aria-disabled': disabledAttr($disabled),
                    'aria-readonly': $readonly ? true : undefined,
                    'data-channel': channel,
                    'data-format': override,
                };
            };
        },
        action: (node) => {
            let currentChannel = null;
            let currentFormat = format.get();
            let sessionAlpha = value.get().alpha;
            const draftKey = () => currentChannel ? `${currentFormat}:${currentChannel}` : null;
            const setDraft = () => {
                const key = draftKey();
                if (!key)
                    return;
                channelDrafts.update((drafts) => ({ ...drafts, [key]: node.value }));
            };
            const clearDraft = () => {
                const key = draftKey();
                if (!key)
                    return;
                channelDrafts.update((drafts) => {
                    const next = { ...drafts };
                    delete next[key];
                    return next;
                });
            };
            const parseAndUpdate = (channel, raw) => {
                if (channel === 'hex') {
                    const parsed = parseHex(raw, sessionAlpha);
                    if (!parsed)
                        return false;
                    updateValue(parsed);
                    return true;
                }
                if (raw.trim() === '' || !/^-?(?:\d+\.?\d*|\.\d+)$/.test(raw.trim()))
                    return false;
                const numeric = Number(raw);
                if (!Number.isFinite(numeric))
                    return false;
                const [min, max] = getChannelBounds(channel);
                updateValue(channelValue(value.get(), channel, clamp(numeric, min, max), currentFormat));
                return true;
            };
            const normalizeField = (channel) => {
                node.value = formatChannel(value.get(), channel, currentFormat);
                delete node.dataset.invalid;
            };
            const input = () => {
                if (!currentChannel || disabled.get() || readonlyOption.get())
                    return;
                setDraft();
                const valid = parseAndUpdate(currentChannel, node.value);
                if (valid)
                    delete node.dataset.invalid;
                else
                    node.dataset.invalid = 'true';
            };
            const blur = () => {
                if (!currentChannel)
                    return;
                if (node.dataset.invalid === 'true')
                    normalizeField(currentChannel);
                else {
                    parseAndUpdate(currentChannel, node.value);
                    normalizeField(currentChannel);
                    commit();
                }
                clearDraft();
                currentChannel = null;
            };
            const keydown = (event) => {
                if (!currentChannel)
                    return;
                if (event.key === 'Escape') {
                    event.preventDefault();
                    normalizeField(currentChannel);
                    clearDraft();
                    return;
                }
                if (event.key === 'Enter') {
                    event.preventDefault();
                    blur();
                    node.blur();
                }
            };
            return {
                destroy: executeCallbacks(addMeltEventListener(node, 'focus', () => {
                    currentChannel = node.dataset.channel;
                    currentFormat =
                        node.dataset.format ??
                            format.get();
                    sessionAlpha = value.get().alpha;
                    setDraft();
                }), addMeltEventListener(node, 'input', input), addMeltEventListener(node, 'change', input), addMeltEventListener(node, 'blur', blur), addMeltEventListener(node, 'keydown', keydown)),
            };
        },
    });
    const formatSelect = makeElement(name('format-select'), {
        stores: [format, disabled],
        returned: ([$format, $disabled]) => ({
            value: $format,
            'aria-label': 'Color format',
            disabled: $disabled,
            'data-formats': formats.join(' '),
        }),
        action: (node) => ({
            destroy: addMeltEventListener(node, 'change', () => {
                if (disabled.get())
                    return;
                const next = node.value;
                if (!formats.includes(next)) {
                    node.value = format.get();
                    return;
                }
                format.set(next);
            }),
        }),
    });
    const swatch = makeElement(name('swatch'), {
        stores: [value],
        returned: ([$value]) => ({
            'data-color': `#${formatSerializedHex($value)}`,
            style: `background-color:${cssColor($value)};`,
        }),
    });
    const previousSwatch = makeElement(name('previous-swatch'), {
        stores: [previousValue, disabled, readonlyOption],
        returned: ([$previous, $disabled, $readonly]) => {
            const normalized = normalizeColor($previous);
            return {
                type: 'button',
                'aria-label': 'Restore previous color',
                'data-color': `#${formatSerializedHex(normalized)}`,
                disabled: $disabled,
                'aria-disabled': disabledAttr($disabled),
                'aria-readonly': $readonly ? true : undefined,
                style: `background-color:${cssColor(normalized)};`,
            };
        },
        action: (node) => ({
            destroy: addMeltEventListener(node, 'click', () => {
                if (disabled.get() || readonlyOption.get())
                    return;
                if (updateValue(normalizeColor(get(previousValue))))
                    commit();
            }),
        }),
    });
    const copyButton = makeElement(name('copy-button'), {
        stores: [disabled],
        returned: ([$disabled]) => {
            return ({ format: copyFormat } = {}) => ({
                type: 'button',
                'aria-label': 'Copy color',
                disabled: $disabled,
                'aria-disabled': disabledAttr($disabled),
                'data-format': copyFormat,
            });
        },
        action: (node) => ({
            destroy: addMeltEventListener(node, 'click', () => {
                if (disabled.get())
                    return;
                const copyFormat = node.dataset.format ??
                    format.get();
                const text = serializeColor(value.get(), copyFormat);
                void navigator.clipboard?.writeText(text).catch(() => undefined);
            }),
        }),
    });
    const eyedropperButton = makeElement(name('eyedropper-button'), {
        stores: [disabled, readonlyOption],
        returned: ([$disabled, $readonly]) => ({
            type: 'button',
            'aria-label': 'Pick color from screen',
            disabled: $disabled,
            'aria-disabled': disabledAttr($disabled),
            'aria-readonly': $readonly ? true : undefined,
        }),
        action: (node) => ({
            destroy: addMeltEventListener(node, 'click', () => {
                if (disabled.get() || readonlyOption.get())
                    return;
                const EyeDropperCtor = getEyeDropperCtor();
                if (!EyeDropperCtor)
                    return;
                void new EyeDropperCtor()
                    .open()
                    .then((result) => {
                    const parsed = parseHex(result.sRGBHex, value.get().alpha);
                    if (parsed && updateValue(parsed))
                        commit();
                })
                    .catch(() => undefined);
            }),
        }),
    });
    const colorInput = makeElement(name('color-input'), {
        stores: [value, format, disabled, readonlyOption, colorInputDraft],
        returned: ([$value, $format, $disabled, $readonly, $draft]) => ({
            type: 'text',
            value: $draft ??
                ($format === 'hex'
                    ? formatSerializedHex($value)
                    : serializeColor($value, $format)),
            'aria-label': 'Color value',
            spellcheck: false,
            autocomplete: 'off',
            'data-format': $format,
            disabled: $disabled,
            readonly: $readonly ? true : undefined,
            'aria-disabled': disabledAttr($disabled),
            'aria-readonly': $readonly ? true : undefined,
        }),
        action: (node) => {
            let sessionAlpha = value.get().alpha;
            const canonical = () => {
                const current = value.get();
                const activeFormat = format.get();
                return activeFormat === 'hex'
                    ? formatSerializedHex(current)
                    : serializeColor(current, activeFormat);
            };
            const normalizeField = () => {
                node.value = canonical();
                delete node.dataset.invalid;
            };
            const input = () => {
                if (disabled.get() || readonlyOption.get())
                    return;
                if (get(colorInputDraft) === null)
                    return;
                colorInputDraft.set(node.value);
                const parsed = parseColorString(node.value, format.get(), sessionAlpha);
                if (parsed && updateValue(parsed))
                    delete node.dataset.invalid;
                else if (!parsed)
                    node.dataset.invalid = 'true';
            };
            const blur = () => {
                if (get(colorInputDraft) === null)
                    return;
                if (node.dataset.invalid === 'true')
                    normalizeField();
                else {
                    input();
                    normalizeField();
                    commit();
                }
                colorInputDraft.set(null);
            };
            const keydown = (event) => {
                if (get(colorInputDraft) === null)
                    return;
                if (event.key === 'Escape') {
                    event.preventDefault();
                    normalizeField();
                    colorInputDraft.set(null);
                    return;
                }
                if (event.key === 'Enter') {
                    event.preventDefault();
                    blur();
                    node.blur();
                }
            };
            return {
                destroy: executeCallbacks(addMeltEventListener(node, 'focus', () => {
                    sessionAlpha = value.get().alpha;
                    colorInputDraft.set(node.value);
                }), addMeltEventListener(node, 'input', input), addMeltEventListener(node, 'change', input), addMeltEventListener(node, 'blur', blur), addMeltEventListener(node, 'keydown', keydown)),
            };
        },
    });
    const hiddenInput = createHiddenInput({
        value: derived(value, ($value) => `#${formatSerializedHex($value)}`),
        name: readonly(nameProp),
        disabled,
    });
    const cssColorState = derived(value, ($value) => cssColor($value));
    const serializedState = derived([value, format], ([$value, $format]) => serializeColor($value, $format));
    return {
        elements: {
            root,
            area,
            areaThumb,
            areaXInput,
            areaYInput,
            hueTrack,
            hueThumb,
            hueInput,
            alphaTrack,
            alphaThumb,
            alphaInput,
            channelInput,
            colorInput,
            formatSelect,
            swatch,
            previousSwatch,
            copyButton,
            eyedropperButton,
            hiddenInput,
        },
        states: {
            value,
            format,
            previousValue,
            channels: readonly(channels),
            cssColor: cssColorState,
            serialized: serializedState,
            active: readonly(active),
        },
        options,
    };
}
