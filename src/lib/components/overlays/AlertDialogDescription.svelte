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

	const context = useOverlayContext<OverlayContext>(alertDialogContext, 'AlertDialogDescription');
	let resolvedId = $state(id);

	onMount(() => {
		resolvedId = id || createOverlayId('melt-alert-dialog-description');
		return context.registerDescription(resolvedId);
	});
</script>

<p id={resolvedId || undefined} class={`melt-alert-dialog__description ${className}`.trim()} {...rest}>
	{@render children?.()}
</p>
