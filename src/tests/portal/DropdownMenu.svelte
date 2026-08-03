<script lang="ts">
	import { createDropdownMenu, type CreateDropdownMenuProps } from '$lib/index.js';
	import { initLevel } from './level.js';

	type $$Props = CreateDropdownMenuProps;

	export let portal: CreateDropdownMenuProps['portal'] = undefined;
	export let forceVisible: CreateDropdownMenuProps['forceVisible'] = false;

	const {
		elements: { trigger, menu, item },
		states: { open },
	} = createDropdownMenu({ forceVisible, portal, ...$$restProps });

	const level = initLevel();
</script>

<button {...$trigger} use:trigger data-testid="dropdown-menu-trigger-{level}">Open Popover</button>

{#if $open || !forceVisible}
	<div class="menu" {...$menu} use:menu data-testid="dropdown-menu-content-{level}">
		<div class="item" {...$item} use:item>Item 1</div>
		<div class="item" {...$item} use:item>Item 2</div>
		<slot />
	</div>
{/if}
<div data-testid="dropdown-menu-outside-{level}"></div>
