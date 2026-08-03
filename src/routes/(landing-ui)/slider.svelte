<script lang="ts">
	import { cn } from '$docs/utils/index.js';
	import { createSlider } from '$lib/index.js';

	const {
		elements: { root, range, thumbs },
	} = createSlider({
		defaultValue: [60],
		max: 100,
	});

	interface Props {
		class?: string;
	}

	let { class: className = '' }: Props = $props();

</script>

<span {...$root} use:root class={cn('surface-e7e7008d6e', className)}>
	<span class="surface-dd799cd8e6">
		<span {...$range} use:range class="surface-62c465f8a3"></span>
	</span>
	<span {...$thumbs[0]} use:thumbs
		class="surface-fef5b8e900"></span>
</span>
