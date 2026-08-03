import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        [x: string]: any;
        disabled?: boolean | undefined;
        type?: "button" | "submit" | "reset" | undefined;
        class?: string | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export type NavigationMenuTriggerProps = typeof __propDef.props;
export type NavigationMenuTriggerEvents = typeof __propDef.events;
export type NavigationMenuTriggerSlots = typeof __propDef.slots;
export default class NavigationMenuTrigger extends SvelteComponentTyped<NavigationMenuTriggerProps, NavigationMenuTriggerEvents, NavigationMenuTriggerSlots> {
}
export {};
