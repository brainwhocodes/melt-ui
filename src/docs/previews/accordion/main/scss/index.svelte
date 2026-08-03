<script lang="ts">
	import { cn } from '$docs/utils/index.js';
	import { createAccordion } from '$lib/index.js';
	import { slide } from 'svelte/transition';

	const {
		elements: { content, item, trigger, root },
		helpers: { isSelected },
	} = createAccordion({
		defaultValue: 'item-1',
	});

	const items = [
		{
			id: 'item-1',
			title: 'What is it?',
			description:
				'A collection of accessible & unstyled component builders for Svelte applications.',
		},
		{
			id: 'item-2',
			title: 'Can I customize it?',
			description: 'Totally, it is 100% stylable and overridable.',
		},
		{
			id: 'item-3',
			title: 'Svelte is awesome, huh?',
			description: 'Yes, and so are you!',
		},
	];

	interface Props {
		class?: string;
	}

	let { class: className = '' }: Props = $props();

</script>

<div
	class={cn(
		'surface-8909051a95',
		className,
	)}
	{...$root}
>
	{#each items as { id, title, description }, i}
		<div
			{...$item(id)} use:item
			class="preview-first-item-shape-t-xl  surface-0a6cfa450f"
		>
			<h2 class="surface-09a8607033">
				<button
					{...$trigger(id)} use:trigger
					class={cn(
						'surface-2edbdd8bc2',
						'surface-d3949b34d3',
						'surface-839aaa9c9b',
						'surface-d76d8417a0',
						i !== 0 && 'preview-border-t-neutral-300 surface-b57cfc9337',
					)}
				>
					{title}
				</button>
			</h2>
			{#if $isSelected(id)}
				<div
					class={cn(
						'content',
						'preview-text-neutral-600 surface-b8c62e12aa',
					)}
					{...$content(id)} use:content
					transition:slide
				>
					<div class="surface-9864b8aa9a">
						{description}
					</div>
				</div>
			{/if}
		</div>
	{/each}
</div>

<style lang="scss">
	.content {
		box-shadow: inset 0px 1px 0px rgb(var(--color-neutral-300) / 1);
	}
</style>
