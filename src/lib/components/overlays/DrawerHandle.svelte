<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import {
		drawerContext,
		type DrawerContext,
		useOverlayContext,
	} from './overlay.js';

	export let ariaLabel = 'Drawer position';
	let className = '';
	export { className as class };
	const context = useOverlayContext<DrawerContext>(drawerContext, 'DrawerHandle');
	const { activeSnapPoint, direction, snapPoints } = context;
	const dispatch = createEventDispatcher<{ snapPointChange: { value: number } }>();

	function setSnapPoint(value: number) {
		if (value <= 0) context.close('snap');
		else context.setActiveSnapPoint(value);
		dispatch('snapPointChange', { value });
	}

	function handleKeydown(event: KeyboardEvent) {
		const points = $snapPoints;
		const currentIndex = points.reduce(
			(nearest, point, index) =>
				Math.abs(point - $activeSnapPoint) < Math.abs(points[nearest] - $activeSnapPoint)
					? index
					: nearest,
			0,
		);
		let nextIndex = currentIndex;
		if (event.key === 'Home') nextIndex = 0;
		else if (event.key === 'End') nextIndex = points.length - 1;
		else if (event.key === 'ArrowUp' || event.key === 'ArrowRight') {
			nextIndex = Math.min(points.length - 1, currentIndex + 1);
		} else if (event.key === 'ArrowDown' || event.key === 'ArrowLeft') {
			nextIndex = Math.max(0, currentIndex - 1);
		} else return;
		event.preventDefault();
		setSnapPoint(points[nextIndex]);
	}
</script>

<div
	class={`melt-drawer__handle ${className}`.trim()}
	role="slider"
	tabindex="0"
	aria-label={ariaLabel}
	aria-orientation={$direction === 'left' || $direction === 'right' ? 'horizontal' : 'vertical'}
	aria-valuemin={0}
	aria-valuemax={1}
	aria-valuenow={$activeSnapPoint}
	data-melt-drawer-handle
	on:keydown={handleKeydown}
	{...$$restProps}
>
	<slot />
</div>
