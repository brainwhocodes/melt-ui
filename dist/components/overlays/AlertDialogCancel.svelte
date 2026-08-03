<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import {
		alertDialogContext,
		type OverlayContext,
		useOverlayContext,
	} from './overlay.js';

	export let type: 'button' | 'submit' | 'reset' = 'button';
	export let disabled = false;
	let className = '';
	export { className as class };
	const context = useOverlayContext<OverlayContext>(alertDialogContext, 'AlertDialogCancel');
	const dispatch = createEventDispatcher<{
		cancel: { originalEvent: MouseEvent };
		click: { originalEvent: MouseEvent };
	}>();

	function handleClick(event: MouseEvent) {
		const clickAllowed = dispatch('click', { originalEvent: event }, { cancelable: true });
		const cancelAllowed = dispatch('cancel', { originalEvent: event }, { cancelable: true });
		if (clickAllowed && cancelAllowed && !event.defaultPrevented) context.close('cancel');
	}
</script>

<button
	{...$$restProps}
	{type}
	{disabled}
	class={`melt-alert-dialog__cancel ${className}`.trim()}
	data-melt-alert-dialog-cancel
	on:click={handleClick}
>
	<slot />
</button>
