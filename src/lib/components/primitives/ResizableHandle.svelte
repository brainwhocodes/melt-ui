<script lang="ts">
	import { getContext, onMount } from 'svelte';
	import {
		RESIZABLE_CONTEXT,
		type ResizableContext,
		type ResizableResizeDetail,
	} from './resizable-context.js';


	interface Props {
		disabled?: boolean;
		keyboardStep?: number;
		onresize?: (detail: ResizableResizeDetail) => void;
		class?: string;
		children?: import('svelte').Snippet;
		[key: string]: any
	}

	let {
		disabled = false,
		keyboardStep = 1,
		onresize = undefined,
		class: className = '',
		children,
		...rest
	}: Props = $props();


	const context = getContext<ResizableContext>(RESIZABLE_CONTEXT);
	if (!context) throw new Error('ResizableHandle must be used inside ResizableGroup.');
	const resizableState = context.state;
	const token = {};
	let dragging = $state(false);
	let activePointer: number | null = $state(null);
	let lastCoordinate = 0;

	let handleIndex = $derived($resizableState.handles.indexOf(token));
	let previousPanel = $derived($resizableState.panels[handleIndex]);
	let nextPanel = $derived($resizableState.panels[handleIndex + 1]);
	let pairSize = $derived(previousPanel && nextPanel ? previousPanel.size + nextPanel.size : 100);
	let minimum = $derived(previousPanel && nextPanel
		? Math.max(previousPanel.minSize, pairSize - nextPanel.maxSize)
		: 0);
	let maximum = $derived(previousPanel && nextPanel
		? Math.min(previousPanel.maxSize, pairSize - nextPanel.minSize)
		: 100);
	let effectiveDisabled = $derived(disabled || $resizableState.disabled || previousPanel?.disabled || nextPanel?.disabled);
	let separatorOrientation: 'horizontal' | 'vertical' = $derived($resizableState.direction === 'horizontal' ? 'vertical' : 'horizontal');


	const coordinate = (event: PointerEvent) =>
		$resizableState.direction === 'horizontal' ? event.clientX : event.clientY;

	function emitResize(detail: ResizableResizeDetail | null) {
		if (detail) onresize?.(detail);
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
<!-- svelte-ignore a11y_no_noninteractive_tabindex, a11y_no_noninteractive_element_interactions -->
<div
	{...rest}
	class={`melt-resizable-handle ${className}`}
	data-direction={$resizableState.direction}
	data-active={dragging ? '' : undefined}
	data-disabled={effectiveDisabled ? '' : undefined}
	role="separator"
	aria-label={rest['aria-label'] ?? 'Resize panels'}
	aria-orientation={separatorOrientation}
	aria-valuemin={minimum}
	aria-valuemax={maximum}
	aria-valuenow={previousPanel?.size ?? 0}
	aria-disabled={effectiveDisabled || undefined}
	tabindex={effectiveDisabled ? -1 : 0}
	onpointerdown={handlePointerDown}
	onpointermove={handlePointerMove}
	onpointerup={finishPointer}
	onpointercancel={finishPointer}
	onlostpointercapture={() => {
		dragging = false;
		activePointer = null;
	}}
	onkeydown={handleKeydown}
>
	<span class="melt-resizable-handle-grip" aria-hidden="true">{@render children?.()}</span>
</div>
