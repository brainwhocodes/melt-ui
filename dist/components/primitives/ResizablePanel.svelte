<script lang="ts">
	import { getContext, onMount } from 'svelte';
	import {
		RESIZABLE_CONTEXT,
		type ResizableContext,
		type ResizablePanelConfig,
	} from './resizable-context.js';

	export let defaultSize: number | undefined = undefined;
	export let minSize = 0;
	export let maxSize = 100;
	export let disabled = false;

	let className = '';
	export { className as class };

	const context = getContext<ResizableContext>(RESIZABLE_CONTEXT);
	if (!context) throw new Error('ResizablePanel must be used inside ResizableGroup.');
	const resizableState = context.state;
	const token = {};
	let mounted = false;

	$: config = { defaultSize, minSize, maxSize, disabled } satisfies ResizablePanelConfig;
	$: if (mounted) context.updatePanel(token, config);
	$: panelState = $resizableState.panels.find((panel) => panel.token === token);
	$: renderedSize = panelState?.size ?? defaultSize;
	$: inlineStyle = [
		$$restProps.style,
		Number.isFinite(renderedSize) ? `--melt-resizable-panel-size: ${renderedSize}%` : '',
	]
		.filter(Boolean)
		.join('; ');

	onMount(() => {
		mounted = true;
		const unregister = context.registerPanel(token, config);
		return () => {
			mounted = false;
			unregister();
		};
	});
</script>

<div
	{...$$restProps}
	class={`melt-resizable-panel ${className}`}
	style={inlineStyle}
	data-size={Number.isFinite(renderedSize) ? renderedSize : undefined}
	data-disabled={disabled ? '' : undefined}
	aria-disabled={disabled || undefined}
>
	<slot />
</div>
