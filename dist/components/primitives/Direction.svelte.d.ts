import { SvelteComponentTyped } from "svelte";
export type DirectionValue = 'auto' | 'ltr' | 'rtl';
declare const __propDef: {
    props: {
        [x: string]: any;
        dir?: DirectionValue | undefined;
        class?: string | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export type DirectionProps = typeof __propDef.props;
export type DirectionEvents = typeof __propDef.events;
export type DirectionSlots = typeof __propDef.slots;
export default class Direction extends SvelteComponentTyped<DirectionProps, DirectionEvents, DirectionSlots> {
}
export {};
