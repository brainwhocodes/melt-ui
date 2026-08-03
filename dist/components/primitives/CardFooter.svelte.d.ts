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
export type CardFooterProps = typeof __propDef.props;
export type CardFooterEvents = typeof __propDef.events;
export type CardFooterSlots = typeof __propDef.slots;
export default class CardFooter extends SvelteComponentTyped<CardFooterProps, CardFooterEvents, CardFooterSlots> {
}
export {};
