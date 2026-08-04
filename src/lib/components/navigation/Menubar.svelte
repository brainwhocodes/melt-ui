<script lang="ts">
	import { createMenubar } from '$lib/builders/menubar/create.js';
	import { melt } from '$lib/internal/actions/index.js';
	import { untrack, type Snippet } from 'svelte';
	import MenubarMenu from './MenubarMenu.svelte';

	export interface MenubarMenuData {
		label: string;
		items: Array<{ value: string; label: string; disabled?: boolean }>;
	}

	interface Props {
		menus?: MenubarMenuData[];
		class?: string;
		onSelect?: (value: string) => void;
		children?: Snippet;
		[key: string]: any;
	}

	let {
		menus = [],
		class: className = '',
		onSelect,
		children,
		...rest
	}: Props = $props();

	const {
		elements: { menubar },
		builders: { createMenu },
	} = untrack(() => createMenubar());

	let menuInstances = $derived.by(() => {
		return untrack(() => menus.map(() => createMenu()));
	});
</script>

<div {...$menubar} use:menubar class={`melt-menubar ${className}`.trim()} {...rest}>
	{#if children}
		{@render children()}
	{:else}
		{#each menus as mData, i (mData.label)}
			{@const inst = menuInstances[i]}
			{#if inst}
				<MenubarMenu
					instance={inst}
					label={mData.label}
					items={mData.items}
					{onSelect}
				/>
			{/if}
		{/each}
	{/if}
</div>
