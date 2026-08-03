<script lang="ts">
	import { createAlignmentPicker, type AlignmentPickerItemProps, type CreateAlignmentPickerProps } from '$lib/index.js';
	import { removeUndefined } from '../utils.js';

	type $$Props = CreateAlignmentPickerProps & {
		items?: AlignmentPickerItemProps[];
	};

	export let value: CreateAlignmentPickerProps['value'] = undefined;
	export let defaultValue: CreateAlignmentPickerProps['defaultValue'] = undefined;
	export let disabled: CreateAlignmentPickerProps['disabled'] = undefined;
	export let loop: CreateAlignmentPickerProps['loop'] = undefined;
	export let dir: CreateAlignmentPickerProps['dir'] = undefined;
	export let name: CreateAlignmentPickerProps['name'] = undefined;
	export let onValueChange: CreateAlignmentPickerProps['onValueChange'] = undefined;
	export let items: AlignmentPickerItemProps[] = [
		{ value: 'top-start' },
		{ value: 'top-center' },
		{ value: 'top-end' },
		{ value: 'center-start' },
		{ value: 'center' },
		{ value: 'center-end' },
		{ value: 'bottom-start' },
		{ value: 'bottom-center' },
		{ value: 'bottom-end' },
	];

	const {
		elements: { root, item, hiddenInput },
		states: { value: localValue },
	} = createAlignmentPicker({
		value,
		defaultValue,
		disabled,
		loop,
		dir,
		name,
		onValueChange,
		...removeUndefined($$restProps),
	});
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
