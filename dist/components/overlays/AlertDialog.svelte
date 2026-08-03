<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import {
		alertDialogContext,
		containFocus,
		focusInitial,
		hideModal,
		lockBodyScroll,
		provideOverlayContext,
		restoreFocus,
		showModal,
		type OverlayCloseReason,
		type OverlayContext,
		type OverlayOpenChange,
	} from './overlay.js';

	export let open = false;
	export let closeOnEscape = true;
	export let closeOnBackdrop = false;
	export let onOpenChange: OverlayOpenChange | undefined = undefined;
	let className = '';
	export { className as class };

	const dispatch = createEventDispatcher<{
		openChange: { open: boolean; reason: OverlayCloseReason };
		dismiss: { reason: OverlayCloseReason };
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

	const context: OverlayContext = {
		close,
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
	provideOverlayContext(alertDialogContext, context);

	function activate() {
		if (active || !dialog || typeof document === 'undefined') return;
		previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
		releaseFallback = showModal(dialog);
		releaseScroll = lockBodyScroll();
		releaseFocus = containFocus(dialog);
		active = true;
		focusInitial(dialog, '[data-melt-alert-dialog-cancel]:not(:disabled)');
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

	$: if (mounted && dialog) {
		if (open) activate();
		else deactivate();
	}
</script>

<!-- Escape supplies the keyboard equivalent for backdrop dismissal. -->
<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
	bind:this={dialog}
	class={`melt-alert-dialog ${className}`.trim()}
	role="alertdialog"
	aria-modal="true"
	aria-labelledby={titleId}
	aria-describedby={descriptionId}
	data-state={open ? 'open' : 'closed'}
	on:cancel={handleCancel}
	on:click={handleBackdrop}
	on:close={handleNativeClose}
	{...$$restProps}
>
	<slot {close} />
</dialog>
