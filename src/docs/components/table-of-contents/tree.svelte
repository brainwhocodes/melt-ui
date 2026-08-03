<script lang="ts">
	import Tree from './tree.svelte';
	import type { TableOfContentsItem, TableOfContentsElements } from '$lib/index.js';

	interface Props {
		tree?: TableOfContentsItem[];
		activeHeadingIdxs: number[];
		item: TableOfContentsElements['item'];
		level?: number;
	}

	let {
		tree = [],
		activeHeadingIdxs,
		item,
		level = 1
	}: Props = $props();
</script>

<ul class="{level !== 1 ? 'preview-pl-4' : ''} surface-8809271687">
	{#if tree && tree.length}
		{#each tree as heading, i (i)}
			{@const active = activeHeadingIdxs.includes(heading.index)}
			<li class="surface-8584a794ab">
				<a
					href="#{heading.id}"
					{...$item(heading.id)}
					use:item
					class="{active ? 'preview-text-neutral-100' : 'preview-text-neutral-400'} surface-d528ae69b0"
				>
					{heading.title}
				</a>
				{#if heading.children && heading.children.length}
					<Tree tree={heading.children} level={level + 1} {activeHeadingIdxs} {item} />
				{/if}
			</li>
		{/each}
	{/if}
</ul>
