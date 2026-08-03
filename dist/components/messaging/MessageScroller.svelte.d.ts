import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        [x: string]: any;
        follow?: boolean | undefined;
        atLiveEdge?: boolean | undefined;
        threshold?: number | undefined;
        label?: string | undefined;
        jumpLabel?: string | undefined;
        jumpBehavior?: ScrollBehavior | undefined;
        live?: "off" | "polite" | undefined;
        class?: string | undefined;
        scrollToLatest?: ((behavior?: ScrollBehavior) => void) | undefined;
        scrollToMessage?: ((id: string, behavior?: ScrollBehavior) => boolean) | undefined;
        prepareForPrepend?: (() => () => Promise<{
            previousScrollHeight: number;
            scrollHeight: number;
            delta: number;
            scrollTop: number;
        }>) | undefined;
        preservePrepend?: (<T>(update: () => T | Promise<T>) => Promise<T>) | undefined;
    };
    events: {
        followchange: CustomEvent<{
            follow: boolean;
        }>;
        liveedgechange: CustomEvent<{
            atLiveEdge: boolean;
        }>;
        prepend: CustomEvent<{
            previousScrollHeight: number;
            scrollHeight: number;
            delta: number;
            scrollTop: number;
        }>;
        prependpreserved: CustomEvent<{
            previousScrollHeight: number;
            scrollHeight: number;
            delta: number;
            scrollTop: number;
        }>;
        jump: CustomEvent<{
            behavior: ScrollBehavior;
        }>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
        jump: {};
    };
};
export type MessageScrollerProps = typeof __propDef.props;
export type MessageScrollerEvents = typeof __propDef.events;
export type MessageScrollerSlots = typeof __propDef.slots;
export default class MessageScroller extends SvelteComponentTyped<MessageScrollerProps, MessageScrollerEvents, MessageScrollerSlots> {
    get scrollToLatest(): (behavior?: ScrollBehavior) => void;
    get scrollToMessage(): (id: string, behavior?: ScrollBehavior) => boolean;
    get prepareForPrepend(): () => () => Promise<{
        previousScrollHeight: number;
        scrollHeight: number;
        delta: number;
        scrollTop: number;
    }>;
    get preservePrepend(): <T>(update: () => T | Promise<T>) => Promise<T>;
}
export {};
