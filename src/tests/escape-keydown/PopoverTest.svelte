<script lang="ts">
	import { createPopover, type CreatePopoverProps } from '$lib/index.js';

	type $$Props = CreatePopoverProps & { setRootEscapeBehaviorIgnore: () => void };
	export let setRootEscapeBehaviorIgnore: () => void;

	const {
		elements: { trigger, content },
		states: { open },
	} = createPopover({ ...$$restProps, forceVisible: true });
</script>

<button {...$trigger} use:trigger data-testid="popover-trigger">trigger</button>
{#if $open}
	<div {...$content} use:content data-testid="popover-content">
		<button
			data-testid="popover-set-parent-escape-behavior-ignore"
			on:click={setRootEscapeBehaviorIgnore}
		>
			set root escapeBehavior: ignore
		</button>
	</div>
{/if}
