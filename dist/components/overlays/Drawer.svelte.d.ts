import { SvelteComponentTyped } from "svelte";
import { type DrawerDirection, type OverlayCloseReason, type OverlayOpenChange } from './overlay.js';
declare const __propDef: {
    props: {
        [x: string]: any;
        open?: boolean | undefined;
        direction?: DrawerDirection | undefined;
        dismissThreshold?: number | undefined;
        snapPoints?: number[] | undefined;
        activeSnapPoint?: number | undefined;
        closeOnEscape?: boolean | undefined;
        closeOnBackdrop?: boolean | undefined;
        onOpenChange?: OverlayOpenChange | undefined;
        onSnapPointChange?: ((value: number) => void) | undefined | undefined;
        class?: string | undefined;
    };
    events: {
        openChange: CustomEvent<{
            open: boolean;
            reason: OverlayCloseReason;
        }>;
        dismiss: CustomEvent<{
            reason: OverlayCloseReason;
        }>;
        snapPointChange: CustomEvent<{
            value: number;
        }>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {
            close: (reason?: OverlayCloseReason) => void;
        };
    };
};
export type DrawerProps = typeof __propDef.props;
export type DrawerEvents = typeof __propDef.events;
export type DrawerSlots = typeof __propDef.slots;
export default class Drawer extends SvelteComponentTyped<DrawerProps, DrawerEvents, DrawerSlots> {
}
export {};
