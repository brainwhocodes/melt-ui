import type { MeltActionReturn } from '../../internal/types.js';
import type { AlignmentPickerEvents } from './events.js';
import type { AlignmentPickerItemProps, AlignmentPickerValue, CreateAlignmentPickerProps } from './types.js';
export declare function createAlignmentPicker(props?: CreateAlignmentPickerProps): {
    elements: {
        root: import("../../internal/helpers/index.js").MeltElement<[import("../../internal/helpers/index.js").WithGet<import("svelte/store").Writable<boolean>>, import("../../internal/helpers/index.js").WithGet<import("svelte/store").Writable<import("../../internal/types.js").TextDirection>>, {
            update: (updater: import("svelte/store").Updater<AlignmentPickerValue>, sideEffect?: ((newValue: AlignmentPickerValue) => void) | undefined) => void;
            set: (this: void, value: AlignmentPickerValue) => void;
            subscribe(this: void, run: import("svelte/store").Subscriber<AlignmentPickerValue>, invalidate?: () => void): import("svelte/store").Unsubscriber;
            get: () => AlignmentPickerValue;
            destroy?: () => void;
        }], import("svelte/action").Action<any, any, Record<never, any>>, ([$disabled, $dir, $value]: [boolean, import("../../internal/types.js").TextDirection, AlignmentPickerValue]) => {
            role: string;
            'aria-disabled': boolean | undefined;
            dir: import("../../internal/types.js").TextDirection;
            'data-disabled': boolean | undefined;
            'data-state': string;
            'data-value': AlignmentPickerValue;
        }, string>;
        item: import("../../internal/helpers/index.js").MeltElement<[import("../../internal/helpers/index.js").WithGet<import("svelte/store").Writable<boolean>>, {
            update: (updater: import("svelte/store").Updater<AlignmentPickerValue>, sideEffect?: ((newValue: AlignmentPickerValue) => void) | undefined) => void;
            set: (this: void, value: AlignmentPickerValue) => void;
            subscribe(this: void, run: import("svelte/store").Subscriber<AlignmentPickerValue>, invalidate?: () => void): import("svelte/store").Unsubscriber;
            get: () => AlignmentPickerValue;
            destroy?: () => void;
        }], (node: HTMLElement) => MeltActionReturn<AlignmentPickerEvents["item"]>, ([$disabled, $value]: [boolean, AlignmentPickerValue]) => (props: AlignmentPickerItemProps) => {
            readonly disabled: boolean;
            readonly type: "button";
            readonly role: "radio";
            readonly 'aria-checked': boolean;
            readonly 'aria-disabled': true | undefined;
            readonly tabindex: 0 | -1;
            readonly 'data-disabled': true | undefined;
            readonly 'data-state': "checked" | "unchecked";
            readonly 'data-value': AlignmentPickerValue;
            readonly 'data-row': number;
            readonly 'data-column': number;
        }, string>;
        hiddenInput: import("../../internal/helpers/index.js").MeltElement<[import("../../internal/helpers/index.js").WithGet<import("svelte/store").Readable<string>>, import("svelte/store").Readable<string | undefined>, import("../../internal/helpers/index.js").WithGet<import("svelte/store").Readable<boolean>>, import("../../internal/helpers/index.js").WithGet<import("svelte/store").Readable<boolean>>, import("../../internal/helpers/index.js").WithGet<import("svelte/store").Readable<import("svelte/elements").HTMLInputTypeAttribute | null | undefined>>, import("../../internal/helpers/index.js").WithGet<import("svelte/store").Readable<boolean | undefined>>], (node: HTMLInputElement) => {
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
    };
    states: {
        value: {
            update: (updater: import("svelte/store").Updater<AlignmentPickerValue>, sideEffect?: ((newValue: AlignmentPickerValue) => void) | undefined) => void;
            set: (this: void, value: AlignmentPickerValue) => void;
            subscribe(this: void, run: import("svelte/store").Subscriber<AlignmentPickerValue>, invalidate?: () => void): import("svelte/store").Unsubscriber;
            get: () => AlignmentPickerValue;
            destroy?: () => void;
        };
    };
    helpers: {
        isSelected: import("svelte/store").Readable<(itemValue: AlignmentPickerValue) => boolean>;
    };
    options: import("../../internal/helpers/index.js").ToWritableStores<Omit<{
        defaultValue: AlignmentPickerValue;
        value?: import("svelte/store").Writable<AlignmentPickerValue>;
        onValueChange?: import("../../internal/helpers/index.js").ChangeFn<AlignmentPickerValue>;
        disabled: boolean;
        loop: boolean;
        dir: import("../../internal/types.js").TextDirection;
        name: string;
    }, "value" | "onValueChange" | "defaultValue">>;
};
