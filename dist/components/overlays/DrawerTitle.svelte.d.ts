import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        [x: string]: any;
        id?: string | undefined;
        class?: string | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export type DrawerTitleProps = typeof __propDef.props;
export type DrawerTitleEvents = typeof __propDef.events;
export type DrawerTitleSlots = typeof __propDef.slots;
export default class DrawerTitle extends SvelteComponentTyped<DrawerTitleProps, DrawerTitleEvents, DrawerTitleSlots> {
}
export {};
