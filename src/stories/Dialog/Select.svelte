<script lang="ts">
	import { createSelect, melt } from '$lib/index.js';
	import { Check, ChevronDown } from '$icons/index.js';

	const {
		elements: { trigger, menu, option, group, groupLabel, label },
		states: { selectedLabel },
		helpers: { isSelected },
	} = createSelect();

	const options = {
		sweet: ['Caramel', 'Chocolate', 'Strawberry', 'Cookies & Cream'],
		savory: ['Basil', 'Bacon', 'Rosemary', 'Balsamic Fig'],
	};
</script>

<div class="surface-67b362f6b8">
	<!-- svelte-ignore a11y-label-has-associated-control - $label contains the 'for' attribute -->
	<label class="surface-1dea140482" use:melt={$label}>Favorite Flavor</label>
	<button
		class="preview-space-y-2  preview-text-magnum-700 surface-f60a65b6ea"
		use:melt={$trigger}
		aria-label="Food"
	>
		{$selectedLabel || 'Select a flavor'}
		<ChevronDown class="surface-940dd0fb5f" />
	</button>
</div>

<div
	class="force-dark preview-layout-col  preview-space-1  surface-60743cb3c5"
	use:melt={$menu}
>
	{#each Object.entries(options) as [key, arr]}
		<div use:melt={$group(key)}>
			<div
				class="surface-fdab6d687d"
				use:melt={$groupLabel(key)}
			>
				{key}
			</div>
			{#each arr as item}
				<div
					class="preview-text-neutral-800  preview-focus-layer-10  preview-focus-text-magnum-700  preview-state-highlighted-text-magnum-900  surface-d47b8e034d"
					use:melt={$option({ value: item, label: item })}
				>
					<div class="check {$isSelected(item) ? 'surface-15a8c2efde' : 'surface-3618708bb3'}">
						<Check class="surface-76606e96cc" />
					</div>

					{item}
				</div>
			{/each}
		</div>
	{/each}
</div>

<style lang="scss">
	.check {
		position: absolute;
		left: 0.5rem;
		top: 50%;
		z-index: 20;
		translate: 0 calc(-50% + 1px);
		color: rgb(var(--color-magnum-500) / 1);
	}
</style>
