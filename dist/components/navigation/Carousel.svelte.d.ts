import { SvelteComponentTyped } from "svelte";
import type { Action } from 'svelte/action';
import type { Writable } from 'svelte/store';
export type CarouselOrientation = 'horizontal' | 'vertical';
export interface CarouselContext {
    activeIndex: Writable<number>;
    orientation: Writable<CarouselOrientation>;
    indices: Writable<number[]>;
    attachViewport: Action<HTMLElement>;
    attachSlide: (node: HTMLElement, index: number) => {
        destroy: () => void;
    };
    registerSlide: (index: number) => () => void;
    scrollTo: (index: number) => void;
    goBy: (amount: number) => void;
    handleKeydown: (event: KeyboardEvent) => void;
    canGoPrevious: (index: number, indices: number[]) => boolean;
    canGoNext: (index: number, indices: number[]) => boolean;
}
export declare function getCarouselContext(): CarouselContext;
declare const __propDef: {
    props: {
        [x: string]: any;
        class?: string | undefined;
        activeIndex?: number | undefined;
        orientation?: CarouselOrientation | undefined;
        loop?: boolean | undefined;
        autoplayInterval?: number | undefined;
        pauseOnHover?: boolean | undefined;
        pauseOnFocus?: boolean | undefined;
        label?: string | undefined;
        scrollTo?: ((index: number) => void) | undefined;
    };
    events: {
        change: CustomEvent<{
            activeIndex: number;
        }>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {
            activeIndex: number;
            scrollTo: (index: number) => void;
        };
    };
};
export type CarouselProps = typeof __propDef.props;
export type CarouselEvents = typeof __propDef.events;
export type CarouselSlots = typeof __propDef.slots;
export default class Carousel extends SvelteComponentTyped<CarouselProps, CarouselEvents, CarouselSlots> {
    get scrollTo(): (index: number) => void;
}
export {};
