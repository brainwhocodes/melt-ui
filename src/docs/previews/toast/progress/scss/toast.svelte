<script lang="ts">
	import { createProgress, type Toast, type ToastsElements } from '$lib/index.js';
	import { fly } from 'svelte/transition';
	import type { ToastData } from './index.svelte';
	import { X } from '$icons/index.js';
	import { writable } from 'svelte/store';
	import { onMount } from 'svelte';


	interface Props {
		elements: ToastsElements;
		toast: Toast<ToastData>;
	}

	let { elements, toast }: Props = $props();

	const percentage = writable(0);
	const {
		elements: { root: progress },
		options: { max },
	} = createProgress({
		max: 100,
		value: percentage,
	});

	onMount(() => {
		let frame: number;
		const updatePercentage = () => {
			percentage.set(getPercentage());
			frame = requestAnimationFrame(updatePercentage);
		};
		frame = requestAnimationFrame(updatePercentage);

		return () => cancelAnimationFrame(frame);
	});
	let { content, title, description, close } = $derived(elements);
	let { data, id, getPercentage } = $derived(toast);
</script>

<div
	{...$content(id)} use:content
	in:fly={{ duration: 150, x: '100%' }}
	out:fly={{ duration: 150, x: '100%' }}
	class="surface-8aa2baac18"
>
	<div
		{...$progress} use:progress
		class="surface-e2dba7e266"
	>
		<div class="surface-d4f855abb3"
			style={`transform: translateX(-${
				100 - (100 * ($percentage ?? 0)) / ($max ?? 1)
			}%)`}></div>
	</div>

	<div
		class="surface-a59dad107b"
	>
		<div>
			<h3 {...$title(id)} use:title class="surface-6147dc4390">
				{data.title}
				<span class="{data.color} surface-9ce373dfc0"></span>
			</h3>
			<div {...$description(id)} use:description>
				{data.description}
			</div>
		</div>
		<button
			{...$close(id)} use:close
			class="surface-42aa9e703c"
		>
			<X class="surface-fde5d823a6" />
		</button>
	</div>
</div>
