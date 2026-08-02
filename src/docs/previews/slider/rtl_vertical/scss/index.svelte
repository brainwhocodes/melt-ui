<script lang="ts">
	import { createSlider, melt } from '$lib/index.js';

	const {
		elements: { root, range, thumbs },
	} = createSlider({
		dir: 'rtl',
		orientation: 'vertical',
		defaultValue: [30],
		max: 100,
	});
</script>

<span
	use:melt={$root}
	class="surface-88d647dfee"
>
	<span class="surface-04433213a5">
		<span use:melt={$range} class="surface-2cdd903c61" />
	</span>

	<span
		use:melt={$thumbs[0]}
		class="surface-e52a1eb723"
	/>
</span>
