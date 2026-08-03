import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        [x: string]: any;
        value: string;
        class?: string | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export type NavigationMenuItemProps = typeof __propDef.props;
export type NavigationMenuItemEvents = typeof __propDef.events;
export type NavigationMenuItemSlots = typeof __propDef.slots;
export default class NavigationMenuItem extends SvelteComponentTyped<NavigationMenuItemProps, NavigationMenuItemEvents, NavigationMenuItemSlots> {
}
export {};
