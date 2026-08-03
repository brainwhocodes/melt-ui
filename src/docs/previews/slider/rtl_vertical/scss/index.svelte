<script lang="ts">
	import { createSlider } from '$lib/index.js';

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
	{...$root} use:root
	class="surface-88d647dfee"
>
	<span class="surface-04433213a5">
		<span {...$range} use:range class="surface-2cdd903c61"></span>
	</span>

	<span {...$thumbs[0]} use:thumbs
		class="surface-e52a1eb723"></span>
</span>
