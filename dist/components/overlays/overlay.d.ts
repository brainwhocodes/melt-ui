import type { Writable } from 'svelte/store';
export type OverlayCloseReason = 'action' | 'backdrop' | 'cancel' | 'close-button' | 'escape' | 'programmatic' | 'snap' | 'swipe';
export type OverlayOpenChange = (open: boolean, reason: OverlayCloseReason) => void;
export interface OverlayContext {
    close: (reason?: OverlayCloseReason) => void;
    registerTitle: (id: string) => () => void;
    registerDescription: (id: string) => () => void;
}
export type DrawerDirection = 'top' | 'right' | 'bottom' | 'left';
export interface DrawerContext extends OverlayContext {
    direction: Writable<DrawerDirection>;
    activeSnapPoint: Writable<number>;
    dismissThreshold: Writable<number>;
    snapPoints: Writable<number[]>;
    setActiveSnapPoint: (value: number) => void;
}
export declare const alertDialogContext: unique symbol;
export declare const sheetContext: unique symbol;
export declare const drawerContext: unique symbol;
export declare function provideOverlayContext<T>(key: symbol, context: T): T;
export declare function useOverlayContext<T>(key: symbol, component: string): T;
export declare function getFocusableElements(container: HTMLElement): HTMLElement[];
export declare function focusInitial(container: HTMLElement, preferredSelector?: string): void;
export declare function containFocus(container: HTMLElement): () => void;
export declare function lockBodyScroll(): () => void;
export declare function showModal(dialog: HTMLDialogElement): () => void;
export declare function hideModal(dialog: HTMLDialogElement): void;
export declare function restoreFocus(element: HTMLElement | null): void;
export declare function createOverlayId(prefix: string): string;
