<script lang="ts">
	import { cn } from '$docs/utils/index.js';
	import { createAccordion, melt } from '$lib/index.js';
	import { slide } from 'svelte/transition';

	const {
		elements: { content, item, trigger, root },
		helpers: { isSelected },
	} = createAccordion({
		multiple: true,
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

	let className = '';
	export { className as class };
</script>

<div
	class={cn(
		'surface-a6842ed884',
		className,
	)}
	{...$root}
>
	{#each items as { id, title, description }, i}
		<div
			use:melt={$item(id)}
			class="preview-first-item-shape-t-xl  surface-8c45c8a67b"
		>
			<h2 class="surface-eb90cbcd39">
				<button
					use:melt={$trigger(id)}
					class={cn(
						'surface-229b196045',
						'surface-a434ab4a41',
						'surface-a807058108',
						'surface-f95cd3de66',
						i !== 0 && 'preview-border-t-neutral-300 surface-ae2dd3002a',
					)}
				>
					{title}
				</button>
			</h2>
			{#if $isSelected(id)}
				<div
					class={cn(
						'content',
						'preview-text-neutral-600 surface-c09402930e',
					)}
					use:melt={$content(id)}
					transition:slide
				>
					<div class="surface-634e7d702d">
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
