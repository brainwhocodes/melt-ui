<script lang="ts">
	import { Check, ChevronDown } from '$icons/index.js';
	import { createSelect, melt } from '$lib/index.js';
	import { fade } from 'svelte/transition';

	const options = {
		sweet: ['Caramel', 'Chocolate', 'Strawberry', 'Cookies & Cream'],
		savory: ['Basil', 'Bacon', 'Rosemary'],
	};

	const {
		elements: { trigger, menu, option, group, groupLabel, label },
		states: { selectedLabel, open },
		helpers: { isSelected },
	} = createSelect<string>({
		forceVisible: true,
		positioning: {
			placement: 'bottom',
			fitViewport: true,
			sameWidth: true,
		},
	});
</script>

<div class="surface-4145c008d6">
	<!-- svelte-ignore a11y-label-has-associated-control - $label contains the 'for' attribute -->
	<label class="surface-104df70846" use:melt={$label}>Favorite Flavor</label>
	<button
		class="preview-space-y-2  preview-text-magnum-700 surface-0326f8a046"
		use:melt={$trigger}
		aria-label="Food"
	>
		{$selectedLabel || 'Select a flavor'}
		<ChevronDown class="surface-f6a6914525" />
	</button>
	{#if $open}
		<div
			class="force-dark preview-layout-col   preview-overflow-y-auto preview-space-1   shadow surface-9f4d6c3268"
			use:melt={$menu}
			transition:fade={{ duration: 150 }}
		>
			{#each Object.entries(options) as [key, arr]}
				<div use:melt={$group(key)}>
					<div
						class="surface-3cc2ac5f5a"
						use:melt={$groupLabel(key)}
					>
						{key}
					</div>
					{#each arr as item}
						<div
							class="preview-text-neutral-800        preview-hover-surface-magnum-100 preview-focus-layer-10        preview-focus-text-magnum-700        preview-state-highlighted-surface-magnum-200 preview-state-highlighted-text-magnum-900        preview-state-disabled-opacity-50 surface-6185227915"
							use:melt={$option({ value: item, label: item })}
						>
							<div class="check {$isSelected(item) ? 'surface-bb5fcd807d' : 'surface-cef5dadc6c'}">
								<Check class="surface-5a14f4aaac" />
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
