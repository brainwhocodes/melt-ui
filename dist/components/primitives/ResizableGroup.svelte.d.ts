import { SvelteComponentTyped } from "svelte";
import { type ResizableDirection, type ResizableDirectionality, type ResizableResizeDetail } from './resizable-context.js';
declare const __propDef: {
    props: {
        [x: string]: any;
        direction?: ResizableDirection | undefined;
        dir?: ResizableDirectionality | undefined;
        sizes?: number[] | undefined;
        disabled?: boolean | undefined;
        class?: string | undefined;
    };
    events: {
        resize: CustomEvent<ResizableResizeDetail>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export type ResizableGroupProps = typeof __propDef.props;
export type ResizableGroupEvents = typeof __propDef.events;
export type ResizableGroupSlots = typeof __propDef.slots;
export default class ResizableGroup extends SvelteComponentTyped<ResizableGroupProps, ResizableGroupEvents, ResizableGroupSlots> {
}
export {};
