import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        [x: string]: any;
        compact?: boolean | undefined;
        class?: string | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        icon: {};
        title: {};
        description: {};
        default: {};
        action: {};
    };
};
export type EmptyProps = typeof __propDef.props;
export type EmptyEvents = typeof __propDef.events;
export type EmptySlots = typeof __propDef.slots;
export default class Empty extends SvelteComponentTyped<EmptyProps, EmptyEvents, EmptySlots> {
}
export {};
