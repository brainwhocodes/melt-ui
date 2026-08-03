<script lang="ts">
	import { createScrollArea } from '$lib/index.js';
	import { flavors } from './flavors.js';

	const {
		elements: { root, content, viewport, corner, scrollbarY, thumbY },
	} = createScrollArea({
		type: 'always',
		dir: 'ltr',
	});
</script>

<div
	{...$root} use:root
	class="surface-a934e10c24"
>
	<div {...$viewport} use:viewport class="surface-648cc6d285">
		<div {...$content} use:content>
			<div class="surface-2b94de4270">
				<h4 class="surface-4938ea2bcc">Endless Flavors</h4>
				{#each flavors as flavor (flavor)}
					<div class="surface-bee69d244d">
						{flavor}
					</div>
					<div role="separator" class="surface-358fc1c803"></div>
				{/each}
			</div>
		</div>
	</div>
	<div
		{...$scrollbarY} use:scrollbarY
		class="surface-e6fa8f43c6"
	>
		<div {...$thumbY} use:thumbY
			class="surface-9d154c6092"></div>
	</div>
	<div {...$corner} use:corner></div>
</div>
