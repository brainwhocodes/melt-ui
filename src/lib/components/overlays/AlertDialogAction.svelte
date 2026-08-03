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
	const context = useOverlayContext<OverlayContext>(alertDialogContext, 'AlertDialogAction');
	const dispatch = createEventDispatcher<{
		action: { originalEvent: MouseEvent };
		click: { originalEvent: MouseEvent };
	}>();

	function handleClick(event: MouseEvent) {
		const clickAllowed = dispatch('click', { originalEvent: event }, { cancelable: true });
		const actionAllowed = dispatch('action', { originalEvent: event }, { cancelable: true });
		if (clickAllowed && actionAllowed && !event.defaultPrevented) context.close('action');
	}
</script>

<button
	{...$$restProps}
	{type}
	{disabled}
	class={`melt-alert-dialog__action ${className}`.trim()}
	on:click={handleClick}
>
	<slot />
</button>
