<script lang="ts">
	import { createContextMenu, type CreateContextMenuProps } from '$lib/index.js';
	import { writable } from 'svelte/store';
	import { ChevronRight } from '$icons/index.js';
	import { fade } from 'svelte/transition';
	import { removeUndefined } from '../utils.js';
	import { untrack } from 'svelte';

	const settingsSync = writable(true);
	const hideMeltUI = writable(false);

	type $$Props = CreateContextMenuProps;

	interface Props {
		loop?: boolean;
		closeFocus?: CreateContextMenuProps['closeFocus'];
		escapeBehavior?: CreateContextMenuProps['escapeBehavior'];
		closeOnOutsideClick?: CreateContextMenuProps['closeOnOutsideClick'];
		submenuIds?: CreateContextMenuProps['ids'];
		[key: string]: any
	}

	let {
		loop = false,
		closeFocus = undefined,
		escapeBehavior = 'close',
		closeOnOutsideClick = true,
		submenuIds = undefined,
		...rest
	}: Props = $props();

	const {
		elements: { trigger, menu, item, separator, arrow },
		builders: { createSubmenu, createMenuRadioGroup, createCheckboxItem },
		states: { open },
	} = createContextMenu(
		untrack(() => ({
			loop,
			closeFocus,
			escapeBehavior,
			closeOnOutsideClick,
			...rest,
			forceVisible: true,
		}))
	);

	const {
		elements: { checkboxItem: settingsSyncCheckbox },
	} = createCheckboxItem({
		checked: settingsSync,
	});
	const {
		elements: { checkboxItem: hideMeltUICheckbox },
	} = createCheckboxItem({
		checked: hideMeltUI,
	});

	const {
		elements: { subMenu: subMenuA, subTrigger: subTriggerA },
		states: { subOpen },
	} = createSubmenu(
		removeUndefined(
			untrack(() => ({
				ids: submenuIds,
			}))
		)
	);

	const {
		elements: { radioGroup, radioItem },
		helpers: { isChecked },
	} = createMenuRadioGroup({
		defaultValue: 'Hunter Johnston',
	});

	const personsArr = ['Hunter Johnston', 'Thomas G. Lopes', 'Adrian Gonz', 'Franck Poingt'];
</script>

<main>
	<div data-testid="outside-click">outside</div>
	<button id="closeFocus" data-testid="closeFocus">close focus</button>
	<div {...$trigger} use:trigger aria-label="Update dimensions" data-testid="trigger">open menu</div>
	{#if $open}
		<div {...$menu} use:menu data-testid="menu" transition:fade>
			<div {...$item} use:item data-testid="item1">Item 1</div>
			<div {...$item} use:item data-testid="item2" data-disabled>Item 2</div>
			<div class="separator" {...$separator} use:separator></div>
			<div data-testid="checkboxItem1" {...$settingsSyncCheckbox} use:settingsSyncCheckbox>
				<div class="check">
					{#if $settingsSync}
						<span data-testid="check1"> Check 1 </span>
					{/if}
				</div>
				Item 3
			</div>
			<div data-testid="checkboxItem2" {...$hideMeltUICheckbox} use:hideMeltUICheckbox>
				<div class="check">
					{#if $hideMeltUI}
						<span data-testid="check2"> Check 2 </span>
					{/if}
				</div>
				Item 4
				<div class="rightSlot">⌘H</div>
			</div>
			<div {...$subTriggerA} use:subTriggerA data-testid="sub-trigger">
				Item 5
				<div class="rightSlot">
					<ChevronRight />
				</div>
			</div>
			{#if $subOpen}
				<div {...$subMenuA} use:subMenuA transition:fade data-testid="submenu">
					<div class="text">People</div>
					<div {...$radioGroup} use:radioGroup>
						{#each personsArr as person, i}
							<div {...$radioItem({ value: person })} use:radioItem data-testid={`subitem${i}`}>
								<div>
									{#if $isChecked(person)}
										<div ></div>
									{/if}
								</div>
								{person}
							</div>
						{/each}
					</div>
				</div>
			{/if}
			<div {...$separator} use:separator></div>

			<div {...$item} use:item aria-disabled="true">
				Show All Components
				<div>⇧⌘N</div>
			</div>
			<div {...$separator} use:separator></div>
			<div {...$arrow} use:arrow data-testid="arrow"></div>
		</div>
	{/if}
</main>

<style lang="scss">
	.menu {
		z-index: 10;
		display: flex;
		max-height: 300px;
		min-width: 220px;
		flex-direction: column;


		box-shadow: 0 0 #0000, 0 0 #0000, 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
		border-radius: 0.375rem;


		box-shadow: 0 0 #0000, 0 0 #0000, 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1) !important
}
	.subMenu {
		min-width: 220px
}
	.item {
		position: relative;
		height: 1.5rem;
		min-height: 24px;
		user-select: none;
		border-radius: 0.125rem;
		padding-left: 1.5rem;
		padding-right: 0.25rem;
		z-index: 20;
		outline: 2px solid transparent;
		outline-offset: 2px;
		display: flex;
		align-items: center;
		font-size: 0.875rem;
		line-height: 1.25rem;
		line-height: 1;


		box-shadow: 0 0 #0000, 0 0 #0000, 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1) !important
}
	.trigger {
		display: inline-flex;
		height: 6rem;
		width: 6rem;
		align-items: center;
		justify-content: center;
		border-radius: 9999px;
		padding: 0px;
		font-size: 0.875rem;
		line-height: 1.25rem;
		font-weight: 500;
		transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
		transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
		transition-duration: 150ms
}
	.check {
		position: absolute;
		left: 0.5rem;
		top: 50%;
		translate: 0 calc(-50% + 1px)
}

	.dot {
		height: 4.75px;
		width: 4.75px;
		border-radius: 9999px
}

	.separator {
		margin: 5px;
		height: 1px
}

	.rightSlot {
		margin-left: auto;
		padding-left: 1.25rem
}

	.icon {
		height: 13px;
		width: 13px
}
	.check {
		position: absolute;
		left: 0px;
		display: inline-flex;
		width: 1.5rem;
		align-items: center;
		justify-content: center
}
	.text {
		padding-left: 1.5rem;
		font-size: 0.75rem;
		line-height: 1.5rem
}
</style>
