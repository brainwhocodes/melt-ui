<script lang="ts">
	import { createSelect, type CreateSelectProps } from '$lib/index.js';
	import { Check, ChevronDown } from '$icons/index.js';
	import { fade } from 'svelte/transition';

	const months = {
		1: 'January',
		2: 'February',
		3: 'March',
		4: 'April',
		5: 'May',
		6: 'June',
		7: 'July',
		8: 'August',
		9: 'September',
		10: 'October',
		11: 'November',
		12: 'December',
	} as const;

	interface Props {
		onSelectedChange?: CreateSelectProps<number>['onSelectedChange'];
		selected?: CreateSelectProps<number>['selected'];
	}

	let { onSelectedChange = undefined, selected = undefined }: Props = $props();
	const {
		elements: { trigger, menu, option, label },
		states: { selectedLabel, open },
		helpers: { isSelected },
	} = createSelect<number>({
		forceVisible: true,
		positioning: {
			placement: 'bottom',
			fitViewport: true,
			sameWidth: true,
		},
		onSelectedChange,
		selected,
	});
</script>

<div class="surface-a5503573b6">
	<!-- svelte-ignore a11y_label_has_associated_control - $label contains the 'for' attribute -->
	<label class="surface-8a71880ce8" {...$label} use:label
		>Select a month</label
	>
	<button
		class="surface-80a257f89f"
		{...$trigger} use:trigger
		aria-label="Food"
	>
		{$selectedLabel || 'Select a month'}
		<ChevronDown class="surface-cdb1a63a16" />
	</button>

	{#if $open}
		<div
			class="surface-5fb0e6e853"
			{...$menu} use:menu
			transition:fade={{ duration: 150 }}
		>
			{#each Object.entries(months) as [value, label]}
				<div
					class="surface-ebfedfb119"
					{...$option({ value, label })} use:option
				>
					<div class="check {$isSelected(value) ? 'preview-block' : 'preview-hidden'}">
						<Check class="surface-d7af6fc67e" />
					</div>
					{label}
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
