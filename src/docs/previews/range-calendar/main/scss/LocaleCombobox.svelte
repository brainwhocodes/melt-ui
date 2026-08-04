<script lang="ts">
	import { createCombobox, type CreateComboboxProps } from '$lib/index.js';
	import { Check, ChevronDown, ChevronUp } from '$icons/index.js';
	import { untrack } from 'svelte';
	import { fly } from 'svelte/transition';
	import { localeOptions } from './locales.js';

	// convert locale option object to array
	const localeOptionsArr = Object.entries(localeOptions).map(
		([value, label]) => ({
			value,
			label,
		}),
	);

	interface Props {
		onSelectedChange?: CreateComboboxProps<string>['onSelectedChange'];
		defaultSelected?: CreateComboboxProps<string>['defaultSelected'];
	}

	let { onSelectedChange = undefined, defaultSelected = {
		value: 'en-US',
		label: 'English (US)',
	} }: Props = $props();

	const {
		elements: { menu, input, option, label },
		states: { open, inputValue, touchedInput, selected },
		helpers: { isSelected },
	} = createCombobox<string>({
		forceVisible: true,
		onSelectedChange: untrack(() => onSelectedChange),
		defaultSelected: untrack(() => defaultSelected),
	});

	$effect(() => {
		if (!$open) {
			$inputValue = $selected?.label ?? '';
		}
	});

	let _filteredLocales = $derived(localeOptionsArr.filter(({ value, label }) => {
		const normalizedInput = $inputValue.toLowerCase();
		return (
			value.toLowerCase().includes(normalizedInput) ||
			label.toLowerCase().includes(normalizedInput)
		);
	}));

	let filteredLocales = $derived($touchedInput ? _filteredLocales : localeOptionsArr);
</script>

<div class="surface-7bd5178f31">
	<div class="surface-2816c01d1f">
		<!-- svelte-ignore a11y_label_has_associated_control - $label contains the 'for' attribute -->
		<label {...$label} use:label>
			<span class="surface-7ebab17818">Choose a locale:</span>
		</label>

		<div class="surface-4a336483c4">
			<input
				{...$input} use:input
				aria-describedby="disclaimer"
				class="surface-124725f639"
				placeholder="Choose a locale"
			/>
			<div
				class="surface-200410f8c9"
			>
				{#if $open}
					<ChevronUp class="surface-e900d6835f" />
				{:else}
					<ChevronDown class="surface-67ce004fae" />
				{/if}
			</div>
		</div>
		<div id="disclaimer" class="surface-abfcc2ae65">
			(Not a complete list)
		</div>
	</div>

	{#if $open}
		<ul
			class="force-dark surface-b5d3261e40"
			{...$menu} use:menu
			transition:fly={{ duration: 150, y: -5 }}
		>
			<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
			<div
				class="surface-64e5d133c3"
				tabindex="0"
			>
				{#each filteredLocales as locale, index (index)}
					<li
						{...$option(locale)} use:option
						class="surface-0069734577"
					>
						{#if $isSelected(locale.value)}
							<div class="check surface-58e6ca592a">
								<Check class="surface-15f60e7394" />
							</div>
						{/if}
						<div class="surface-a8059e4017">
							<span class="surface-8f8d419644">{locale.label}</span>
							<span class="surface-5ec057775a">{locale.value}</span>
						</div>
					</li>
				{:else}
					<li class="surface-524aaf1cba">No results found</li>
				{/each}
			</div>
		</ul>
	{/if}
</div>

<style lang="scss">
	.check {
		position: absolute;
		left: 0.5rem;
		top: 50%;

		color: rgb(var(--color-magnum-500) / 1);
		translate: 0 calc(-50% + 1px)
}
</style>
