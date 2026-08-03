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
export type CardContentProps = typeof __propDef.props;
export type CardContentEvents = typeof __propDef.events;
export type CardContentSlots = typeof __propDef.slots;
export default class CardContent extends SvelteComponentTyped<CardContentProps, CardContentEvents, CardContentSlots> {
}
export {};
