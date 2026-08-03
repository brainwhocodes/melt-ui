import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        [x: string]: any;
        side?: "top" | "right" | "bottom" | "left" | undefined;
        class?: string | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export type SheetContentProps = typeof __propDef.props;
export type SheetContentEvents = typeof __propDef.events;
export type SheetContentSlots = typeof __propDef.slots;
export default class SheetContent extends SvelteComponentTyped<SheetContentProps, SheetContentEvents, SheetContentSlots> {
}
export {};
