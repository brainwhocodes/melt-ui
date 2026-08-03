import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        [x: string]: any;
        ariaLabel?: string | undefined;
        class?: string | undefined;
    };
    events: {
        snapPointChange: CustomEvent<{
            value: number;
        }>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export type DrawerHandleProps = typeof __propDef.props;
export type DrawerHandleEvents = typeof __propDef.events;
export type DrawerHandleSlots = typeof __propDef.slots;
export default class DrawerHandle extends SvelteComponentTyped<DrawerHandleProps, DrawerHandleEvents, DrawerHandleSlots> {
}
export {};
