import { SvelteComponentTyped } from "svelte";
export type ButtonVariant = 'default' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'default' | 'lg' | 'icon';
import type { HTMLButtonAttributes } from 'svelte/elements';
declare const __propDef: {
    props: HTMLButtonAttributes & {
        class?: string;
        variant?: ButtonVariant;
        size?: ButtonSize;
        loading?: boolean;
        loadingLabel?: string;
    };
    events: {
        click: PointerEvent;
        focus: FocusEvent;
        blur: FocusEvent;
        keydown: KeyboardEvent;
        keyup: KeyboardEvent;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export type ButtonProps = typeof __propDef.props;
export type ButtonEvents = typeof __propDef.events;
export type ButtonSlots = typeof __propDef.slots;
export default class Button extends SvelteComponentTyped<ButtonProps, ButtonEvents, ButtonSlots> {
}
export {};
