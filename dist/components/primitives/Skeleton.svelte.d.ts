import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        [x: string]: any;
        shape?: ("circle" | "text" | "rectangle") | undefined;
        width?: (string | number) | undefined;
        height?: (string | number) | undefined;
        animated?: boolean | undefined;
        ariaHidden?: boolean | undefined;
        class?: string | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export type SkeletonProps = typeof __propDef.props;
export type SkeletonEvents = typeof __propDef.events;
export type SkeletonSlots = typeof __propDef.slots;
export default class Skeleton extends SvelteComponentTyped<SkeletonProps, SkeletonEvents, SkeletonSlots> {
}
export {};
