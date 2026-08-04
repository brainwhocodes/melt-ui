<script lang="ts">
	import { createSeparator } from '$lib/builders/separator/create.js';
	import { melt } from '$lib/internal/actions/index.js';
	import { untrack } from 'svelte';

	interface Props {
		orientation?: 'horizontal' | 'vertical';
		decorative?: boolean;
		class?: string;
		[key: string]: any;
	}

	let {
		orientation = 'horizontal',
		decorative = false,
		class: className = '',
		...rest
	}: Props = $props();

	const {
		elements: { root },
	} = untrack(() =>
		createSeparator({
			orientation,
			decorative,
		})
	);
</script>

<div
	{...$root}
	use:root
	class={`melt-separator ${className}`.trim()}
	data-orientation={orientation}
	{...rest}
></div>
