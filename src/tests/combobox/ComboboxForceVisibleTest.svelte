<script lang="ts">
	import { createCombobox, type ComboboxOptionProps, type CreateComboboxProps } from '$lib/index.js';
	import { removeUndefined } from '../utils.js';
	import { untrack } from 'svelte';

	interface Props {
		options?: ComboboxOptionProps[];
		multiple?: boolean;
		defaultValue?: string | undefined;
		ids?: CreateComboboxProps<unknown>['ids'];
		onOutsideClick?: CreateComboboxProps<unknown>['onOutsideClick'];
		escapeBehavior?: CreateComboboxProps<unknown>['escapeBehavior'];
	}

	let {
		options = [
		{ label: '1234', value: { id: 1234, station: undefined, lastTransmission: '2023-01-01' } },
		{ label: '4321', value: { id: 4321, station: undefined, lastTransmission: '2023-01-01' } },
		{ label: '2341', value: { id: 2341, station: undefined, lastTransmission: '2023-01-01' } },
		{ label: '3412', value: { id: 3412, station: undefined, lastTransmission: '2023-01-01' } },
		{ label: '5656', value: { id: 5656, station: 'Station 1', lastTransmission: '2023-01-01' } },
	],
		multiple = false,
		defaultValue = undefined,
		ids = undefined,
		onOutsideClick = undefined,
		escapeBehavior = undefined
	}: Props = $props();

	const {
		elements: { menu, input, option, label },
		states: { open, inputValue, selected },
	} = createCombobox(
		removeUndefined(
			untrack(() => ({
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
			}))
		)
	);

	$effect(() => {
		if (!$open) {
			$inputValue = $selected?.label || '';
		}
	});
</script>

<main>
	<button onclick={() => open.update((curr) => !curr)} data-testid="toggle-btn">Toggle Open</button
	>
	<!-- svelte-ignore a11y_label_has_associated_control - $label contains the 'for' attribute -->
	<label {...$label} use:label data-testid="label">Label</label>

	<input {...$input} use:input data-testid="input" />

	{#if $open}
		<ul {...$menu} use:menu data-testid="menu">
			<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
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
