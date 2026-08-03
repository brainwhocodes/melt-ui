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
export type DrawerDescriptionProps = typeof __propDef.props;
export type DrawerDescriptionEvents = typeof __propDef.events;
export type DrawerDescriptionSlots = typeof __propDef.slots;
export default class DrawerDescription extends SvelteComponentTyped<DrawerDescriptionProps, DrawerDescriptionEvents, DrawerDescriptionSlots> {
}
export {};
