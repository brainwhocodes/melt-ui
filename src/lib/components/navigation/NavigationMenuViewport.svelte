<script lang="ts">
	import { getContext, onMount } from 'svelte';
	import { NAVIGATION_MENU_ROOT, type NavigationMenuRootContext } from './context.js';

	let className = '';
	export { className as class };

	const root = getContext<NavigationMenuRootContext>(NAVIGATION_MENU_ROOT);
	let element: HTMLDivElement;

	function handlePointerEnter() {
		root.cancelScheduledChange();
	}

	function handlePointerLeave(event: PointerEvent) {
		const openValue = root.getValue();
		if (event.pointerType !== 'touch' && openValue) root.scheduleClose(openValue);
	}

	onMount(() => {
		const unregister = root.registerViewport(element);
		element.addEventListener('pointerenter', handlePointerEnter);
		element.addEventListener('pointerleave', handlePointerLeave);
		return () => {
			unregister();
			element.removeEventListener('pointerenter', handlePointerEnter);
			element.removeEventListener('pointerleave', handlePointerLeave);
		};
	});
</script>

<div
	{...$$restProps}
	bind:this={element}
	class={`melt-navigation-menu__viewport ${className}`.trim()}
	data-state="closed"
	aria-hidden="true"
>
	<slot />
</div>
