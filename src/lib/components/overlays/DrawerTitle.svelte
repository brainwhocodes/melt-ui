<script lang="ts">
	import { onMount } from 'svelte';
	import {
		createOverlayId,
		drawerContext,
		type DrawerContext,
		useOverlayContext,
	} from './overlay.js';

	interface Props {
		id?: string;
		class?: string;
		children?: import('svelte').Snippet;
		[key: string]: any
	}

	let { id = '', class: className = '', children, ...rest }: Props = $props();

	const context = useOverlayContext<DrawerContext>(drawerContext, 'DrawerTitle');
	let resolvedId = $state(id);
	onMount(() => {
		resolvedId = id || createOverlayId('melt-drawer-title');
		return context.registerTitle(resolvedId);
	});
</script>

<h2 id={resolvedId || undefined} class={`melt-drawer__title ${className}`.trim()} {...rest}>
	{@render children?.()}
</h2>
