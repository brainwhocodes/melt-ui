<script lang="ts">
	import { onMount } from 'svelte';
	import {
		alertDialogContext,
		createOverlayId,
		type OverlayContext,
		useOverlayContext,
	} from './overlay.js';

	export let id = '';
	let className = '';
	export { className as class };
	const context = useOverlayContext<OverlayContext>(alertDialogContext, 'AlertDialogTitle');
	let resolvedId = id;

	onMount(() => {
		resolvedId = id || createOverlayId('melt-alert-dialog-title');
		return context.registerTitle(resolvedId);
	});
</script>

<h2 id={resolvedId || undefined} class={`melt-alert-dialog__title ${className}`.trim()} {...$$restProps}>
	<slot />
</h2>
