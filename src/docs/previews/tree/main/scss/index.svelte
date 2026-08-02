<script lang="ts">
	import { createTreeView } from '$lib/index.js';
	import { setContext } from 'svelte';

	import type { TreeItem } from './tree.svelte';
	import Tree from './tree.svelte';

	const ctx = createTreeView({
		defaultExpanded: ['lib-0', 'tree-0'],
	});
	setContext('tree', ctx);

	const {
		elements: { tree },
	} = ctx;

	const treeItems: TreeItem[] = [
		{ title: 'index.svelte', icon: 'svelte' },
		{
			title: 'lib',
			icon: 'folder',
			children: [
				{
					title: 'tree',
					icon: 'folder',
					children: [
						{
							title: 'Tree.svelte',
							icon: 'svelte',
						},
						{
							title: 'TreeView.svelte',
							icon: 'svelte',
						},
					],
				},
				{
					title: 'icons',
					icon: 'folder',
					children: [
						{ title: 'JS.svelte', icon: 'svelte' },
						{ title: 'Svelte.svelte', icon: 'svelte' },
					],
				},
				{
					title: 'index.js',
					icon: 'js',
				},
			],
		},
		{
			title: 'routes',
			icon: 'folder',
			children: [
				{
					title: 'contents',
					icon: 'folder',
					children: [
						{
							title: '+layout.svelte',
							icon: 'svelte',
						},
						{
							title: '+page.svelte',
							icon: 'svelte',
						},
					],
				},
			],
		},
	];
</script>

<div
	class="surface-d5502f0267"
>
	<div class="surface-747fbaf324">
		<h3 class="surface-23d6248748">Project Structure</h3>
		<hr />
	</div>

	<ul class="surface-ec0f2e86d2" {...$tree}>
		<Tree {treeItems} />
	</ul>
</div>
