import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        [x: string]: any;
        collapsed?: boolean | undefined;
        open?: boolean | undefined;
        compact?: boolean | undefined;
        label?: string | undefined;
        id?: string | undefined;
        class?: string | undefined;
    };
    events: {
        change: CustomEvent<{
            collapsed: boolean;
            open: boolean;
        }>;
        collapseChange: CustomEvent<{
            collapsed: boolean;
        }>;
        openChange: CustomEvent<{
            open: boolean;
        }>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        header: {};
        content: {};
        default: {};
        footer: {};
    };
};
export type SidebarProps = typeof __propDef.props;
export type SidebarEvents = typeof __propDef.events;
export type SidebarSlots = typeof __propDef.slots;
export default class Sidebar extends SvelteComponentTyped<SidebarProps, SidebarEvents, SidebarSlots> {
}
export {};
