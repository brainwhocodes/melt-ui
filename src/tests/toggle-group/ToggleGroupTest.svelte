<script lang="ts" module>
	type T = unknown;
</script>

<script lang="ts" generics="T extends 'single' | 'multiple'">
	import { untrack } from 'svelte';
	import { removeUndefined } from '../utils.js';

	import { createToggleGroup, type CreateToggleGroupProps } from '$lib/index.js';

	interface Props {
		type: T;
		defaultValue?: CreateToggleGroupProps<T>['defaultValue'];
		disabled?: CreateToggleGroupProps['disabled'];
		loop?: CreateToggleGroupProps['loop'];
		onValueChange?: CreateToggleGroupProps<T>['onValueChange'];
		orientation?: CreateToggleGroupProps['orientation'];
		items?: string[];
		value?: CreateToggleGroupProps<T>['value'];
		[key: string]: any
	}

	let {
		type,
		defaultValue = undefined,
		disabled = undefined,
		loop = undefined,
		onValueChange = undefined,
		orientation = undefined,
		items = ['item-1', 'item-2', 'item-3'],
		value = undefined,
		...rest
	}: Props = $props();

	type $$Props = CreateToggleGroupProps<T> & {
		items: string[];
		type: T;
	};

	const {
		elements: { root, item },
	} = createToggleGroup<T>(
		untrack(() => ({
			...removeUndefined({
				type,
				defaultValue,
				disabled,
				loop,
				onValueChange,
				orientation,
				value,
				...rest,
			}),
		}))
	);
</script>

<main>
	<button data-testid="tab-btn">Tab Focus Step button</button>
	<div {...$root} use:root aria-label="root-1" data-testid="root">
		{#each items as tItem}
			<button {...$item(tItem)} use:item data-testid={tItem}>
				{tItem}
			</button>
		{/each}
	</div>
</main>
