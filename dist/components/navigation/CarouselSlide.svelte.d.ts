import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        [x: string]: any;
        class?: string | undefined;
        index: number;
        label?: string | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {
            active: boolean;
        };
    };
};
export type CarouselSlideProps = typeof __propDef.props;
export type CarouselSlideEvents = typeof __propDef.events;
export type CarouselSlideSlots = typeof __propDef.slots;
export default class CarouselSlide extends SvelteComponentTyped<CarouselSlideProps, CarouselSlideEvents, CarouselSlideSlots> {
}
export {};
