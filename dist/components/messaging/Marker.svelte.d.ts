import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        [x: string]: any;
        label: string;
        class?: string | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export type MarkerProps = typeof __propDef.props;
export type MarkerEvents = typeof __propDef.events;
export type MarkerSlots = typeof __propDef.slots;
export default class Marker extends SvelteComponentTyped<MarkerProps, MarkerEvents, MarkerSlots> {
}
export {};
