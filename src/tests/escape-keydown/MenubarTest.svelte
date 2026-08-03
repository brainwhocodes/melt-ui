<script lang="ts">
	import { createMenubar, type CreateMenubarMenuProps } from '$lib/index.js';

	type $$Props = CreateMenubarMenuProps & { setRootEscapeBehaviorIgnore: () => void };
	export let escapeBehavior: CreateMenubarMenuProps['escapeBehavior'] = 'close';
	export let setRootEscapeBehaviorIgnore: () => void;

	const {
		elements: { menubar },
		builders: { createMenu },
	} = createMenubar({ escapeBehavior });

	const {
		elements: { trigger, menu },
		states: { open },
	} = createMenu({ ...$$restProps, escapeBehavior, forceVisible: true });
</script>

<div {...$menubar} use:menubar>
	<button {...$trigger} use:trigger data-testid="menubar-trigger">trigger</button>
	{#if $open}
		<div {...$menu} use:menu data-testid="menubar-content">
			<button
				data-testid="menubar-set-parent-escape-behavior-ignore"
				on:click={setRootEscapeBehaviorIgnore}
			>
				set root escapeBehavior: ignore
			</button>
		</div>
	{/if}
</div>
