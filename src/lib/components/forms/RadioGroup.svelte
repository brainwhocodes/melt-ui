<script lang="ts">
	import { createRadioGroup } from '$lib/builders/radio-group/create.js';
	import { melt } from '$lib/internal/actions/index.js';
	import { untrack } from 'svelte';
	import { writable } from 'svelte/store';

	export interface RadioOption {
		value: string;
		label: string;
		disabled?: boolean;
	}

	interface Props {
		options?: RadioOption[];
		value?: string;
		disabled?: boolean;
		orientation?: 'horizontal' | 'vertical';
		class?: string;
		onValueChange?: (value: string | undefined) => void;
		[key: string]: any;
	}

	let {
		options = [],
		value = $bindable(),
		disabled = false,
		orientation = 'vertical',
		class: className = '',
		onValueChange,
		...rest
	}: Props = $props();

	const valueStore = writable(untrack(() => value));

	$effect(() => {
		if (value !== undefined) {
			valueStore.set(value);
		}
	});

	const {
		elements: { root, item, hiddenInput },
		helpers: { isChecked },
	} = untrack(() =>
		createRadioGroup({
			value: valueStore,
			disabled,
			orientation,
			onValueChange: (next) => {
				value = next.next;
				onValueChange?.(next.next);
				return next.next;
			},
		})
	);
</script>

<div {...$root} use:root class={`melt-radio-group ${className}`.trim()} data-orientation={orientation} {...rest}>
	{#each options as option (option.value)}
		<label class="melt-radio-option">
			<button
				{...$item(option.value)}
				use:item
				aria-label={option.label}
				class="melt-radio-item"
				data-state={$isChecked(option.value) ? 'checked' : 'unchecked'}
				disabled={option.disabled}
			>
				{#if $isChecked(option.value)}
					<span class="melt-radio-indicator"></span>
				{/if}
			</button>
			<span class="melt-radio-label">{option.label}</span>
		</label>
	{/each}
	<input {...$hiddenInput} use:hiddenInput />
</div>
