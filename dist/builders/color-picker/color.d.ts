import type { ColorPickerFormat, ColorPickerValue } from './types.js';
export type RGB = {
    red: number;
    green: number;
    blue: number;
};
export type HSL = {
    hue: number;
    saturation: number;
    lightness: number;
};
export type OKLCH = {
    lightness: number;
    chroma: number;
    hue: number;
};
export declare const clamp: (value: number, min: number, max: number) => number;
export declare function normalizeColor(value: ColorPickerValue): ColorPickerValue;
export declare function hsvaToRgbFloat(color: ColorPickerValue): RGB;
export declare function hsvaToRgb(color: ColorPickerValue): RGB;
export declare function rgbToHsl({ red, green, blue }: RGB): HSL;
export declare function hslToRgb({ hue, saturation, lightness }: HSL): RGB;
export declare function hsvaToHsl(color: ColorPickerValue): HSL;
export declare function rgbToOklch({ red, green, blue }: RGB): OKLCH;
export declare function oklchToRgb({ lightness, chroma, hue }: OKLCH): RGB;
export declare function hsvaToOklch(color: ColorPickerValue): OKLCH;
export declare function oklchToHsva(oklch: OKLCH, alpha: number, hue?: number): ColorPickerValue;
export declare function rgbToHsva(rgb: RGB, alpha: number, hue?: number): ColorPickerValue;
export declare function formatHex(color: ColorPickerValue): string;
export declare function formatSerializedHex(color: ColorPickerValue): string;
export declare function parseHex(input: string, alphaFallback: number): ColorPickerValue | null;
export declare function formatChannel(color: ColorPickerValue, channel: string, format?: ColorPickerFormat): string;
export declare function getChannelBounds(channel: string): [number, number];
export declare function channelValue(color: ColorPickerValue, channel: string, input: number, format?: ColorPickerFormat): ColorPickerValue;
export declare function equalColor(a: ColorPickerValue, b: ColorPickerValue): boolean;
export declare function serializeColor(color: ColorPickerValue, format: ColorPickerFormat): string;
export declare function parseColorString(input: string, format: ColorPickerFormat, alphaFallback: number): ColorPickerValue | null;
export declare function formatDisplayValue(color: ColorPickerValue, format: ColorPickerFormat): string;
