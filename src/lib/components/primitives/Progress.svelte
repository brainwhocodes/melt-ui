<script lang="ts">
	import { createProgress } from '$lib/builders/progress/create.js';
	import { melt } from '$lib/internal/actions/index.js';
	import { untrack } from 'svelte';

	interface Props {
		value?: number | null;
		max?: number;
		class?: string;
		[key: string]: any;
	}

	let {
		value = 0,
		max = 100,
		class: className = '',
		...rest
	}: Props = $props();

	const {
		elements: { root },
	} = untrack(() =>
		createProgress({
			max,
		})
	);
</script>

<div
	{...$root}
	use:root
	class={`melt-progress ${className}`.trim()}
	{...rest}
>
	<div
		class="melt-progress-indicator"
		style={`transform: translateX(-${100 - ((value ?? 0) / max) * 100}%)`}
	></div>
</div>
