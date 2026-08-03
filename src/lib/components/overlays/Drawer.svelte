<script lang="ts">
	import { onMount } from 'svelte';
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

	interface Props {
		open?: boolean;
		direction?: DrawerDirection;
		dismissThreshold?: number;
		snapPoints?: number[];
		activeSnapPoint?: number;
		closeOnEscape?: boolean;
		closeOnBackdrop?: boolean;
		onOpenChange?: OverlayOpenChange | undefined;
		onDismiss?: ((detail: { reason: OverlayCloseReason }) => void) | undefined;
		onSnapPointChange?: ((value: number) => void) | undefined;
		class?: string;
		children?: import('svelte').Snippet<[any]>;
		[key: string]: any
	}

	let {
		open = $bindable(false),
		direction = 'bottom',
		dismissThreshold = 0.25,
		snapPoints = [0, 1],
		activeSnapPoint = $bindable(1),
		closeOnEscape = true,
		closeOnBackdrop = true,
		onOpenChange = undefined,
		onDismiss = undefined,
		onSnapPointChange = undefined,
		class: className = '',
		children,
		...rest
	}: Props = $props();


	let dialog: HTMLDialogElement | undefined = $state();
	let mounted = $state(false);
	let active = false;
	let titleId: string | undefined = $state();
	let descriptionId: string | undefined = $state();
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
		if (!next) onDismiss?.({ reason });
	}
	function close(reason: OverlayCloseReason = 'programmatic') {
		setOpen(false, reason);
	}
	function setActiveSnapPoint(value: number) {
		const normalized = Math.max(0, Math.min(1, value));
		if (normalized === activeSnapPoint) return;
		activeSnapPoint = normalized;
		onSnapPointChange?.(normalized);
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

	$effect(() => {
		directionStore.set(direction);
	});
	$effect(() => {
		activeSnapPointStore.set(Math.max(0, Math.min(1, activeSnapPoint)));
	});
	$effect(() => {
		dismissThresholdStore.set(Math.max(0, dismissThreshold));
	});
	$effect(() => {
		snapPointsStore.set(normalizeSnapPoints(snapPoints));
	});
	$effect(() => {
		if (mounted && dialog) {
			if (open) activate();
			else deactivate();
		}
	});
</script>

<!-- Escape supplies the keyboard equivalent for backdrop dismissal. -->
<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_noninteractive_element_interactions -->
<dialog
	bind:this={dialog}
	class={`melt-drawer ${className}`.trim()}
	aria-modal="true"
	aria-labelledby={titleId}
	aria-describedby={descriptionId}
	data-state={open ? 'open' : 'closed'}
	data-direction={direction}
	data-snap-point={activeSnapPoint}
	oncancel={handleCancel}
	onclick={handleBackdrop}
	onclose={handleNativeClose}
	{...rest}
>
	{@render children?.({ close, })}
</dialog>
