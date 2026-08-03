<script lang="ts">
	import { createScrollArea } from '$lib/index.js';
	import { flavors } from './flavors.js';

	const {
		elements: { root, content, viewport, corner, scrollbarY, thumbY },
	} = createScrollArea({
		type: 'hover',
		dir: 'ltr',
	});
</script>

<div
	{...$root} use:root
	class="surface-5834be83e1"
>
	<div {...$viewport} use:viewport class="surface-91e0b9cb03">
		<div {...$content} use:content>
			<div class="surface-2975649e0c">
				<h4 class="surface-a491bab293">Endless Flavors</h4>
				{#each flavors as flavor (flavor)}
					<div class="surface-89a93daad8">
						{flavor}
					</div>
					<div role="separator" class="surface-b4285b35a2"></div>
				{/each}
			</div>
		</div>
	</div>
	<div
		{...$scrollbarY} use:scrollbarY
		class="surface-2440f9e9d3"
	>
		<div {...$thumbY} use:thumbY
			class="surface-f9c5a552e8"></div>
	</div>
	<div {...$corner} use:corner></div>
</div>
