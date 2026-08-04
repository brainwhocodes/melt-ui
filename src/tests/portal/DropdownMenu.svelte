<script lang="ts">
	import { untrack } from 'svelte';
	import { createDropdownMenu, type CreateDropdownMenuProps } from '$lib/index.js';
	import { initLevel } from './level.js';

	type $$Props = CreateDropdownMenuProps;

	interface Props {
		portal?: CreateDropdownMenuProps['portal'];
		forceVisible?: CreateDropdownMenuProps['forceVisible'];
		children?: import('svelte').Snippet;
		[key: string]: any
	}

	let { portal = undefined, forceVisible = false, children, ...rest }: Props = $props();

	const {
		elements: { trigger, menu, item },
		states: { open },
	} = createDropdownMenu(untrack(() => ({ forceVisible, portal, ...rest })));

	const level = initLevel();
</script>

<button {...$trigger} use:trigger data-testid="dropdown-menu-trigger-{level}">Open Popover</button>

{#if $open || !forceVisible}
	<div class="menu" {...$menu} use:menu data-testid="dropdown-menu-content-{level}">
		<div class="item" {...$item} use:item>Item 1</div>
		<div class="item" {...$item} use:item>Item 2</div>
		{@render children?.()}
	</div>
{/if}
<div data-testid="dropdown-menu-outside-{level}"></div>
