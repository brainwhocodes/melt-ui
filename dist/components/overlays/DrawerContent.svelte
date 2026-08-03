<script lang="ts">
	import { createEventDispatcher, onDestroy } from 'svelte';
	import {
		drawerContext,
		type DrawerContext,
		useOverlayContext,
	} from './overlay.js';

	export let dragHandleOnly = false;
	export let style = '';
	let className = '';
	export { className as class };

	const context = useOverlayContext<DrawerContext>(drawerContext, 'DrawerContent');
	const { direction, activeSnapPoint, dismissThreshold, snapPoints } = context;
	const dispatch = createEventDispatcher<{
		dragStart: { originalEvent: PointerEvent };
		drag: { originalEvent: PointerEvent; offset: number; progress: number };
		dragEnd: { originalEvent: PointerEvent; snapPoint: number; dismissed: boolean };
		dragCancel: { originalEvent: PointerEvent };
	}>();

	let content: HTMLDivElement;
	let pointerId: number | undefined;
	let startX = 0;
	let startY = 0;
	let size = 1;
	let baseOffset = 0;
	let currentOffset = 0;

	function isInteractiveTarget(target: EventTarget | null): boolean {
		if (!(target instanceof Element)) return false;
		if (target.closest('[data-melt-drawer-handle]')) return false;
		return Boolean(
			target.closest(
				'a[href], button, input, select, textarea, [contenteditable="true"], [data-melt-drawer-no-drag]',
			),
		);
	}

	function getSize(): number {
		const rect = content.getBoundingClientRect();
		return Math.max(1, $direction === 'left' || $direction === 'right' ? rect.width : rect.height);
	}

	function projectedDistance(event: PointerEvent): number {
		switch ($direction) {
			case 'top':
				return startY - event.clientY;
			case 'right':
				return event.clientX - startX;
			case 'left':
				return startX - event.clientX;
			default:
				return event.clientY - startY;
		}
	}

	function setOffset(offset: number) {
		currentOffset = Math.max(0, Math.min(size, offset));
		content.style.setProperty('--melt-drawer-drag-offset', `${currentOffset}px`);
	}

	function handlePointerDown(event: PointerEvent) {
		if (!event.isPrimary || (event.pointerType === 'mouse' && event.button !== 0)) return;
		const hasHandle = event.target instanceof Element && Boolean(event.target.closest('[data-melt-drawer-handle]'));
		if ((dragHandleOnly && !hasHandle) || isInteractiveTarget(event.target)) return;
		pointerId = event.pointerId;
		startX = event.clientX;
		startY = event.clientY;
		size = getSize();
		baseOffset = (1 - $activeSnapPoint) * size;
		currentOffset = baseOffset;
		content.dataset.dragging = 'true';
		try {
			content.setPointerCapture(event.pointerId);
		} catch {
			// Pointer capture is unavailable in some embedded browsers; document-level motion still bubbles here.
		}
		dispatch('dragStart', { originalEvent: event });
	}

	function handlePointerMove(event: PointerEvent) {
		if (pointerId !== event.pointerId) return;
		event.preventDefault();
		setOffset(baseOffset + projectedDistance(event));
		dispatch('drag', {
			originalEvent: event,
			offset: currentOffset,
			progress: 1 - currentOffset / size,
		});
	}

	function nearestSnapPoint(progress: number): number {
		return $snapPoints.reduce((nearest, point) =>
			Math.abs(point - progress) < Math.abs(nearest - progress) ? point : nearest,
		);
	}

	function finishPointer(event: PointerEvent, cancelled: boolean) {
		if (pointerId !== event.pointerId) return;
		try {
			if (content.hasPointerCapture(event.pointerId)) content.releasePointerCapture(event.pointerId);
		} catch {
			// Capture may already have been released by the browser.
		}
		pointerId = undefined;
		delete content.dataset.dragging;

		if (cancelled) {
			content.style.removeProperty('--melt-drawer-drag-offset');
			dispatch('dragCancel', { originalEvent: event });
			return;
		}

		const outwardDistance = currentOffset - baseOffset;
		const threshold = $dismissThreshold <= 1 ? $dismissThreshold * size : $dismissThreshold;
		const progress = Math.max(0, Math.min(1, 1 - currentOffset / size));
		const snapPoint = nearestSnapPoint(progress);
		const dismissed = outwardDistance >= threshold || snapPoint <= 0;
		content.style.removeProperty('--melt-drawer-drag-offset');
		if (dismissed) context.close('swipe');
		else context.setActiveSnapPoint(snapPoint);
		dispatch('dragEnd', { originalEvent: event, snapPoint, dismissed });
	}

	onDestroy(() => {
		if (!content) return;
		if (pointerId !== undefined) {
			try {
				if (content.hasPointerCapture(pointerId)) content.releasePointerCapture(pointerId);
			} catch {
				// The browser may release capture before component teardown.
			}
		}
		pointerId = undefined;
		delete content.dataset.dragging;
		content.style.removeProperty('--melt-drawer-drag-offset');
	});
</script>

<!-- DrawerHandle provides the keyboard equivalent for the panel drag gesture. -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<div
	bind:this={content}
	class={`melt-drawer__content ${className}`.trim()}
	role="document"
	data-melt-drawer-content
	data-direction={$direction}
	data-snap-point={$activeSnapPoint}
	style={`--melt-drawer-snap-offset: ${(1 - $activeSnapPoint) * 100}%; ${style}`}
	on:pointerdown={handlePointerDown}
	on:pointermove={handlePointerMove}
	on:pointerup={(event) => finishPointer(event, false)}
	on:pointercancel={(event) => finishPointer(event, true)}
	{...$$restProps}
>
	<slot />
</div>
