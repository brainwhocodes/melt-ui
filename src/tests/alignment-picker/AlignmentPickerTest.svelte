<script lang="ts">
	import { createAlignmentPicker, type AlignmentPickerItemProps, type CreateAlignmentPickerProps } from '$lib/index.js';
	import { removeUndefined } from '../utils.js';
	import { untrack } from 'svelte';

	type $$Props = CreateAlignmentPickerProps & {
		items?: AlignmentPickerItemProps[];
	};

	interface Props {
		value?: CreateAlignmentPickerProps['value'];
		defaultValue?: CreateAlignmentPickerProps['defaultValue'];
		disabled?: CreateAlignmentPickerProps['disabled'];
		loop?: CreateAlignmentPickerProps['loop'];
		dir?: CreateAlignmentPickerProps['dir'];
		name?: CreateAlignmentPickerProps['name'];
		onValueChange?: CreateAlignmentPickerProps['onValueChange'];
		items?: AlignmentPickerItemProps[];
		[key: string]: any
	}

	let {
		value = undefined,
		defaultValue = undefined,
		disabled = undefined,
		loop = undefined,
		dir = undefined,
		name = undefined,
		onValueChange = undefined,
		items = [
		{ value: 'top-start' },
		{ value: 'top-center' },
		{ value: 'top-end' },
		{ value: 'center-start' },
		{ value: 'center' },
		{ value: 'center-end' },
		{ value: 'bottom-start' },
		{ value: 'bottom-center' },
		{ value: 'bottom-end' },
	],
		...rest
	}: Props = $props();

	const {
		elements: { root, item, hiddenInput },
		states: { value: localValue },
	} = createAlignmentPicker(
		untrack(() => ({
			value,
			defaultValue,
			disabled,
			loop,
			dir,
			name,
			onValueChange,
			...removeUndefined(rest),
		}))
	);
</script>

<main>
	<div data-testid="value">{$localValue}</div>
	<form>
		<input {...$hiddenInput} use:hiddenInput data-testid="input" />
		<div {...$root} use:root aria-label="Alignment" data-testid="root">
			{#each items as alignmentItem}
				<button {...$item(alignmentItem)} use:item data-testid={alignmentItem.value}>
					{alignmentItem.value}
				</button>
			{/each}
		</div>
	</form>
</main>
