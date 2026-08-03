<script lang="ts">
	import { type CreateTabsProps, createTabs } from '$lib/index.js';

	type $$Props = CreateTabsProps & {
		tabValues: string[];
		disabledValues?: string[];
	};

	export let tabValues: string[] = [];
	export let disabledValues: string[] = [];

	const {
		elements: { content, root, list, trigger },
	} = createTabs({
		...($$restProps as $$Props),
	});
</script>

<main>
	<div {...$root} use:root data-testid="root">
		<div {...$list} use:list data-testid="list">
			{#each tabValues as tab}
				<button
					{...$trigger({
						value: tab,
						disabled: disabledValues.includes(tab),
					})} use:trigger
					data-testid="{tab}-trigger"
				>
					{tab}
				</button>
			{/each}
		</div>
		{#each tabValues as tab}
			<div {...$content(tab)} use:content data-testid="{tab}-content">
				{tab}
			</div>
		{/each}
	</div>
</main>
