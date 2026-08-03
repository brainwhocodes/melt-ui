import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        [x: string]: any;
        class?: string | undefined;
        count?: number | undefined | undefined;
        disabled?: boolean | undefined;
        label?: string | undefined;
        getLabel?: ((index: number) => string) | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {
            index: number;
            active: boolean;
        };
    };
};
export type CarouselDotsProps = typeof __propDef.props;
export type CarouselDotsEvents = typeof __propDef.events;
export type CarouselDotsSlots = typeof __propDef.slots;
export default class CarouselDots extends SvelteComponentTyped<CarouselDotsProps, CarouselDotsEvents, CarouselDotsSlots> {
}
export {};
