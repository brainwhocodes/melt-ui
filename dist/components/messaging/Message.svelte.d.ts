import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        [x: string]: any;
        id?: string | undefined | undefined;
        variant?: ("incoming" | "outgoing" | "system") | undefined;
        sender?: string | undefined | undefined;
        timestamp?: string | undefined | undefined;
        datetime?: string | undefined | undefined;
        avatarSrc?: string | undefined | undefined;
        avatarAlt?: string | undefined | undefined;
        status?: string | undefined | undefined;
        actionsLabel?: string | undefined;
        class?: string | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        avatar: {};
        header: {};
        body: {};
        default: {};
        footer: {};
        actions: {};
    };
};
export type MessageProps = typeof __propDef.props;
export type MessageEvents = typeof __propDef.events;
export type MessageSlots = typeof __propDef.slots;
export default class Message extends SvelteComponentTyped<MessageProps, MessageEvents, MessageSlots> {
}
export {};
