<script lang="ts">
	import { createLabel } from '$lib/builders/label/create.js';
	import { melt } from '$lib/internal/actions/index.js';
	import type { Snippet } from 'svelte';

	interface Props {
		for?: string;
		class?: string;
		children?: Snippet;
		[key: string]: any;
	}

	let {
		for: htmlFor,
		class: className = '',
		children,
		...rest
	}: Props = $props();

	const {
		elements: { root },
	} = createLabel();
</script>

<label
	{...$root}
	use:root
	for={htmlFor}
	class={`melt-label ${className}`.trim()}
	{...rest}
>
	{#if children}
		{@render children()}
	{/if}
</label>
