<script lang="ts">
	import { onDestroy } from 'svelte';
	import {
		drawerContext,
		type DrawerContext,
		useOverlayContext,
	} from './overlay.js';

	interface Props {
		dragHandleOnly?: boolean;
		style?: string;
		onDragStart?: (detail: { originalEvent: PointerEvent }) => void;
		onDrag?: (detail: { originalEvent: PointerEvent; offset: number; progress: number }) => void;
		onDragEnd?: (detail: {
			originalEvent: PointerEvent;
			snapPoint: number;
			dismissed: boolean;
		}) => void;
		onDragCancel?: (detail: { originalEvent: PointerEvent }) => void;
		class?: string;
		children?: import('svelte').Snippet;
		[key: string]: any
	}

	let {
		dragHandleOnly = false,
		style = '',
		onDragStart = undefined,
		onDrag = undefined,
		onDragEnd = undefined,
		onDragCancel = undefined,
		class: className = '',
		children,
		...rest
	}: Props = $props();


	const context = useOverlayContext<DrawerContext>(drawerContext, 'DrawerContent');
	const { direction, activeSnapPoint, dismissThreshold, snapPoints } = context;

	let content: HTMLDivElement | undefined = $state();
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
		if (!content) return 1;
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
		if (!content) return;
		currentOffset = Math.max(0, Math.min(size, offset));
		content.style.setProperty('--melt-drawer-drag-offset', `${currentOffset}px`);
	}

	function handlePointerDown(event: PointerEvent) {
		if (!content || !event.isPrimary || (event.pointerType === 'mouse' && event.button !== 0)) return;
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
		onDragStart?.({ originalEvent: event });
	}

	function handlePointerMove(event: PointerEvent) {
		if (pointerId !== event.pointerId) return;
		event.preventDefault();
		setOffset(baseOffset + projectedDistance(event));
		onDrag?.({
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
		if (!content || pointerId !== event.pointerId) return;
		try {
			if (content.hasPointerCapture(event.pointerId)) content.releasePointerCapture(event.pointerId);
		} catch {
			// Capture may already have been released by the browser.
		}
		pointerId = undefined;
		delete content.dataset.dragging;

		if (cancelled) {
			content.style.removeProperty('--melt-drawer-drag-offset');
			onDragCancel?.({ originalEvent: event });
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
		onDragEnd?.({ originalEvent: event, snapPoint, dismissed });
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
<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<div
	bind:this={content}
	class={`melt-drawer__content ${className}`.trim()}
	role="document"
	data-melt-drawer-content
	data-direction={$direction}
	data-snap-point={$activeSnapPoint}
	style={`--melt-drawer-snap-offset: ${(1 - $activeSnapPoint) * 100}%; ${style}`}
	onpointerdown={handlePointerDown}
	onpointermove={handlePointerMove}
	onpointerup={(event) => finishPointer(event, false)}
	onpointercancel={(event) => finishPointer(event, true)}
	{...rest}
>
	{@render children?.()}
</div>
