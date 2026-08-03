<script lang="ts">
	import { getContext, onMount } from 'svelte';
	import {
		NAVIGATION_MENU_ITEM,
		NAVIGATION_MENU_ROOT,
		type NavigationMenuItemContext,
		type NavigationMenuRootContext
	} from './context.js';

	let className = '';
	export { className as class };

	const root = getContext<NavigationMenuRootContext>(NAVIGATION_MENU_ROOT);
	const item = getContext<NavigationMenuItemContext>(NAVIGATION_MENU_ITEM);
	let element: HTMLDivElement;
	$: itemValue = item.value();

	onMount(() => {
		const unregister = root.registerContent(itemValue, element);
		element.addEventListener('keydown', handleKeydown);
		return () => {
			unregister();
			element.removeEventListener('keydown', handleKeydown);
		};
	});


	function handleKeydown(event: KeyboardEvent) {
		if (event.key !== 'Escape') return;
		event.preventDefault();
		event.stopPropagation();
		root.close(true);
	}
</script>

<div
	{...$$restProps}
	bind:this={element}
	class={`melt-navigation-menu__content ${className}`.trim()}
	id={root.getContentId(itemValue)}
	role="region"
	aria-labelledby={root.getTriggerId(itemValue)}
	tabindex="-1"
	hidden
	data-state="closed"
>
	<slot />
</div>
