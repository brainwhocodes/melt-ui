<script lang="ts">
	import { createCombobox, type ComboboxOptionProps, type CreateComboboxProps } from '$lib/index.js';
	import { removeUndefined } from '../utils.js';

	export let options: ComboboxOptionProps[] = [
		{ label: '1234', value: { id: 1234, station: undefined, lastTransmission: '2023-01-01' } },
		{ label: '4321', value: { id: 4321, station: undefined, lastTransmission: '2023-01-01' } },
		{ label: '2341', value: { id: 2341, station: undefined, lastTransmission: '2023-01-01' } },
		{ label: '3412', value: { id: 3412, station: undefined, lastTransmission: '2023-01-01' } },
		{ label: '5656', value: { id: 5656, station: 'Station 1', lastTransmission: '2023-01-01' } },
	];
	export let multiple = false;
	export let defaultValue: string | undefined = undefined;
	export let ids: CreateComboboxProps<unknown>['ids'] = undefined;
	export let onOutsideClick: CreateComboboxProps<unknown>['onOutsideClick'] = undefined;
	export let escapeBehavior: CreateComboboxProps<unknown>['escapeBehavior'] = undefined;

	const {
		elements: { menu, input, option, label },
		states: { open, inputValue, selected },
	} = createCombobox(
		removeUndefined({
			multiple,
			defaultSelected: defaultValue
				? {
						value: defaultValue,
						label: defaultValue,
				  }
				: undefined,
			ids,
			onOutsideClick,
			escapeBehavior,
			forceVisible: true,
		})
	);

	$: if (!$open) {
		$inputValue = $selected?.label || '';
	}
</script>

<main>
	<button on:click={() => open.update((curr) => !curr)} data-testid="toggle-btn">Toggle Open</button
	>
	<!-- svelte-ignore a11y-label-has-associated-control - $label contains the 'for' attribute -->
	<label {...$label} use:label data-testid="label">Label</label>

	<input {...$input} use:input data-testid="input" />

	{#if $open}
		<ul {...$menu} use:menu data-testid="menu">
			<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
			<div tabindex="0">
				{#each options as o, index (index)}
					<li {...$option(o)} use:option>
						<div>
							<span>{o.label}</span>
							<span>{o.value}</span>
						</div>
					</li>
				{:else}
					<li>No results found</li>
				{/each}
			</div>
		</ul>
	{/if}
	<div data-testid="outside-click"></div>
</main>
