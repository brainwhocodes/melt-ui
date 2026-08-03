import { type InteractOutsideEvent } from '../../internal/actions/index.js';
import type { MeltActionReturn } from '../../internal/types.js';
import type { PopoverEvents } from './events.js';
import type { CreatePopoverProps } from './types.js';
export declare const popoverIdParts: readonly ["trigger", "content"];
export type PopoverIdParts = typeof popoverIdParts;
export declare function createPopover(args?: CreatePopoverProps): {
    ids: import("../../internal/helpers/index.js").ToWritableStores<{
        content: string;
        trigger: string;
    }>;
    elements: {
        trigger: import("../../internal/helpers/index.js").MeltElement<[{
            update: (updater: import("svelte/store").Updater<boolean>, sideEffect?: ((newValue: boolean) => void) | undefined) => void;
            set: (this: void, value: boolean) => void;
            subscribe(this: void, run: import("svelte/store").Subscriber<boolean>, invalidate?: () => void): import("svelte/store").Unsubscriber;
            get: () => boolean;
            destroy?: () => void;
        }, import("../../internal/helpers/index.js").WithGet<import("svelte/store").Writable<string>>, import("../../internal/helpers/index.js").WithGet<import("svelte/store").Writable<string>>], (node: HTMLElement) => MeltActionReturn<PopoverEvents["trigger"]>, ([$open, $contentId, $triggerId]: [boolean, string, string]) => {
            readonly role: "button";
            readonly 'aria-haspopup': "dialog";
            readonly 'aria-expanded': "true" | "false";
            readonly 'data-state': "open" | "closed";
            readonly 'aria-controls': string;
            readonly id: string;
        }, string>;
        content: import("../../internal/helpers/index.js").MeltElement<[import("svelte/store").Readable<boolean>, {
            update: (updater: import("svelte/store").Updater<boolean>, sideEffect?: ((newValue: boolean) => void) | undefined) => void;
            set: (this: void, value: boolean) => void;
            subscribe(this: void, run: import("svelte/store").Subscriber<boolean>, invalidate?: () => void): import("svelte/store").Unsubscriber;
            get: () => boolean;
            destroy?: () => void;
        }, import("../../internal/helpers/index.js").WithGet<import("svelte/store").Writable<HTMLElement | null>>, import("../../internal/helpers/index.js").WithGet<import("svelte/store").Writable<string | HTMLElement | null>>, import("../../internal/helpers/index.js").WithGet<import("svelte/store").Writable<string>>], (node: HTMLElement) => {
            destroy(): void;
        }, ([$isVisible, $open, $activeTrigger, $portal, $contentId]: [boolean, boolean, HTMLElement | null, string | HTMLElement | null, string]) => {
            readonly hidden: true | undefined;
            readonly tabindex: -1;
            readonly style: string | undefined;
            readonly id: string;
            readonly 'data-state': "open" | "closed";
            readonly 'data-portal': "" | undefined;
        }, string>;
        arrow: import("../../internal/helpers/index.js").MeltElement<import("../../internal/helpers/index.js").WithGet<import("svelte/store").Writable<number>>, import("svelte/action").Action<any, any, Record<never, any>>, ($arrowSize: number) => {
            readonly 'data-arrow': true;
            readonly style: string;
        }, string>;
        close: import("../../internal/helpers/index.js").MeltElement<import("../../internal/helpers/store/types.js").Stores | undefined, (node: HTMLElement) => MeltActionReturn<PopoverEvents["close"]>, () => {
            readonly type: "button";
        }, string>;
        overlay: import("../../internal/helpers/index.js").MeltElement<[import("svelte/store").Readable<boolean>, {
            update: (updater: import("svelte/store").Updater<boolean>, sideEffect?: ((newValue: boolean) => void) | undefined) => void;
            set: (this: void, value: boolean) => void;
            subscribe(this: void, run: import("svelte/store").Subscriber<boolean>, invalidate?: () => void): import("svelte/store").Unsubscriber;
            get: () => boolean;
            destroy?: () => void;
        }], (node: HTMLElement) => {
            destroy(): void;
        }, ([$isVisible, $open]: [boolean, boolean]) => {
            readonly hidden: true | undefined;
            readonly tabindex: -1;
            readonly style: string;
            readonly 'aria-hidden': "true";
            readonly 'data-state': "open" | "closed";
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
        positioning: import("../../internal/actions/index.js").FloatingConfig | {
            placement: "bottom";
        };
        arrowSize: number;
        defaultOpen: boolean;
        open?: import("svelte/store").Writable<boolean>;
        onOpenChange: import("../../internal/helpers/index.js").ChangeFn<boolean>;
        disableFocusTrap: boolean;
        escapeBehavior: import("../../internal/actions/index.js").EscapeBehaviorType;
        closeOnOutsideClick: boolean;
        onOutsideClick: (event: InteractOutsideEvent) => void;
        preventTextSelectionOverflow: boolean;
        preventScroll: boolean;
        portal: string | HTMLElement | null;
        forceVisible: boolean;
        openFocus: import("../../internal/helpers/index.js").FocusProp;
        closeFocus: import("../../internal/helpers/index.js").FocusProp;
        ids?: Partial<import("../../internal/helpers/index.js").IdObj<PopoverIdParts>>;
    }, "open" | "ids">>;
};
