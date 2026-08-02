<script lang="ts">
	import { cn } from '$docs/utils/index.js';
	import { createSlider, melt } from '$lib/index.js';

	const {
		elements: { root, range, thumbs },
	} = createSlider({
		defaultValue: [60],
		max: 100,
	});

	let className = '';
	export { className as class };
</script>

<span use:melt={$root} class={cn('surface-e7e7008d6e', className)}>
	<span class="surface-dd799cd8e6">
		<span use:melt={$range} class="surface-62c465f8a3" />
	</span>
	<span
		use:melt={$thumbs[0]}
		class="surface-fef5b8e900"
	/>
</span>
