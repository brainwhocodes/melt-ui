<script lang="ts">
	import { createToggle } from '$lib/index.js';
	import { Italic } from '$icons/index.js';

	const {
		elements: { root },
	} = createToggle();
</script>

<button
	{...$root} use:root
	aria-label="Toggle italic"
	class="preview-shape-md  preview-surface-white preview-hover-surface-magnum-100  preview-state-state-surface-magnum-200  surface-d1c53d6e71"
>
	<Italic class="surface-f1dd14a825" />
</button>
