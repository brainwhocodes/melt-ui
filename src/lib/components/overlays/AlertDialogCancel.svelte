<script lang="ts">
	import {
		alertDialogContext,
		type OverlayContext,
		useOverlayContext,
	} from './overlay.js';

	interface Props {
		type?: 'button' | 'submit' | 'reset';
		disabled?: boolean;
		oncancel?: (detail: { originalEvent: MouseEvent }) => void;
		onclick?: (detail: { originalEvent: MouseEvent }) => void;
		class?: string;
		children?: import('svelte').Snippet;
		[key: string]: any
	}

	let {
		type = 'button',
		disabled = false,
		oncancel = undefined,
		onclick = undefined,
		class: className = '',
		children,
		...rest
	}: Props = $props();

	const context = useOverlayContext<OverlayContext>(alertDialogContext, 'AlertDialogCancel');

	function handleClick(event: MouseEvent) {
		onclick?.({ originalEvent: event });
		oncancel?.({ originalEvent: event });
		if (!event.defaultPrevented) context.close('cancel');
	}
</script>

<button
	{...rest}
	{type}
	{disabled}
	class={`melt-alert-dialog__cancel ${className}`.trim()}
	data-melt-alert-dialog-cancel
	onclick={handleClick}
>
	{@render children?.()}
</button>
