import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        [x: string]: any;
        class?: string | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export type AlertDialogContentProps = typeof __propDef.props;
export type AlertDialogContentEvents = typeof __propDef.events;
export type AlertDialogContentSlots = typeof __propDef.slots;
export default class AlertDialogContent extends SvelteComponentTyped<AlertDialogContentProps, AlertDialogContentEvents, AlertDialogContentSlots> {
}
export {};
