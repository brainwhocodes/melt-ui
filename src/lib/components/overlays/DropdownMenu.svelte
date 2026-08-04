<script lang="ts">
	import { createDropdownMenu } from '$lib/builders/dropdown-menu/create.js';
	import { melt } from '$lib/internal/actions/index.js';
	import { untrack, type Snippet } from 'svelte';

	export interface DropdownMenuItem {
		value: string;
		label: string;
		disabled?: boolean;
	}

	interface Props {
		items?: DropdownMenuItem[];
		triggerLabel?: string;
		class?: string;
		onSelect?: (value: string) => void;
		children?: Snippet;
		[key: string]: any;
	}

	let {
		items = [],
		triggerLabel = 'Menu',
		class: className = '',
		onSelect,
		children,
		...rest
	}: Props = $props();

	const {
		elements: { trigger, menu, item },
		states: { open },
	} = untrack(() => createDropdownMenu());
</script>

<div class={`melt-dropdown-menu-wrapper ${className}`.trim()} {...rest}>
	<button {...$trigger} use:trigger class="melt-dropdown-menu-trigger">
		{triggerLabel}
	</button>
	{#if $open}
		<div {...$menu} use:menu class="melt-dropdown-menu">
			{#if children}
				{@render children()}
			{:else}
				{#each items as it (it.value)}
					<div
						{...$item}
						use:item
						class="melt-dropdown-menu-item"
						aria-disabled={it.disabled}
						onclick={() => onSelect?.(it.value)}
					>
						{it.label}
					</div>
				{/each}
			{/if}
		</div>
	{/if}
</div>
