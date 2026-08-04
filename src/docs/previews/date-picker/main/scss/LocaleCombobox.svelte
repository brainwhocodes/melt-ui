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
	<div class="surface-d2a2638483">
		<!-- svelte-ignore a11y_label_has_associated_control - $label contains the 'for' attribute -->
		<label {...$label} use:label>
			<span class="surface-c6d6fe68e1">Choose a locale:</span>
		</label>

		<div class="surface-379de5632b">
			<input
				{...$input} use:input
				aria-describedby="disclaimer"
				class="surface-fda534dfa5"
				placeholder="Choose a locale"
			/>
			<div
				class="surface-d52f007728"
			>
				{#if $open}
					<ChevronUp class="surface-fc7838446a" />
				{:else}
					<ChevronDown class="surface-0fb4f7c1a8" />
				{/if}
			</div>
		</div>
		<div id="disclaimer" class="surface-aab13bd276">
			(Not a complete list)
		</div>
	</div>

	{#if $open}
		<ul
			class="force-dark surface-94faa264df"
			{...$menu} use:menu
			transition:fly={{ duration: 150, y: -5 }}
		>
			<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
			<div
				class="surface-f9866ecbf4"
				tabindex="0"
			>
				{#each filteredLocales as locale, index (index)}
					<li
						{...$option(locale)} use:option
						class="surface-50f5bfd694"
					>
						{#if $isSelected(locale.value)}
							<div class="check surface-70704f1654">
								<Check class="surface-babd5f331e" />
							</div>
						{/if}
						<div class="surface-0d6160e2aa">
							<span class="surface-c76ad9f346">{locale.label}</span>
							<span class="surface-b89e33ebc0">{locale.value}</span>
						</div>
					</li>
				{:else}
					<li class="surface-3406ff0c2b">No results found</li>
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
