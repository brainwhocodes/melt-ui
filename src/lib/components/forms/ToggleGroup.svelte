<script lang="ts">
	import { createToggleGroup } from '$lib/builders/toggle-group/create.js';
	import { melt } from '$lib/internal/actions/index.js';
	import { untrack } from 'svelte';
	import { writable } from 'svelte/store';

	export interface ToggleOption {
		value: string;
		label: string;
		disabled?: boolean;
	}

	interface Props {
		options?: ToggleOption[];
		type?: 'single' | 'multiple';
		value?: string | string[];
		disabled?: boolean;
		orientation?: 'horizontal' | 'vertical';
		class?: string;
		onValueChange?: (value: string | string[] | undefined) => void;
		[key: string]: any;
	}

	let {
		options = [],
		type = 'single',
		value = $bindable(),
		disabled = false,
		orientation = 'horizontal',
		class: className = '',
		onValueChange,
		...rest
	}: Props = $props();

	const initialValue = untrack(() => {
		if (type === 'multiple') {
			return Array.isArray(value) ? value : value !== undefined ? [value] : [];
		}
		return typeof value === 'string' ? value : undefined;
	});

	const valueStore = writable<string | string[] | undefined>(initialValue);

	$effect(() => {
		if (type === 'multiple') {
			valueStore.set(Array.isArray(value) ? value : value !== undefined ? [value] : []);
		} else {
			valueStore.set((typeof value === 'string' ? value : undefined) as any);
		}
	});

	const {
		elements: { root, item },
		helpers: { isPressed },
	} = untrack(() =>
		createToggleGroup({
			value: valueStore as any,
			type: type as any,
			disabled: untrack(() => disabled),
			orientation: untrack(() => orientation),
			onValueChange: (next) => {
				value = next.next as any;
				onValueChange?.(next.next as any);
				return next.next;
			},
		})
	);
</script>

<div
	{...$root}
	use:root
	class={`melt-toggle-group ${className}`.trim()}
	data-orientation={orientation}
	{...rest}
>
	{#each options as option (option.value)}
		<button
			{...$item(option.value)}
			use:item
			class="melt-toggle-group-item"
			data-state={$isPressed(option.value) ? 'on' : 'off'}
			disabled={option.disabled}
		>
			{option.label}
		</button>
	{/each}
</div>
