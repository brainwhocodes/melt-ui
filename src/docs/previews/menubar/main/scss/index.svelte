<script lang="ts">
	import { createMenubar, melt } from '$lib/index.js';
	import { writable } from 'svelte/store';
	import { ChevronRight, Check } from '$icons/index.js';

	const tipsAndTricks = writable(true);
	const hideMeltUI = writable(false);
	const wordWrap = writable(true);
	const stickyScroll = writable(false);

	const {
		elements: { menubar },
		builders: { createMenu },
	} = createMenubar();

	const {
		elements: { trigger, menu, item, separator },
		builders: { createSubmenu, createMenuRadioGroup },
	} = createMenu();

	const {
		elements: { subMenu, subTrigger },
	} = createSubmenu();

	const {
		elements: { radioGroup, radioItem },
		helpers: { isChecked },
	} = createMenuRadioGroup({
		defaultValue: 'Nord',
	});

	const {
		elements: {
			trigger: triggerA,
			menu: menuA,
			item: itemA,
			separator: separatorA,
		},
	} = createMenu();

	const {
		elements: {
			trigger: triggerB,
			menu: menuB,
			item: itemB,
			separator: separatorB,
		},
		builders: {
			createSubmenu: createSubmenuB,
			createCheckboxItem: createCheckboxItemB,
		},
	} = createMenu();

	const {
		elements: { checkboxItem: wordWrapCheckbox },
	} = createCheckboxItemB({
		checked: wordWrap,
	});
	const {
		elements: { checkboxItem: stickyScrollCheckbox },
	} = createCheckboxItemB({
		checked: stickyScroll,
	});

	const {
		elements: { subMenu: subMenuB, subTrigger: subTriggerB },
	} = createSubmenuB();

	const {
		elements: {
			trigger: triggerC,
			menu: menuC,
			item: itemC,
			separator: separatorC,
		},
		builders: { createCheckboxItem: createCheckboxItemC },
	} = createMenu();

	const {
		elements: { checkboxItem: tipsAndTricksCheckbox },
	} = createCheckboxItemC({
		checked: tipsAndTricks,
	});

	const {
		elements: { checkboxItem: hideMeltUICheckbox },
	} = createCheckboxItemC({
		checked: hideMeltUI,
	});

	const themesArr = ['Nord', 'GitHub Dark', 'Moonlight'];
</script>

<div class="surface-f85690d3c3" use:melt={$menubar}>
	<!------------>
	<!--- FILE --->
	<!------------>
	<button
		type="button"
		class="trigger"
		use:melt={$trigger}
		aria-label="Update dimensions"
	>
		File
	</button>

	<div class="force-dark menu" use:melt={$menu}>
		<div class="item" use:melt={$item}>New Text File</div>
		<div class="item" use:melt={$item}>
			New File...
			<div class="rightSlot">⌘T</div>
		</div>
		<div class="item" use:melt={$item} data-disabled>
			New Window...
			<div class="rightSlot">⇧⌘T</div>
		</div>
		<div class="separator" use:melt={$separator} />
		<div class="item" use:melt={$subTrigger}>
			Select theme
			<div class="rightSlot">
				<ChevronRight class="surface-5e07975100" />
			</div>
		</div>
		<div class="menu subMenu" use:melt={$subMenu}>
			<div use:melt={$radioGroup}>
				{#each themesArr as theme}
					<div class="item" use:melt={$radioItem({ value: theme })}>
						<div class="check">
							{#if $isChecked(theme)}
								<div class="dot" />
							{/if}
						</div>
						{theme}
					</div>
				{/each}
			</div>
		</div>
		<div use:melt={$separator} class="separator" />
		<div class="item" use:melt={$item}>
			Quit Melt UI
			<div class="rightSlot">⌘Q</div>
		</div>
	</div>

	<!------------>
	<!--- EDIT --->
	<!------------>
	<button
		type="button"
		class="trigger"
		use:melt={$triggerA}
		aria-label="Update dimensions"
	>
		Edit
	</button>

	<div class="force-dark menu" use:melt={$menuA}>
		<div class="item" use:melt={$itemA}>
			Undo
			<div class="rightSlot">⌘Z</div>
		</div>
		<div class="item" use:melt={$itemA}>
			Redo
			<div class="rightSlot">⇧⌘Z</div>
		</div>
		<div class="separator" use:melt={$separatorA} />
		<div class="item" use:melt={$itemA}>
			Cut
			<div class="rightSlot">⌘X</div>
		</div>
		<div class="item" use:melt={$itemA}>
			Copy
			<div class="rightSlot">⌘C</div>
		</div>
		<div class="item" use:melt={$itemA}>
			Paste
			<div class="rightSlot">⌘V</div>
		</div>

		<div use:melt={$separatorA} class="separator" />

		<div class="item" use:melt={$itemA}>
			Find
			<div class="rightSlot">⌘F</div>
		</div>
		<div class="item" use:melt={$itemA}>
			Replace
			<div class="rightSlot">⌥⌘F</div>
		</div>
	</div>

	<!------------>
	<!--- VIEW --->
	<!------------>
	<button
		type="button"
		class="trigger"
		use:melt={$triggerB}
		aria-label="Update dimensions"
	>
		View
	</button>

	<div class="force-dark menu" use:melt={$menuB}>
		<div class="item" use:melt={$itemB}>
			Command Palette..
			<div class="rightSlot">⇧⌘P</div>
		</div>
		<div class="item" use:melt={$itemB}>Open View...</div>
		<div class="separator" use:melt={$separatorB} />
		<div class="item" use:melt={$subTriggerB}>
			Appearance
			<div class="rightSlot">
				<ChevronRight class="surface-f6f25dfc0f" />
			</div>
		</div>
		<div class="menu subMenu" use:melt={$subMenuB}>
			<div use:melt={$radioGroup}>
				<div class="item" use:melt={$itemB}>Full Screen</div>
				<div class="item" use:melt={$itemB}>Zen Mode</div>
			</div>
		</div>
		<div class="separator" use:melt={$separatorB} />

		<div class="item" use:melt={$wordWrapCheckbox}>
			<div class="check">
				{#if $wordWrap}
					<Check class="surface-3ab99874f8" />
				{/if}
			</div>
			Word Wrap
			<div class="rightSlot">⌘H</div>
		</div>
		<div class="item" use:melt={$stickyScrollCheckbox}>
			<div class="check">
				{#if $stickyScroll}
					<Check class="surface-1881eba7ca" />
				{/if}
			</div>
			Sticky Scroll
		</div>
	</div>

	<!------------>
	<!--- HELP --->
	<!------------>
	<button
		type="button"
		class="trigger"
		use:melt={$triggerC}
		aria-label="Update dimensions"
	>
		Help
	</button>

	<div class="force-dark menu" use:melt={$menuC}>
		<div class="item" use:melt={$itemC}>About Melt UI</div>
		<div class="item" use:melt={$itemC}>Check for Updates...</div>
		<div class="separator" use:melt={$separatorC} />
		<div class="item" use:melt={$tipsAndTricksCheckbox}>
			<div class="check">
				{#if $tipsAndTricks}
					<Check class="surface-ce47297494" />
				{/if}
			</div>
			Tips & Tricks
		</div>

		<div use:melt={$separatorC} class="separator" />

		<div class="item" use:melt={$hideMeltUICheckbox}>
			<div class="check">
				{#if $hideMeltUI}
					<Check class="surface-78c0752c21" />
				{/if}
			</div>
			Documentation
		</div>
		<div class="item" use:melt={$itemC} data-disabled>
			Show All Components
			<div class="rightSlot">⇧⌘N</div>
		</div>
		<div use:melt={$separatorC} class="separator" />
		<div class="item" use:melt={$itemC}>Report a bug...</div>
	</div>
</div>

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
		padding: 0.25rem
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
		cursor: default !important;
		
		
		box-shadow: 0 0 #0000, 0 0 #0000, 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1) !important
}

	.trigger {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		border-radius: 0.375rem;
		
		background-color: rgb(var(--color-white) / 1);
		padding-left: 0.75rem;
		padding-right: 0.75rem;
		padding-top: 0.5rem;
		padding-bottom: 0.5rem;
		
		color: rgb(var(--color-magnum-900) / 1);
		transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
		transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
		transition-duration: 150ms
}

	.trigger:hover {
		background-color: rgb(var(--color-white) / 0.9)
}

	.trigger[data-highlighted] {
		outline: 2px solid transparent;
		outline-offset: 2px
}

	.trigger {
		overflow: visible !important
}

	.trigger[data-highlighted] {
		
		background-color: rgb(var(--color-magnum-200) / 1) !important;
		
		}

	.trigger {
		cursor: default !important;
		font-size: 0.875rem;
		line-height: 1.25rem;
		font-weight: 500;
		line-height: 1
}

	.trigger:focus {
		z-index: 30;
		
		
		box-shadow: 0 0 #0000, 0 0 #0000, 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)
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
