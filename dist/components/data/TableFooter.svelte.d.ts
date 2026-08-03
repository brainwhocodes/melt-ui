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
export type TableFooterProps = typeof __propDef.props;
export type TableFooterEvents = typeof __propDef.events;
export type TableFooterSlots = typeof __propDef.slots;
export default class TableFooter extends SvelteComponentTyped<TableFooterProps, TableFooterEvents, TableFooterSlots> {
}
export {};
