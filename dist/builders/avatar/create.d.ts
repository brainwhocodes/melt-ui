import type { CreateAvatarProps } from './types.js';
export declare const createAvatar: (props?: CreateAvatarProps) => {
    elements: {
        image: import("../../internal/helpers/index.js").MeltElement<[import("../../internal/helpers/index.js").WithGet<import("svelte/store").Writable<string>>, {
            update: (updater: import("svelte/store").Updater<"error" | "loading" | "loaded">, sideEffect?: ((newValue: "error" | "loading" | "loaded") => void) | undefined) => void;
            set: (this: void, value: "error" | "loading" | "loaded") => void;
            subscribe(this: void, run: import("svelte/store").Subscriber<"error" | "loading" | "loaded">, invalidate?: () => void): import("svelte/store").Unsubscriber;
            get: () => "error" | "loading" | "loaded";
            destroy?: () => void;
        }], import("svelte/action").Action<any, any, Record<never, any>>, ([$src, $loadingStatus]: [string, "error" | "loading" | "loaded"]) => {
            readonly src: string;
            readonly style: string;
        }, "avatar-image">;
        fallback: import("../../internal/helpers/index.js").MeltElement<[{
            update: (updater: import("svelte/store").Updater<"error" | "loading" | "loaded">, sideEffect?: ((newValue: "error" | "loading" | "loaded") => void) | undefined) => void;
            set: (this: void, value: "error" | "loading" | "loaded") => void;
            subscribe(this: void, run: import("svelte/store").Subscriber<"error" | "loading" | "loaded">, invalidate?: () => void): import("svelte/store").Unsubscriber;
            get: () => "error" | "loading" | "loaded";
            destroy?: () => void;
        }], import("svelte/action").Action<any, any, Record<never, any>>, ([$loadingStatus]: ["error" | "loading" | "loaded"]) => {
            readonly style: string | undefined;
            readonly hidden: true | undefined;
        }, "avatar-fallback">;
    };
    states: {
        loadingStatus: {
            update: (updater: import("svelte/store").Updater<"error" | "loading" | "loaded">, sideEffect?: ((newValue: "error" | "loading" | "loaded") => void) | undefined) => void;
            set: (this: void, value: "error" | "loading" | "loaded") => void;
            subscribe(this: void, run: import("svelte/store").Subscriber<"error" | "loading" | "loaded">, invalidate?: () => void): import("svelte/store").Unsubscriber;
            get: () => "error" | "loading" | "loaded";
            destroy?: () => void;
        };
    };
    options: import("../../internal/helpers/index.js").ToWritableStores<Omit<{
        src: string;
        delayMs: number;
        loadingStatus?: import("svelte/store").Writable<import("./types.js").ImageLoadingStatus>;
        onLoadingStatusChange: import("../../internal/helpers/index.js").ChangeFn<import("./types.js").ImageLoadingStatus>;
    }, "loadingStatus" | "onLoadingStatusChange">>;
};
