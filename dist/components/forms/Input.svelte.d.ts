import type { HTMLInputAttributes } from 'svelte/elements';
import { SvelteComponentTyped } from 'svelte';
export type InputProps = HTMLInputAttributes & { class?: string; invalid?: boolean };
export default class Input extends SvelteComponentTyped<InputProps, { [evt: string]: CustomEvent<any> }, {}> {}
