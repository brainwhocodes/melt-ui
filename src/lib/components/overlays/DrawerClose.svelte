<script lang="ts">
	import {
		drawerContext,
		type DrawerContext,
		useOverlayContext,
	} from './overlay.js';

	interface Props {
		type?: 'button' | 'submit' | 'reset';
		disabled?: boolean;
		ariaLabel?: string;
		onclose?: (detail: { originalEvent: MouseEvent }) => void;
		onclick?: (detail: { originalEvent: MouseEvent }) => void;
		class?: string;
		children?: import('svelte').Snippet;
		[key: string]: any
	}

	let {
		type = 'button',
		disabled = false,
		ariaLabel = 'Close',
		onclose = undefined,
		onclick = undefined,
		class: className = '',
		children,
		...rest
	}: Props = $props();

	const context = useOverlayContext<DrawerContext>(drawerContext, 'DrawerClose');

	function handleClick(event: MouseEvent) {
		onclick?.({ originalEvent: event });
		onclose?.({ originalEvent: event });
		if (!event.defaultPrevented) context.close('close-button');
	}
</script>

<button
	{...rest}
	{type}
	{disabled}
	aria-label={ariaLabel}
	class={`melt-drawer__close ${className}`.trim()}
	data-melt-drawer-close
	onclick={handleClick}
>
	{#if children}{@render children()}{:else}Close{/if}
</button>
