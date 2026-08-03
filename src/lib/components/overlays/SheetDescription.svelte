<script lang="ts">
	import { onMount } from 'svelte';
	import {
		createOverlayId,
		sheetContext,
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

	const context = useOverlayContext<OverlayContext>(sheetContext, 'SheetDescription');
	let resolvedId = $state(id);
	onMount(() => {
		resolvedId = id || createOverlayId('melt-sheet-description');
		return context.registerDescription(resolvedId);
	});
</script>

<p id={resolvedId || undefined} class={`melt-sheet__description ${className}`.trim()} {...rest}>
	{@render children?.()}
</p>
