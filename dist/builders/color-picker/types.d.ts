import type { Readable, Writable } from 'svelte/store';
import type { ChangeFn } from '../../internal/helpers/index.js';
import type { BuilderReturn, TextDirection } from '../../internal/types.js';
import type { createColorPicker } from './create.js';
export type { ColorPickerComponentEvents } from './events.js';
export type ColorPickerValue = {
    hue: number;
    saturation: number;
    value: number;
    alpha: number;
};
export type ColorPickerFormat = 'hex' | 'rgb' | 'hsl' | 'hsv' | 'oklch';
export type ColorPickerChannel = 'hex' | 'red' | 'green' | 'blue' | 'hue' | 'saturation' | 'lightness' | 'chroma' | 'value' | 'alpha';
export type ColorPickerChannelInputProps = {
    channel: ColorPickerChannel;
    format?: ColorPickerFormat;
};
export type ColorPickerCopyButtonProps = {
    format?: ColorPickerFormat;
};
export type CreateColorPickerProps = {
    defaultValue?: ColorPickerValue;
    value?: Writable<ColorPickerValue>;
    onValueChange?: ChangeFn<ColorPickerValue>;
    onValueCommitted?: (value: ColorPickerValue) => void;
    previousValue?: Writable<ColorPickerValue>;
    defaultFormat?: ColorPickerFormat;
    format?: Writable<ColorPickerFormat>;
    onFormatChange?: ChangeFn<ColorPickerFormat>;
    disabled?: boolean;
    readonly?: boolean;
    dir?: TextDirection;
    orientation?: 'horizontal' | 'vertical';
    name?: string;
};
export type ColorPicker = BuilderReturn<typeof createColorPicker>;
export type ColorPickerElements = ColorPicker['elements'];
export type ColorPickerOptions = ColorPicker['options'];
export type ColorPickerStates = ColorPicker['states'];
export type ColorPickerChannels = Readable<readonly ColorPickerChannel[]>;
