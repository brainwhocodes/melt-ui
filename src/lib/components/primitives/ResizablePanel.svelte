<script lang="ts">
	import { getContext, onMount } from 'svelte';
	import {
		RESIZABLE_CONTEXT,
		type ResizableContext,
		type ResizablePanelConfig,
	} from './resizable-context.js';


	interface Props {
		defaultSize?: number | undefined;
		minSize?: number;
		maxSize?: number;
		disabled?: boolean;
		class?: string;
		children?: import('svelte').Snippet;
		[key: string]: any
	}

	let {
		defaultSize = undefined,
		minSize = 0,
		maxSize = 100,
		disabled = false,
		class: className = '',
		children,
		...rest
	}: Props = $props();


	const context = getContext<ResizableContext>(RESIZABLE_CONTEXT);
	if (!context) throw new Error('ResizablePanel must be used inside ResizableGroup.');
	const resizableState = context.state;
	const token = {};
	let mounted = $state(false);

	let config = $derived({ defaultSize, minSize, maxSize, disabled } satisfies ResizablePanelConfig);
	$effect(() => {
		if (mounted) context.updatePanel(token, config);
	});
	let panelState = $derived($resizableState.panels.find((panel) => panel.token === token));
	let renderedSize = $derived(panelState?.size ?? defaultSize);
	let inlineStyle = $derived([
		rest.style,
		Number.isFinite(renderedSize) ? `--melt-resizable-panel-size: ${renderedSize}%` : '',
	]
		.filter(Boolean)
		.join('; '));

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
	{...rest}
	class={`melt-resizable-panel ${className}`}
	style={inlineStyle}
	data-size={Number.isFinite(renderedSize) ? renderedSize : undefined}
	data-disabled={disabled ? '' : undefined}
	aria-disabled={disabled || undefined}
>
	{@render children?.()}
</div>
