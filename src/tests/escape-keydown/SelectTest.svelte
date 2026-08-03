<script lang="ts">
	import { createSelect, type CreateSelectProps } from '$lib/index.js';

	type $$Props = CreateSelectProps & { setRootEscapeBehaviorIgnore: () => void };
	export let setRootEscapeBehaviorIgnore: () => void;

	const {
		elements: { trigger, menu },
		states: { open },
	} = createSelect({ ...$$restProps, forceVisible: true });
</script>

<button {...$trigger} use:trigger data-testid="select-trigger">trigger</button>
{#if $open}
	<div {...$menu} use:menu data-testid="select-content">
		<button
			data-testid="select-set-parent-escape-behavior-ignore"
			on:click={setRootEscapeBehaviorIgnore}
		>
			set root escapeBehavior: ignore
		</button>
	</div>
{/if}
