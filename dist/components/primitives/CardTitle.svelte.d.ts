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
export type CardTitleProps = typeof __propDef.props;
export type CardTitleEvents = typeof __propDef.events;
export type CardTitleSlots = typeof __propDef.slots;
export default class CardTitle extends SvelteComponentTyped<CardTitleProps, CardTitleEvents, CardTitleSlots> {
}
export {};
