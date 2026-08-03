<script lang="ts">
	import { createSlider } from '$lib/index.js';

	const {
		elements: { root, range, thumbs },
	} = createSlider({
		defaultValue: [20, 80],
		max: 100,
	});
</script>

<span {...$root} use:root class="surface-52427b4958">
	<span class="surface-70b1818073">
		<span {...$range} use:range class="surface-267dd01d1d"></span>
	</span>

	{#each $thumbs as thumb}
		<span {...thumb} use:thumb.action
			class="surface-a4e04f2139"></span>
	{/each}
</span>
