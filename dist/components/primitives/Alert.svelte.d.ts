import { SvelteComponentTyped } from "svelte";
export type AlertVariant = 'neutral' | 'info' | 'success' | 'warning' | 'danger';
declare const __propDef: {
    props: {
        [x: string]: any;
        variant?: AlertVariant | undefined;
        class?: string | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        title: {};
        content: {};
        default: {};
    };
};
export type AlertProps = typeof __propDef.props;
export type AlertEvents = typeof __propDef.events;
export type AlertSlots = typeof __propDef.slots;
export default class Alert extends SvelteComponentTyped<AlertProps, AlertEvents, AlertSlots> {
}
export {};
