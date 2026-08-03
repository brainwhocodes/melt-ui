import type { GroupedEvents, MeltComponentEvents } from '../../internal/types.js';
export declare const colorPickerEvents: {
    area: readonly ["pointerdown", "pointermove", "pointerup", "pointercancel"];
    areaXInput: readonly ["focus", "keydown", "input"];
    areaYInput: readonly ["focus", "keydown", "input"];
    hueTrack: readonly ["pointerdown", "pointermove", "pointerup", "pointercancel"];
    hueInput: readonly ["focus", "keydown", "input"];
    alphaTrack: readonly ["pointerdown", "pointermove", "pointerup", "pointercancel"];
    alphaInput: readonly ["focus", "keydown", "input"];
    channelInput: readonly ["input", "change", "focus", "blur", "keydown"];
    colorInput: readonly ["input", "change", "focus", "blur", "keydown"];
    formatSelect: readonly ["change"];
    previousSwatch: readonly ["click"];
    copyButton: readonly ["click"];
    eyedropperButton: readonly ["click"];
};
export type ColorPickerEvents = GroupedEvents<typeof colorPickerEvents>;
export type ColorPickerComponentEvents = MeltComponentEvents<ColorPickerEvents>;
