<script lang="ts">
	import { createContextMenu, melt } from '$lib/index.js';
	import { writable } from 'svelte/store';
	import { ChevronRight, Check } from '$icons/index.js';

	const settingsSync = writable(true);
	const hideMeltUI = writable(false);

	const {
		elements: { trigger, menu, item, separator, overlay },
		builders: { createSubmenu, createMenuRadioGroup, createCheckboxItem },
	} = createContextMenu({
		loop: true,
	});

	const {
		elements: { subMenu: subMenuA, subTrigger: subTriggerA },
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

<span class="trigger" use:melt={$trigger} aria-label="Update dimensions">
	Right click me.
</span>
<div use:melt={$overlay} class="surface-73e27657d3" />
<div class="force-dark menu" use:melt={$menu}>
	<div class="item" use:melt={$item}>About Melt UI</div>
	<div class="item" use:melt={$item}>Check for Updates...</div>
	<div class="separator" use:melt={$separator} />
	<div class="item" use:melt={$checkboxItem}>
		<div class="check">
			{#if $settingsSync}
				<Check class="surface-6b66b31008" />
			{/if}
		</div>
		Settings Sync is On
	</div>
	<div class="item" use:melt={$subTriggerA}>
		Profiles
		<div class="rightSlot">
			<ChevronRight class="surface-5d375913a0" />
		</div>
	</div>
	<div class="menu subMenu" use:melt={$subMenuA}>
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
	<div use:melt={$separator} class="separator" />

	<div class="item" use:melt={$checkboxItemA}>
		<div class="check">
			{#if $hideMeltUI}
				<Check class="surface-45072517ac" />
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
</div>

<style lang="scss">
	.menu {
		z-index: 40;
		display: flex;
		max-height: 300px;
		min-width: 220px;
		flex-direction: column;
		
		
		box-shadow: 0 0 #0000, 0 0 #0000, 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
		border-radius: 0.5rem;
		
		background-color: rgb(var(--color-white) / 1);
		padding: 0.25rem
}
	@media (min-width: 1024px) {
		.menu {
				max-height: none
		}
}
	.menu {
		
		
		box-shadow: 0 0 #0000, 0 0 #0000, 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1) !important
}
	.subMenu {
		min-width: 220px;
		
		
		box-shadow: 0 0 #0000, 0 0 #0000, 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
		
		}
	.item {
		position: relative;
		height: 1.5rem;
		min-height: 24px;
		user-select: none;
		border-radius: 0.375rem;
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
		
		
		box-shadow: 0 0 #0000, 0 0 #0000, 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1) !important
}

	.trigger {
		display: block;
		border-radius: 0.75rem;
		border-width: 2px;
		border-style: dashed;
		
		border-color: rgb(var(--color-magnum-900) / 1);
		font-weight: 600;
		
		color: rgb(var(--color-magnum-700) / 1);
		width: 300px;
		
		background-color: rgb(var(--color-magnum-100) / 1);
		padding-top: 3rem;
		padding-bottom: 3rem;
		text-align: center;
		
		
		box-shadow: 0 0 #0000, 0 0 #0000, 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)
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
