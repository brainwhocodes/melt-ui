<script lang="ts">
	import {
		createSeparator,
		melt,
		type CreateSeparatorProps,
	} from '$lib/index.js';

	export let orientation: CreateSeparatorProps['orientation'] = 'vertical';

	const {
		elements: { root: vertical },
	} = createSeparator({
		orientation,
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
	<div use:melt={$horizontal} class="surface-170555e54e" />
	<div class="surface-bcd4b084e5">
		{#each icecreams as icecream, i}
			<p>{icecream}</p>
			{#if i !== icecreams.length - 1}
				<div use:melt={$vertical} class="surface-a681d05fad" />
			{/if}
		{/each}
	</div>
</div>
