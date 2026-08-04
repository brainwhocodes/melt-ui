<script lang="ts">
	import { untrack } from 'svelte';
	import { createPopover, type CreatePopoverProps } from '$lib/index.js';
	import { Settings2 } from '$icons/index.js';
	import { initLevel } from './level.js';

	interface Props {
		portal: CreatePopoverProps['portal'];
		forceVisible: CreatePopoverProps['forceVisible'];
		children?: import('svelte').Snippet;
	}

	let { portal, forceVisible, children }: Props = $props();

	const {
		elements: { trigger, content, arrow, close },
		states: { open },
	} = createPopover(untrack(() => ({ portal, forceVisible })));

	const level = initLevel();
</script>

<button
	type="button"
	class="trigger"
	{...$trigger} use:trigger
	aria-label="Update dimensions"
	data-testid="popover-trigger-{level}"
>
	<Settings2 class="surface-6afd848cde" />
	<span class="surface-e1d8de000e">Open Popover</span>
</button>

{#if $open || !forceVisible}
	<div {...$content} use:content data-testid="popover-content-{level}">
		<div {...$arrow} use:arrow data-testid="popover-arrow-{level}"></div>
		{@render children?.()}
		<button {...$close} use:close data-testid="popover-close-{level}"> Close </button>
	</div>
{/if}
<div data-testid="popover-outside-{level}"></div>
