import { SvelteComponentTyped } from "svelte";
import type { HTMLAttributes } from 'svelte/elements';
declare const __propDef: {
    props: HTMLAttributes<HTMLDivElement> & {
        class?: string;
        invalid?: boolean;
        disabled?: boolean;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        prefix: {};
        default: {};
        suffix: {};
    };
};
export type InputGroupProps = typeof __propDef.props;
export type InputGroupEvents = typeof __propDef.events;
export type InputGroupSlots = typeof __propDef.slots;
export default class InputGroup extends SvelteComponentTyped<InputGroupProps, InputGroupEvents, InputGroupSlots> {
}
export {};
