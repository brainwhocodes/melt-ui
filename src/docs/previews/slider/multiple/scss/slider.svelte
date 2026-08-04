<script lang="ts">
	import { createSlider } from '$lib/index.js';
	import { untrack } from 'svelte';
	import type { Writable } from 'svelte/store';

	interface Props {
		value: Writable<number[]>;
		autoSort?: boolean;
	}

	let { value, autoSort = true }: Props = $props();

	const {
		elements: { root, range, thumbs },
	} = createSlider({
		value: untrack(() => value),
		max: 100,
		autoSort: untrack(() => autoSort),
	});
</script>

<span {...$root} use:root class="surface-9f5c4e09af">
	<span class="surface-c1d64ad0d3">
		<span {...$range} use:range class="surface-ad4e3d24cb"></span>
	</span>

	{#each $thumbs as thumb, i}
		<span
			{...thumb} use:thumb.action
			class="surface-d0fef82b8e"
		>
			{i}
		</span>
	{/each}
</span>
