import type { MeltActionReturn } from '../../internal/types.js';
import type { ColorPickerEvents } from './events.js';
import type { ColorPickerChannel, ColorPickerChannelInputProps, ColorPickerCopyButtonProps, ColorPickerFormat, ColorPickerValue, CreateColorPickerProps } from './types.js';
type ActiveControl = 'area' | 'hue' | 'alpha' | null;
type AreaAxis = 'x' | 'y' | null;
export declare function createColorPicker(props?: CreateColorPickerProps): {
    elements: {
        root: import("../../internal/helpers/index.js").MeltElement<[{
            update: (updater: import("svelte/store").Updater<ColorPickerValue>, sideEffect?: ((newValue: ColorPickerValue) => void) | undefined) => void;
            set: (this: void, value: ColorPickerValue) => void;
            subscribe(this: void, run: import("svelte/store").Subscriber<ColorPickerValue>, invalidate?: () => void): import("svelte/store").Unsubscriber;
            get: () => ColorPickerValue;
            destroy?: () => void;
        }, {
            update: (updater: import("svelte/store").Updater<ColorPickerFormat>, sideEffect?: ((newValue: ColorPickerFormat) => void) | undefined) => void;
            set: (this: void, value: ColorPickerFormat) => void;
            subscribe(this: void, run: import("svelte/store").Subscriber<ColorPickerFormat>, invalidate?: () => void): import("svelte/store").Unsubscriber;
            get: () => ColorPickerFormat;
            destroy?: () => void;
        }, import("../../internal/helpers/index.js").WithGet<import("svelte/store").Writable<boolean>>, import("../../internal/helpers/index.js").WithGet<import("svelte/store").Writable<boolean>>, import("../../internal/helpers/index.js").WithGet<import("svelte/store").Writable<import("../../internal/types.js").TextDirection>>], import("svelte/action").Action<any, any, Record<never, any>>, ([$value, $format, $disabled, $readonly, $dir]: [ColorPickerValue, ColorPickerFormat, boolean, boolean, import("../../internal/types.js").TextDirection]) => {
            role: string;
            dir: import("../../internal/types.js").TextDirection;
            'data-format': ColorPickerFormat;
            'data-disabled': boolean | undefined;
            'data-readonly': boolean | undefined;
            'aria-disabled': boolean | undefined;
            'aria-readonly': boolean | undefined;
            style: string;
        }, string>;
        area: import("../../internal/helpers/index.js").MeltElement<[import("../../internal/helpers/index.js").WithGet<import("svelte/store").Writable<boolean>>, import("../../internal/helpers/index.js").WithGet<import("svelte/store").Writable<boolean>>], (node: HTMLElement) => MeltActionReturn<ColorPickerEvents["area"]>, ([$disabled, $readonly]: [boolean, boolean]) => {
            role: string;
            'aria-disabled': boolean | undefined;
            'aria-readonly': boolean | undefined;
            style: string;
        }, string>;
        areaThumb: import("../../internal/helpers/index.js").MeltElement<[{
            update: (updater: import("svelte/store").Updater<ColorPickerValue>, sideEffect?: ((newValue: ColorPickerValue) => void) | undefined) => void;
            set: (this: void, value: ColorPickerValue) => void;
            subscribe(this: void, run: import("svelte/store").Subscriber<ColorPickerValue>, invalidate?: () => void): import("svelte/store").Unsubscriber;
            get: () => ColorPickerValue;
            destroy?: () => void;
        }], import("svelte/action").Action<any, any, Record<never, any>>, ([$value]: [ColorPickerValue]) => {
            role: string;
            style: string;
        }, string>;
        areaXInput: import("../../internal/helpers/index.js").MeltElement<[{
            update: (updater: import("svelte/store").Updater<ColorPickerValue>, sideEffect?: ((newValue: ColorPickerValue) => void) | undefined) => void;
            set: (this: void, value: ColorPickerValue) => void;
            subscribe(this: void, run: import("svelte/store").Subscriber<ColorPickerValue>, invalidate?: () => void): import("svelte/store").Unsubscriber;
            get: () => ColorPickerValue;
            destroy?: () => void;
        }, import("../../internal/helpers/index.js").WithGet<import("svelte/store").Writable<boolean>>, import("../../internal/helpers/index.js").WithGet<import("svelte/store").Writable<boolean>>, import("svelte/store").Writable<AreaAxis>], (node: HTMLInputElement) => {
            destroy: () => void;
        }, ([$value, $disabled, $readonly, $activeAxis]: [ColorPickerValue, boolean, boolean, AreaAxis]) => {
            readonly type: "range";
            readonly min: 0;
            readonly max: 100;
            readonly step: 1;
            readonly value: number;
            readonly 'aria-valuemin': 0;
            readonly 'aria-valuemax': 100;
            readonly 'aria-valuenow': number;
            readonly 'aria-valuetext': `${number}%`;
            readonly 'aria-orientation': "horizontal" | "vertical";
            readonly 'aria-label': "Saturation" | "Value";
            readonly 'aria-disabled': true | undefined;
            readonly 'aria-readonly': true | undefined;
            readonly disabled: boolean;
            readonly tabindex: 0 | -1;
            readonly style: "position:absolute;inset:0;opacity:0.001;pointer-events:none;";
        }, string>;
        areaYInput: import("../../internal/helpers/index.js").MeltElement<[{
            update: (updater: import("svelte/store").Updater<ColorPickerValue>, sideEffect?: ((newValue: ColorPickerValue) => void) | undefined) => void;
            set: (this: void, value: ColorPickerValue) => void;
            subscribe(this: void, run: import("svelte/store").Subscriber<ColorPickerValue>, invalidate?: () => void): import("svelte/store").Unsubscriber;
            get: () => ColorPickerValue;
            destroy?: () => void;
        }, import("../../internal/helpers/index.js").WithGet<import("svelte/store").Writable<boolean>>, import("../../internal/helpers/index.js").WithGet<import("svelte/store").Writable<boolean>>, import("svelte/store").Writable<AreaAxis>], (node: HTMLInputElement) => {
            destroy: () => void;
        }, ([$value, $disabled, $readonly, $activeAxis]: [ColorPickerValue, boolean, boolean, AreaAxis]) => {
            readonly type: "range";
            readonly min: 0;
            readonly max: 100;
            readonly step: 1;
            readonly value: number;
            readonly 'aria-valuemin': 0;
            readonly 'aria-valuemax': 100;
            readonly 'aria-valuenow': number;
            readonly 'aria-valuetext': `${number}%`;
            readonly 'aria-orientation': "horizontal" | "vertical";
            readonly 'aria-label': "Saturation" | "Value";
            readonly 'aria-disabled': true | undefined;
            readonly 'aria-readonly': true | undefined;
            readonly disabled: boolean;
            readonly tabindex: 0 | -1;
            readonly style: "position:absolute;inset:0;opacity:0.001;pointer-events:none;";
        }, string>;
        hueTrack: import("../../internal/helpers/index.js").MeltElement<[import("../../internal/helpers/index.js").WithGet<import("svelte/store").Writable<boolean>>, import("../../internal/helpers/index.js").WithGet<import("svelte/store").Writable<boolean>>, import("../../internal/helpers/index.js").WithGet<import("svelte/store").Writable<"horizontal" | "vertical">>], (node: HTMLElement) => {
            destroy: () => void;
        }, ([$disabled, $readonly, $orientation]: [boolean, boolean, "horizontal" | "vertical"]) => {
            'aria-disabled': boolean | undefined;
            'aria-readonly': boolean | undefined;
            'data-orientation': "horizontal" | "vertical";
            style: string;
        }, string>;
        hueThumb: import("../../internal/helpers/index.js").MeltElement<[{
            update: (updater: import("svelte/store").Updater<ColorPickerValue>, sideEffect?: ((newValue: ColorPickerValue) => void) | undefined) => void;
            set: (this: void, value: ColorPickerValue) => void;
            subscribe(this: void, run: import("svelte/store").Subscriber<ColorPickerValue>, invalidate?: () => void): import("svelte/store").Unsubscriber;
            get: () => ColorPickerValue;
            destroy?: () => void;
        }, import("../../internal/helpers/index.js").WithGet<import("svelte/store").Writable<"horizontal" | "vertical">>], import("svelte/action").Action<any, any, Record<never, any>>, ([$value, $orientation]: [ColorPickerValue, "horizontal" | "vertical"]) => {
            role: string;
            style: string;
        }, string>;
        hueInput: import("../../internal/helpers/index.js").MeltElement<[{
            update: (updater: import("svelte/store").Updater<ColorPickerValue>, sideEffect?: ((newValue: ColorPickerValue) => void) | undefined) => void;
            set: (this: void, value: ColorPickerValue) => void;
            subscribe(this: void, run: import("svelte/store").Subscriber<ColorPickerValue>, invalidate?: () => void): import("svelte/store").Unsubscriber;
            get: () => ColorPickerValue;
            destroy?: () => void;
        }, import("../../internal/helpers/index.js").WithGet<import("svelte/store").Writable<boolean>>, import("../../internal/helpers/index.js").WithGet<import("svelte/store").Writable<boolean>>, import("../../internal/helpers/index.js").WithGet<import("svelte/store").Writable<"horizontal" | "vertical">>], (node: HTMLInputElement) => {
            destroy: () => void;
        }, ([$value, $disabled, $readonly, $orientation]: [ColorPickerValue, boolean, boolean, "horizontal" | "vertical"]) => {
            readonly type: "range";
            readonly min: 0;
            readonly max: 100 | 360;
            readonly step: 1;
            readonly value: number;
            readonly 'aria-valuemin': 0;
            readonly 'aria-valuemax': 100 | 360;
            readonly 'aria-valuenow': number;
            readonly 'aria-valuetext': `${number}%` | `${number}\u00B0`;
            readonly 'aria-orientation': "horizontal" | "vertical";
            readonly 'aria-label': "Hue" | "Alpha";
            readonly 'aria-disabled': true | undefined;
            readonly 'aria-readonly': true | undefined;
            readonly disabled: boolean;
            readonly style: "position:absolute;inset:0;opacity:0.001;pointer-events:none;";
        }, string>;
        alphaTrack: import("../../internal/helpers/index.js").MeltElement<[import("../../internal/helpers/index.js").WithGet<import("svelte/store").Writable<boolean>>, import("../../internal/helpers/index.js").WithGet<import("svelte/store").Writable<boolean>>, import("../../internal/helpers/index.js").WithGet<import("svelte/store").Writable<"horizontal" | "vertical">>], (node: HTMLElement) => {
            destroy: () => void;
        }, ([$disabled, $readonly, $orientation]: [boolean, boolean, "horizontal" | "vertical"]) => {
            'aria-disabled': boolean | undefined;
            'aria-readonly': boolean | undefined;
            'data-orientation': "horizontal" | "vertical";
            style: string;
        }, string>;
        alphaThumb: import("../../internal/helpers/index.js").MeltElement<[{
            update: (updater: import("svelte/store").Updater<ColorPickerValue>, sideEffect?: ((newValue: ColorPickerValue) => void) | undefined) => void;
            set: (this: void, value: ColorPickerValue) => void;
            subscribe(this: void, run: import("svelte/store").Subscriber<ColorPickerValue>, invalidate?: () => void): import("svelte/store").Unsubscriber;
            get: () => ColorPickerValue;
            destroy?: () => void;
        }, import("../../internal/helpers/index.js").WithGet<import("svelte/store").Writable<"horizontal" | "vertical">>], import("svelte/action").Action<any, any, Record<never, any>>, ([$value, $orientation]: [ColorPickerValue, "horizontal" | "vertical"]) => {
            role: string;
            style: string;
        }, string>;
        alphaInput: import("../../internal/helpers/index.js").MeltElement<[{
            update: (updater: import("svelte/store").Updater<ColorPickerValue>, sideEffect?: ((newValue: ColorPickerValue) => void) | undefined) => void;
            set: (this: void, value: ColorPickerValue) => void;
            subscribe(this: void, run: import("svelte/store").Subscriber<ColorPickerValue>, invalidate?: () => void): import("svelte/store").Unsubscriber;
            get: () => ColorPickerValue;
            destroy?: () => void;
        }, import("../../internal/helpers/index.js").WithGet<import("svelte/store").Writable<boolean>>, import("../../internal/helpers/index.js").WithGet<import("svelte/store").Writable<boolean>>, import("../../internal/helpers/index.js").WithGet<import("svelte/store").Writable<"horizontal" | "vertical">>], (node: HTMLInputElement) => {
            destroy: () => void;
        }, ([$value, $disabled, $readonly, $orientation]: [ColorPickerValue, boolean, boolean, "horizontal" | "vertical"]) => {
            readonly type: "range";
            readonly min: 0;
            readonly max: 100 | 360;
            readonly step: 1;
            readonly value: number;
            readonly 'aria-valuemin': 0;
            readonly 'aria-valuemax': 100 | 360;
            readonly 'aria-valuenow': number;
            readonly 'aria-valuetext': `${number}%` | `${number}\u00B0`;
            readonly 'aria-orientation': "horizontal" | "vertical";
            readonly 'aria-label': "Hue" | "Alpha";
            readonly 'aria-disabled': true | undefined;
            readonly 'aria-readonly': true | undefined;
            readonly disabled: boolean;
            readonly style: "position:absolute;inset:0;opacity:0.001;pointer-events:none;";
        }, string>;
        channelInput: import("../../internal/helpers/index.js").MeltElement<[{
            update: (updater: import("svelte/store").Updater<ColorPickerValue>, sideEffect?: ((newValue: ColorPickerValue) => void) | undefined) => void;
            set: (this: void, value: ColorPickerValue) => void;
            subscribe(this: void, run: import("svelte/store").Subscriber<ColorPickerValue>, invalidate?: () => void): import("svelte/store").Unsubscriber;
            get: () => ColorPickerValue;
            destroy?: () => void;
        }, {
            update: (updater: import("svelte/store").Updater<ColorPickerFormat>, sideEffect?: ((newValue: ColorPickerFormat) => void) | undefined) => void;
            set: (this: void, value: ColorPickerFormat) => void;
            subscribe(this: void, run: import("svelte/store").Subscriber<ColorPickerFormat>, invalidate?: () => void): import("svelte/store").Unsubscriber;
            get: () => ColorPickerFormat;
            destroy?: () => void;
        }, import("../../internal/helpers/index.js").WithGet<import("svelte/store").Writable<boolean>>, import("../../internal/helpers/index.js").WithGet<import("svelte/store").Writable<boolean>>, import("svelte/store").Writable<Record<string, string>>], (node: HTMLInputElement) => {
            destroy: () => void;
        }, ([$value, $format, $disabled, $readonly, $drafts]: [ColorPickerValue, ColorPickerFormat, boolean, boolean, Record<string, string>]) => ({ channel, format: override }: ColorPickerChannelInputProps) => {
            readonly type: "number" | "text";
            readonly value: string;
            readonly min: number | undefined;
            readonly max: number | undefined;
            readonly step: 1 | undefined;
            readonly inputmode: "text" | "decimal";
            readonly maxlength: 8 | undefined;
            readonly 'aria-label': ColorPickerChannel;
            readonly disabled: boolean;
            readonly readonly: true | undefined;
            readonly 'aria-disabled': true | undefined;
            readonly 'aria-readonly': true | undefined;
            readonly 'data-channel': ColorPickerChannel;
            readonly 'data-format': ColorPickerFormat | undefined;
        }, string>;
        colorInput: import("../../internal/helpers/index.js").MeltElement<[{
            update: (updater: import("svelte/store").Updater<ColorPickerValue>, sideEffect?: ((newValue: ColorPickerValue) => void) | undefined) => void;
            set: (this: void, value: ColorPickerValue) => void;
            subscribe(this: void, run: import("svelte/store").Subscriber<ColorPickerValue>, invalidate?: () => void): import("svelte/store").Unsubscriber;
            get: () => ColorPickerValue;
            destroy?: () => void;
        }, {
            update: (updater: import("svelte/store").Updater<ColorPickerFormat>, sideEffect?: ((newValue: ColorPickerFormat) => void) | undefined) => void;
            set: (this: void, value: ColorPickerFormat) => void;
            subscribe(this: void, run: import("svelte/store").Subscriber<ColorPickerFormat>, invalidate?: () => void): import("svelte/store").Unsubscriber;
            get: () => ColorPickerFormat;
            destroy?: () => void;
        }, import("../../internal/helpers/index.js").WithGet<import("svelte/store").Writable<boolean>>, import("../../internal/helpers/index.js").WithGet<import("svelte/store").Writable<boolean>>, import("svelte/store").Writable<string | null>], (node: HTMLInputElement) => {
            destroy: () => void;
        }, ([$value, $format, $disabled, $readonly, $draft]: [ColorPickerValue, ColorPickerFormat, boolean, boolean, string | null]) => {
            readonly type: "text";
            readonly value: string;
            readonly 'aria-label': "Color value";
            readonly spellcheck: false;
            readonly autocomplete: "off";
            readonly 'data-format': ColorPickerFormat;
            readonly disabled: boolean;
            readonly readonly: true | undefined;
            readonly 'aria-disabled': true | undefined;
            readonly 'aria-readonly': true | undefined;
        }, string>;
        formatSelect: import("../../internal/helpers/index.js").MeltElement<[{
            update: (updater: import("svelte/store").Updater<ColorPickerFormat>, sideEffect?: ((newValue: ColorPickerFormat) => void) | undefined) => void;
            set: (this: void, value: ColorPickerFormat) => void;
            subscribe(this: void, run: import("svelte/store").Subscriber<ColorPickerFormat>, invalidate?: () => void): import("svelte/store").Unsubscriber;
            get: () => ColorPickerFormat;
            destroy?: () => void;
        }, import("../../internal/helpers/index.js").WithGet<import("svelte/store").Writable<boolean>>], (node: HTMLSelectElement) => {
            destroy: VoidFunction;
        }, ([$format, $disabled]: [ColorPickerFormat, boolean]) => {
            value: ColorPickerFormat;
            'aria-label': string;
            disabled: boolean;
            'data-formats': string;
        }, string>;
        swatch: import("../../internal/helpers/index.js").MeltElement<[{
            update: (updater: import("svelte/store").Updater<ColorPickerValue>, sideEffect?: ((newValue: ColorPickerValue) => void) | undefined) => void;
            set: (this: void, value: ColorPickerValue) => void;
            subscribe(this: void, run: import("svelte/store").Subscriber<ColorPickerValue>, invalidate?: () => void): import("svelte/store").Unsubscriber;
            get: () => ColorPickerValue;
            destroy?: () => void;
        }], import("svelte/action").Action<any, any, Record<never, any>>, ([$value]: [ColorPickerValue]) => {
            'data-color': string;
            style: string;
        }, string>;
        previousSwatch: import("../../internal/helpers/index.js").MeltElement<[import("svelte/store").Writable<ColorPickerValue>, import("../../internal/helpers/index.js").WithGet<import("svelte/store").Writable<boolean>>, import("../../internal/helpers/index.js").WithGet<import("svelte/store").Writable<boolean>>], (node: HTMLButtonElement) => {
            destroy: VoidFunction;
        }, ([$previous, $disabled, $readonly]: [ColorPickerValue, boolean, boolean]) => {
            readonly type: "button";
            readonly 'aria-label': "Restore previous color";
            readonly 'data-color': `#${string}`;
            readonly disabled: boolean;
            readonly 'aria-disabled': true | undefined;
            readonly 'aria-readonly': true | undefined;
            readonly style: `background-color:${string};`;
        }, string>;
        copyButton: import("../../internal/helpers/index.js").MeltElement<[import("../../internal/helpers/index.js").WithGet<import("svelte/store").Writable<boolean>>], (node: HTMLButtonElement) => {
            destroy: VoidFunction;
        }, ([$disabled]: [boolean]) => ({ format: copyFormat }?: ColorPickerCopyButtonProps) => {
            readonly type: "button";
            readonly 'aria-label': "Copy color";
            readonly disabled: boolean;
            readonly 'aria-disabled': true | undefined;
            readonly 'data-format': ColorPickerFormat | undefined;
        }, string>;
        eyedropperButton: import("../../internal/helpers/index.js").MeltElement<[import("../../internal/helpers/index.js").WithGet<import("svelte/store").Writable<boolean>>, import("../../internal/helpers/index.js").WithGet<import("svelte/store").Writable<boolean>>], (node: HTMLButtonElement) => {
            destroy: VoidFunction;
        }, ([$disabled, $readonly]: [boolean, boolean]) => {
            readonly type: "button";
            readonly 'aria-label': "Pick color from screen";
            readonly disabled: boolean;
            readonly 'aria-disabled': true | undefined;
            readonly 'aria-readonly': true | undefined;
        }, string>;
        hiddenInput: import("../../internal/helpers/index.js").MeltElement<[import("../../internal/helpers/index.js").WithGet<import("svelte/store").Readable<string>>, import("svelte/store").Readable<string | undefined>, import("../../internal/helpers/index.js").WithGet<import("svelte/store").Readable<boolean>>, import("../../internal/helpers/index.js").WithGet<import("svelte/store").Readable<boolean>>, import("../../internal/helpers/index.js").WithGet<import("svelte/store").Readable<import("svelte/elements").HTMLInputTypeAttribute | null | undefined>>, import("../../internal/helpers/index.js").WithGet<import("svelte/store").Readable<boolean | undefined>>], (node: HTMLInputElement) => {
            destroy: () => void;
        }, ([$value, $name, $disabled, $required, $type, $checked]: [string, string | undefined, boolean, boolean, import("svelte/elements").HTMLInputTypeAttribute | null | undefined, boolean | undefined]) => {
            readonly name: string | undefined;
            readonly value: string;
            readonly 'aria-hidden': "true";
            readonly hidden: true;
            readonly disabled: boolean;
            readonly required: boolean;
            readonly tabIndex: -1;
            readonly type: import("svelte/elements").HTMLInputTypeAttribute | null | undefined;
            readonly checked: boolean | undefined;
            readonly style: string;
        }, string>;
    };
    states: {
        value: {
            update: (updater: import("svelte/store").Updater<ColorPickerValue>, sideEffect?: ((newValue: ColorPickerValue) => void) | undefined) => void;
            set: (this: void, value: ColorPickerValue) => void;
            subscribe(this: void, run: import("svelte/store").Subscriber<ColorPickerValue>, invalidate?: () => void): import("svelte/store").Unsubscriber;
            get: () => ColorPickerValue;
            destroy?: () => void;
        };
        format: {
            update: (updater: import("svelte/store").Updater<ColorPickerFormat>, sideEffect?: ((newValue: ColorPickerFormat) => void) | undefined) => void;
            set: (this: void, value: ColorPickerFormat) => void;
            subscribe(this: void, run: import("svelte/store").Subscriber<ColorPickerFormat>, invalidate?: () => void): import("svelte/store").Unsubscriber;
            get: () => ColorPickerFormat;
            destroy?: () => void;
        };
        previousValue: import("svelte/store").Writable<ColorPickerValue>;
        channels: import("svelte/store").Readable<readonly ColorPickerChannel[]>;
        cssColor: import("svelte/store").Readable<string>;
        serialized: import("svelte/store").Readable<string>;
        active: import("svelte/store").Readable<ActiveControl>;
    };
    options: import("../../internal/helpers/index.js").ToWritableStores<Omit<{
        defaultValue: ColorPickerValue;
        defaultFormat: ColorPickerFormat;
        value?: import("svelte/store").Writable<ColorPickerValue>;
        onValueChange?: import("../../internal/helpers/index.js").ChangeFn<ColorPickerValue>;
        onValueCommitted?: (value: ColorPickerValue) => void;
        previousValue?: import("svelte/store").Writable<ColorPickerValue>;
        format?: import("svelte/store").Writable<ColorPickerFormat>;
        onFormatChange?: import("../../internal/helpers/index.js").ChangeFn<ColorPickerFormat>;
        disabled: boolean;
        readonly: boolean;
        dir: import("../../internal/types.js").TextDirection;
        orientation: "horizontal" | "vertical";
        name: string;
    }, "value" | "onValueChange" | "defaultValue" | "onValueCommitted" | "previousValue" | "defaultFormat" | "format" | "onFormatChange">>;
};
export {};
