<script lang="ts">
	import { getContext } from 'svelte';
	import { NAVIGATION_MENU_ROOT, type NavigationMenuRootContext } from './context.js';

	export let href: string;
	export let active = false;
	export let target: string | undefined = undefined;
	export let rel: string | undefined = undefined;
	let className = '';
	export { className as class };

	const root = getContext<NavigationMenuRootContext>(NAVIGATION_MENU_ROOT);

	function handleClick() {
		root.close(false);
	}
</script>

<a
	{...$$restProps}
	class={`melt-navigation-menu__link ${className}`.trim()}
	{href}
	{target}
	{rel}
	aria-current={active ? 'page' : undefined}
	data-active={active ? '' : undefined}
	on:click={handleClick}
>
	<slot />
</a>
