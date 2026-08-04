<script lang="ts">
	import { createToggle } from '$lib/builders/toggle/create.js';
	import { melt } from '$lib/internal/actions/index.js';
	import { untrack, type Snippet } from 'svelte';
	import { writable } from 'svelte/store';

	interface Props {
		pressed?: boolean;
		disabled?: boolean;
		label?: string;
		class?: string;
		onPressedChange?: (pressed: boolean) => void;
		children?: Snippet;
		[key: string]: any;
	}

	let {
		pressed = $bindable(false),
		disabled = false,
		label = '',
		class: className = '',
		onPressedChange,
		children,
		...rest
	}: Props = $props();

	const pressedStore = writable(untrack(() => pressed ?? false));

	$effect(() => {
		pressedStore.set(pressed ?? false);
	});

	const {
		elements: { root },
		states: { pressed: isPressed },
	} = untrack(() =>
		createToggle({
			pressed: pressedStore,
			disabled: untrack(() => disabled),
			onPressedChange: (next) => {
				pressed = next.next;
				onPressedChange?.(next.next);
				return next.next;
			},
		})
	);
</script>

<button
	{...$root}
	use:root
	class={`melt-toggle ${className}`.trim()}
	data-state={$isPressed ? 'on' : 'off'}
	{...rest}
>
	{#if children}
		{@render children()}
	{:else}
		{label}
	{/if}
</button>
