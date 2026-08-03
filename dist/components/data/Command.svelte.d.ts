import { SvelteComponentTyped } from "svelte";
export interface CommandItem {
    value: string;
    label: string;
    description?: string;
    keywords?: string[];
    group?: string;
    disabled?: boolean;
}
export interface CommandGroup {
    id: string;
    label: string;
}
declare const __propDef: {
    props: {
        [x: string]: any;
        class?: string | undefined;
        id?: string | undefined | undefined;
        items?: CommandItem[] | undefined;
        groups?: CommandGroup[] | undefined;
        open?: boolean | undefined;
        value?: string | null | undefined;
        query?: string | undefined;
        activeIndex?: number | undefined;
        modal?: boolean | undefined;
        closeOnSelect?: boolean | undefined;
        label?: string | undefined;
        searchLabel?: string | undefined;
        emptyText?: string | undefined;
    };
    events: {
        openchange: CustomEvent<{
            open: boolean;
        }>;
        querychange: CustomEvent<{
            query: string;
        }>;
        activechange: CustomEvent<{
            activeIndex: number;
            item: CommandItem | null;
        }>;
        select: CustomEvent<{
            value: string;
            item: CommandItem;
        }>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        header: {};
        item: {
            item: CommandItem;
            active: boolean;
            selected: boolean;
        };
        empty: {};
        footer: {};
    };
};
export type CommandProps = typeof __propDef.props;
export type CommandEvents = typeof __propDef.events;
export type CommandSlots = typeof __propDef.slots;
export default class Command extends SvelteComponentTyped<CommandProps, CommandEvents, CommandSlots> {
}
export {};
