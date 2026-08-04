<script lang="ts">
	import { createLinkPreview } from '$lib/builders/link-preview/create.js';
	import { melt } from '$lib/internal/actions/index.js';
	import { untrack, type Snippet } from 'svelte';

	interface Props {
		openDelay?: number;
		closeDelay?: number;
		class?: string;
		triggerSnippet?: Snippet;
		children?: Snippet;
		[key: string]: any;
	}

	let {
		openDelay = 300,
		closeDelay = 300,
		class: className = '',
		triggerSnippet,
		children,
		...rest
	}: Props = $props();

	const {
		elements: { trigger, content, arrow },
		states: { open },
	} = untrack(() =>
		createLinkPreview({
			openDelay,
			closeDelay,
		})
	);
</script>

<div class={`melt-hover-card-wrapper ${className}`.trim()} {...rest}>
	{#if triggerSnippet}
		<span {...$trigger} use:trigger class="melt-hover-card-trigger">
			{@render triggerSnippet()}
		</span>
	{/if}

	{#if $open}
		<div {...$content} use:content class="melt-hover-card-content">
			<div {...$arrow} use:arrow class="melt-hover-card-arrow"></div>
			{#if children}
				{@render children()}
			{/if}
		</div>
	{/if}
</div>
