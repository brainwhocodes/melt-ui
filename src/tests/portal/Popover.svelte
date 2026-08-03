<script lang="ts">
	import { createPopover, type CreatePopoverProps } from '$lib/index.js';
	import { Settings2 } from '$icons/index.js';
	import { initLevel } from './level.js';

	export let portal: CreatePopoverProps['portal'];
	export let forceVisible: CreatePopoverProps['forceVisible'];

	const {
		elements: { trigger, content, arrow, close },
		states: { open },
	} = createPopover({ portal, forceVisible });

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
		<slot />
		<button {...$close} use:close data-testid="popover-close-{level}"> Close </button>
	</div>
{/if}
<div data-testid="popover-outside-{level}"></div>
