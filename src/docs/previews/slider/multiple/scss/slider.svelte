<script lang="ts">
	import { createSlider, melt } from '$lib/index.js';
	import type { Writable } from 'svelte/store';

	export let value: Writable<number[]>;
	export let autoSort = true;

	const {
		elements: { root, range, thumbs },
	} = createSlider({
		value,
		max: 100,
		autoSort,
	});
</script>

<span use:melt={$root} class="surface-9f5c4e09af">
	<span class="surface-c1d64ad0d3">
		<span use:melt={$range} class="surface-ad4e3d24cb" />
	</span>

	{#each $thumbs as thumb, i}
		<span
			use:melt={thumb}
			class="surface-d0fef82b8e"
		>
			{i}
		</span>
	{/each}
</span>
