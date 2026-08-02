<script lang="ts">
	import { createSlider, melt } from '$lib/index.js';

	const {
		elements: { root, range, thumbs, ticks },
	} = createSlider({
		defaultValue: [5],
		min: 0,
		step: 1,
		max: 10,
	});
</script>

<span use:melt={$root} class="surface-de3e7973fa">
	<span class="surface-3955c6a029">
		<span use:melt={$range} class="surface-e29f02ac15" />
	</span>

	{#each $ticks as tick}
		<span
			use:melt={tick}
			class="surface-5cfc1ad3f2"
		/>
	{/each}

	<span
		use:melt={$thumbs[0]}
		class="surface-f7a00d805a"
	/>
</span>
