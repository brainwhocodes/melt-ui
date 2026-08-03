import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        [x: string]: any;
        type?: "button" | "submit" | "reset" | undefined;
        disabled?: boolean | undefined;
        ariaLabel?: string | undefined;
        class?: string | undefined;
    };
    events: {
        close: CustomEvent<{
            originalEvent: MouseEvent;
        }>;
        click: CustomEvent<{
            originalEvent: MouseEvent;
        }>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export type SheetCloseProps = typeof __propDef.props;
export type SheetCloseEvents = typeof __propDef.events;
export type SheetCloseSlots = typeof __propDef.slots;
export default class SheetClose extends SvelteComponentTyped<SheetCloseProps, SheetCloseEvents, SheetCloseSlots> {
}
export {};
