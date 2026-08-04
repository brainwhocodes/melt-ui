<script lang="ts">
	import { createProgress } from '$lib/builders/progress/create.js';
	import { melt } from '$lib/internal/actions/index.js';
	import { untrack } from 'svelte';
	import { writable } from 'svelte/store';

	interface Props {
		value?: number | null;
		max?: number;
		label?: string;
		class?: string;
		[key: string]: any;
	}

	let {
		value = 0,
		max = 100,
		label = 'Progress',
		class: className = '',
		...rest
	}: Props = $props();

	const valueStore = writable(untrack(() => value ?? 0));

	$effect(() => {
		valueStore.set(value ?? 0);
	});

	const {
		elements: { root },
	} = untrack(() =>
		createProgress({
			max,
			value: valueStore,
		})
	);
</script>

<div
	{...$root}
	use:root
	aria-label={label}
	class={`melt-progress ${className}`.trim()}
	{...rest}
>
	<div
		class="melt-progress-indicator"
		style={`transform: translateX(-${100 - ((value ?? 0) / max) * 100}%)`}
	></div>
</div>
