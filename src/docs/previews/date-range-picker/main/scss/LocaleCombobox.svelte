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

<div class="surface-ff8de5d51f">
	<div class="surface-ecf4b54356">
		<!-- svelte-ignore a11y-label-has-associated-control - $label contains the 'for' attribute -->
		<label {...$label} use:label>
			<span class="surface-8663b091ee">Choose a locale:</span>
		</label>

		<div class="surface-627952bbe6">
			<input
				{...$input} use:input
				aria-describedby="disclaimer"
				class="surface-db6af932d9"
				placeholder="Choose a locale"
			/>
			<div
				class="surface-6dffae44d6"
			>
				{#if $open}
					<ChevronUp class="surface-3c4434d1da" />
				{:else}
					<ChevronDown class="surface-343d2e0ad6" />
				{/if}
			</div>
		</div>
		<div id="disclaimer" class="surface-deb8f470bc">
			(Not a complete list)
		</div>
	</div>

	{#if $open}
		<ul
			class="force-dark surface-5071174a5e"
			{...$menu} use:menu
			transition:fly={{ duration: 150, y: -5 }}
		>
			<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
			<div
				class="surface-aaf696ae38"
				tabindex="0"
			>
				{#each filteredLocales as locale, index (index)}
					<li
						{...$option(locale)} use:option
						class="surface-6bb2965dfd"
					>
						{#if $isSelected(locale.value)}
							<div class="check surface-9c2e4cce4d">
								<Check class="surface-237ea98ee2" />
							</div>
						{/if}
						<div class="surface-e8183f8ed4">
							<span class="surface-0a49e3c697">{locale.label}</span>
							<span class="surface-80e3242d2b">{locale.value}</span>
						</div>
					</li>
				{:else}
					<li class="surface-f5cdf1842c">No results found</li>
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
