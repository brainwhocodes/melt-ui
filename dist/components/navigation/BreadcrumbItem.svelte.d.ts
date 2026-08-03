import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        [x: string]: any;
        href?: string | undefined | undefined;
        current?: boolean | undefined;
        separator?: string | undefined;
        class?: string | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
        separator: {};
    };
};
export type BreadcrumbItemProps = typeof __propDef.props;
export type BreadcrumbItemEvents = typeof __propDef.events;
export type BreadcrumbItemSlots = typeof __propDef.slots;
export default class BreadcrumbItem extends SvelteComponentTyped<BreadcrumbItemProps, BreadcrumbItemEvents, BreadcrumbItemSlots> {
}
export {};
