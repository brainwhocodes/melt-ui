import { SvelteComponentTyped } from "svelte";
import type { HTMLTextareaAttributes } from 'svelte/elements';
declare const __propDef: {
    props: HTMLTextareaAttributes & {
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
    slots: {};
};
export type TextareaProps = typeof __propDef.props;
export type TextareaEvents = typeof __propDef.events;
export type TextareaSlots = typeof __propDef.slots;
export default class Textarea extends SvelteComponentTyped<TextareaProps, TextareaEvents, TextareaSlots> {
}
export {};
