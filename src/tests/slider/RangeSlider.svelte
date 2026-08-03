<script lang="ts">
	import { createSlider } from '$lib/index.js';

	export let values = [20, 80];

	const {
		elements: { root, range, thumbs, ticks },
	} = createSlider({
		defaultValue: values,
		max: 100,
	});
</script>

<main>
	<span {...$root} use:root class="surface-34d14e15c6">
		<span class="surface-7139114dcb">
			<span data-testid="range" {...$range} use:range class="surface-789739ed04"></span>
		</span>

		{#each $ticks as tick}
			<span {...tick} use:tick.action data-testid="tick"></span>
		{/each}

		{#each $thumbs as thumb, i}
			<span aria-label="Volume"
				data-testid="thumb-{i}"
				{...thumb} use:thumb.action
				class="surface-6a207ec9f6"></span>
		{/each}
	</span>
</main>
