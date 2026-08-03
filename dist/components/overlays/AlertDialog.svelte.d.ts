import { SvelteComponentTyped } from "svelte";
import { type OverlayCloseReason, type OverlayOpenChange } from './overlay.js';
declare const __propDef: {
    props: {
        [x: string]: any;
        open?: boolean | undefined;
        closeOnEscape?: boolean | undefined;
        closeOnBackdrop?: boolean | undefined;
        onOpenChange?: OverlayOpenChange | undefined;
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
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {
            close: (reason?: OverlayCloseReason) => void;
        };
    };
};
export type AlertDialogProps = typeof __propDef.props;
export type AlertDialogEvents = typeof __propDef.events;
export type AlertDialogSlots = typeof __propDef.slots;
export default class AlertDialog extends SvelteComponentTyped<AlertDialogProps, AlertDialogEvents, AlertDialogSlots> {
}
export {};
