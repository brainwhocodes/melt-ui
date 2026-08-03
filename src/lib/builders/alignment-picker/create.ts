import { derived, readonly, writable } from 'svelte/store';
import {
	addMeltEventListener,
	createElHelpers,
	disabledAttr,
	executeCallbacks,
	isHTMLElement,
	makeElement,
	omit,
	overridable,
	toWritableStores,
} from '$lib/internal/helpers/index.js';
import type { Defaults, MeltActionReturn } from '$lib/internal/types.js';
import { createHiddenInput } from '../hidden-input/create.js';
import type { AlignmentPickerEvents } from './events.js';
import type {
	AlignmentPickerItemProps,
	AlignmentPickerValue,
	CreateAlignmentPickerProps,
} from './types.js';

const values: AlignmentPickerValue[] = [
	'top-start',
	'top-center',
	'top-end',
	'center-start',
	'center',
	'center-end',
	'bottom-start',
	'bottom-center',
	'bottom-end',
];

const coordinates: Record<AlignmentPickerValue, [number, number]> = {
	'top-start': [0, 0],
	'top-center': [0, 1],
	'top-end': [0, 2],
	'center-start': [1, 0],
	center: [1, 1],
	'center-end': [1, 2],
	'bottom-start': [2, 0],
	'bottom-center': [2, 1],
	'bottom-end': [2, 2],
};

const defaults = {
	defaultValue: 'center',
	disabled: false,
	loop: true,
	dir: 'ltr',
	name: undefined,
} satisfies Defaults<CreateAlignmentPickerProps>;

const prefix = 'alignment-picker';
const { name, selector } = createElHelpers(prefix);

function getValueAt(row: number, column: number) {
	return values.find((value) => {
		const [valueRow, valueColumn] = coordinates[value];
		return valueRow === row && valueColumn === column;
	});
}

export function createAlignmentPicker(props?: CreateAlignmentPickerProps) {
	const withDefaults = {
		...defaults,
		...props,
		defaultValue: props?.defaultValue ?? defaults.defaultValue,
	} satisfies CreateAlignmentPickerProps;
	const options = toWritableStores(
		omit(withDefaults, 'value', 'onValueChange', 'defaultValue'),
	);
	const { disabled, loop, dir, name: nameProp } = options;
	const valueWritable =
		withDefaults.value ?? writable(withDefaults.defaultValue);
	const value = overridable(valueWritable, withDefaults.onValueChange);

	const selectItem = (item: HTMLElement) => {
		if (item.dataset.disabled === 'true') return;
		const itemValue = item.dataset.value as AlignmentPickerValue | undefined;
		if (!itemValue) return;
		value.set(itemValue);
	};

	const root = makeElement(name(), {
		stores: [disabled, dir, value],
		returned: ([$disabled, $dir, $value]) => ({
			role: 'radiogroup',
			'aria-disabled': disabledAttr($disabled),
			dir: $dir,
			'data-disabled': disabledAttr($disabled),
			'data-state': $value ? 'selected' : 'empty',
			'data-value': $value,
		}),
	});

	const item = makeElement(name('item'), {
		stores: [disabled, value],
		returned: ([$disabled, $value]) => {
			return (props: AlignmentPickerItemProps) => {
				const itemValue = props.value;
				const itemDisabled = $disabled || !!props.disabled;
				const [row, column] = coordinates[itemValue];
				const checked = $value === itemValue;
				const firstEnabled = values.find(
					(candidate) => candidate === candidate,
				);
				const tabindex = itemDisabled
					? -1
					: checked || (!$value && itemValue === firstEnabled)
						? 0
						: -1;

				return {
					disabled: itemDisabled,
					type: 'button',
					role: 'radio',
					'aria-checked': checked,
					'aria-disabled': disabledAttr(itemDisabled),
					tabindex,
					'data-disabled': disabledAttr(itemDisabled),
					'data-state': checked ? 'checked' : 'unchecked',
					'data-value': itemValue,
					'data-row': row,
					'data-column': column,
				} as const;
			};
		},
		action: (
			node: HTMLElement,
		): MeltActionReturn<AlignmentPickerEvents['item']> => {
			const unsub = executeCallbacks(
				addMeltEventListener(node, 'click', () => selectItem(node)),
				addMeltEventListener(node, 'keydown', (event) => {
					if (disabled.get() || node.dataset.disabled === 'true') return;
					const rootNode = node.closest(selector());
					if (!isHTMLElement(rootNode)) return;

					const currentRow = Number(node.dataset.row);
					const currentColumn = Number(node.dataset.column);
					let row = currentRow;
					let column = currentColumn;
					let rowDelta = 0;
					let columnDelta = 0;

					if (event.key === 'Home' || event.key === 'End') {
						event.preventDefault();
						const eligible = Array.from(
							rootNode.querySelectorAll(selector('item')),
						).filter(
							(element): element is HTMLElement =>
								isHTMLElement(element) && element.dataset.disabled !== 'true',
						);
						const target = event.key === 'Home' ? eligible[0] : eligible.at(-1);
						if (target) {
							target.focus();
							selectItem(target);
						}
						return;
					}

					const isHorizontal =
						event.key === 'ArrowLeft' || event.key === 'ArrowRight';
					const isVertical =
						event.key === 'ArrowUp' || event.key === 'ArrowDown';
					if (!isHorizontal && !isVertical) return;

					const direction = dir.get() === 'rtl' && isHorizontal ? -1 : 1;
					if (event.key === 'ArrowLeft') columnDelta = -1 * direction;
					if (event.key === 'ArrowRight') columnDelta = 1 * direction;
					if (event.key === 'ArrowUp') rowDelta = -1;
					if (event.key === 'ArrowDown') rowDelta = 1;

					const eligible = new Set(
						Array.from(rootNode.querySelectorAll(selector('item')))
							.filter(
								(element): element is HTMLElement =>
									isHTMLElement(element) && element.dataset.disabled !== 'true',
							)
							.map((element) => element.dataset.value),
					);

					let target: HTMLElement | undefined;
					for (let attempt = 0; attempt < 9; attempt += 1) {
						row += rowDelta;
						column += columnDelta;
						if (row < 0 || row > 2 || column < 0 || column > 2) {
							if (!loop.get()) break;
							if (isHorizontal) column = (column + 3) % 3;
							if (isVertical) row = (row + 3) % 3;
						}
						const candidateValue = getValueAt(row, column);
						if (candidateValue && eligible.has(candidateValue)) {
							target = Array.from(
								rootNode.querySelectorAll(selector('item')),
							).find(
								(element): element is HTMLElement =>
									isHTMLElement(element) &&
									element.dataset.value === candidateValue,
							);
							break;
						}
					}

					if (!target) return;
					event.preventDefault();
					target.focus();
					selectItem(target);
				}),
			);
			return { destroy: unsub };
		},
	});

	const hiddenInput = createHiddenInput({
		value,
		name: readonly(nameProp),
		disabled,
	});

	const isSelected = derived(value, ($value) => {
		return (itemValue: AlignmentPickerValue) => $value === itemValue;
	});

	return {
		elements: { root, item, hiddenInput },
		states: { value },
		helpers: { isSelected },
		options,
	};
}
