<script lang="ts">
	import { createPopover } from '$lib/builders/popover/create.js';
	import { melt } from '$lib/internal/actions/index.js';
	import { untrack, type Snippet } from 'svelte';
	import { writable } from 'svelte/store';

	interface Props {
		open?: boolean;
		triggerLabel?: string;
		class?: string;
		onOpenChange?: (open: boolean) => void;
		children?: Snippet;
		triggerSnippet?: Snippet;
		[key: string]: any;
	}

	let {
		open = $bindable(false),
		triggerLabel = 'Open Popover',
		class: className = '',
		onOpenChange,
		children,
		triggerSnippet,
		...rest
	}: Props = $props();

	const openStore = writable(untrack(() => open));

	$effect(() => {
		if (open !== undefined) {
			openStore.set(open);
		}
	});

	const {
		elements: { trigger, content, arrow, close },
		states: { open: isOpen },
	} = untrack(() =>
		createPopover({
			open: openStore,
			onOpenChange: (next) => {
				open = next.next;
				onOpenChange?.(next.next);
				return next.next;
			},
		})
	);
</script>

<div class={`melt-popover-wrapper ${className}`.trim()} {...rest}>
	{#if triggerSnippet}
		<div {...$trigger} use:trigger>
			{@render triggerSnippet()}
		</div>
	{:else}
		<button {...$trigger} use:trigger class="melt-popover-trigger">
			{triggerLabel}
		</button>
	{/if}

	{#if $isOpen}
		<div {...$content} use:content class="melt-popover-content">
			<div {...$arrow} use:arrow class="melt-popover-arrow"></div>
			{#if children}
				{@render children()}
			{/if}
			<button {...$close} use:close class="melt-popover-close" aria-label="Close">
				✕
			</button>
		</div>
	{/if}
</div>
