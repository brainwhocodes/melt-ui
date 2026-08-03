<script lang="ts">
	import { getContext, setContext } from 'svelte';
	import {
		NAVIGATION_MENU_ITEM,
		NAVIGATION_MENU_ROOT,
		type NavigationMenuItemContext,
		type NavigationMenuRootContext
	} from './context.js';

	export let value: string;
	let className = '';
	export { className as class };

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
	{...$$restProps}
	class={`melt-navigation-menu__item ${className}`.trim()}
	data-state={$activeValue === value ? 'open' : 'closed'}
	on:pointerenter={handlePointerEnter}
	on:pointerleave={handlePointerLeave}
>
	<slot />
</li>
