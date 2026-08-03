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
export type TableHeaderProps = typeof __propDef.props;
export type TableHeaderEvents = typeof __propDef.events;
export type TableHeaderSlots = typeof __propDef.slots;
export default class TableHeader extends SvelteComponentTyped<TableHeaderProps, TableHeaderEvents, TableHeaderSlots> {
}
export {};
