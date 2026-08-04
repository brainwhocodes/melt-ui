<script lang="ts">
	import { untrack } from 'svelte';
	import { createRadioGroup, type CreateRadioGroupProps } from '$lib/index.js';
	import { removeUndefined } from '../utils.js';

	type $$Props = CreateRadioGroupProps & {
		items?: Item[];
	};

	type Item = {
		value: string;
		disabled: boolean;
	};

	interface Props {
		value?: CreateRadioGroupProps['value'];
		defaultValue?: CreateRadioGroupProps['defaultValue'];
		disabled?: CreateRadioGroupProps['disabled'];
		onValueChange?: CreateRadioGroupProps['onValueChange'];
		required?: CreateRadioGroupProps['required'];
		name?: CreateRadioGroupProps['name'];
		items?: Item[];
		[key: string]: any
	}

	let {
		value = undefined,
		defaultValue = undefined,
		disabled = undefined,
		onValueChange = undefined,
		required = undefined,
		name = undefined,
		items = [
		{ value: 'a', disabled: false },
		{ value: 'b', disabled: false },
		{ value: 'c', disabled: false },
		{ value: 'd', disabled: false },
	],
		...rest
	}: Props = $props();

	const {
		elements: { root, item, hiddenInput },
		states: { value: localValue },
	} = createRadioGroup(
		untrack(() => ({
			value,
			defaultValue,
			onValueChange,
			disabled,
			required,
			name,
			...removeUndefined(rest),
		}))
	);
</script>

<main>
	<div data-testid="value">{$localValue}</div>
	<form>
		<input {...$hiddenInput} use:hiddenInput data-testid="input" />
		<label id="radio-group-label" for="radio-group" data-testid="label"> Airplane mode </label>
		<div {...$root} use:root data-testid="root">
			{#each items as radioItem}
				<button {...$item(radioItem)} use:item data-testid={radioItem.value}>{radioItem.value}</button>
			{/each}
		</div>
	</form>
</main>
