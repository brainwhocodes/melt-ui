<script lang="ts">
	import { createTooltip } from '$lib/builders/tooltip/create.js';
	import { melt } from '$lib/internal/actions/index.js';
	import { untrack, type Snippet } from 'svelte';
	import { writable } from 'svelte/store';

	interface Props {
		open?: boolean;
		content?: string;
		triggerLabel?: string;
		disabled?: boolean;
		openDelay?: number;
		closeDelay?: number;
		class?: string;
		onOpenChange?: (open: boolean) => void;
		children?: Snippet;
		contentSnippet?: Snippet;
		triggerSnippet?: Snippet<[{ builder: any; action: any }]>;
		[key: string]: any;
	}

	let {
		open = $bindable(false),
		content: textContent = '',
		triggerLabel = 'Hover or focus',
		disabled = false,
		openDelay = 300,
		closeDelay = 100,
		class: className = '',
		onOpenChange,
		children,
		contentSnippet,
		triggerSnippet,
		...rest
	}: Props = $props();

	const openStore = writable(untrack(() => open ?? false));

	$effect(() => {
		openStore.set(open ?? false);
	});

	const {
		elements: { trigger, content, arrow },
		states: { open: isOpen },
	} = untrack(() =>
		createTooltip({
			open: openStore,
			openDelay: untrack(() => openDelay),
			closeDelay: untrack(() => closeDelay),
			onOpenChange: (next) => {
				open = next.next;
				onOpenChange?.(next.next);
				return next.next;
			},
		})
	);
</script>

<div class={`melt-tooltip-wrapper ${className}`.trim()} {...rest}>
	{#if triggerSnippet}
		{@render triggerSnippet({ builder: $trigger, action: trigger })}
	{:else}
		<button
			{...$trigger}
			use:trigger
			class="melt-tooltip-trigger"
			{disabled}
		>
			{#if children}
				{@render children()}
			{:else}
				{triggerLabel}
			{/if}
		</button>
	{/if}

	{#if $isOpen}
		<div {...$content} use:content class="melt-tooltip-content">
			<div {...$arrow} use:arrow class="melt-tooltip-arrow"></div>
			{#if contentSnippet}
				{@render contentSnippet()}
			{:else}
				{textContent}
			{/if}
		</div>
	{/if}
</div>
