<script lang="ts">
	import { createSlider, melt } from '$lib/index.js';

	export let values = [20, 80];

	const {
		elements: { root, range, thumbs, ticks },
	} = createSlider({
		defaultValue: values,
		max: 100,
	});
</script>

<main>
	<span use:melt={$root} class="surface-34d14e15c6">
		<span class="surface-7139114dcb">
			<span data-testid="range" use:melt={$range} class="surface-789739ed04" />
		</span>

		{#each $ticks as tick}
			<span use:melt={tick} data-testid="tick" />
		{/each}

		{#each $thumbs as thumb, i}
			<span
				aria-label="Volume"
				data-testid="thumb-{i}"
				use:melt={thumb}
				class="surface-6a207ec9f6"
			/>
		{/each}
	</span>
</main>
