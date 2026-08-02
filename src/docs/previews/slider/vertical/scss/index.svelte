<script lang="ts">
	import { createSlider, melt } from '$lib/index.js';

	const {
		elements: { root, range, thumbs },
	} = createSlider({
		defaultValue: [30],
		max: 100,
		orientation: 'vertical',
	});
</script>

<span
	use:melt={$root}
	class="surface-cdbb39e5ca"
>
	<span class="surface-126bb69486">
		<span use:melt={$range} class="surface-434da3e699" />
	</span>

	<span
		use:melt={$thumbs[0]}
		class="surface-9aa1233213"
	/>
</span>
