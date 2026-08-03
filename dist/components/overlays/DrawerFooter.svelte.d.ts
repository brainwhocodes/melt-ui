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
export type DrawerFooterProps = typeof __propDef.props;
export type DrawerFooterEvents = typeof __propDef.events;
export type DrawerFooterSlots = typeof __propDef.slots;
export default class DrawerFooter extends SvelteComponentTyped<DrawerFooterProps, DrawerFooterEvents, DrawerFooterSlots> {
}
export {};
