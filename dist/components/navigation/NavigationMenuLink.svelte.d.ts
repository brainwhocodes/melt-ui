import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        [x: string]: any;
        href: string;
        active?: boolean | undefined;
        target?: string | undefined | undefined;
        rel?: string | undefined | undefined;
        class?: string | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export type NavigationMenuLinkProps = typeof __propDef.props;
export type NavigationMenuLinkEvents = typeof __propDef.events;
export type NavigationMenuLinkSlots = typeof __propDef.slots;
export default class NavigationMenuLink extends SvelteComponentTyped<NavigationMenuLinkProps, NavigationMenuLinkEvents, NavigationMenuLinkSlots> {
}
export {};
