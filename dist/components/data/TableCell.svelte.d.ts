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
export type TableCellProps = typeof __propDef.props;
export type TableCellEvents = typeof __propDef.events;
export type TableCellSlots = typeof __propDef.slots;
export default class TableCell extends SvelteComponentTyped<TableCellProps, TableCellEvents, TableCellSlots> {
}
export {};
