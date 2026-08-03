<script lang="ts">
	import { getContext, onMount } from 'svelte';
	import {
		NAVIGATION_MENU_ITEM,
		NAVIGATION_MENU_ROOT,
		type NavigationMenuItemContext,
		type NavigationMenuRootContext
	} from './context.js';

	interface Props {
		class?: string;
		children?: import('svelte').Snippet;
		[key: string]: any
	}

	let { class: className = '', children, ...rest }: Props = $props();


	const root = getContext<NavigationMenuRootContext>(NAVIGATION_MENU_ROOT);
	const item = getContext<NavigationMenuItemContext>(NAVIGATION_MENU_ITEM);
	let element: HTMLDivElement | undefined = $state();
	let itemValue = $derived(item.value());

	onMount(() => {
		if (!element) return;
		const unregister = root.registerContent(itemValue, element);
		element.addEventListener('keydown', handleKeydown);
		return () => {
			unregister();
			element?.removeEventListener('keydown', handleKeydown);
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
	{...rest}
	bind:this={element}
	class={`melt-navigation-menu__content ${className}`.trim()}
	id={root.getContentId(itemValue)}
	role="region"
	aria-labelledby={root.getTriggerId(itemValue)}
	tabindex="-1"
	hidden
	data-state="closed"
>
	{@render children?.()}
</div>
