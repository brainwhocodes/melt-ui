<script lang="ts">
	import { createCollapsible } from '$lib/builders/collapsible/create.js';
	import { melt } from '$lib/internal/actions/index.js';
	import { untrack, type Snippet } from 'svelte';
	import { writable } from 'svelte/store';

	interface Props {
		open?: boolean;
		disabled?: boolean;
		label?: string;
		class?: string;
		onOpenChange?: (open: boolean) => void;
		children?: Snippet;
		contentSnippet?: Snippet;
		[key: string]: any;
	}

	let {
		open = $bindable(false),
		disabled = false,
		label = 'Toggle',
		class: className = '',
		onOpenChange,
		children,
		contentSnippet,
		...rest
	}: Props = $props();

	const openStore = writable(untrack(() => open));

	$effect(() => {
		if (open !== undefined) {
			openStore.set(open);
		}
	});

	const {
		elements: { root, trigger, content },
		states: { open: isOpen },
	} = untrack(() =>
		createCollapsible({
			open: openStore,
			disabled,
			onOpenChange: (next) => {
				open = next.next;
				onOpenChange?.(next.next);
				return next.next;
			},
		})
	);
</script>

<div {...$root} use:root class={`melt-collapsible ${className}`.trim()} {...rest}>
	<button {...$trigger} use:trigger class="melt-collapsible-trigger">
		{label}
	</button>
	{#if $isOpen}
		<div {...$content} use:content class="melt-collapsible-content">
			{#if contentSnippet}
				{@render contentSnippet()}
			{:else if children}
				{@render children()}
			{/if}
		</div>
	{/if}
</div>
