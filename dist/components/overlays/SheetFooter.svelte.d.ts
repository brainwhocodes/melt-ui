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
export type SheetFooterProps = typeof __propDef.props;
export type SheetFooterEvents = typeof __propDef.events;
export type SheetFooterSlots = typeof __propDef.slots;
export default class SheetFooter extends SvelteComponentTyped<SheetFooterProps, SheetFooterEvents, SheetFooterSlots> {
}
export {};
