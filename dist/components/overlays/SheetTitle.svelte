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
	const context = useOverlayContext<OverlayContext>(sheetContext, 'SheetTitle');
	let resolvedId = id;
	onMount(() => {
		resolvedId = id || createOverlayId('melt-sheet-title');
		return context.registerTitle(resolvedId);
	});
</script>

<h2 id={resolvedId || undefined} class={`melt-sheet__title ${className}`.trim()} {...$$restProps}>
	<slot />
</h2>
