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
export type SheetTitleProps = typeof __propDef.props;
export type SheetTitleEvents = typeof __propDef.events;
export type SheetTitleSlots = typeof __propDef.slots;
export default class SheetTitle extends SvelteComponentTyped<SheetTitleProps, SheetTitleEvents, SheetTitleSlots> {
}
export {};
