<script lang="ts">
	import { Check, ChevronDown } from '$icons/index.js';
	import { createSelect, type CreateToasterProps } from '$lib/index.js';
	import { fade } from 'svelte/transition';

	const options: { value: CreateToasterProps['hover']; label: string }[] = [
		{ value: 'pause', label: 'pause' },
		{ value: 'pause-all', label: 'pause-all' },
		{ value: null, label: 'null' },
	];

	const {
		elements: { trigger, menu, option, label },
		states: { selected, selectedLabel, open },
		helpers: { isSelected },
	} = createSelect<CreateToasterProps['hover']>({
		forceVisible: true,
		positioning: {
			placement: 'bottom',
			fitViewport: true,
			sameWidth: true,
		},
		defaultSelected: { value: 'pause', label: 'pause' },
	});

	export let value: CreateToasterProps['hover'];

	$: value = $selected?.value;
</script>

<div class="surface-c1ea41ee43">
	<div class="surface-3583548e35">
		<!-- svelte-ignore a11y-label-has-associated-control - $label contains the 'for' attribute -->
		<label class="surface-5521ca0221" {...$label} use:label> Hover behavior : </label>
		<button
			class="surface-e08e8a514e"
			{...$trigger} use:trigger
			aria-label="Hover behavior"
		>
			{$selectedLabel || 'Select hover behavior'}
			<ChevronDown class="surface-2265f0736b" />
		</button>
		{#if $open}
			<div
				class="force-dark surface-b060a936ff"
				{...$menu} use:menu
				transition:fade={{ duration: 150 }}
			>
				{#each options as { value, label }}
					<div
						class="surface-b732ad1651"
						{...$option({ value, label })} use:option
					>
						<div class="check {$isSelected(value) ? 'preview-block' : 'preview-hidden'}">
							<Check class="surface-42122945c4" />
						</div>

						{label}
					</div>
				{/each}
			</div>
		{/if}
	</div>
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
