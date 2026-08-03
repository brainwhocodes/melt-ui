<script module lang="ts">
	import { ArrowLeft, Folder, FolderOpen } from '$icons/index.js';
	import JS from './icons/JS.svelte';
	import Svelte from './icons/Svelte.svelte';

	type Icon = 'svelte' | 'folder' | 'js';

	export type TreeItem = {
		title: string;
		icon: Icon;

		children?: TreeItem[];
	};

	export const icons = {
		svelte: Svelte,
		folder: Folder,
		folderOpen: FolderOpen,
		js: JS,
		highlight: ArrowLeft,
	};
</script>

<script lang="ts">
	import Tree from './tree.svelte';
	import { type TreeView } from '$lib/index.js';
	import { getContext } from 'svelte';

	interface Props {
		treeItems: TreeItem[];
		level?: number;
	}

	let { treeItems, level = 1 }: Props = $props();

	const {
		elements: { item, group },
		helpers: { isExpanded, isSelected },
	} = getContext<TreeView>('tree');
</script>

{#each treeItems as { title, icon, children }, i}
	{@const itemId = `${title}-${i}`}
	{@const hasChildren = !!children?.length}

	<li class={level !== 1 ? 'surface-aefd055561' : ''}>
		<button
			class="surface-7081405d0d"
			{...$item({
				id: itemId,
				hasChildren,
			})} use:item
		>
			<!-- Add icon. -->
			{#if icon === 'folder' && hasChildren && $isExpanded(itemId)}
				{@const SvelteComponent = icons['folderOpen']}
				<SvelteComponent class="surface-6349bea7a3" />
			{:else}
				{@const SvelteComponent_1 = icons[icon]}
				<SvelteComponent_1 class="surface-8cc931a7ca" />
			{/if}

			<span class="surface-a39ff66aec">{title}</span>

			<!-- Selected icon. -->
			{#if $isSelected(itemId)}
				{@const SvelteComponent_2 = icons['highlight']}
				<SvelteComponent_2 class="surface-b8da7b3301" />
			{/if}
		</button>

		{#if children}
			<ul {...$group({ id: itemId })} use:group>
				<Tree treeItems={children} level={level + 1} />
			</ul>
		{/if}
	</li>
{/each}

<style lang="scss">
	/* Remove docs' focus box-shadow styling. */
	li:focus {
		box-shadow: none !important;
	}
</style>
