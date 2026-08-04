<script lang="ts">
	import { melt } from '$lib/internal/actions/index.js';
	import type { Snippet } from 'svelte';

	interface Props {
		title?: string;
		description?: string;
		variant?: 'default' | 'success' | 'danger' | 'warning';
		class?: string;
		onClose?: () => void;
		children?: Snippet;
		[key: string]: any;
	}

	let {
		title = '',
		description = '',
		variant = 'default',
		class: className = '',
		onClose,
		children,
		...rest
	}: Props = $props();
</script>

<div
	class={`melt-toast ${className}`.trim()}
	data-variant={variant}
	role="status"
	aria-live="polite"
	{...rest}
>
	<div class="melt-toast-body">
		{#if title}
			<div class="melt-toast-title">{title}</div>
		{/if}
		{#if description}
			<div class="melt-toast-description">{description}</div>
		{/if}
		{#if children}
			{@render children()}
		{/if}
	</div>
	{#if onClose}
		<button class="melt-toast-close" aria-label="Close toast" onclick={onClose}>
			✕
		</button>
	{/if}
</div>
