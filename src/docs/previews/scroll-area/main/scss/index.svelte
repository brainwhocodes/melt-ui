<script lang="ts">
	import { createScrollArea } from '$lib/index.js';
	import { flavors } from './flavors.js';

	const {
		elements: {
			root,
			content,
			viewport,
			corner,
			scrollbarY,
			thumbY,
			thumbX,
			scrollbarX,
		},
	} = createScrollArea({
		type: 'hover',
		dir: 'ltr',
	});
</script>

<div
	{...$root} use:root
	class="surface-6ddc7d3482"
>
	<div {...$viewport} use:viewport class="surface-6331b732cd">
		<div {...$content} use:content>
			<div class="surface-15ce8fff84">
				<h4 class="surface-8c7d2e2fa1">Endless Flavors</h4>
				{#each flavors as flavor (flavor)}
					<div class="surface-3559c9fb37">
						{flavor}
					</div>
					<div role="separator" class="surface-d3135d9df5"></div>
				{/each}
			</div>
		</div>
	</div>
	<div
		{...$scrollbarY} use:scrollbarY
		class="surface-0d31fbe1b8"
	>
		<div {...$thumbY} use:thumbY
			class="surface-a624d48ac3"></div>
	</div>
	<div
		{...$scrollbarX} use:scrollbarX
		class="surface-9b0b7f7c99"
	>
		<div {...$thumbX} use:thumbX class="surface-4d12603572"></div>
	</div>
	<div {...$corner} use:corner></div>
</div>
