import type { Readable } from 'svelte/store';

export type Stores =
	| Readable<unknown>
	| [Readable<unknown>, ...Array<Readable<unknown>>]
	| Array<Readable<unknown>>;

export type StoresValues<T> =
	T extends Readable<infer U>
		? U
		: { [K in keyof T]: T[K] extends Readable<infer U> ? U : never };
