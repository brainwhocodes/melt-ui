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
	const context = useOverlayContext<DrawerContext>(drawerContext, 'DrawerDescription');
	let resolvedId = id;
	onMount(() => {
		resolvedId = id || createOverlayId('melt-drawer-description');
		return context.registerDescription(resolvedId);
	});
</script>

<p id={resolvedId || undefined} class={`melt-drawer__description ${className}`.trim()} {...$$restProps}>
	<slot />
</p>
