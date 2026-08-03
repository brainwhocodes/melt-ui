<script lang="ts">
	import {
		alertDialogContext,
		type OverlayContext,
		useOverlayContext,
	} from './overlay.js';

	interface Props {
		type?: 'button' | 'submit' | 'reset';
		disabled?: boolean;
		onaction?: (detail: { originalEvent: MouseEvent }) => void;
		onclick?: (detail: { originalEvent: MouseEvent }) => void;
		class?: string;
		children?: import('svelte').Snippet;
		[key: string]: any
	}

	let {
		type = 'button',
		disabled = false,
		onaction = undefined,
		onclick = undefined,
		class: className = '',
		children,
		...rest
	}: Props = $props();

	const context = useOverlayContext<OverlayContext>(alertDialogContext, 'AlertDialogAction');

	function handleClick(event: MouseEvent) {
		onclick?.({ originalEvent: event });
		onaction?.({ originalEvent: event });
		if (!event.defaultPrevented) context.close('action');
	}
</script>

<button
	{...rest}
	{type}
	{disabled}
	class={`melt-alert-dialog__action ${className}`.trim()}
	onclick={handleClick}
>
	{@render children?.()}
</button>
