/** @typedef {typeof __propDef.props}  ListTestProps */
/** @typedef {typeof __propDef.events}  ListTestEvents */
/** @typedef {typeof __propDef.slots}  ListTestSlots */
export default class ListTest extends SvelteComponentTyped<{
    [x: string]: never;
}, {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type ListTestProps = typeof __propDef.props;
export type ListTestEvents = typeof __propDef.events;
export type ListTestSlots = typeof __propDef.slots;
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
