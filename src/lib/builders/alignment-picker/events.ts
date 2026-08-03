import type {
	GroupedEvents,
	MeltComponentEvents,
} from '$lib/internal/types.js';

export const alignmentPickerEvents = {
	item: ['click', 'focus', 'keydown'] as const,
};

export type AlignmentPickerEvents = GroupedEvents<typeof alignmentPickerEvents>;
export type AlignmentPickerComponentEvents =
	MeltComponentEvents<AlignmentPickerEvents>;
