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
export type NavigationMenuViewportProps = typeof __propDef.props;
export type NavigationMenuViewportEvents = typeof __propDef.events;
export type NavigationMenuViewportSlots = typeof __propDef.slots;
export default class NavigationMenuViewport extends SvelteComponentTyped<NavigationMenuViewportProps, NavigationMenuViewportEvents, NavigationMenuViewportSlots> {
}
export {};
