<script lang="ts">
	import { createDropdownMenu, melt } from '$lib/index.js';
	import { writable } from 'svelte/store';
	import { AlignJustify, ChevronRight, Check } from '$icons/index.js';
	import { fly } from 'svelte/transition';

	const settingsSync = writable(true);
	const hideMeltUI = writable(false);

	const {
		elements: { trigger, menu, item, separator, arrow, overlay },
		builders: { createSubmenu, createMenuRadioGroup, createCheckboxItem },
		states: { open },
	} = createDropdownMenu({
		forceVisible: true,
		loop: true,
	});

	const {
		elements: { subMenu, subTrigger },
		states: { subOpen },
	} = createSubmenu();

	const {
		elements: { radioGroup, radioItem },
		helpers: { isChecked },
	} = createMenuRadioGroup({
		defaultValue: 'Hunter Johnston',
	});

	const {
		elements: { checkboxItem },
	} = createCheckboxItem({
		checked: settingsSync,
	});

	const {
		elements: { checkboxItem: checkboxItemA },
	} = createCheckboxItem({
		checked: hideMeltUI,
	});

	const personsArr = [
		'Hunter Johnston',
		'Thomas G. Lopes',
		'Adrian Gonz',
		'Franck Poingt',
	];
</script>

<button
	type="button"
	class="trigger"
	use:melt={$trigger}
	aria-label="Update dimensions"
>
	<AlignJustify class="surface-d7133521f1" />
	<span class="surface-cb50b5a13b">Open Popover</span>
</button>

{#if $open}
	<div use:melt={$overlay} class="surface-542de3bb99" />
	<div
		class="force-dark menu"
		use:melt={$menu}
		transition:fly={{ duration: 150, y: -10 }}
	>
		<div class="item" use:melt={$item}>About Melt UI</div>
		<div class="item" use:melt={$item}>Check for Updates...</div>
		<div class="separator" use:melt={$separator} />
		<div class="item" use:melt={$checkboxItem}>
			<div class="check">
				{#if $settingsSync}
					<Check class="surface-0008f80303" />
				{/if}
			</div>
			Settings Sync is On
		</div>
		<div class="item surface-8a19a2e0eb" use:melt={$subTrigger}>
			Profiles
			<div class="rightSlot">
				<ChevronRight class="surface-27e85da432" />
			</div>
		</div>
		{#if $subOpen}
			<div
				class="menu subMenu"
				use:melt={$subMenu}
				transition:fly={{ x: -50, duration: 150 }}
			>
				<div class="text">People</div>
				<div use:melt={$radioGroup}>
					{#each personsArr as person}
						<div class="item" use:melt={$radioItem({ value: person })}>
							<div class="check">
								{#if $isChecked(person)}
									<div class="dot" />
								{/if}
							</div>
							{person}
						</div>
					{/each}
				</div>
			</div>
		{/if}
		<div use:melt={$separator} class="separator" />

		<div class="item" use:melt={$checkboxItemA}>
			<div class="check">
				{#if $hideMeltUI}
					<Check class="surface-888fb7440d" />
				{/if}
			</div>
			Hide Melt UI
			<div class="rightSlot">⌘H</div>
		</div>
		<div class="item" use:melt={$item} data-disabled>
			Show All Components
			<div class="rightSlot">⇧⌘N</div>
		</div>
		<div use:melt={$separator} class="separator" />
		<div class="item" use:melt={$item}>
			Quit Melt UI
			<div class="rightSlot">⌘Q</div>
		</div>
		<div use:melt={$arrow} />
	</div>
{/if}

<style lang="scss">
	.menu {
		z-index: 40;
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
		z-index: 40;
		
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
