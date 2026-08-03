export declare function debounceable<T>(initialValue: T, wait?: number): {
    debouncedSet: (value: T) => void;
    debouncedUpdate: (fn: (value: T) => T) => void;
    set: (value: T) => void;
    update: (fn: (value: T) => T) => void;
    subscribe(this: void, run: import("svelte/store").Subscriber<{
        value: T;
        debounced: T;
    }>, invalidate?: () => void): import("svelte/store").Unsubscriber;
};
