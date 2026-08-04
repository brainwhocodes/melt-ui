<script lang="ts">
	import { untrack } from 'svelte';
	import { createTooltip, type CreateTooltipProps } from '$lib/index.js';

	type $$Props = CreateTooltipProps & { setRootEscapeBehaviorIgnore: () => void };
	interface Props {
		setRootEscapeBehaviorIgnore: () => void;
		[key: string]: any
	}

	let { setRootEscapeBehaviorIgnore, ...rest }: Props = $props();

	const {
		elements: { trigger, content },
		states: { open },
	} = createTooltip(
		untrack(() => ({ ...rest, forceVisible: true, openDelay: 0, closeDelay: 0 }))
	);
</script>

<button {...$trigger} use:trigger data-testid="tooltip-trigger">trigger</button>
{#if $open}
	<div {...$content} use:content data-testid="tooltip-content">
		<button
			data-testid="tooltip-set-parent-escape-behavior-ignore"
			onclick={setRootEscapeBehaviorIgnore}
		>
			set root escapeBehavior: ignore
		</button>
	</div>
{/if}
