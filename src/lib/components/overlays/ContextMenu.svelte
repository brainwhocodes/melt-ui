<script lang="ts">
	import { createContextMenu } from '$lib/builders/context-menu/create.js';
	import { melt } from '$lib/internal/actions/index.js';
	import { untrack, type Snippet } from 'svelte';

	export interface ContextMenuItem {
		value: string;
		label: string;
		disabled?: boolean;
	}

	interface Props {
		items?: ContextMenuItem[];
		class?: string;
		onSelect?: (value: string) => void;
		children?: Snippet;
		[key: string]: any;
	}

	let {
		items = [],
		class: className = '',
		onSelect,
		children,
		...rest
	}: Props = $props();

	const {
		elements: { trigger, menu, item },
		states: { open },
	} = untrack(() => createContextMenu());
</script>

<div class={`melt-context-menu-wrapper ${className}`.trim()} {...rest}>
	<div {...$trigger} use:trigger class="melt-context-menu-trigger">
		{#if children}
			{@render children()}
		{/if}
	</div>
	{#if $open}
		<div {...$menu} use:menu class="melt-context-menu">
			{#each items as it (it.value)}
				<div
					{...$item}
					use:item
					class="melt-context-menu-item"
					aria-disabled={it.disabled}
					onclick={() => onSelect?.(it.value)}
				>
					{it.label}
				</div>
			{/each}
		</div>
	{/if}
</div>
