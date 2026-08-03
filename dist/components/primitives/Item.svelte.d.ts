import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        [x: string]: any;
        selected?: boolean | undefined;
        disabled?: boolean | undefined;
        class?: string | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        media: {};
        content: {};
        default: {};
        actions: {};
    };
};
export type ItemProps = typeof __propDef.props;
export type ItemEvents = typeof __propDef.events;
export type ItemSlots = typeof __propDef.slots;
export default class Item extends SvelteComponentTyped<ItemProps, ItemEvents, ItemSlots> {
}
export {};
