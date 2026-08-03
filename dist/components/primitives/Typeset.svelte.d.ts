import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        [x: string]: any;
        density?: "comfortable" | "compact" | undefined;
        class?: string | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export type TypesetProps = typeof __propDef.props;
export type TypesetEvents = typeof __propDef.events;
export type TypesetSlots = typeof __propDef.slots;
export default class Typeset extends SvelteComponentTyped<TypesetProps, TypesetEvents, TypesetSlots> {
}
export {};
