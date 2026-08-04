import { type Readable, readable } from 'svelte/store';
import { executeCallbacks } from '$lib/internal/helpers/callbacks.js';
import {
	createElHelpers,
	makeElement,
} from '$lib/internal/helpers/makeElement.js';
import { omit, removeUndefined } from '$lib/internal/helpers/object.js';
import { toReadableStores } from '$lib/internal/helpers/store/toReadableStores.js';
import { styleToString } from '$lib/internal/helpers/style.js';
import { withGet } from '$lib/internal/helpers/withGet.js';
import type { CreateHiddenInputProps } from './types.js';

const defaults = {
	prefix: '',
	disabled: readable(false),
	required: readable(false),
	name: readable(undefined),
	type: readable(undefined),
	checked: undefined,
} satisfies Partial<CreateHiddenInputProps>;

export function createHiddenInput(props: CreateHiddenInputProps) {
	const withDefaults = {
		...defaults,
		...removeUndefined(props),
	} satisfies CreateHiddenInputProps;
	const { name: elName } = createElHelpers(withDefaults.prefix);
	const { value, name, disabled, required, type, checked } = toReadableStores(
		omit(withDefaults, 'prefix'),
	);
	const nameStore = name as Readable<string | undefined>; // TODO: Remove this cast when types are fixed

	const actualChecked = withGet.derived(
		[checked, type],
		([$checked, $type]) => {
			if ($type === 'checkbox') {
				return ($checked === 'indeterminate' ? false : $checked) as boolean;
			}
			return undefined;
		},
	);

	const hiddenInput = makeElement(elName('hidden-input'), {
		stores: [value, nameStore, disabled, required, type, actualChecked],
		returned: ([$value, $name, $disabled, $required, $type, $checked]) => {
			return {
				name: $name,
				value: $value?.toString(),
				'aria-hidden': 'true',
				hidden: true,
				disabled: $disabled,
				required: $required,
				tabIndex: -1,
				type: $type,
				checked: $checked,
				style: styleToString({
					position: 'absolute',
					opacity: 0,
					'pointer-events': 'none',
					margin: 0,
					transform: 'translateX(-100%)',
				}),
			} as const;
		},
		action: (node: HTMLInputElement) => {
			// When value changes, emit a change event. The initial invocation of a
			// store subscription is not a change, so it must not emit an event.
			let isInitialValue = true;
			let isInitialChecked = true;
			const unsub = executeCallbacks(
				value.subscribe((newValue) => {
					if (type.get() === 'checkbox') {
						return;
					}
					node.value = newValue;
					if (isInitialValue) {
						isInitialValue = false;
						return;
					}
					node.dispatchEvent(new Event('change', { bubbles: true }));
				}),
				actualChecked.subscribe(() => {
					if (type.get() !== 'checkbox') {
						return;
					}
					if (isInitialChecked) {
						isInitialChecked = false;
						return;
					}
					node.dispatchEvent(new Event('change', { bubbles: true }));
				}),
			);

			return {
				destroy: unsub,
			};
		},
	});

	return hiddenInput;
}
