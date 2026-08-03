<script lang="ts">
	import {
		drawerContext,
		type DrawerContext,
		useOverlayContext,
	} from './overlay.js';

	interface Props {
		ariaLabel?: string;
		onSnapPointChange?: (detail: { value: number }) => void;
		class?: string;
		children?: import('svelte').Snippet;
		[key: string]: any
	}

	let {
		ariaLabel = 'Drawer position',
		onSnapPointChange = undefined,
		class: className = '',
		children,
		...rest
	}: Props = $props();

	const context = useOverlayContext<DrawerContext>(drawerContext, 'DrawerHandle');
	const { activeSnapPoint, direction, snapPoints } = context;

	function setSnapPoint(value: number) {
		if (value <= 0) context.close('snap');
		else context.setActiveSnapPoint(value);
		onSnapPointChange?.({ value });
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
	onkeydown={handleKeydown}
	{...rest}
>
	{@render children?.()}
</div>
