import type { MeltActionReturn } from '../../internal/types.js';
import type { CollapsibleEvents } from './events.js';
import type { CreateCollapsibleProps } from './types.js';
export declare function createCollapsible(props?: CreateCollapsibleProps): {
    elements: {
        root: import("../../internal/helpers/index.js").MeltElement<[{
            update: (updater: import("svelte/store").Updater<boolean>, sideEffect?: ((newValue: boolean) => void) | undefined) => void;
            set: (this: void, value: boolean) => void;
            subscribe(this: void, run: import("svelte/store").Subscriber<boolean>, invalidate?: () => void): import("svelte/store").Unsubscriber;
            get: () => boolean;
            destroy?: () => void;
        }, import("../../internal/helpers/index.js").WithGet<import("svelte/store").Writable<boolean>>], import("svelte/action").Action<any, any, Record<never, any>>, ([$open, $disabled]: [boolean, boolean]) => {
            readonly 'data-state': "open" | "closed";
            readonly 'data-disabled': true | undefined;
        }, string>;
        trigger: import("../../internal/helpers/index.js").MeltElement<[{
            update: (updater: import("svelte/store").Updater<boolean>, sideEffect?: ((newValue: boolean) => void) | undefined) => void;
            set: (this: void, value: boolean) => void;
            subscribe(this: void, run: import("svelte/store").Subscriber<boolean>, invalidate?: () => void): import("svelte/store").Unsubscriber;
            get: () => boolean;
            destroy?: () => void;
        }, import("../../internal/helpers/index.js").WithGet<import("svelte/store").Writable<boolean>>], (node: HTMLElement) => MeltActionReturn<CollapsibleEvents["trigger"]>, ([$open, $disabled]: [boolean, boolean]) => {
            readonly 'data-state': "open" | "closed";
            readonly 'data-disabled': true | undefined;
            readonly disabled: true | undefined;
        }, string>;
        content: import("../../internal/helpers/index.js").MeltElement<[import("svelte/store").Readable<boolean>, {
            update: (updater: import("svelte/store").Updater<boolean>, sideEffect?: ((newValue: boolean) => void) | undefined) => void;
            set: (this: void, value: boolean) => void;
            subscribe(this: void, run: import("svelte/store").Subscriber<boolean>, invalidate?: () => void): import("svelte/store").Unsubscriber;
            get: () => boolean;
            destroy?: () => void;
        }, import("../../internal/helpers/index.js").WithGet<import("svelte/store").Writable<boolean>>], import("svelte/action").Action<any, any, Record<never, any>>, ([$isVisible, $open, $disabled]: [boolean, boolean, boolean]) => {
            readonly 'data-state': "open" | "closed";
            readonly 'data-disabled': true | undefined;
            readonly hidden: true | undefined;
            readonly style: string | undefined;
        }, string>;
    };
    states: {
        open: {
            update: (updater: import("svelte/store").Updater<boolean>, sideEffect?: ((newValue: boolean) => void) | undefined) => void;
            set: (this: void, value: boolean) => void;
            subscribe(this: void, run: import("svelte/store").Subscriber<boolean>, invalidate?: () => void): import("svelte/store").Unsubscriber;
            get: () => boolean;
            destroy?: () => void;
        };
    };
    options: import("../../internal/helpers/index.js").ToWritableStores<Omit<{
        disabled: boolean;
        forceVisible: boolean;
        defaultOpen: boolean;
        open?: import("svelte/store").Writable<boolean>;
        onOpenChange?: import("../../internal/helpers/index.js").ChangeFn<boolean>;
    }, "open" | "defaultOpen" | "onOpenChange">>;
};
