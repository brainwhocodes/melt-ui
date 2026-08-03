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
export type CardDescriptionProps = typeof __propDef.props;
export type CardDescriptionEvents = typeof __propDef.events;
export type CardDescriptionSlots = typeof __propDef.slots;
export default class CardDescription extends SvelteComponentTyped<CardDescriptionProps, CardDescriptionEvents, CardDescriptionSlots> {
}
export {};
