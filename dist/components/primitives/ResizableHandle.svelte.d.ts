import { SvelteComponentTyped } from "svelte";
import { type ResizableResizeDetail } from './resizable-context.js';
declare const __propDef: {
    props: {
        [x: string]: any;
        disabled?: boolean | undefined;
        keyboardStep?: number | undefined;
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
export type ResizableHandleProps = typeof __propDef.props;
export type ResizableHandleEvents = typeof __propDef.events;
export type ResizableHandleSlots = typeof __propDef.slots;
export default class ResizableHandle extends SvelteComponentTyped<ResizableHandleProps, ResizableHandleEvents, ResizableHandleSlots> {
}
export {};
