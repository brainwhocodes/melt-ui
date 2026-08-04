<script lang="ts">
	import { untrack } from 'svelte';
	import { createSelect, type CreateSelectProps } from '$lib/index.js';

	type $$Props = CreateSelectProps & { setRootEscapeBehaviorIgnore: () => void };
	interface Props {
		setRootEscapeBehaviorIgnore: () => void;
		[key: string]: any
	}

	let { setRootEscapeBehaviorIgnore, ...rest }: Props = $props();

	const {
		elements: { trigger, menu },
		states: { open },
	} = createSelect(untrack(() => ({ ...rest, forceVisible: true })));
</script>

<button {...$trigger} use:trigger data-testid="select-trigger">trigger</button>
{#if $open}
	<div {...$menu} use:menu data-testid="select-content">
		<button
			data-testid="select-set-parent-escape-behavior-ignore"
			onclick={setRootEscapeBehaviorIgnore}
		>
			set root escapeBehavior: ignore
		</button>
	</div>
{/if}
