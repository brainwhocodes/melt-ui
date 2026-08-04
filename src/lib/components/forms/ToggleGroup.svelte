<script lang="ts">
	import { createToggleGroup } from '$lib/builders/toggle-group/create.js';
	import { melt } from '$lib/internal/actions/index.js';
	import { untrack } from 'svelte';

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

	const {
		elements: { root, item },
		helpers: { isPressed },
	} = untrack(() =>
		createToggleGroup({
			type: type as any,
			disabled,
			orientation,
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
