<script lang="ts">
	import { createSelect, type CreateSelectProps } from '$lib/index.js';
	import { initLevel } from './level.js';

	interface Props {
		portal: CreateSelectProps['portal'];
		forceVisible: CreateSelectProps['forceVisible'];
		children?: import('svelte').Snippet;
	}

	let { portal, forceVisible, children }: Props = $props();

	const {
		elements: { trigger, menu, option, group, groupLabel, label },
		states: { selectedLabel, open },
	} = createSelect({ portal, forceVisible });

	const options = {
		sweet: ['Caramel', 'Chocolate', 'Strawberry', 'Cookies & Cream'],
		savory: ['Basil', 'Bacon', 'Rosemary', 'Balsamic Fig'],
	};

	const level = initLevel();
</script>

<!-- svelte-ignore a11y_label_has_associated_control - $label contains the 'for' attribute -->
<label {...$label} use:label>Favorite Flavor</label>
<button {...$trigger} use:trigger aria-label="Food" data-testid="select-trigger-{level}">
	{$selectedLabel || 'Select a flavor'}
</button>

{#if $open || !forceVisible}
	<div {...$menu} use:menu data-testid="select-content-{level}">
		{@render children?.()}
		{#each Object.entries(options) as [key, arr]}
			<div {...$group(key)} use:group>
				<div {...$groupLabel(key)} use:groupLabel>
					{key}
				</div>
				{#each arr as item}
					<div {...$option({ value: item, label: item })} use:option>
						{item}
					</div>
				{/each}
			</div>
		{/each}
	</div>
{/if}
<div data-testid="select-outside-{level}"></div>
