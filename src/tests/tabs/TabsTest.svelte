<script lang="ts">
	import { untrack } from 'svelte';
	import { type CreateTabsProps, createTabs } from '$lib/index.js';

	type $$Props = CreateTabsProps & {
		tabValues: string[];
		disabledValues?: string[];
	};

	interface Props {
		tabValues?: string[];
		disabledValues?: string[];
		[key: string]: any
	}

	let { tabValues = [], disabledValues = [], ...rest }: Props = $props();

	const {
		elements: { content, root, list, trigger },
	} = createTabs(
		untrack(() => ({
			...(rest as $$Props),
		}))
	);
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
