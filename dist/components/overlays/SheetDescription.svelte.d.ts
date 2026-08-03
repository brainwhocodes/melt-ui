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
export type SheetDescriptionProps = typeof __propDef.props;
export type SheetDescriptionEvents = typeof __propDef.events;
export type SheetDescriptionSlots = typeof __propDef.slots;
export default class SheetDescription extends SvelteComponentTyped<SheetDescriptionProps, SheetDescriptionEvents, SheetDescriptionSlots> {
}
export {};
