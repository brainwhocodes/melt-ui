import type {
	GroupedEvents,
	MeltComponentEvents,
} from '$lib/internal/types.js';

export const colorPickerEvents = {
	area: ['pointerdown', 'pointermove', 'pointerup', 'pointercancel'] as const,
	areaXInput: ['focus', 'keydown', 'input'] as const,
	areaYInput: ['focus', 'keydown', 'input'] as const,
	hueTrack: [
		'pointerdown',
		'pointermove',
		'pointerup',
		'pointercancel',
	] as const,
	hueInput: ['focus', 'keydown', 'input'] as const,
	alphaTrack: [
		'pointerdown',
		'pointermove',
		'pointerup',
		'pointercancel',
	] as const,
	alphaInput: ['focus', 'keydown', 'input'] as const,
	channelInput: ['input', 'change', 'focus', 'blur', 'keydown'] as const,
	colorInput: ['input', 'change', 'focus', 'blur', 'keydown'] as const,
	formatSelect: ['change'] as const,
	previousSwatch: ['click'] as const,
	copyButton: ['click'] as const,
	eyedropperButton: ['click'] as const,
};

export type ColorPickerEvents = GroupedEvents<typeof colorPickerEvents>;
export type ColorPickerComponentEvents = MeltComponentEvents<ColorPickerEvents>;
