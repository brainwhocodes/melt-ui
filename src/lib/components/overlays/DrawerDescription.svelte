<script lang="ts">
	import { onMount, untrack } from 'svelte';
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

	const context = useOverlayContext<DrawerContext>(drawerContext, 'DrawerDescription');
	let resolvedId = $state(untrack(() => id));
	onMount(() => {
		resolvedId = id || createOverlayId('melt-drawer-description');
		return context.registerDescription(resolvedId);
	});
</script>

<p id={resolvedId || undefined} class={`melt-drawer__description ${className}`.trim()} {...rest}>
	{@render children?.()}
</p>
