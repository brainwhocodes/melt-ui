<script lang="ts">
	import { createProgress } from '$lib/index.js';
	import { writable } from 'svelte/store';

	const value = writable(30);

	const {
		elements: { root },
		options: { max },
	} = createProgress({
		value,
		max: 100,
	});

	const sleep = (ms: number) =>
		new Promise((resolve) => setTimeout(resolve, ms));
	sleep(1000).then(() => {
		value.set(75);
	});
</script>

<div
	{...$root} use:root
	class="surface-f0d6ce4666"
>
	<div class="preview-motion-cubic-bezier-0-65-0-0-35-1 surface-59be3f4c2e"
		style={`transform: translateX(-${
			100 - (100 * ($value ?? 0)) / ($max ?? 1)
		}%)`}></div>
</div>
