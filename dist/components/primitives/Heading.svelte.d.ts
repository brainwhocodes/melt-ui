import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        [x: string]: any;
        level?: (1 | 2 | 3 | 4 | 5 | 6) | undefined;
        size?: ("display" | "sm" | "lg" | "xl" | "md" | "xs") | undefined;
        class?: string | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export type HeadingProps = typeof __propDef.props;
export type HeadingEvents = typeof __propDef.events;
export type HeadingSlots = typeof __propDef.slots;
export default class Heading extends SvelteComponentTyped<HeadingProps, HeadingEvents, HeadingSlots> {
}
export {};
