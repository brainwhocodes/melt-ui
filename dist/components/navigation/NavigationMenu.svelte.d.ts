import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        [x: string]: any;
        value?: string | undefined;
        delay?: number | undefined;
        label?: string | undefined;
        dir?: "ltr" | "rtl" | undefined;
        id?: string | undefined;
        class?: string | undefined;
    };
    events: {
        change: CustomEvent<{
            value: string;
        }>;
        open: CustomEvent<{
            value: string;
        }>;
        close: CustomEvent<{
            value: string;
        }>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
        viewport: {};
    };
};
export type NavigationMenuProps = typeof __propDef.props;
export type NavigationMenuEvents = typeof __propDef.events;
export type NavigationMenuSlots = typeof __propDef.slots;
export default class NavigationMenu extends SvelteComponentTyped<NavigationMenuProps, NavigationMenuEvents, NavigationMenuSlots> {
}
export {};
