// @ts-ignore

import { dequal } from 'dequal';
import type { Writable } from 'svelte/store';
import { effect } from '$lib/internal/helpers/index.js';

type WritableValue<T> = T extends Writable<infer V> ? V : never;

/**
 * Typed Object.keys
 *
 * @export
 * @template {Record<string, unknown>} T
 * @param {T} obj
 * @returns {(keyof T)[]}
 */
function keys<T extends Record<string, unknown>>(obj: T): (keyof T)[] {
	return Object.keys(obj);
}

export function createSync<Stores extends Record<string, Writable<unknown>>>(
	stores: Stores,
) {
	let setters = {} as {
		[K in keyof Stores]?: (value: WritableValue<Stores[K]>) => void;
	};
	keys(stores).forEach((key) => {
		const store = stores[key];
		effect(store, (value) => {
			if (key in setters) {
				setters[key]?.(value as any);
			}
		});
	});

	return keys(stores).reduce(
		(acc, key) => {
			type Value = WritableValue<Stores[typeof key]>;
			return {
				...acc,
				[key]: function sync(value: Value, setter?: (value: Value) => void) {
					stores[key].update((p) => {
						if (dequal(p, value)) return p;
						return value;
					});
					if (setter) {
						setters = { ...setters, [key]: setter };
					}
				},
			};
		},
		{} as {
			[K in keyof Stores]: (
				value: WritableValue<Stores[K]>,
				setter?: (value: WritableValue<Stores[K]>) => void,
			) => void;
		},
	);
}
