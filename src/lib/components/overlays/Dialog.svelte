<script lang="ts">
	import { createDialog } from '$lib/builders/dialog/create.js';
	import { melt } from '$lib/internal/actions/index.js';
	import { untrack, type Snippet } from 'svelte';

	interface Props {
		open?: boolean;
		title?: string;
		description?: string;
		triggerLabel?: string;
		class?: string;
		onOpenChange?: (open: boolean) => void;
		children?: Snippet;
		triggerSnippet?: Snippet;
		[key: string]: any;
	}

	let {
		open = $bindable(false),
		title = '',
		description = '',
		triggerLabel = 'Open Dialog',
		class: className = '',
		onOpenChange,
		children,
		triggerSnippet,
		...rest
	}: Props = $props();

	const {
		elements: { trigger, overlay, content, title: titleEl, description: descEl, close, portalled },
		states: { open: isOpen },
	} = untrack(() =>
		createDialog({
			onOpenChange: (next) => {
				open = next.next;
				onOpenChange?.(next.next);
				return next.next;
			},
		})
	);
</script>

<div class={`melt-dialog-wrapper ${className}`.trim()} {...rest}>
	{#if triggerSnippet}
		<div {...$trigger} use:trigger>
			{@render triggerSnippet()}
		</div>
	{:else}
		<button {...$trigger} use:trigger class="melt-dialog-trigger">
			{triggerLabel}
		</button>
	{/if}

	{#if $isOpen}
		<div {...$portalled} use:portalled>
			<div {...$overlay} use:overlay class="melt-dialog-overlay"></div>
			<div {...$content} use:content class="melt-dialog-content">
				{#if title}
					<h2 {...$titleEl} use:titleEl class="melt-dialog-title">{title}</h2>
				{/if}
				{#if description}
					<p {...$descEl} use:descEl class="melt-dialog-description">{description}</p>
				{/if}
				{#if children}
					{@render children()}
				{/if}
				<button {...$close} use:close class="melt-dialog-close" aria-label="Close">
					✕
				</button>
			</div>
		</div>
	{/if}
</div>
