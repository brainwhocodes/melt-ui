<script lang="ts">
	import { createCombobox, type CreateComboboxProps } from '$lib/index.js';
	import { Check, ChevronDown, ChevronUp } from '$icons/index.js';
	import { fly } from 'svelte/transition';
	import { localeOptions } from './locales.js';

	// convert locale option object to array
	const localeOptionsArr = Object.entries(localeOptions).map(
		([value, label]) => ({
			value,
			label,
		}),
	);

	export let onSelectedChange: CreateComboboxProps<string>['onSelectedChange'] =
		undefined;
	export let defaultSelected: CreateComboboxProps<string>['defaultSelected'] = {
		value: 'en-US',
		label: 'English (US)',
	};

	const {
		elements: { menu, input, option, label },
		states: { open, inputValue, touchedInput, selected },
		helpers: { isSelected },
	} = createCombobox<string>({
		forceVisible: true,
		onSelectedChange,
		defaultSelected,
	});

	$: if (!$open) {
		$inputValue = $selected?.label ?? '';
	}

	$: _filteredLocales = localeOptionsArr.filter(({ value, label }) => {
		const normalizedInput = $inputValue.toLowerCase();
		return (
			value.toLowerCase().includes(normalizedInput) ||
			label.toLowerCase().includes(normalizedInput)
		);
	});

	$: filteredLocales = $touchedInput ? _filteredLocales : localeOptionsArr;
</script>

<div class="surface-7eb200ab16">
	<div class="surface-9977ef8937">
		<!-- svelte-ignore a11y-label-has-associated-control - $label contains the 'for' attribute -->
		<label {...$label} use:label>
			<span class="surface-21ed0aee5a">Choose a locale:</span>
		</label>

		<div class="surface-9b1a19b6c3">
			<input
				{...$input} use:input
				aria-describedby="disclaimer"
				class="surface-d1312f8f52"
				placeholder="Choose a locale"
			/>
			<div
				class="surface-898a979573"
			>
				{#if $open}
					<ChevronUp class="surface-40e8e35ae4" />
				{:else}
					<ChevronDown class="surface-ad7c8fca08" />
				{/if}
			</div>
		</div>
		<div id="disclaimer" class="surface-bb55b928da">
			(Not a complete list)
		</div>
	</div>

	{#if $open}
		<ul
			class="force-dark surface-be199ba434"
			{...$menu} use:menu
			transition:fly={{ duration: 150, y: -5 }}
		>
			<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
			<div
				class="surface-9f2d23a30e"
				tabindex="0"
			>
				{#each filteredLocales as locale, index (index)}
					<li
						{...$option(locale)} use:option
						class="surface-8182d6c52a"
					>
						{#if $isSelected(locale.value)}
							<div class="check surface-52b6cdb8ef">
								<Check class="surface-0b6f6fde57" />
							</div>
						{/if}
						<div class="surface-aa96e803e6">
							<span class="surface-7310a8850e">{locale.label}</span>
							<span class="surface-5c8e540ac7">{locale.value}</span>
						</div>
					</li>
				{:else}
					<li class="surface-1f0a3f8d63">No results found</li>
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
