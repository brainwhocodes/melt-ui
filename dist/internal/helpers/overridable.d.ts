import type { Updater, Writable } from 'svelte/store';
export type ChangeFn<T> = (args: {
    curr: T;
    next: T;
}) => T;
export declare const overridable: <T>(_store: Writable<T>, onChange?: ChangeFn<T>) => {
    update: (updater: Updater<T>, sideEffect?: (newValue: T) => void) => void;
    set: (this: void, value: T) => void;
    subscribe(this: void, run: import("svelte/store").Subscriber<T>, invalidate?: () => void): import("svelte/store").Unsubscriber;
    get: () => T;
    destroy?: () => void;
};
