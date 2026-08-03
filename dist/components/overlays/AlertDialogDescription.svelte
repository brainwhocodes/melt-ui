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
	const context = useOverlayContext<OverlayContext>(alertDialogContext, 'AlertDialogDescription');
	let resolvedId = id;

	onMount(() => {
		resolvedId = id || createOverlayId('melt-alert-dialog-description');
		return context.registerDescription(resolvedId);
	});
</script>

<p id={resolvedId || undefined} class={`melt-alert-dialog__description ${className}`.trim()} {...$$restProps}>
	<slot />
</p>
