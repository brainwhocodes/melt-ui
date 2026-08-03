<script lang="ts">
	import { createTooltip } from '$lib/index.js';
	import { fade } from 'svelte/transition';

	const {
		elements: { trigger, content, arrow },
		states: { open },
	} = createTooltip({
		forceVisible: true,
		openDelay: 500,
		positioning: {
			strategy: 'fixed',
		},
	});

	export let text = 'Tooltip text';
</script>

<div {...$trigger} use:trigger>
	<slot />
</div>

{#if $open}
	<div
		{...$content} use:content
		in:fade={{ duration: 150 }}
		class="surface-99dc174566"
	>
		<div {...$arrow} use:arrow></div>
		{text}
	</div>
{/if}

<style lang="scss">
	[data-melt-tooltip-trigger] {
		display: grid;
		place-items: center;
	}
</style>
