<script lang="ts">
	import { createAvatar } from '$lib/builders/avatar/create.js';
	import { melt } from '$lib/internal/actions/index.js';
	import { untrack, type Snippet } from 'svelte';

	interface Props {
		src?: string;
		alt?: string;
		fallback?: string;
		delayMs?: number;
		class?: string;
		children?: Snippet;
		[key: string]: any;
	}

	let {
		src = '',
		alt = '',
		fallback = '',
		delayMs = 0,
		class: className = '',
		children,
		...rest
	}: Props = $props();

	const {
		elements: { image, fallback: fallbackEl },
		states: { loadingStatus },
	} = untrack(() =>
		createAvatar({
			src,
			delayMs,
		})
	);
</script>

<div class={`melt-avatar ${className}`.trim()} {...rest}>
	{#if $loadingStatus === 'loaded' && src}
		<img {...$image} use:image {src} {alt} class="melt-avatar-image" />
	{:else}
		<span {...$fallbackEl} use:fallbackEl class="melt-avatar-fallback">
			{#if children}
				{@render children()}
			{:else}
				{fallback}
			{/if}
		</span>
	{/if}
</div>
