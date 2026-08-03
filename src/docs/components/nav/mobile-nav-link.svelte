<script lang="ts">
	import { page } from '$app/stores';
	import type { Writable } from 'svelte/store';


	interface Props {
		href: string;
		open: Writable<boolean>;
		class?: string | undefined | null;
		children?: import('svelte').Snippet;
		[key: string]: any
	}

	let {
		href,
		open,
		class: className = undefined,
		children,
		...rest
	}: Props = $props();

</script>

<a
	{href}
	onclick={() => open.set(false)}
	class={`docs-button docs-button--ghost docs-button--size-default docs-mobile-nav-link ${className ?? ''}`}
	{...rest}
	data-active={$page.url.pathname === href}
>
	{@render children?.()}
</a>
