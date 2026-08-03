<script lang="ts">
	import { createSlider } from '$lib/index.js';

	const {
		elements: { root, range, thumbs },
	} = createSlider({
		dir: 'rtl',
		defaultValue: [30],
		max: 100,
	});
</script>

<span {...$root} use:root class="surface-7c328eabac">
	<span class="surface-fe92616aad">
		<span {...$range} use:range class="surface-7c434c827e"></span>
	</span>

	<span {...$thumbs[0]} use:thumbs
		class="surface-df0e6c9a28"></span>
</span>
