<script lang="ts">
	import { onMount } from 'svelte';
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

	interface Props {
		open?: boolean;
		closeOnEscape?: boolean;
		closeOnBackdrop?: boolean;
		onOpenChange?: OverlayOpenChange | undefined;
		onDismiss?: ((detail: { reason: OverlayCloseReason }) => void) | undefined;
		class?: string;
		children?: import('svelte').Snippet<[any]>;
		[key: string]: any
	}

	let {
		open = $bindable(false),
		closeOnEscape = true,
		closeOnBackdrop = false,
		onOpenChange = undefined,
		onDismiss = undefined,
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

	function setOpen(next: boolean, reason: OverlayCloseReason) {
		if (open === next) return;
		open = next;
		onOpenChange?.(next, reason);
		if (!next) onDismiss?.({ reason });
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
	class={`melt-alert-dialog ${className}`.trim()}
	role="alertdialog"
	aria-modal="true"
	aria-labelledby={titleId}
	aria-describedby={descriptionId}
	data-state={open ? 'open' : 'closed'}
	oncancel={handleCancel}
	onclick={handleBackdrop}
	onclose={handleNativeClose}
	{...rest}
>
	{@render children?.({ close, })}
</dialog>
