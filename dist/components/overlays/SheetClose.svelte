<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import {
		sheetContext,
		type OverlayContext,
		useOverlayContext,
	} from './overlay.js';

	export let type: 'button' | 'submit' | 'reset' = 'button';
	export let disabled = false;
	export let ariaLabel = 'Close';
	let className = '';
	export { className as class };
	const context = useOverlayContext<OverlayContext>(sheetContext, 'SheetClose');
	const dispatch = createEventDispatcher<{
		close: { originalEvent: MouseEvent };
		click: { originalEvent: MouseEvent };
	}>();

	function handleClick(event: MouseEvent) {
		const clickAllowed = dispatch('click', { originalEvent: event }, { cancelable: true });
		const closeAllowed = dispatch('close', { originalEvent: event }, { cancelable: true });
		if (clickAllowed && closeAllowed && !event.defaultPrevented) context.close('close-button');
	}
</script>

<button
	{...$$restProps}
	{type}
	{disabled}
	aria-label={ariaLabel}
	class={`melt-sheet__close ${className}`.trim()}
	data-melt-sheet-close
	on:click={handleClick}
>
	<slot>Close</slot>
</button>
