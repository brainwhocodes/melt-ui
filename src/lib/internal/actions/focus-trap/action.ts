import { createFocusTrap as _createFocusTrap } from 'focus-trap';
import type { Action } from 'svelte/action';
import { noop } from '$lib/internal/helpers/callbacks.js';
import type { FocusTrapConfig } from './types.js';

export const useFocusTrap = ((node, config = {}) => {
	let unsub = noop;

	const update = (config: FocusTrapConfig) => {
		unsub();
		const trap = _createFocusTrap(node, {
			returnFocusOnDeactivate: false,
			allowOutsideClick: true,
			escapeDeactivates: false,
			clickOutsideDeactivates: false,
			...config,
		});
		unsub = trap.deactivate;
		trap.activate();
	};

	update(config);

	return { destroy: unsub, update };
}) satisfies Action<HTMLElement, FocusTrapConfig>;
