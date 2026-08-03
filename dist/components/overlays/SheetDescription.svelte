<script lang="ts">
	import { onMount } from 'svelte';
	import {
		createOverlayId,
		sheetContext,
		type OverlayContext,
		useOverlayContext,
	} from './overlay.js';

	export let id = '';
	let className = '';
	export { className as class };
	const context = useOverlayContext<OverlayContext>(sheetContext, 'SheetDescription');
	let resolvedId = id;
	onMount(() => {
		resolvedId = id || createOverlayId('melt-sheet-description');
		return context.registerDescription(resolvedId);
	});
</script>

<p id={resolvedId || undefined} class={`melt-sheet__description ${className}`.trim()} {...$$restProps}>
	<slot />
</p>
