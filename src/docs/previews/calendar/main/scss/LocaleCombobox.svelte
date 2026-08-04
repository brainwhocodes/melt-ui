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

<div class="surface-82807e3abe">
	<div class="surface-c9f174b904">
		<!-- svelte-ignore a11y_label_has_associated_control - $label contains the 'for' attribute -->
		<label {...$label} use:label>
			<span class="surface-cc30321937">Choose a locale:</span>
		</label>

		<div class="surface-11fbc02f4b">
			<input
				{...$input} use:input
				aria-describedby="disclaimer"
				class="surface-f3096f1964"
				placeholder="Choose a locale"
			/>
			<div
				class="surface-36cf2fb786"
			>
				{#if $open}
					<ChevronUp class="surface-9e9a376521" />
				{:else}
					<ChevronDown class="surface-f5b6e52b6b" />
				{/if}
			</div>
		</div>
		<div id="disclaimer" class="surface-c248661a30">
			(Not a complete list)
		</div>
	</div>

	{#if $open}
		<ul
			class="force-dark surface-cc107273c4"
			{...$menu} use:menu
			transition:fly={{ duration: 150, y: -5 }}
		>
			<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
			<div
				class="surface-72fc7d1fe6"
				tabindex="0"
			>
				{#each filteredLocales as locale, index (index)}
					<li
						{...$option(locale)} use:option
						class="surface-fb7dd35233"
					>
						{#if $isSelected(locale.value)}
							<div class="check surface-2e993a990f">
								<Check class="surface-881eb607e3" />
							</div>
						{/if}
						<div class="surface-163c9a07d9">
							<span class="surface-c54f60217d">{locale.label}</span>
							<span class="surface-62dd69735f">{locale.value}</span>
						</div>
					</li>
				{:else}
					<li class="surface-6111c4c53a">No results found</li>
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
