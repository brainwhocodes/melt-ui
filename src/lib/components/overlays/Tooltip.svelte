<script lang="ts">
	import { createTooltip } from '$lib/builders/tooltip/create.js';
	import { melt } from '$lib/internal/actions/index.js';
	import { untrack, type Snippet } from 'svelte';

	interface Props {
		content?: string;
		openDelay?: number;
		closeDelay?: number;
		class?: string;
		children?: Snippet;
		contentSnippet?: Snippet;
		[key: string]: any;
	}

	let {
		content: textContent = '',
		openDelay = 300,
		closeDelay = 100,
		class: className = '',
		children,
		contentSnippet,
		...rest
	}: Props = $props();

	const {
		elements: { trigger, content, arrow },
		states: { open },
	} = untrack(() =>
		createTooltip({
			openDelay,
			closeDelay,
		})
	);
</script>

<div class={`melt-tooltip-wrapper ${className}`.trim()} {...rest}>
	<span {...$trigger} use:trigger class="melt-tooltip-trigger">
		{#if children}
			{@render children()}
		{/if}
	</span>

	{#if $open}
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
