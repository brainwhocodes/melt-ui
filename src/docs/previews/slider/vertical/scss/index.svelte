<script lang="ts">
	import { createSlider } from '$lib/index.js';

	const {
		elements: { root, range, thumbs },
	} = createSlider({
		defaultValue: [30],
		max: 100,
		orientation: 'vertical',
	});
</script>

<span
	{...$root} use:root
	class="surface-cdbb39e5ca"
>
	<span class="surface-126bb69486">
		<span {...$range} use:range class="surface-434da3e699"></span>
	</span>

	<span {...$thumbs[0]} use:thumbs
		class="surface-9aa1233213"></span>
</span>
