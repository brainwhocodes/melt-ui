import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        [x: string]: any;
        as?: ("small" | "div" | "em" | "p" | "span" | "strong") | undefined;
        variant?: ("small" | "body" | "lead" | "muted") | undefined;
        weight?: ("bold" | "medium" | "regular" | "semibold") | undefined;
        class?: string | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export type TextProps = typeof __propDef.props;
export type TextEvents = typeof __propDef.events;
export type TextSlots = typeof __propDef.slots;
export default class Text extends SvelteComponentTyped<TextProps, TextEvents, TextSlots> {
}
export {};
