<script lang="ts">
	import { createCombobox } from '$lib/builders/combobox/create.js';
	import { melt } from '$lib/internal/actions/index.js';
	import { untrack } from 'svelte';
	import { writable } from 'svelte/store';

	export interface ComboboxItem {
		value: string;
		label: string;
		disabled?: boolean;
	}

	interface Props {
		items?: ComboboxItem[];
		placeholder?: string;
		disabled?: boolean;
		class?: string;
		value?: string;
		onValueChange?: (value: string | undefined) => void;
		[key: string]: any;
	}

	let {
		items = [],
		placeholder = 'Select an option...',
		disabled = false,
		class: className = '',
		value = $bindable(),
		onValueChange,
		...rest
	}: Props = $props();

	const selectedStore = writable(
		untrack(() => {
			const match = items.find((i) => i.value === value);
			return match ? { value: match.value, label: match.label } : undefined;
		})
	);

	$effect(() => {
		const match = items.find((i) => i.value === value);
		selectedStore.set(match ? { value: match.value, label: match.label } : (undefined as any));
	});

	const {
		elements: { menu, input, option },
		states: { open, inputValue, touchedInput },
		helpers: { isSelected },
	} = untrack(() =>
		createCombobox<ComboboxItem>({
			selected: selectedStore as any,
			disabled,
			onSelectedChange: (next: any) => {
				const selectedVal =
					typeof next.next === 'object' && next.next !== null
						? next.next.value ?? next.next.label
						: next.next;
				value = selectedVal;
				onValueChange?.(selectedVal);
				return next.next;
			},
		})
	);

	let filteredItems = $derived(
		$touchedInput
			? items.filter((item) =>
					item.label.toLowerCase().includes(($inputValue ?? '').toLowerCase())
			  )
			: items
	);
</script>

<div class={`melt-combobox ${className}`.trim()} {...rest}>
	<input
		{...$input}
		use:input
		class="melt-combobox-input"
		{placeholder}
		{disabled}
	/>
	{#if $open}
		<ul {...$menu} use:menu class="melt-combobox-menu">
			{#each filteredItems as item (item.value)}
				<li
					{...$option({ value: item.value, label: item.label, disabled: item.disabled })}
					use:option
					class="melt-combobox-option"
					data-selected={$isSelected(item.value) ? '' : undefined}
				>
					{item.label}
				</li>
			{:else}
				<li class="melt-combobox-empty">No results found</li>
			{/each}
		</ul>
	{/if}
</div>
