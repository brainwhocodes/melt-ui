<script lang="ts">
	import { createScrollArea, melt } from '$lib/index.js';
	import { flavors } from './flavors.js';

	const {
		elements: { root, content, viewport, corner, scrollbarY, thumbY },
	} = createScrollArea({
		type: 'scroll',
		dir: 'ltr',
	});
</script>

<div
	use:melt={$root}
	class="surface-9da6a4a8f0"
>
	<div use:melt={$viewport} class="surface-f11bfea2a8">
		<div use:melt={$content}>
			<div class="surface-007bdd2278">
				<h4 class="surface-4327546173">Endless Flavors</h4>
				{#each flavors as flavor (flavor)}
					<div class="surface-35f184edf7">
						{flavor}
					</div>
					<div role="separator" class="surface-eef1e4b448" />
				{/each}
			</div>
		</div>
	</div>
	<div
		use:melt={$scrollbarY}
		class="surface-61029f1d23"
	>
		<div
			use:melt={$thumbY}
			class="surface-1e183b62db"
		/>
	</div>
	<div use:melt={$corner} />
</div>
