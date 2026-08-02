<script lang="ts">
	import { createSlider, melt } from '$lib/index.js';

	const {
		elements: { root, range, thumbs },
	} = createSlider({
		defaultValue: [20, 80],
		max: 100,
	});
</script>

<span use:melt={$root} class="surface-52427b4958">
	<span class="surface-70b1818073">
		<span use:melt={$range} class="surface-267dd01d1d" />
	</span>

	{#each $thumbs as thumb}
		<span
			use:melt={thumb}
			class="surface-a4e04f2139"
		/>
	{/each}
</span>
