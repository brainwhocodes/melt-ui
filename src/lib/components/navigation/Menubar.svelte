<script lang="ts">
	import { createMenubar } from '$lib/builders/menubar/create.js';
	import { melt } from '$lib/internal/actions/index.js';
	import { untrack, type Snippet } from 'svelte';

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
				<div class="melt-menubar-menu" role="none">
					<button
						{...inst.elements.trigger}
						use:inst.elements.trigger
						role="menuitem"
						class="melt-menubar-trigger"
					>
						{mData.label}
					</button>
					<div
						{...inst.elements.menu}
						use:inst.elements.menu
						class="melt-menubar-content"
					>
						{#each mData.items as it (it.value)}
							<div
								{...inst.elements.item}
								use:inst.elements.item
								class="melt-menubar-item"
								aria-disabled={it.disabled}
								onclick={() => onSelect?.(it.value)}
							>
								{it.label}
							</div>
						{/each}
					</div>
				</div>
			{/if}
		{/each}
	{/if}
</div>
