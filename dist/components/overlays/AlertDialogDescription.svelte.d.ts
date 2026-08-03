import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        [x: string]: any;
        id?: string | undefined;
        class?: string | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export type AlertDialogDescriptionProps = typeof __propDef.props;
export type AlertDialogDescriptionEvents = typeof __propDef.events;
export type AlertDialogDescriptionSlots = typeof __propDef.slots;
export default class AlertDialogDescription extends SvelteComponentTyped<AlertDialogDescriptionProps, AlertDialogDescriptionEvents, AlertDialogDescriptionSlots> {
}
export {};
