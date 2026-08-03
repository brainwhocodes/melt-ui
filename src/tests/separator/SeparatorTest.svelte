<script lang="ts">
	import type { Orientation } from '$lib/internal/types.js';
	import { createSeparator } from '$lib/index.js';

	interface Props {
		orientation?: Orientation;
	}

	let { orientation = 'vertical' }: Props = $props();

	const {
		elements: { root: vertical },
	} = createSeparator({
		orientation,
	});

	const {
		elements: { root: horizontalSeparator },
	} = createSeparator({
		orientation: 'horizontal',
		decorative: true,
	});
</script>

<div>
	<h2>Separator</h2>
	<div {...$horizontalSeparator} use:horizontalSeparator data-testid="horizontal"></div>
	<div>
		<p>Part 1</p>
		<div {...$vertical} use:vertical data-testid="vertical"></div>
		<p>Part 2</p>
	</div>
</div>
