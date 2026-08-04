<script lang="ts">
	import { createSelect } from '$lib/builders/select/create.js';
	import { melt } from '$lib/internal/actions/index.js';
	import { untrack } from 'svelte';
	import { writable } from 'svelte/store';

	export interface SelectOption {
		value: string;
		label: string;
		disabled?: boolean;
	}

	interface Props {
		options?: SelectOption[];
		placeholder?: string;
		disabled?: boolean;
		class?: string;
		value?: string;
		onValueChange?: (value: string | undefined) => void;
		[key: string]: any;
	}

	let {
		options = [],
		placeholder = 'Select an option',
		disabled = false,
		class: className = '',
		value = $bindable(),
		onValueChange,
		...rest
	}: Props = $props();

	const selectedStore = writable(
		untrack(() => {
			const match = options.find((o) => o.value === value);
			return match ? { value: match.value, label: match.label } : undefined;
		})
	);

	$effect(() => {
		const match = options.find((o) => o.value === value);
		selectedStore.set(match ? { value: match.value, label: match.label } : (undefined as any));
	});

	const {
		elements: { trigger, menu, option },
		states: { selectedLabel, open },
		helpers: { isSelected },
	} = untrack(() =>
		createSelect({
			selected: selectedStore as any,
			disabled: untrack(() => disabled),
			onSelectedChange: (next) => {
				const val = (next.next as any)?.value;
				value = val;
				onValueChange?.(val);
				return next.next;
			},
		})
	);
</script>

<div class={`melt-select ${className}`.trim()} {...rest}>
	<button
		{...$trigger}
		use:trigger
		aria-label={placeholder || 'Select'}
		class="melt-select-trigger"
		{disabled}
	>
		<span>{$selectedLabel || placeholder}</span>
		<span class="melt-select-arrow">▼</span>
	</button>
	{#if $open}
		<div {...$menu} use:menu class="melt-select-menu">
			{#each options as opt (opt.value)}
				<div
					{...$option({ value: opt.value, label: opt.label, disabled: opt.disabled })}
					use:option
					class="melt-select-option"
					data-selected={$isSelected(opt.value) ? '' : undefined}
				>
					{opt.label}
				</div>
			{/each}
		</div>
	{/if}
</div>
