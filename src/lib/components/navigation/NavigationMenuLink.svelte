<script lang="ts">
	import { getContext } from 'svelte';
	import { NAVIGATION_MENU_ROOT, type NavigationMenuRootContext } from './context.js';

	interface Props {
		href: string;
		active?: boolean;
		target?: string | undefined;
		rel?: string | undefined;
		class?: string;
		children?: import('svelte').Snippet;
		[key: string]: any
	}

	let {
		href,
		active = false,
		target = undefined,
		rel = undefined,
		class: className = '',
		children,
		...rest
	}: Props = $props();


	const root = getContext<NavigationMenuRootContext>(NAVIGATION_MENU_ROOT);

	function handleClick() {
		root.close(false);
	}
</script>

<a
	{...rest}
	class={`melt-navigation-menu__link ${className}`.trim()}
	{href}
	{target}
	{rel}
	aria-current={active ? 'page' : undefined}
	data-active={active ? '' : undefined}
	onclick={handleClick}
>
	{@render children?.()}
</a>
