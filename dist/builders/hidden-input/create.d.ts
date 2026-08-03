import { type Readable } from 'svelte/store';
import type { CreateHiddenInputProps } from './types.js';
export declare function createHiddenInput(props: CreateHiddenInputProps): import("../../internal/helpers/makeElement.js").MeltElement<[import("../../internal/helpers/withGet.js").WithGet<Readable<string>>, Readable<string | undefined>, import("../../internal/helpers/withGet.js").WithGet<Readable<boolean>>, import("../../internal/helpers/withGet.js").WithGet<Readable<boolean>>, import("../../internal/helpers/withGet.js").WithGet<Readable<import("svelte/elements").HTMLInputTypeAttribute | null | undefined>>, import("../../internal/helpers/withGet.js").WithGet<Readable<boolean | undefined>>], (node: HTMLInputElement) => {
    destroy: () => void;
}, ([$value, $name, $disabled, $required, $type, $checked]: [string, string | undefined, boolean, boolean, import("svelte/elements").HTMLInputTypeAttribute | null | undefined, boolean | undefined]) => {
    readonly name: string | undefined;
    readonly value: string;
    readonly 'aria-hidden': "true";
    readonly hidden: true;
    readonly disabled: boolean;
    readonly required: boolean;
    readonly tabIndex: -1;
    readonly type: import("svelte/elements").HTMLInputTypeAttribute | null | undefined;
    readonly checked: boolean | undefined;
    readonly style: string;
}, string>;
