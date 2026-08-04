<script lang="ts">
	import { createLinkPreview } from '$lib/builders/link-preview/create.js';
	import { melt } from '$lib/internal/actions/index.js';
	import { untrack, type Snippet } from 'svelte';
	import { writable } from 'svelte/store';

	interface Props {
		open?: boolean;
		triggerLabel?: string;
		openDelay?: number;
		closeDelay?: number;
		class?: string;
		onOpenChange?: (open: boolean) => void;
		triggerSnippet?: Snippet<[{ builder: any; action: any }]>;
		children?: Snippet;
		[key: string]: any;
	}

	let {
		open = $bindable(false),
		triggerLabel = 'Hover or focus',
		openDelay = 300,
		closeDelay = 300,
		class: className = '',
		onOpenChange,
		triggerSnippet,
		children,
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
		createLinkPreview({
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

<div class={`melt-hover-card-wrapper ${className}`.trim()} {...rest}>
	{#if triggerSnippet}
		{@render triggerSnippet({ builder: $trigger, action: trigger })}
	{:else}
		<button {...$trigger} use:trigger class="melt-hover-card-trigger">
			{triggerLabel}
		</button>
	{/if}

	{#if $isOpen}
		<div {...$content} use:content class="melt-hover-card-content">
			<div {...$arrow} use:arrow class="melt-hover-card-arrow"></div>
			{#if children}
				{@render children()}
			{/if}
		</div>
	{/if}
</div>
