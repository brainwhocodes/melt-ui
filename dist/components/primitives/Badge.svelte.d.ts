import { SvelteComponentTyped } from "svelte";
export type BadgeVariant = 'neutral' | 'info' | 'success' | 'warning' | 'danger';
declare const __propDef: {
    props: {
        [x: string]: any;
        variant?: BadgeVariant | undefined;
        removable?: boolean | undefined;
        removeLabel?: string | undefined;
        disabled?: boolean | undefined;
        class?: string | undefined;
    };
    events: {
        remove: CustomEvent<void>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
        remove: {};
    };
};
export type BadgeProps = typeof __propDef.props;
export type BadgeEvents = typeof __propDef.events;
export type BadgeSlots = typeof __propDef.slots;
export default class Badge extends SvelteComponentTyped<BadgeProps, BadgeEvents, BadgeSlots> {
}
export {};
