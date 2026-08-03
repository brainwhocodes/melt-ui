import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        [x: string]: any;
        size?: (string | number) | undefined;
        label?: string | undefined;
        class?: string | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type SpinnerProps = typeof __propDef.props;
export type SpinnerEvents = typeof __propDef.events;
export type SpinnerSlots = typeof __propDef.slots;
export default class Spinner extends SvelteComponentTyped<SpinnerProps, SpinnerEvents, SpinnerSlots> {
}
export {};
