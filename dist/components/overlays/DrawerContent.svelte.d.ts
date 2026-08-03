import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        [x: string]: any;
        dragHandleOnly?: boolean | undefined;
        style?: string | undefined;
        class?: string | undefined;
    };
    events: {
        dragStart: CustomEvent<{
            originalEvent: PointerEvent;
        }>;
        drag: CustomEvent<{
            originalEvent: PointerEvent;
            offset: number;
            progress: number;
        }>;
        dragEnd: CustomEvent<{
            originalEvent: PointerEvent;
            snapPoint: number;
            dismissed: boolean;
        }>;
        dragCancel: CustomEvent<{
            originalEvent: PointerEvent;
        }>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export type DrawerContentProps = typeof __propDef.props;
export type DrawerContentEvents = typeof __propDef.events;
export type DrawerContentSlots = typeof __propDef.slots;
export default class DrawerContent extends SvelteComponentTyped<DrawerContentProps, DrawerContentEvents, DrawerContentSlots> {
}
export {};
