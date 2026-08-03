<script lang="ts">
	import { onMount } from 'svelte';
	import {
		alertDialogContext,
		createOverlayId,
		type OverlayContext,
		useOverlayContext,
	} from './overlay.js';

	interface Props {
		id?: string;
		class?: string;
		children?: import('svelte').Snippet;
		[key: string]: any
	}

	let { id = '', class: className = '', children, ...rest }: Props = $props();

	const context = useOverlayContext<OverlayContext>(alertDialogContext, 'AlertDialogTitle');
	let resolvedId = $state(id);

	onMount(() => {
		resolvedId = id || createOverlayId('melt-alert-dialog-title');
		return context.registerTitle(resolvedId);
	});
</script>

<h2 id={resolvedId || undefined} class={`melt-alert-dialog__title ${className}`.trim()} {...rest}>
	{@render children?.()}
</h2>
