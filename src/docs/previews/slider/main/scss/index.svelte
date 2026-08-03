<script lang="ts">
	import { createSlider } from '$lib/index.js';

	const {
		elements: { root, range, thumbs },
	} = createSlider({
		defaultValue: [30],
		min: 0,
		max: 100,
		step: 1,
	});
</script>

<span {...$root} use:root class="surface-5bf0273fec">
	<span class="surface-37c4f423f6">
		<span {...$range} use:range class="surface-fb4f24d893"></span>
	</span>

	<span {...$thumbs[0]} use:thumbs
		class="surface-328081ae56"></span>
</span>
