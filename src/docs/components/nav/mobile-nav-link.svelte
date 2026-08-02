<script lang="ts">
	import { page } from '$app/stores';
	import type { Writable } from 'svelte/store';

	export let href: string;
	export let open: Writable<boolean>;

	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<a
	{href}
	on:click={() => open.set(false)}
	class={`docs-button docs-button--ghost docs-button--size-default docs-mobile-nav-link ${className ?? ''}`}
	{...$$restProps}
	data-active={$page.url.pathname === href}
>
	<slot />
</a>
