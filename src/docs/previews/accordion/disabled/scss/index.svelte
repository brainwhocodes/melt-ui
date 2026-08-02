<script lang="ts">
	import { cn } from '$docs/utils/index.js';
	import { createAccordion, melt } from '$lib/index.js';
	import { slide } from 'svelte/transition';

	const {
		elements: { content, item, trigger, root },
		helpers: { isSelected },
	} = createAccordion();

	const items = [
		{
			id: 'item-1',
			title: 'What is it?',
			description:
				'A collection of accessible & unstyled component builders for Svelte applications.',
			disabled: false,
		},
		{
			id: 'item-2',
			title: "I'm a disabled accordion item",
			description: "You can't see me!",
			disabled: true,
		},
		{
			id: 'item-3',
			title: 'Svelte is awesome, huh?',
			description: 'Yes, and so are you!',
			disabled: false,
		},
	];

	let className = '';
	export { className as class };
</script>

<div
	class={cn(
		'surface-0585b9a5f0',
		className,
	)}
	{...$root}
>
	{#each items as { id, title, description, disabled }, i}
		{@const props = { value: id, disabled }}
		<div
			use:melt={$item(props)}
			class="preview-first-item-shape-t-xl  surface-729e202a15"
		>
			<h2 class="surface-b7635f3fcd">
				<button
					use:melt={$trigger(props)}
					class={cn(
						'surface-62d4a43df4',
						'surface-dec2ac51c1',
						'surface-73c2cc41f8',
						'preview-state-disabled-text-neutral-400 surface-51792db135',
						i !== 0 && 'preview-border-t-neutral-300 surface-a0f1505a45',
					)}
				>
					{title}
				</button>
			</h2>
			{#if $isSelected(id)}
				<div
					class={cn(
						'content',
						'preview-text-neutral-600 surface-a38ad92164',
					)}
					use:melt={$content(props)}
					transition:slide
				>
					<div class="surface-701426af97">
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
