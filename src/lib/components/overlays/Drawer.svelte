<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import {
		containFocus,
		drawerContext,
		focusInitial,
		hideModal,
		lockBodyScroll,
		provideOverlayContext,
		restoreFocus,
		showModal,
		type DrawerContext,
		type DrawerDirection,
		type OverlayCloseReason,
		type OverlayOpenChange,
	} from './overlay.js';

	export let open = false;
	export let direction: DrawerDirection = 'bottom';
	export let dismissThreshold = 0.25;
	export let snapPoints: number[] = [0, 1];
	export let activeSnapPoint = 1;
	export let closeOnEscape = true;
	export let closeOnBackdrop = true;
	export let onOpenChange: OverlayOpenChange | undefined = undefined;
	export let onSnapPointChange: ((value: number) => void) | undefined = undefined;
	let className = '';
	export { className as class };

	const dispatch = createEventDispatcher<{
		openChange: { open: boolean; reason: OverlayCloseReason };
		dismiss: { reason: OverlayCloseReason };
		snapPointChange: { value: number };
	}>();
	let dialog: HTMLDialogElement;
	let mounted = false;
	let active = false;
	let titleId: string | undefined;
	let descriptionId: string | undefined;
	let previouslyFocused: HTMLElement | null = null;
	let releaseFocus: () => void = () => {};
	let releaseScroll: () => void = () => {};
	let releaseFallback: () => void = () => {};

	const directionStore = writable<DrawerDirection>(direction);
	const activeSnapPointStore = writable(activeSnapPoint);
	const dismissThresholdStore = writable(dismissThreshold);
	const snapPointsStore = writable<number[]>(normalizeSnapPoints(snapPoints));

	function normalizeSnapPoints(points: number[]): number[] {
		const normalized = points
			.filter(Number.isFinite)
			.map((point) => Math.max(0, Math.min(1, point)))
			.sort((a, b) => a - b)
			.filter((point, index, values) => index === 0 || point !== values[index - 1]);
		return normalized.length > 0 ? normalized : [0, 1];
	}
	function setOpen(next: boolean, reason: OverlayCloseReason) {
		if (open === next) return;
		open = next;
		onOpenChange?.(next, reason);
		dispatch('openChange', { open: next, reason });
		if (!next) dispatch('dismiss', { reason });
	}
	function close(reason: OverlayCloseReason = 'programmatic') {
		setOpen(false, reason);
	}
	function setActiveSnapPoint(value: number) {
		const normalized = Math.max(0, Math.min(1, value));
		if (normalized === activeSnapPoint) return;
		activeSnapPoint = normalized;
		onSnapPointChange?.(normalized);
		dispatch('snapPointChange', { value: normalized });
	}

	const context: DrawerContext = {
		close,
		direction: directionStore,
		activeSnapPoint: activeSnapPointStore,
		dismissThreshold: dismissThresholdStore,
		snapPoints: snapPointsStore,
		setActiveSnapPoint,
		registerTitle(id) {
			titleId = id;
			return () => {
				if (titleId === id) titleId = undefined;
			};
		},
		registerDescription(id) {
			descriptionId = id;
			return () => {
				if (descriptionId === id) descriptionId = undefined;
			};
		},
	};
	provideOverlayContext(drawerContext, context);

	function activate() {
		if (active || !dialog || typeof document === 'undefined') return;
		previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
		releaseFallback = showModal(dialog);
		releaseScroll = lockBodyScroll();
		releaseFocus = containFocus(dialog);
		active = true;
		focusInitial(dialog);
	}
	function deactivate(returnFocus = true) {
		if (!dialog) return;
		if (active) {
			releaseFocus();
			releaseScroll();
			releaseFallback();
			releaseFocus = releaseScroll = releaseFallback = () => undefined;
			active = false;
		}
		hideModal(dialog);
		if (returnFocus) restoreFocus(previouslyFocused);
		previouslyFocused = null;
	}
	function handleCancel(event: Event) {
		event.preventDefault();
		if (closeOnEscape) close('escape');
	}
	function handleBackdrop(event: MouseEvent) {
		if (closeOnBackdrop && event.target === dialog) close('backdrop');
	}
	function handleNativeClose() {
		if (mounted && open) close('programmatic');
	}

	onMount(() => {
		mounted = true;
		if (open) activate();
		return () => {
			mounted = false;
			deactivate(false);
		};
	});

	$: directionStore.set(direction);
	$: activeSnapPointStore.set(Math.max(0, Math.min(1, activeSnapPoint)));
	$: dismissThresholdStore.set(Math.max(0, dismissThreshold));
	$: snapPointsStore.set(normalizeSnapPoints(snapPoints));
	$: if (mounted && dialog) {
		if (open) activate();
		else deactivate();
	}
</script>

<!-- Escape supplies the keyboard equivalent for backdrop dismissal. -->
<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
	bind:this={dialog}
	class={`melt-drawer ${className}`.trim()}
	aria-modal="true"
	aria-labelledby={titleId}
	aria-describedby={descriptionId}
	data-state={open ? 'open' : 'closed'}
	data-direction={direction}
	data-snap-point={activeSnapPoint}
	on:cancel={handleCancel}
	on:click={handleBackdrop}
	on:close={handleNativeClose}
	{...$$restProps}
>
	<slot {close} />
</dialog>
