import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        [x: string]: any;
        type?: "button" | "submit" | "reset" | undefined;
        disabled?: boolean | undefined;
        class?: string | undefined;
    };
    events: {
        cancel: CustomEvent<{
            originalEvent: MouseEvent;
        }>;
        click: CustomEvent<{
            originalEvent: MouseEvent;
        }>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export type AlertDialogCancelProps = typeof __propDef.props;
export type AlertDialogCancelEvents = typeof __propDef.events;
export type AlertDialogCancelSlots = typeof __propDef.slots;
export default class AlertDialogCancel extends SvelteComponentTyped<AlertDialogCancelProps, AlertDialogCancelEvents, AlertDialogCancelSlots> {
}
export {};
