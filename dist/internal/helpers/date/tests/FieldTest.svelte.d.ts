/** @typedef {typeof __propDef.props}  FieldTestProps */
/** @typedef {typeof __propDef.events}  FieldTestEvents */
/** @typedef {typeof __propDef.slots}  FieldTestSlots */
export default class FieldTest extends SvelteComponentTyped<{
    [x: string]: never;
}, {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type FieldTestProps = typeof __propDef.props;
export type FieldTestEvents = typeof __propDef.events;
export type FieldTestSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        [x: string]: never;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export {};
