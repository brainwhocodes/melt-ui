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
export type CarouselPreviousProps = typeof __propDef.props;
export type CarouselPreviousEvents = typeof __propDef.events;
export type CarouselPreviousSlots = typeof __propDef.slots;
export default class CarouselPrevious extends SvelteComponentTyped<CarouselPreviousProps, CarouselPreviousEvents, CarouselPreviousSlots> {
}
export {};
