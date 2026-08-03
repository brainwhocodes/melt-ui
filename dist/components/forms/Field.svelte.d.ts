import { SvelteComponentTyped } from "svelte";
import type { HTMLAttributes } from 'svelte/elements';
declare const __propDef: {
    props: HTMLAttributes<HTMLDivElement> & {
        class?: string;
        label?: string;
        description?: string;
        error?: string;
        required?: boolean;
        invalid?: boolean;
        disabled?: boolean;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        label: {};
        default: {};
        description: {};
        error: {};
    };
};
export type FieldProps = typeof __propDef.props;
export type FieldEvents = typeof __propDef.events;
export type FieldSlots = typeof __propDef.slots;
export default class Field extends SvelteComponentTyped<FieldProps, FieldEvents, FieldSlots> {
}
export {};
