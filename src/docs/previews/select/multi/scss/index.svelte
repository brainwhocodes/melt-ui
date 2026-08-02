<script lang="ts">
	import { createSelect, melt } from '$lib/index.js';
	import { Check, ChevronDown } from '$icons/index.js';

	const options = {
		sweet: ['Caramel', 'Chocolate', 'Strawberry', 'Cookies & Cream'],
		savory: ['Basil', 'Bacon', 'Rosemary'],
	};

	const {
		elements: { trigger, menu, option, group, groupLabel, label },
		states: { selectedLabel, open },
		helpers: { isSelected },
	} = createSelect({
		forceVisible: true,
		positioning: {
			placement: 'bottom',
			fitViewport: true,
			sameWidth: true,
		},
		multiple: true,
	});
</script>

<div class="surface-ca38de6c21">
	<!-- svelte-ignore a11y-label-has-associated-control - $label contains the 'for' attribute -->
	<label class="surface-2fe4a725e0" use:melt={$label}>Favorite Flavor</label>
	<button
		class="preview-space-y-2  preview-text-magnum-700 surface-c84e11e71a"
		use:melt={$trigger}
		aria-label="Food"
	>
		{$selectedLabel || 'Select a flavor'}
		<ChevronDown class="surface-37100c1c83" />
	</button>
	{#if $open}
		<div
			class="force-dark preview-layout-col   preview-overflow-y-auto preview-space-1   shadow surface-239bd990aa"
			use:melt={$menu}
		>
			{#each Object.entries(options) as [key, arr]}
				<div use:melt={$group(key)}>
					<div
						class="surface-cfc043286b"
						use:melt={$groupLabel(key)}
					>
						{key}
					</div>
					{#each arr as item}
						<div
							class="preview-text-neutral-800        preview-focus-layer-10 preview-focus-text-magnum-700       preview-state-highlighted-surface-magnum-50 preview-state-selected-surface-magnum-100       preview-state-highlighted-text-magnum-900 surface-ff8be649f8"
							use:melt={$option({ value: item, label: item })}
						>
							<div class="check {$isSelected(item) ? 'surface-d55a355563' : 'surface-9be492add0'}">
								<Check class="surface-7335f27c40" />
							</div>

							{item}
						</div>
					{/each}
				</div>
			{/each}
		</div>
	{/if}
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
