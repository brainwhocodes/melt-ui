<script lang="ts">
	import { createEventDispatcher, getContext, onMount } from 'svelte';
	import {
		RESIZABLE_CONTEXT,
		type ResizableContext,
		type ResizableResizeDetail,
	} from './resizable-context.js';

	export let disabled = false;
	export let keyboardStep = 1;

	let className = '';
	export { className as class };

	const context = getContext<ResizableContext>(RESIZABLE_CONTEXT);
	if (!context) throw new Error('ResizableHandle must be used inside ResizableGroup.');
	const resizableState = context.state;
	const dispatch = createEventDispatcher<{ resize: ResizableResizeDetail }>();
	const token = {};
	let dragging = false;
	let activePointer: number | null = null;
	let lastCoordinate = 0;

	$: handleIndex = $resizableState.handles.indexOf(token);
	$: previousPanel = $resizableState.panels[handleIndex];
	$: nextPanel = $resizableState.panels[handleIndex + 1];
	$: pairSize = previousPanel && nextPanel ? previousPanel.size + nextPanel.size : 100;
	$: minimum = previousPanel && nextPanel
		? Math.max(previousPanel.minSize, pairSize - nextPanel.maxSize)
		: 0;
	$: maximum = previousPanel && nextPanel
		? Math.min(previousPanel.maxSize, pairSize - nextPanel.minSize)
		: 100;
	$: effectiveDisabled = disabled || $resizableState.disabled || previousPanel?.disabled || nextPanel?.disabled;
	let separatorOrientation: 'horizontal' | 'vertical';
	$: separatorOrientation = $resizableState.direction === 'horizontal' ? 'vertical' : 'horizontal';

	const coordinate = (event: PointerEvent) =>
		$resizableState.direction === 'horizontal' ? event.clientX : event.clientY;

	function emitResize(detail: ResizableResizeDetail | null) {
		if (detail) dispatch('resize', detail);
	}

	function handlePointerDown(event: PointerEvent) {
		if (effectiveDisabled || !event.isPrimary || (event.pointerType === 'mouse' && event.button !== 0)) return;
		event.preventDefault();
		dragging = true;
		activePointer = event.pointerId;
		lastCoordinate = coordinate(event);
		(event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
	}

	function handlePointerMove(event: PointerEvent) {
		if (!dragging || event.pointerId !== activePointer) return;
		const rect = context.getGroupRect();
		if (!rect) return;
		const dimension = $resizableState.direction === 'horizontal' ? rect.width : rect.height;
		if (dimension <= 0) return;
		const currentCoordinate = coordinate(event);
		let delta = ((currentCoordinate - lastCoordinate) / dimension) * 100;
		if ($resizableState.direction === 'horizontal' && $resizableState.dir === 'rtl') delta *= -1;
		lastCoordinate = currentCoordinate;
		emitResize(context.resizeBy(token, delta, 'pointer'));
	}

	function finishPointer(event: PointerEvent) {
		if (event.pointerId !== activePointer) return;
		dragging = false;
		activePointer = null;
		const target = event.currentTarget as HTMLElement;
		if (target.hasPointerCapture(event.pointerId)) target.releasePointerCapture(event.pointerId);
	}

	function handleKeydown(event: KeyboardEvent) {
		if (effectiveDisabled) return;
		const step = Number.isFinite(keyboardStep) && keyboardStep > 0 ? keyboardStep : 1;
		let delta: number | null = null;
		if ($resizableState.direction === 'horizontal') {
			if (event.key === 'ArrowLeft') delta = -step;
			if (event.key === 'ArrowRight') delta = step;
			if (delta !== null && $resizableState.dir === 'rtl') delta *= -1;
		} else {
			if (event.key === 'ArrowUp') delta = -step;
			if (event.key === 'ArrowDown') delta = step;
		}

		if (delta !== null) {
			event.preventDefault();
			emitResize(context.resizeBy(token, delta, 'keyboard'));
			return;
		}
		if (event.key === 'Home' || event.key === 'End') {
			event.preventDefault();
			emitResize(context.resizeTo(token, event.key === 'Home' ? 'min' : 'max', 'keyboard'));
		}
	}

	onMount(() => context.registerHandle(token));
</script>

<!-- A focusable ARIA separator is the APG interaction pattern for splitters. -->
<!-- svelte-ignore a11y-no-noninteractive-tabindex a11y-no-noninteractive-element-interactions -->
<div
	{...$$restProps}
	class={`melt-resizable-handle ${className}`}
	data-direction={$resizableState.direction}
	data-active={dragging ? '' : undefined}
	data-disabled={effectiveDisabled ? '' : undefined}
	role="separator"
	aria-label={$$restProps['aria-label'] ?? 'Resize panels'}
	aria-orientation={separatorOrientation}
	aria-valuemin={minimum}
	aria-valuemax={maximum}
	aria-valuenow={previousPanel?.size ?? 0}
	aria-disabled={effectiveDisabled || undefined}
	tabindex={effectiveDisabled ? -1 : 0}
	on:pointerdown={handlePointerDown}
	on:pointermove={handlePointerMove}
	on:pointerup={finishPointer}
	on:pointercancel={finishPointer}
	on:lostpointercapture={() => {
		dragging = false;
		activePointer = null;
	}}
	on:keydown={handleKeydown}
>
	<span class="melt-resizable-handle-grip" aria-hidden="true"><slot /></span>
</div>
