<script lang="ts">
	import { createSelect, type CreateSelectProps } from '$lib/index.js';
	import { Check } from '$icons/index.js';
	import { tick } from 'svelte';
	import { removeUndefined } from '../utils.js';

	interface Props {
		multiple?: boolean;
		defaultValue?: string | undefined;
		escapeBehavior?: CreateSelectProps['escapeBehavior'];
		closeOnOutsideClick?: boolean;
		ids?: CreateSelectProps['ids'];
		onOutsideClick?: CreateSelectProps['onOutsideClick'];
	}

	let {
		multiple = false,
		defaultValue = undefined,
		escapeBehavior = 'close',
		closeOnOutsideClick = true,
		ids = undefined,
		onOutsideClick = undefined
	}: Props = $props();
	const {
		elements: { trigger, menu, option, group, groupLabel, label },
		states: { selected, selectedLabel },
		helpers: { isSelected },
	} = createSelect(
		removeUndefined({
			multiple,
			defaultSelected: defaultValue
				? {
						value: defaultValue,
						label: defaultValue,
				  }
				: undefined,
			escapeBehavior,
			closeOnOutsideClick,
			ids,
			onOutsideClick,
		})
	);

	let options = $state({
		sweet: ['Caramel', 'Chocolate', 'Strawberry', 'Cookies & Cream'],
		savory: ['Basil', 'Bacon', 'Rosemary', 'Balsamic Fig'],
	});
</script>

<main>
	<label id={$label.id} for={$label.for} use:label data-testid="label">Label</label>
	<button
		onclick={() => {
			selected.set({ value: 'Chocolate', label: 'Chocolate' });
		}}
		data-testid="manual-btn"
	>
		Manual set
	</button>

	<button
		onclick={async () => {
			options.sweet.push('Vanilla');
			// trigger the update
			options = options;
			// Let the DOM update
			await tick();
			selected.set({
				value: 'Vanilla',
				label: 'Vanilla',
			});
		}}
		data-testid="update-btn"
	>
		Update options and set
	</button>

	<button {...$trigger} use:trigger aria-label="Food" data-testid="trigger">
		{$selectedLabel || 'Select an option'}
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="1em"
			height="1em"
			viewBox="0 0 24 24"
			data-testid="icon"
			><path
				fill="none"
				stroke="currentColor"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="m6 9l6 6l6-6"
			/></svg
		>
	</button>

	<div {...$menu} use:menu data-testid="menu">
		{#each Object.entries(options) as [key, arr]}
			<div {...$group(key)} use:group data-testid="group-{key}">
				<div {...$groupLabel(key)} use:groupLabel data-testid="label-{key}">{key}</div>
				{#each arr as item, i}
					<div
						{...$option({ value: item, label: item, disabled: i === 2 })} use:option
						data-testid="{key}-option-{i}"
					>
						{#if $isSelected(item)}
							<div data-testid="check-{i}">
								<Check />
							</div>
						{/if}
						{item}
					</div>
				{/each}
			</div>
		{/each}
	</div>
	<div data-testid="outside"></div>
</main>
