<script lang="ts">
	import { createSelect } from '$lib/builders/select/create.js';
	import { melt } from '$lib/internal/actions/index.js';
	import { untrack } from 'svelte';

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

	const {
		elements: { trigger, menu, option },
		states: { selectedLabel, open },
		helpers: { isSelected },
	} = untrack(() =>
		createSelect({
			disabled,
			onSelectedChange: (next) => {
				value = (next.next as any)?.value;
				onValueChange?.((next.next as any)?.value);
				return next.next;
			},
		})
	);
</script>

<div class={`melt-select ${className}`.trim()} {...rest}>
	<button {...$trigger} use:trigger class="melt-select-trigger" {disabled}>
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
