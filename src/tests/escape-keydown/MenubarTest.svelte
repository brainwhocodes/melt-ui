<script lang="ts">
	import { untrack } from 'svelte';
	import { createMenubar, type CreateMenubarMenuProps } from '$lib/index.js';

	type $$Props = CreateMenubarMenuProps & { setRootEscapeBehaviorIgnore: () => void };
	interface Props {
		escapeBehavior?: CreateMenubarMenuProps['escapeBehavior'];
		setRootEscapeBehaviorIgnore: () => void;
		[key: string]: any
	}

	let { escapeBehavior = 'close', setRootEscapeBehaviorIgnore, ...rest }: Props = $props();

	const {
		elements: { menubar },
		builders: { createMenu },
	} = createMenubar(untrack(() => ({ escapeBehavior })));

	const {
		elements: { trigger, menu },
		states: { open },
	} = createMenu(untrack(() => ({ ...rest, escapeBehavior, forceVisible: true })));
</script>

<div {...$menubar} use:menubar>
	<button {...$trigger} use:trigger data-testid="menubar-trigger">trigger</button>
	{#if $open}
		<div {...$menu} use:menu data-testid="menubar-content">
			<button
				data-testid="menubar-set-parent-escape-behavior-ignore"
				onclick={setRootEscapeBehaviorIgnore}
			>
				set root escapeBehavior: ignore
			</button>
		</div>
	{/if}
</div>
