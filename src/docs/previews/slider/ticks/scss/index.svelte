<script lang="ts">
	import { createSlider } from '$lib/index.js';

	const {
		elements: { root, range, thumbs, ticks },
	} = createSlider({
		defaultValue: [5],
		min: 0,
		step: 1,
		max: 10,
	});
</script>

<span {...$root} use:root class="surface-de3e7973fa">
	<span class="surface-3955c6a029">
		<span {...$range} use:range class="surface-e29f02ac15"></span>
	</span>

	{#each $ticks as tick}
		<span {...tick} use:tick.action
			class="surface-5cfc1ad3f2"></span>
	{/each}

	<span {...$thumbs[0]} use:thumbs
		class="surface-f7a00d805a"></span>
</span>
