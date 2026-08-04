<script lang="ts">
	import { untrack } from 'svelte';
	import { createDropdownMenu, type CreateDropdownMenuProps } from '$lib/index.js';

	type $$Props = CreateDropdownMenuProps & { setRootEscapeBehaviorIgnore: () => void };
	interface Props {
		setRootEscapeBehaviorIgnore: () => void;
		[key: string]: any
	}

	let { setRootEscapeBehaviorIgnore, ...rest }: Props = $props();

	const {
		elements: { trigger, menu },
		states: { open },
	} = createDropdownMenu(untrack(() => ({ ...rest, forceVisible: true })));
</script>

<button {...$trigger} use:trigger data-testid="menu-trigger">trigger</button>
{#if $open}
	<div {...$menu} use:menu data-testid="menu-content">
		<button
			data-testid="menu-set-parent-escape-behavior-ignore"
			onclick={setRootEscapeBehaviorIgnore}
		>
			set root escapeBehavior: ignore
		</button>
	</div>
{/if}
