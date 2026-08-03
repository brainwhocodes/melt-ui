import type { Writable } from 'svelte/store';
import type { ChangeFn } from '$lib/internal/helpers/index.js';
import type { BuilderReturn, TextDirection } from '$lib/internal/types.js';
import type { createAlignmentPicker } from './create.js';

export type { AlignmentPickerComponentEvents } from './events.js';

export type AlignmentPickerValue =
	| 'top-start'
	| 'top-center'
	| 'top-end'
	| 'center-start'
	| 'center'
	| 'center-end'
	| 'bottom-start'
	| 'bottom-center'
	| 'bottom-end';

export type CreateAlignmentPickerProps = {
	defaultValue?: AlignmentPickerValue;
	value?: Writable<AlignmentPickerValue>;
	onValueChange?: ChangeFn<AlignmentPickerValue>;
	disabled?: boolean;
	loop?: boolean;
	dir?: TextDirection;
	name?: string;
};

export type AlignmentPickerItemProps = {
	value: AlignmentPickerValue;
	disabled?: boolean;
};

export type AlignmentPicker = BuilderReturn<typeof createAlignmentPicker>;
export type AlignmentPickerElements = AlignmentPicker['elements'];
export type AlignmentPickerOptions = AlignmentPicker['options'];
export type AlignmentPickerStates = AlignmentPicker['states'];
export type AlignmentPickerHelpers = AlignmentPicker['helpers'];
