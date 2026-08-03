import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        [x: string]: any;
        class?: string | undefined;
        disabled?: boolean | undefined;
        label?: string | undefined;
    };
    events: {
        click: CustomEvent<MouseEvent>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export type CarouselNextProps = typeof __propDef.props;
export type CarouselNextEvents = typeof __propDef.events;
export type CarouselNextSlots = typeof __propDef.slots;
export default class CarouselNext extends SvelteComponentTyped<CarouselNextProps, CarouselNextEvents, CarouselNextSlots> {
}
export {};
