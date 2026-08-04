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

<div class="locale-combobox">
	<div class="surface-dff9595ee6">
		<!-- svelte-ignore a11y_label_has_associated_control - $label contains the 'for' attribute -->
		<label {...$label} use:label>
			<span class="surface-36aefb0453">Choose a locale:</span>
		</label>

		<div class="surface-fae8229465">
			<input
				{...$input} use:input
				aria-describedby="disclaimer"
				class="surface-8a7beb2ce4"
				placeholder="Choose a locale"
			/>
			<div
				class="surface-261e9900bd"
			>
				{#if $open}
					<ChevronUp class="surface-d380a94b38" />
				{:else}
					<ChevronDown class="surface-abe87602de" />
				{/if}
			</div>
		</div>
		<div id="disclaimer" class="surface-f68e388b85">
			(Not a complete list)
		</div>
	</div>

	{#if $open}
		<ul
			class="force-dark surface-9f46fabea5"
			{...$menu} use:menu
			transition:fly={{ duration: 150, y: -5 }}
		>
			<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
			<div
				class="surface-7be715bf4e"
				tabindex="0"
			>
				{#each filteredLocales as locale, index (index)}
					<li
						{...$option(locale)} use:option
						class="surface-578c60cc48"
					>
						{#if $isSelected(locale.value)}
							<div class="check surface-ec8d60513c">
								<Check class="surface-11ef4813aa" />
							</div>
						{/if}
						<div class="surface-1590ccbbc7">
							<span class="surface-7b6383ca8c">{locale.label}</span>
							<span class="surface-5423f96258">{locale.value}</span>
						</div>
					</li>
				{:else}
					<li class="surface-0290010fc7">No results found</li>
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
