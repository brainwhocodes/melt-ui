<script context="module" lang="ts">
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
	import { melt, type TreeView } from '$lib/index.js';
	import { getContext } from 'svelte';

	export let treeItems: TreeItem[];
	export let level = 1;

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
			use:melt={$item({
				id: itemId,
				hasChildren,
			})}
		>
			<!-- Add icon. -->
			{#if icon === 'folder' && hasChildren && $isExpanded(itemId)}
				<svelte:component this={icons['folderOpen']} class="surface-6349bea7a3" />
			{:else}
				<svelte:component this={icons[icon]} class="surface-8cc931a7ca" />
			{/if}

			<span class="surface-a39ff66aec">{title}</span>

			<!-- Selected icon. -->
			{#if $isSelected(itemId)}
				<svelte:component this={icons['highlight']} class="surface-b8da7b3301" />
			{/if}
		</button>

		{#if children}
			<ul use:melt={$group({ id: itemId })}>
				<svelte:self treeItems={children} level={level + 1} />
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
