import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        [x: string]: any;
        defaultSize?: number | undefined | undefined;
        minSize?: number | undefined;
        maxSize?: number | undefined;
        disabled?: boolean | undefined;
        class?: string | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export type ResizablePanelProps = typeof __propDef.props;
export type ResizablePanelEvents = typeof __propDef.events;
export type ResizablePanelSlots = typeof __propDef.slots;
export default class ResizablePanel extends SvelteComponentTyped<ResizablePanelProps, ResizablePanelEvents, ResizablePanelSlots> {
}
export {};
