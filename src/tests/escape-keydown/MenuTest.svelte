<script lang="ts">
	import { createDropdownMenu, type CreateDropdownMenuProps } from '$lib/index.js';

	type $$Props = CreateDropdownMenuProps & { setRootEscapeBehaviorIgnore: () => void };
	export let setRootEscapeBehaviorIgnore: () => void;

	const {
		elements: { trigger, menu },
		states: { open },
	} = createDropdownMenu({ ...$$restProps, forceVisible: true });
</script>

<button {...$trigger} use:trigger data-testid="menu-trigger">trigger</button>
{#if $open}
	<div {...$menu} use:menu data-testid="menu-content">
		<button
			data-testid="menu-set-parent-escape-behavior-ignore"
			on:click={setRootEscapeBehaviorIgnore}
		>
			set root escapeBehavior: ignore
		</button>
	</div>
{/if}
