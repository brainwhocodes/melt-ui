<script lang="ts">
	import { createPopover, type CreatePopoverProps } from '$lib/index.js';

	type $$Props = CreatePopoverProps & { setRootEscapeBehaviorIgnore: () => void };
	interface Props {
		setRootEscapeBehaviorIgnore: () => void;
		[key: string]: any
	}

	let { setRootEscapeBehaviorIgnore, ...rest }: Props = $props();

	const {
		elements: { trigger, content },
		states: { open },
	} = createPopover({ ...rest, forceVisible: true });
</script>

<button {...$trigger} use:trigger data-testid="popover-trigger">trigger</button>
{#if $open}
	<div {...$content} use:content data-testid="popover-content">
		<button
			data-testid="popover-set-parent-escape-behavior-ignore"
			onclick={setRootEscapeBehaviorIgnore}
		>
			set root escapeBehavior: ignore
		</button>
	</div>
{/if}
