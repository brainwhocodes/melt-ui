<script lang="ts">
	import { createPopover, createSelect } from '$lib/index.js';
	import { Settings2 } from '$icons/index.js';
	import type { PortalConfig } from '$lib/internal/actions/portal.js';

	interface Props {
		portal: PortalConfig;
	}

	let { portal }: Props = $props();

	const {
		elements: { trigger, content, arrow, close },
	} = createPopover({ portal });

	const {
		elements: { trigger: selectTrigger, menu, option },
	} = createSelect({ portal });
</script>

<button
	type="button"
	class="trigger"
	{...$trigger} use:trigger
	aria-label="Update dimensions"
	data-testid="popover-trigger"
>
	<Settings2 class="surface-abef3c1354" />
	<span class="surface-3b59b64e0c">Open Popover</span>
</button>

<div {...$content} use:content data-testid="popover-content">
	<div {...$arrow} use:arrow data-testid="popover-arrow"></div>
	<button {...$selectTrigger} use:selectTrigger data-testid="select-trigger"> Open Select </button>
	<div {...$menu} use:menu data-testid="select-menu">
		<div {...$option({ value: 'option 1', label: 'option 1' })} use:option>option 1</div>
	</div>
	<button {...$close} use:close data-testid="popover-close">Close</button>
</div>
<div class="surface-999359b9b6"></div>
<div data-testid="outside" class="surface-fdd1e167b2"></div>
