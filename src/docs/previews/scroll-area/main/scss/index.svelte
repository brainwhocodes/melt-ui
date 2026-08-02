<script lang="ts">
	import { createScrollArea, melt } from '$lib/index.js';
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
	use:melt={$root}
	class="surface-6ddc7d3482"
>
	<div use:melt={$viewport} class="surface-6331b732cd">
		<div use:melt={$content}>
			<div class="surface-15ce8fff84">
				<h4 class="surface-8c7d2e2fa1">Endless Flavors</h4>
				{#each flavors as flavor (flavor)}
					<div class="surface-3559c9fb37">
						{flavor}
					</div>
					<div role="separator" class="surface-d3135d9df5" />
				{/each}
			</div>
		</div>
	</div>
	<div
		use:melt={$scrollbarY}
		class="surface-0d31fbe1b8"
	>
		<div
			use:melt={$thumbY}
			class="surface-a624d48ac3"
		/>
	</div>
	<div
		use:melt={$scrollbarX}
		class="surface-9b0b7f7c99"
	>
		<div use:melt={$thumbX} class="surface-4d12603572" />
	</div>
	<div use:melt={$corner} />
</div>
