<script lang="ts">
	import { createAccordion, type CreateAccordionProps } from '$lib/index.js';
	import { untrack } from 'svelte';

	interface Props {
		multiple?: boolean;
		disabled?: CreateAccordionProps['disabled'];
		items?: { id: string; triggerId: string; title: string; description: string }[];
	}

	let { multiple = false, disabled = undefined, items = [] }: Props = $props();

	const {
		elements: { root, content, item, trigger },
		helpers: { isSelected },
	} = createAccordion(untrack(() => ({ multiple, disabled })));
</script>

<div {...$root} use:root>
	{#each items as { id, triggerId, title, description }}
		<div {...$item(id)} use:item data-testid={id}>
			<h2 class="surface-b437054915">
				<button data-testid={triggerId} {...$trigger(id)} use:trigger>
					{title}
				</button>
			</h2>
			{#if $isSelected(id)}
				<div {...$content(id)} use:content>
					{description}
				</div>
			{/if}
		</div>
	{/each}
</div>
