<script lang="ts">
	import { createDropdownMenu, type CreateDropdownMenuProps } from '$lib/index.js';
	import { writable } from 'svelte/store';
	import { AlignJustify, ChevronRight } from '$icons/index.js';
	import { removeUndefined } from '../utils.js';

	const settingsSync = writable(true);
	const hideMeltUI = writable(false);

	type $$Props = CreateDropdownMenuProps;

	interface Props {
		loop?: boolean;
		closeFocus?: CreateDropdownMenuProps['closeFocus'];
		escapeBehavior?: CreateDropdownMenuProps['escapeBehavior'];
		closeOnOutsideClick?: CreateDropdownMenuProps['closeOnOutsideClick'];
		submenuIds?: CreateDropdownMenuProps['ids'];
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
	} = createDropdownMenu(
		removeUndefined({
			loop,
			closeFocus,
			escapeBehavior,
			closeOnOutsideClick,
			...rest,
		})
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
	} = createSubmenu(
		removeUndefined({
			ids: submenuIds,
		})
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
	<button
		type="button"
		class="trigger"
		{...$trigger} use:trigger
		aria-label="Update dimensions"
		data-testid="trigger"
	>
		<AlignJustify class="surface-30555a3c2f" />
		<span class="surface-72319fd122">Open Popover</span>
	</button>
	<div class="menu" {...$menu} use:menu data-testid="menu">
		<div class="item" {...$item} use:item data-testid="item1">Item 1</div>
		<div class="item" {...$item} use:item data-testid="item2" data-disabled>Item 2</div>
		<div class="separator" {...$separator} use:separator></div>
		<div data-testid="checkboxItem1" class="item" {...$settingsSyncCheckbox} use:settingsSyncCheckbox>
			<div class="check">
				{#if $settingsSync}
					<span data-testid="check1"> Check 1 </span>
				{/if}
			</div>
			Item 3
		</div>
		<div data-testid="checkboxItem2" class="item" {...$hideMeltUICheckbox} use:hideMeltUICheckbox>
			<div class="check">
				{#if $hideMeltUI}
					<span data-testid="check2"> Check 2 </span>
				{/if}
			</div>
			Item 4
			<div class="rightSlot">⌘H</div>
		</div>
		<div class="item" {...$subTriggerA} use:subTriggerA data-testid="subtrigger">
			Item 5
			<div class="rightSlot">
				<ChevronRight class="icon" />
			</div>
		</div>
		<div class="menu subMenu" {...$subMenuA} use:subMenuA data-testid="submenu">
			<div class="text">People</div>
			<div {...$radioGroup} use:radioGroup>
				{#each personsArr as person, i}
					<div class="item" {...$radioItem({ value: person })} use:radioItem data-testid={`subitem${i}`}>
						<div class="check">
							{#if $isChecked(person)}
								<div class="dot"></div>
							{/if}
						</div>
						{person}
					</div>
				{/each}
			</div>
		</div>
		<div {...$separator} use:separator class="separator"></div>

		<div class="item" {...$item} use:item aria-disabled="true">
			Show All Components
			<div class="rightSlot">⇧⌘N</div>
		</div>
		<div {...$separator} use:separator class="separator"></div>
		<div {...$arrow} use:arrow data-testid="arrow"></div>
	</div>
</main>

<style lang="scss">
	.menu {
		z-index: 10;
		display: flex;
		max-height: 300px;
		min-width: 220px;
		flex-direction: column;


		box-shadow: 0 0 #0000, 0 0 #0000, 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
		border-radius: 0.375rem;

		background-color: rgb(var(--color-white) / 1);
		padding: 0.25rem;

		}
	@media (min-width: 1024px) {
		.menu {
				max-height: none
		}
}
	.menu {


		box-shadow: 0 0 #0000, 0 0 #0000, 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1) !important
}
	.subMenu {
		min-width: 220px;


		box-shadow: 0 0 #0000, 0 0 #0000, 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);

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

		color: rgb(var(--color-magnum-900) / 1);
		outline: 2px solid transparent;
		outline-offset: 2px
}
	.item[data-highlighted] {

		background-color: rgb(var(--color-magnum-200) / 1);

		color: rgb(var(--color-magnum-900) / 1)
}
	.item[data-disabled] {

		color: rgb(var(--color-neutral-300) / 1)
}
	.item {
		display: flex;
		align-items: center;
		font-size: 0.875rem;
		line-height: 1.25rem;
		line-height: 1;


		box-shadow: 0 0 #0000, 0 0 #0000, 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1) !important
}
	.trigger {
		display: inline-flex;
		height: 2.25rem;
		width: 2.25rem;
		align-items: center;
		justify-content: center;
		border-radius: 9999px;

		background-color: rgb(var(--color-white) / 1);

		color: rgb(var(--color-magnum-900) / 1);
		transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
		transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
		transition-duration: 150ms
}
	.trigger:hover {
		background-color: rgb(var(--color-white) / 0.9)
}

	.trigger {
		padding: 0px;
		font-size: 0.875rem;
		line-height: 1.25rem;
		font-weight: 500
}
	.trigger:focus {


		box-shadow: 0 0 #0000, 0 0 #0000, 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)
}
	.trigger[data-highlighted] {
		outline: 2px solid transparent;
		outline-offset: 2px
}
	.check {
		position: absolute;
		left: 0.5rem;
		top: 50%;

		color: rgb(var(--color-magnum-500) / 1);
		translate: 0 calc(-50% + 1px)
}

	.dot {
		height: 4.75px;
		width: 4.75px;
		border-radius: 9999px;

		background-color: rgb(var(--color-magnum-900) / 1)
}

	.separator {
		margin: 5px;
		height: 1px;

		background-color: rgb(var(--color-magnum-200) / 1)
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
		line-height: 1.5rem;

		color: rgb(var(--color-neutral-600) / 1)
}
</style>
