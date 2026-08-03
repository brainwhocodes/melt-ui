import type { DateValue } from '@internationalized/date';
import type { CreateDateRangeFieldProps } from './types.js';
declare const rangeFieldIdParts: readonly ["field", "label", "description", "validation"];
export type DateRangeFieldIdParts = typeof rangeFieldIdParts;
export declare function createDateRangeField(props?: CreateDateRangeFieldProps): {
    elements: {
        field: import("../../internal/helpers/index.js").MeltElement<[import("svelte/store").Readable<DateValue | undefined>, import("svelte/store").Readable<boolean>, import("svelte/store").Readable<{
            field: string;
            label: string;
            description: string;
            validation: string;
        }>], (_node: HTMLElement) => {
            destroy(): void;
        }, ([$isCompleted, $isInvalid, $ids]: [DateValue | undefined, boolean, {
            field: string;
            label: string;
            description: string;
            validation: string;
        }]) => {
            readonly role: "group";
            readonly id: string;
            readonly 'aria-labelledby': string;
            readonly 'aria-describedby': string;
            readonly 'data-invalid': "" | undefined;
        }, string>;
        label: import("../../internal/helpers/index.js").MeltElement<[import("svelte/store").Readable<boolean>, import("../../internal/helpers/withGet.js").WithGet<import("svelte/store").Writable<boolean>>, import("../../internal/helpers/withGet.js").WithGet<import("svelte/store").Writable<string>>], (node: HTMLElement) => {
            destroy: () => void;
        }, ([$isInvalid, $disabled, $labelId]: [boolean, boolean, string]) => {
            readonly id: string;
            readonly 'data-invalid': "" | undefined;
            readonly 'data-disabled': "" | undefined;
        }, string>;
        startSegment: import("../../internal/helpers/index.js").MeltElement<[import("../../internal/helpers/withGet.js").WithGet<import("svelte/store").Writable<import("../date-field/_internal/types.js").SegmentValueObj>>, import("../../internal/helpers/withGet.js").WithGet<import("svelte/store").Readable<12 | 24>>, {
            get: () => DateValue;
            set: (this: void, value: DateValue) => void;
            update: (this: void, updater: import("svelte/store").Updater<DateValue>) => void;
            subscribe: (this: void, run: import("svelte/store").Subscriber<DateValue>, invalidate?: () => void) => import("svelte/store").Unsubscriber;
            add: (duration: import("@internationalized/date").DateTimeDuration | import("@internationalized/date").DateDuration) => void;
            subtract: (duration: import("@internationalized/date").DateTimeDuration | import("@internationalized/date").DateDuration) => void;
            setDate: (fields: import("@internationalized/date").DateFields | (import("@internationalized/date").DateFields & import("@internationalized/date").TimeFields), disambiguation?: import("@internationalized/date").Disambiguation | undefined) => void;
            reset: () => void;
            toWritable: () => {
                set: (this: void, value: DateValue) => void;
                subscribe: (this: void, run: import("svelte/store").Subscriber<DateValue>, invalidate?: () => void) => import("svelte/store").Unsubscriber;
                update: (this: void, updater: import("svelte/store").Updater<DateValue>) => void;
                get: () => DateValue;
            };
            nextPage: (amount: number) => void;
            prevPage: (amount: number) => void;
        }, {
            update: (updater: import("svelte/store").Updater<DateValue | undefined>, sideEffect?: ((newValue: DateValue | undefined) => void) | undefined) => void;
            set: (this: void, value: DateValue | undefined) => void;
            subscribe(this: void, run: import("svelte/store").Subscriber<DateValue | undefined>, invalidate?: () => void): import("svelte/store").Unsubscriber;
            get: () => DateValue | undefined;
            destroy?: () => void;
        }, import("svelte/store").Readable<boolean>, import("../../internal/helpers/withGet.js").WithGet<import("svelte/store").Writable<boolean>>, import("../../internal/helpers/withGet.js").WithGet<import("svelte/store").Writable<boolean>>, import("../../internal/helpers/withGet.js").WithGet<import("svelte/store").Readable<Set<import("../../index.js").SegmentPart>>>, import("svelte/store").Readable<{
            field: string;
            label: string;
            description: string;
            validation: string;
            day: string;
            month: string;
            year: string;
            hour: string;
            minute: string;
            second: string;
            dayPeriod: string;
            timeZoneName: string;
        }>, import("../../internal/helpers/withGet.js").WithGet<import("svelte/store").Writable<ParentNode | undefined>>], (node: HTMLElement) => import("../../internal/types.js").MeltActionReturn<import("../date-field/events.js").DateFieldEvents["segment"]>, ([$segmentValues, $hourCycle, $placeholder, $value, $isInvalid, $disabled, $readonly, $readonlySegmentsSet, $idValues, $rootElement,]: [import("../date-field/_internal/types.js").SegmentValueObj, 12 | 24, DateValue, DateValue | undefined, boolean, boolean, boolean, Set<import("../../index.js").SegmentPart>, {
            field: string;
            label: string;
            description: string;
            validation: string;
            day: string;
            month: string;
            year: string;
            hour: string;
            minute: string;
            second: string;
            dayPeriod: string;
            timeZoneName: string;
        }, ParentNode | undefined]) => (part: import("../../index.js").SegmentPart) => {
            readonly 'aria-invalid': "true" | undefined;
            readonly 'aria-disabled': "true" | undefined;
            readonly 'aria-readonly': "true" | undefined;
            readonly 'data-invalid': "" | undefined;
            readonly 'data-disabled': "" | undefined;
            readonly 'data-segment': import("../../index.js").SegmentPart;
        } | {
            readonly id: string;
            readonly 'aria-labelledby': string;
            readonly contenteditable: boolean;
            readonly 'aria-describedby': string | undefined;
            readonly tabindex: 0 | undefined;
            readonly 'aria-invalid': "true" | undefined;
            readonly 'aria-disabled': "true" | undefined;
            readonly 'aria-readonly': "true" | undefined;
            readonly 'data-invalid': "" | undefined;
            readonly 'data-disabled': "" | undefined;
            readonly 'data-segment': import("../../index.js").SegmentPart;
        }, string>;
        endSegment: import("../../internal/helpers/index.js").MeltElement<[import("../../internal/helpers/withGet.js").WithGet<import("svelte/store").Writable<import("../date-field/_internal/types.js").SegmentValueObj>>, import("../../internal/helpers/withGet.js").WithGet<import("svelte/store").Readable<12 | 24>>, {
            get: () => DateValue;
            set: (this: void, value: DateValue) => void;
            update: (this: void, updater: import("svelte/store").Updater<DateValue>) => void;
            subscribe: (this: void, run: import("svelte/store").Subscriber<DateValue>, invalidate?: () => void) => import("svelte/store").Unsubscriber;
            add: (duration: import("@internationalized/date").DateTimeDuration | import("@internationalized/date").DateDuration) => void;
            subtract: (duration: import("@internationalized/date").DateTimeDuration | import("@internationalized/date").DateDuration) => void;
            setDate: (fields: import("@internationalized/date").DateFields | (import("@internationalized/date").DateFields & import("@internationalized/date").TimeFields), disambiguation?: import("@internationalized/date").Disambiguation | undefined) => void;
            reset: () => void;
            toWritable: () => {
                set: (this: void, value: DateValue) => void;
                subscribe: (this: void, run: import("svelte/store").Subscriber<DateValue>, invalidate?: () => void) => import("svelte/store").Unsubscriber;
                update: (this: void, updater: import("svelte/store").Updater<DateValue>) => void;
                get: () => DateValue;
            };
            nextPage: (amount: number) => void;
            prevPage: (amount: number) => void;
        }, {
            update: (updater: import("svelte/store").Updater<DateValue | undefined>, sideEffect?: ((newValue: DateValue | undefined) => void) | undefined) => void;
            set: (this: void, value: DateValue | undefined) => void;
            subscribe(this: void, run: import("svelte/store").Subscriber<DateValue | undefined>, invalidate?: () => void): import("svelte/store").Unsubscriber;
            get: () => DateValue | undefined;
            destroy?: () => void;
        }, import("svelte/store").Readable<boolean>, import("../../internal/helpers/withGet.js").WithGet<import("svelte/store").Writable<boolean>>, import("../../internal/helpers/withGet.js").WithGet<import("svelte/store").Writable<boolean>>, import("../../internal/helpers/withGet.js").WithGet<import("svelte/store").Readable<Set<import("../../index.js").SegmentPart>>>, import("svelte/store").Readable<{
            field: string;
            label: string;
            description: string;
            validation: string;
            day: string;
            month: string;
            year: string;
            hour: string;
            minute: string;
            second: string;
            dayPeriod: string;
            timeZoneName: string;
        }>, import("../../internal/helpers/withGet.js").WithGet<import("svelte/store").Writable<ParentNode | undefined>>], (node: HTMLElement) => import("../../internal/types.js").MeltActionReturn<import("../date-field/events.js").DateFieldEvents["segment"]>, ([$segmentValues, $hourCycle, $placeholder, $value, $isInvalid, $disabled, $readonly, $readonlySegmentsSet, $idValues, $rootElement,]: [import("../date-field/_internal/types.js").SegmentValueObj, 12 | 24, DateValue, DateValue | undefined, boolean, boolean, boolean, Set<import("../../index.js").SegmentPart>, {
            field: string;
            label: string;
            description: string;
            validation: string;
            day: string;
            month: string;
            year: string;
            hour: string;
            minute: string;
            second: string;
            dayPeriod: string;
            timeZoneName: string;
        }, ParentNode | undefined]) => (part: import("../../index.js").SegmentPart) => {
            readonly 'aria-invalid': "true" | undefined;
            readonly 'aria-disabled': "true" | undefined;
            readonly 'aria-readonly': "true" | undefined;
            readonly 'data-invalid': "" | undefined;
            readonly 'data-disabled': "" | undefined;
            readonly 'data-segment': import("../../index.js").SegmentPart;
        } | {
            readonly id: string;
            readonly 'aria-labelledby': string;
            readonly contenteditable: boolean;
            readonly 'aria-describedby': string | undefined;
            readonly tabindex: 0 | undefined;
            readonly 'aria-invalid': "true" | undefined;
            readonly 'aria-disabled': "true" | undefined;
            readonly 'aria-readonly': "true" | undefined;
            readonly 'data-invalid': "" | undefined;
            readonly 'data-disabled': "" | undefined;
            readonly 'data-segment': import("../../index.js").SegmentPart;
        }, string>;
        startHiddenInput: import("../../internal/helpers/index.js").MeltElement<[import("../../internal/helpers/withGet.js").WithGet<import("svelte/store").Readable<string>>, import("svelte/store").Readable<string | undefined>, import("../../internal/helpers/withGet.js").WithGet<import("svelte/store").Readable<boolean>>, import("../../internal/helpers/withGet.js").WithGet<import("svelte/store").Readable<boolean>>, import("../../internal/helpers/withGet.js").WithGet<import("svelte/store").Readable<import("svelte/elements").HTMLInputTypeAttribute | null | undefined>>, import("../../internal/helpers/withGet.js").WithGet<import("svelte/store").Readable<boolean | undefined>>], (node: HTMLInputElement) => {
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
        endHiddenInput: import("../../internal/helpers/index.js").MeltElement<[import("../../internal/helpers/withGet.js").WithGet<import("svelte/store").Readable<string>>, import("svelte/store").Readable<string | undefined>, import("../../internal/helpers/withGet.js").WithGet<import("svelte/store").Readable<boolean>>, import("../../internal/helpers/withGet.js").WithGet<import("svelte/store").Readable<boolean>>, import("../../internal/helpers/withGet.js").WithGet<import("svelte/store").Readable<import("svelte/elements").HTMLInputTypeAttribute | null | undefined>>, import("../../internal/helpers/withGet.js").WithGet<import("svelte/store").Readable<boolean | undefined>>], (node: HTMLInputElement) => {
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
        validation: import("../../internal/helpers/index.js").MeltElement<[import("svelte/store").Readable<boolean>, import("../../internal/helpers/withGet.js").WithGet<import("svelte/store").Writable<string>>], import("svelte/action").Action<any, any, Record<never, any>>, ([$isInvalid, $validationId]: [boolean, string]) => {
            readonly id: string;
            readonly 'data-invalid': "" | undefined;
            readonly style: string | undefined;
        }, string>;
    };
    states: {
        value: {
            update: (updater: import("svelte/store").Updater<import("../../index.js").DateRange>, sideEffect?: ((newValue: import("../../index.js").DateRange) => void) | undefined) => void;
            set: (this: void, value: import("../../index.js").DateRange) => void;
            subscribe(this: void, run: import("svelte/store").Subscriber<import("../../index.js").DateRange>, invalidate?: () => void): import("svelte/store").Unsubscriber;
            get: () => import("../../index.js").DateRange;
            destroy?: () => void;
        };
        placeholder: {
            set: (this: void, value: DateValue) => void;
            subscribe: (this: void, run: import("svelte/store").Subscriber<DateValue>, invalidate?: () => void) => import("svelte/store").Unsubscriber;
            update: (this: void, updater: import("svelte/store").Updater<DateValue>) => void;
            get: () => DateValue;
        };
        segmentContents: import("svelte/store").Readable<{
            start: {
                part: import("../../index.js").SegmentPart;
                value: string;
            }[];
            end: {
                part: import("../../index.js").SegmentPart;
                value: string;
            }[];
        }>;
        endSegmentValues: import("../../internal/helpers/withGet.js").WithGet<import("svelte/store").Writable<import("../date-field/_internal/types.js").SegmentValueObj>>;
        startSegmentValues: import("../../internal/helpers/withGet.js").WithGet<import("svelte/store").Writable<import("../date-field/_internal/types.js").SegmentValueObj>>;
        isInvalid: import("svelte/store").Readable<boolean>;
    };
    options: {
        endName: import("../../internal/helpers/withGet.js").WithGet<import("svelte/store").Writable<string | undefined>>;
        startName: import("../../internal/helpers/withGet.js").WithGet<import("svelte/store").Writable<string | undefined>>;
        disabled: import("../../internal/helpers/withGet.js").WithGet<import("svelte/store").Writable<boolean>>;
        onValueChange?: import("../../internal/helpers/withGet.js").WithGet<import("svelte/store").Writable<import("../../internal/helpers/index.js").ChangeFn<import("../../index.js").DateRange> | undefined>> | undefined;
        defaultValue: import("../../internal/helpers/withGet.js").WithGet<import("svelte/store").Writable<import("../../index.js").DateRange>>;
        ids?: import("../../internal/helpers/withGet.js").WithGet<import("svelte/store").Writable<Partial<{
            description: string;
            label: string;
            field: string;
            validation: string;
        }> | undefined>> | undefined;
        required?: import("../../internal/helpers/withGet.js").WithGet<import("svelte/store").Writable<boolean | undefined>> | undefined;
        locale: import("../../internal/helpers/withGet.js").WithGet<import("svelte/store").Writable<string>>;
        defaultPlaceholder?: import("../../internal/helpers/withGet.js").WithGet<import("svelte/store").Writable<DateValue | undefined>> | undefined;
        onPlaceholderChange?: import("../../internal/helpers/withGet.js").WithGet<import("svelte/store").Writable<import("../../internal/helpers/index.js").ChangeFn<DateValue> | undefined>> | undefined;
        isDateUnavailable: import("../../internal/helpers/withGet.js").WithGet<import("svelte/store").Writable<import("../../index.js").Matcher | undefined>>;
        minValue: import("../../internal/helpers/withGet.js").WithGet<import("svelte/store").Writable<DateValue | undefined>>;
        maxValue: import("../../internal/helpers/withGet.js").WithGet<import("svelte/store").Writable<DateValue | undefined>>;
        readonly: import("../../internal/helpers/withGet.js").WithGet<import("svelte/store").Writable<boolean>>;
        readonlySegments: import("../../internal/helpers/withGet.js").WithGet<import("svelte/store").Writable<{
            start: import("../../index.js").EditableSegmentPart[];
            end: import("../../index.js").EditableSegmentPart[];
        } | undefined>>;
        hourCycle: import("../../internal/helpers/withGet.js").WithGet<import("svelte/store").Writable<12 | 24 | undefined>>;
        granularity: import("../../internal/helpers/withGet.js").WithGet<import("svelte/store").Writable<import("../../index.js").Granularity | undefined>>;
        hideTimeZone: import("../../internal/helpers/withGet.js").WithGet<import("svelte/store").Writable<boolean>>;
        rootElement: import("../../internal/helpers/withGet.js").WithGet<import("svelte/store").Writable<ParentNode | undefined>>;
        startIds?: import("../../internal/helpers/withGet.js").WithGet<import("svelte/store").Writable<Partial<{
            description: string;
            label: string;
            month: string;
            day: string;
            hour: string;
            minute: string;
            second: string;
            year: string;
            dayPeriod: string;
            timeZoneName: string;
            field: string;
            validation: string;
        }> | undefined>> | undefined;
        endIds?: import("../../internal/helpers/withGet.js").WithGet<import("svelte/store").Writable<Partial<{
            description: string;
            label: string;
            month: string;
            day: string;
            hour: string;
            minute: string;
            second: string;
            year: string;
            dayPeriod: string;
            timeZoneName: string;
            field: string;
            validation: string;
        }> | undefined>> | undefined;
    };
    ids: {
        field: import("../../internal/helpers/index.js").ToWritableStores<{
            description: string;
            label: string;
            field: string;
            validation: string;
        }>;
        start: import("../../internal/helpers/index.js").ToWritableStores<{
            description: string;
            label: string;
            month: string;
            day: string;
            hour: string;
            minute: string;
            second: string;
            year: string;
            dayPeriod: string;
            timeZoneName: string;
            field: string;
            validation: string;
        }>;
        end: import("../../internal/helpers/index.js").ToWritableStores<{
            description: string;
            label: string;
            month: string;
            day: string;
            hour: string;
            minute: string;
            second: string;
            year: string;
            dayPeriod: string;
            timeZoneName: string;
            field: string;
            validation: string;
        }>;
    };
};
export {};
