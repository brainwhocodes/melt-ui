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
export type TableCaptionProps = typeof __propDef.props;
export type TableCaptionEvents = typeof __propDef.events;
export type TableCaptionSlots = typeof __propDef.slots;
export default class TableCaption extends SvelteComponentTyped<TableCaptionProps, TableCaptionEvents, TableCaptionSlots> {
}
export {};
