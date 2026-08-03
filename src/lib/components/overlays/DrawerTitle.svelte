<script lang="ts">
	import { onMount } from 'svelte';
	import {
		createOverlayId,
		drawerContext,
		type DrawerContext,
		useOverlayContext,
	} from './overlay.js';

	export let id = '';
	let className = '';
	export { className as class };
	const context = useOverlayContext<DrawerContext>(drawerContext, 'DrawerTitle');
	let resolvedId = id;
	onMount(() => {
		resolvedId = id || createOverlayId('melt-drawer-title');
		return context.registerTitle(resolvedId);
	});
</script>

<h2 id={resolvedId || undefined} class={`melt-drawer__title ${className}`.trim()} {...$$restProps}>
	<slot />
</h2>
