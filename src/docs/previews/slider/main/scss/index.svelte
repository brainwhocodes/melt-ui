<script lang="ts">
	import { createSlider, melt } from '$lib/index.js';

	const {
		elements: { root, range, thumbs },
	} = createSlider({
		defaultValue: [30],
		min: 0,
		max: 100,
		step: 1,
	});
</script>

<span use:melt={$root} class="surface-5bf0273fec">
	<span class="surface-37c4f423f6">
		<span use:melt={$range} class="surface-fb4f24d893" />
	</span>

	<span
		use:melt={$thumbs[0]}
		class="surface-328081ae56"
	/>
</span>
