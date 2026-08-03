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
export type AlertDialogTitleProps = typeof __propDef.props;
export type AlertDialogTitleEvents = typeof __propDef.events;
export type AlertDialogTitleSlots = typeof __propDef.slots;
export default class AlertDialogTitle extends SvelteComponentTyped<AlertDialogTitleProps, AlertDialogTitleEvents, AlertDialogTitleSlots> {
}
export {};
