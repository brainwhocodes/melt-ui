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
export type NavigationMenuContentProps = typeof __propDef.props;
export type NavigationMenuContentEvents = typeof __propDef.events;
export type NavigationMenuContentSlots = typeof __propDef.slots;
export default class NavigationMenuContent extends SvelteComponentTyped<NavigationMenuContentProps, NavigationMenuContentEvents, NavigationMenuContentSlots> {
}
export {};
