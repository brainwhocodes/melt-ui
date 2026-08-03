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
export type SheetHeaderProps = typeof __propDef.props;
export type SheetHeaderEvents = typeof __propDef.events;
export type SheetHeaderSlots = typeof __propDef.slots;
export default class SheetHeader extends SvelteComponentTyped<SheetHeaderProps, SheetHeaderEvents, SheetHeaderSlots> {
}
export {};
