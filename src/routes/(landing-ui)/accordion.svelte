<script lang="ts">
	import { cn } from '$docs/utils/index.js';
	import { createAccordion, melt } from '$lib/index.js';
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

	let className = '';
	export { className as class };
</script>

<div
	class={cn('surface-60ad1d804f', className)}
	{...$root}
>
	{#each items as { id, title, description }, i}
		<div
			use:melt={$item(id)}
			class="preview-first-item-shape-t-xl  surface-2e126c6bdd"
		>
			<h2 class="surface-ace64cf9e8">
				<button
					use:melt={$trigger(id)}
					class={cn(
						'surface-be9974e057',
						'surface-2bc9559e02',
						'surface-2cc87e1a85',
						'surface-001619d5ba',
						i !== 0 && 'preview-border-t-neutral-300 surface-81fe7e79f8'
					)}
				>
					{title}
				</button>
			</h2>
			{#if $isSelected(id)}
				<div
					class={cn('content', 'preview-text-neutral-600 surface-4831590652')}
					use:melt={$content(id)}
					transition:slide
				>
					<div class="surface-a70c1ecc70">
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
