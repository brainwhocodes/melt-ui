---
title: Color Picker
description: An inline headless color control with HSVA state and editable channels
---

<script>
    import { APIReference, KbdTable, Preview } from '$docs/components'
    export let schemas
    export let keyboard
    export let snippets
    export let previews
</script>

## Usage

`createColorPicker` owns inline color state and controls. It does not own a popup, portal, focus
trap, or dismissal policy; compose it with `createPopover` when the panel should float. The
preview does exactly this: the compact swatch/value/alpha field is the popover trigger, and the
full picker renders only after that field is clicked. The direction the panel opens toward is the
composed popover's `positioning.placement` (`'top'`, `'right'`, `'bottom'`, or `'left'`), which the
preview exposes as a direction control; floating-ui's flip keeps the panel on screen when the
chosen side does not fit.

<Preview code={snippets.main}>
    <svelte:component this={previews.main} />
</Preview>

## Anatomy

Apply `elements.root` to the state owner and provide an accessible name. The full anatomy uses:

- `area`, `areaThumb`, `areaXInput`, and `areaYInput` for saturation/value.
- `hueTrack`, `hueThumb`, and `hueInput` for hue.
- `alphaTrack`, `alphaThumb`, and `alphaInput` for transparency.
- `channelInput({ channel })` for individual fields, with an optional `format` override so several
  models (for example OKLCH, HSL, and RGB) can stay visible at once.
- `colorInput` for the combined editable color string, `formatSelect` for the display format,
  `swatch` and `previousSwatch` for the new/previous comparison, `copyButton` for clipboard
  export, `eyedropperButton` for the native EyeDropper API, and `hiddenInput` for form
  serialization.

The visual thumbs are presentation-only. Native range inputs are the accessibility controls and
can be visually overlaid with near-zero opacity while focus is shown on the containing track.

## State and formats

The canonical state is HSVA: `hue` is `0…360`, `saturation` and `value` are `0…100`, and `alpha`
is `0…1`. Hue is preserved when saturation or value reaches zero. Switching among `hex`, `rgb`,
`hsl`, `hsv`, and `oklch` changes only the representation; it never changes the canonical color.
The picker is an sRGB control: OKLCH values that fall outside the sRGB gamut are clamped to the
gamut boundary when converted.

`states.channels` exposes the exact channel set for the active format, and `states.serialized`
provides the current color as a copy-ready string. HEX displays six uppercase RGB digits without
`#`; alpha is a separate percentage field. HEX input accepts optional `#` and 3/4/6/8-digit
values. Fractional OKLCH channels render as decimal text fields; other channels are native
numeric inputs with `min`, `max`, and `step`.

## Combined color input

`colorInput` is a real text field: click it and type or paste a color. It parses `#`-prefixed or
bare HEX plus `rgb()`, `hsl()`, `hsv()`, and `oklch()` functional text, updating the color
whenever the text forms a complete valid color while preserving the focused draft. Malformed text
is marked with `data-invalid` and restored on blur or <kbd>Escape</kbd>; blur or <kbd>Enter</kbd>
commits the value.

## Comparison, copy, and eyedropper

`states.previousValue` holds the comparison color. It defaults to a snapshot of the initial value
and can be replaced with a controlled writable reset when the picker opens. `previousSwatch`
renders it and restores it on click. `copyButton({ format })` copies the serialized color to the
clipboard, defaulting to the active format. `eyedropperButton` opens the native EyeDropper API
where available and is a no-op elsewhere, so consumers can feature-detect and hide it.

## Controlled state and forms

Pass `value` and `format` writable stores for controlled state, or use `defaultValue` and
`defaultFormat` for uncontrolled state. `onValueChange` and `onFormatChange` use Melt's
change-function contract. `onValueCommitted` fires once after a changed pointer interaction or a
valid field edit is committed.

Set `name` to serialize a stable uppercase `#RRGGBBAA` value independent of the visible format.

## Pointer and keyboard interaction

The area maps inline start to saturation `0`, inline end to `100`, top to value `100`, and bottom
to `0`. Hue maps `0…360`; alpha maps `0…1`. Geometry is clamped outside the tracks. Primary-pointer
capture keeps the interaction stable through movement and commits on pointer up or cancel. With
`orientation: 'vertical'`, the hue and alpha tracks map pointer values bottom-to-top, expose
vertical ARIA, and position thumbs on the block axis.

Arrow keys change the active axis by one; <kbd>Shift</kbd> changes by ten. <kbd>PageUp</kbd> and
<kbd>PageDown</kbd> change the focused control by ten. <kbd>Home</kbd> and <kbd>End</kbd> set the
active axis to its minimum or maximum. Vertical area keys transfer focus to the value input and
horizontal keys transfer focus to the saturation input.

<KbdTable {keyboard} />

## Disabled and readonly

`disabled` removes editable controls from interaction and disables form serialization. `readonly`
keeps range controls focusable and permits format switching, but blocks value mutation: every
recognized mutation key is swallowed, stray native input events are reverted, and text fields
become native readonly controls.

## Accessibility

Label the root, color area, hue track, alpha track, and every channel field. The builder publishes
native range `min`, `max`, `step`, `aria-orientation`, and unit-bearing `aria-valuetext` values.
Draw focus on tracks with `:focus-within` when the transparent range overlays are used.

## API Reference

<APIReference {schemas} />
