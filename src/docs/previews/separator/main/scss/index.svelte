<script lang="ts">
	import { createSeparator, type CreateSeparatorProps } from '$lib/index.js';
	import { untrack } from 'svelte';

	interface Props {
		orientation?: CreateSeparatorProps['orientation'];
	}

	let { orientation = 'vertical' }: Props = $props();

	const {
		elements: { root: vertical },
	} = createSeparator({
		orientation: untrack(() => orientation),
	});

	const {
		elements: { root: horizontal },
	} = createSeparator({
		orientation: 'horizontal',
		decorative: true,
	});

	const icecreams = ['Caramel', 'Vanilla', 'Napolitan'];
</script>

<div class="surface-0c6e49f7ee">
	<h2 class="surface-5b6efd9c52">Melt UI</h2>
	<p>Flavors for everyone</p>
	<div {...$horizontal} use:horizontal class="surface-170555e54e"></div>
	<div class="surface-bcd4b084e5">
		{#each icecreams as icecream, i}
			<p>{icecream}</p>
			{#if i !== icecreams.length - 1}
				<div {...$vertical} use:vertical class="surface-a681d05fad"></div>
			{/if}
		{/each}
	</div>
</div>
