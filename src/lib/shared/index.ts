/**
 * When types or functions are shared between multiple builders
 * with the expectation that they will be exported for users to
 * use, they should be exported from this file to prevent conflicts
 * with other builders that may export the same types or functions.
 */
import type {
	EditableSegmentPart,
	SegmentPart,
} from '$lib/builders/date-field/_internal/types.js';
import type { InteractOutsideEvent } from '$lib/internal/actions/index.js';
import type {
	DateRange,
	Granularity,
	Matcher,
	Month,
} from '$lib/internal/helpers/date/index.js';
import type { FocusProp, FocusTarget } from '$lib/internal/helpers/index.js';

export type {
	DateRange,
	EditableSegmentPart,
	FocusProp,
	FocusTarget,
	Granularity,
	InteractOutsideEvent,
	Matcher,
	Month,
	SegmentPart,
};
