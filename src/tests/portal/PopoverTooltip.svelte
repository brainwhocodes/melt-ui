<script lang="ts">
	import { createPopover, createTooltip, type CreateTooltipProps } from '$lib/index.js';
	import { Settings2 } from '$icons/index.js';
	import type { PortalConfig } from '$lib/internal/actions/portal.js';

	export let portal: PortalConfig;
	export let tooltipEscapeBehavior: CreateTooltipProps['escapeBehavior'] = 'close';

	const {
		elements: { trigger, content, arrow, close },
	} = createPopover({ portal });

	const {
		elements: { trigger: ttTrigger, content: ttContent },
	} = createTooltip({
		openDelay: 0,
		closeDelay: 0,
		portal,
		escapeBehavior: tooltipEscapeBehavior,
	});
</script>

<button
	type="button"
	class="trigger"
	{...$trigger} use:trigger
	aria-label="Update dimensions"
	data-testid="popover-trigger"
>
	<Settings2 class="surface-b5d29f6a44" />
	<span class="surface-84086a286c">Open Popover</span>
</button>

<div {...$content} use:content data-testid="popover-content">
	<div {...$arrow} use:arrow data-testid="popover-arrow"></div>
	<button {...$ttTrigger} use:ttTrigger data-testid="tooltip-trigger"> Open tooltip </button>
	<div {...$ttContent} use:ttContent data-testid="tooltip-content">Tooltip content</div>
	<button {...$close} use:close data-testid="popover-close"> Close </button>
</div>
<div class="surface-6f46a10dd4"></div>
<div data-testid="outside" class="surface-75cefea230"></div>
