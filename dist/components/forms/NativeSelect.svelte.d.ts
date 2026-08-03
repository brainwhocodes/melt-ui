import { SvelteComponentTyped } from "svelte";
import type { HTMLSelectAttributes } from 'svelte/elements';
declare const __propDef: {
    props: HTMLSelectAttributes & {
        class?: string;
        invalid?: boolean;
    };
    events: {
        input: InputEvent;
        change: Event;
        focus: FocusEvent;
        blur: FocusEvent;
        keydown: KeyboardEvent;
        keyup: KeyboardEvent;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export type NativeSelectProps = typeof __propDef.props;
export type NativeSelectEvents = typeof __propDef.events;
export type NativeSelectSlots = typeof __propDef.slots;
export default class NativeSelect extends SvelteComponentTyped<NativeSelectProps, NativeSelectEvents, NativeSelectSlots> {
}
export {};
