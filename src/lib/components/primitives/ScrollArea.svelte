<script lang="ts">
	import { createScrollArea } from '$lib/builders/scroll-area/create.js';
	import { melt } from '$lib/internal/actions/index.js';
	import { untrack, type Snippet } from 'svelte';

	interface Props {
		type?: 'auto' | 'always' | 'scroll' | 'hover';
		dir?: 'ltr' | 'rtl';
		class?: string;
		children?: Snippet;
		[key: string]: any;
	}

	let {
		type = 'hover',
		dir = 'ltr',
		class: className = '',
		children,
		...rest
	}: Props = $props();

	const {
		elements: { root, viewport, scrollbarY, thumbY },
	} = untrack(() =>
		createScrollArea({
			type,
			dir,
		})
	);
</script>

<div {...$root} use:root class={`melt-scroll-area ${className}`.trim()} {...rest}>
	<div {...$viewport} use:viewport class="melt-scroll-area-viewport">
		{#if children}
			{@render children()}
		{/if}
	</div>
	<div {...$scrollbarY} use:scrollbarY class="melt-scroll-area-scrollbar">
		<div {...$thumbY} use:thumbY class="melt-scroll-area-thumb"></div>
	</div>
</div>
