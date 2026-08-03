import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        [x: string]: any;
        class?: string | undefined;
        label?: string | undefined;
        tabindex?: number | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export type CarouselViewportProps = typeof __propDef.props;
export type CarouselViewportEvents = typeof __propDef.events;
export type CarouselViewportSlots = typeof __propDef.slots;
export default class CarouselViewport extends SvelteComponentTyped<CarouselViewportProps, CarouselViewportEvents, CarouselViewportSlots> {
}
export {};
