<script lang="ts">
	import { createSlider } from '$lib/index.js';
	import { untrack } from 'svelte';
	let { componentRoot } = $props();
	const {
		elements: { root, range, thumbs },
	} = createSlider({
		defaultValue: [30],
		min: 0,
		max: 100,
		step: 1,
		rootElement: untrack(() => componentRoot),
	});
</script>

<span {...$root} use:root class="root">
	<span class="range-wrapper">
		<span {...$range} use:range class="range"></span>
	</span>

	<span {...$thumbs[0]} use:thumbs class="thumb"></span>
</span>
