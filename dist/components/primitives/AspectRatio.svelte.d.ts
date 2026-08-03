import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        [x: string]: any;
        ratio?: number | undefined;
        class?: string | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export type AspectRatioProps = typeof __propDef.props;
export type AspectRatioEvents = typeof __propDef.events;
export type AspectRatioSlots = typeof __propDef.slots;
export default class AspectRatio extends SvelteComponentTyped<AspectRatioProps, AspectRatioEvents, AspectRatioSlots> {
}
export {};
