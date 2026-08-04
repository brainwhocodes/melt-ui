<script lang="ts">
	import { untrack } from 'svelte';
	import { createDialog, type CreateDialogProps } from '$lib/index.js';

	type $$Props = CreateDialogProps & { setRootEscapeBehaviorIgnore: () => void };

	interface Props {
		setRootEscapeBehaviorIgnore: () => void;
		escapeBehavior?: CreateDialogProps['escapeBehavior'];
	}

	let { setRootEscapeBehaviorIgnore, escapeBehavior = 'close' }: Props = $props();

	const {
		elements: { trigger, content, portalled },
		states: { open },
	} = createDialog(untrack(() => ({ escapeBehavior, forceVisible: true })));
</script>

<button {...$trigger} use:trigger data-testid="dialog-trigger">Open</button>
{#if $open}
	<div {...$portalled} use:portalled>
		<div {...$content} use:content data-testid="dialog-content">
			<button
				data-testid="dialog-set-parent-escape-behavior-ignore"
				onclick={setRootEscapeBehaviorIgnore}
			>
				set root escapeBehavior: ignore
			</button>
		</div>
	</div>
{/if}
