<script lang="ts">
	import { createSlider, melt } from '$lib/index.js';

	const {
		elements: { root, range, thumbs },
	} = createSlider({
		dir: 'rtl',
		defaultValue: [30],
		max: 100,
	});
</script>

<span use:melt={$root} class="surface-7c328eabac">
	<span class="surface-fe92616aad">
		<span use:melt={$range} class="surface-7c434c827e" />
	</span>

	<span
		use:melt={$thumbs[0]}
		class="surface-df0e6c9a28"
	/>
</span>
