<script lang="ts">
	import { createSelect, type MeltEventHandler } from '$lib/index.js';
	import { Check, ChevronDown } from '$icons/index.js';

	const options = {
		sweet: ['Caramel', 'Chocolate', 'Strawberry', 'Cookies & Cream'],
		savory: ['Basil', 'Bacon', 'Rosemary'],
	};

	const {
		elements: { trigger, menu, option, group, groupLabel, label },
		states: { selectedLabel, open, selected },
		helpers: { isSelected },
	} = createSelect({
		forceVisible: true,
		positioning: {
			placement: 'bottom',
			fitViewport: true,
			sameWidth: true,
		},
	});
</script>

<div class="surface-0531d5c50c">
	<!-- svelte-ignore a11y_label_has_associated_control - $label contains the 'for' attribute -->
	<label class="surface-aa39525f79" {...$label} use:label>Favorite Flavor</label>
	<button
		class="preview-space-y-2  preview-text-magnum-700 surface-ca5b268fe6"
		{...$trigger} use:trigger
		onm-keydown={(e: Parameters<MeltEventHandler<KeyboardEvent>>[0]) => {
			e.preventDefault(); // Cancel default builder behabiour
			e.detail.originalEvent.preventDefault(); // Cancel page scroll

			const { key } = e.detail.originalEvent;

			if (!['ArrowDown', 'ArrowUp', 'Space', 'Enter'].includes(key)) return;

			const allOptions = Object.values(options).flat();
			const index = allOptions.indexOf(`${$selectedLabel}`);

			if (key === 'ArrowDown') {
				const nextIndex = index + 1;
				const nextOption = allOptions[nextIndex] || allOptions[0];
				selected.set({ value: nextOption, label: nextOption });
			} else if (key === 'ArrowUp') {
				const prevIndex = index - 1;
				const prevOption =
					allOptions[prevIndex] || allOptions[allOptions.length - 1];
				selected.set({ value: prevOption, label: prevOption });
			} else {
				open.set(true);
			}
		}}
		aria-label="Food"
	>
		{$selectedLabel || 'Select a flavor'}
		<ChevronDown class="surface-c723faebfb" />
	</button>
	{#if $open}
		<div
			class="force-dark preview-layout-col   preview-overflow-y-auto preview-space-1   shadow surface-e2d2d38e77"
			{...$menu} use:menu
		>
			{#each Object.entries(options) as [key, arr]}
				<div {...$group(key)} use:group>
					<div
						class="surface-b71ec5a9e2"
						{...$groupLabel(key)} use:groupLabel
					>
						{key}
					</div>
					{#each arr as item}
						<div
							class="preview-text-neutral-800        preview-focus-layer-10 preview-focus-text-magnum-700       preview-state-highlighted-surface-magnum-50 preview-state-selected-surface-magnum-100       preview-state-highlighted-text-magnum-900 surface-7f5bf9e9fe"
							{...$option({ value: item, label: item })} use:option
						>
							<div class="check {$isSelected(item) ? 'surface-07d6764874' : 'surface-f6fdce7496'}">
								<Check class="surface-dfd2993032" />
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
