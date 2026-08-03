import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        [x: string]: any;
        variant?: ("incoming" | "outgoing" | "system") | undefined;
        class?: string | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export type BubbleProps = typeof __propDef.props;
export type BubbleEvents = typeof __propDef.events;
export type BubbleSlots = typeof __propDef.slots;
export default class Bubble extends SvelteComponentTyped<BubbleProps, BubbleEvents, BubbleSlots> {
}
export {};
