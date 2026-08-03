<script lang="ts">
	import { getContext, setContext } from 'svelte';
	import {
		NAVIGATION_MENU_ITEM,
		NAVIGATION_MENU_ROOT,
		type NavigationMenuItemContext,
		type NavigationMenuRootContext
	} from './context.js';

	interface Props {
		value: string;
		class?: string;
		children?: import('svelte').Snippet;
		[key: string]: any
	}

	let { value, class: className = '', children, ...rest }: Props = $props();


	const root = getContext<NavigationMenuRootContext>(NAVIGATION_MENU_ROOT);
	const activeValue = root.value;
	const item: NavigationMenuItemContext = { value: () => value };
	setContext(NAVIGATION_MENU_ITEM, item);

	function handlePointerEnter(event: PointerEvent) {
		if (event.pointerType !== 'touch') root.scheduleOpen(value);
	}

	function handlePointerLeave(event: PointerEvent) {
		if (event.pointerType !== 'touch') root.scheduleClose(value);
	}
</script>

<li
	{...rest}
	class={`melt-navigation-menu__item ${className}`.trim()}
	data-state={$activeValue === value ? 'open' : 'closed'}
	onpointerenter={handlePointerEnter}
	onpointerleave={handlePointerLeave}
>
	{@render children?.()}
</li>
