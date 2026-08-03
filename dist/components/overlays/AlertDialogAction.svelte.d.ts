import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        [x: string]: any;
        type?: "button" | "submit" | "reset" | undefined;
        disabled?: boolean | undefined;
        class?: string | undefined;
    };
    events: {
        action: CustomEvent<{
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
export type AlertDialogActionProps = typeof __propDef.props;
export type AlertDialogActionEvents = typeof __propDef.events;
export type AlertDialogActionSlots = typeof __propDef.slots;
export default class AlertDialogAction extends SvelteComponentTyped<AlertDialogActionProps, AlertDialogActionEvents, AlertDialogActionSlots> {
}
export {};
