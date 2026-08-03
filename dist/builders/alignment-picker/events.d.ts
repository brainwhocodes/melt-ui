import type { GroupedEvents, MeltComponentEvents } from '../../internal/types.js';
export declare const alignmentPickerEvents: {
    item: readonly ["click", "focus", "keydown"];
};
export type AlignmentPickerEvents = GroupedEvents<typeof alignmentPickerEvents>;
export type AlignmentPickerComponentEvents = MeltComponentEvents<AlignmentPickerEvents>;
