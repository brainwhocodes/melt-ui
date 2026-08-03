import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        [x: string]: any;
        class?: string | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export type DrawerHeaderProps = typeof __propDef.props;
export type DrawerHeaderEvents = typeof __propDef.events;
export type DrawerHeaderSlots = typeof __propDef.slots;
export default class DrawerHeader extends SvelteComponentTyped<DrawerHeaderProps, DrawerHeaderEvents, DrawerHeaderSlots> {
}
export {};
