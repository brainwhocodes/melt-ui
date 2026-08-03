/** @typedef {typeof __propDef.props}  DomTestProps */
/** @typedef {typeof __propDef.events}  DomTestEvents */
/** @typedef {typeof __propDef.slots}  DomTestSlots */
export default class DomTest extends SvelteComponentTyped<{
    [x: string]: never;
}, {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type DomTestProps = typeof __propDef.props;
export type DomTestEvents = typeof __propDef.events;
export type DomTestSlots = typeof __propDef.slots;
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
