<script lang="ts">
	import { createPopover, createSelect, melt } from '$lib/index.js';
	import { Settings2 } from '$icons/index.js';
	import type { PortalConfig } from '$lib/internal/actions/portal.js';

	export let portal: PortalConfig;

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
	use:melt={$trigger}
	aria-label="Update dimensions"
	data-testid="popover-trigger"
>
	<Settings2 class="surface-abef3c1354" />
	<span class="surface-3b59b64e0c">Open Popover</span>
</button>

<div use:melt={$content} data-testid="popover-content">
	<div use:melt={$arrow} data-testid="popover-arrow" />
	<button use:melt={$selectTrigger} data-testid="select-trigger"> Open Select </button>
	<div use:melt={$menu} data-testid="select-menu">
		<div use:melt={$option({ value: 'option 1', label: 'option 1' })}>option 1</div>
	</div>
	<button use:melt={$close} data-testid="popover-close">Close</button>
</div>
<div class="surface-999359b9b6" />
<div data-testid="outside" class="surface-fdd1e167b2" />
