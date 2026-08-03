<script lang="ts">
	import { createLinkPreview, type CreateLinkPreviewProps } from '$lib/index.js';

	type $$Props = CreateLinkPreviewProps & { setRootEscapeBehaviorIgnore: () => void };
	export let setRootEscapeBehaviorIgnore: () => void;

	const {
		elements: { trigger, content },
		states: { open },
	} = createLinkPreview({ ...$$restProps, forceVisible: true, openDelay: 0, closeDelay: 0 });
</script>

<button {...$trigger} use:trigger data-testid="link-preview-trigger">trigger</button>
{#if $open}
	<div {...$content} use:content data-testid="link-preview-content">
		<button
			data-testid="link-preview-set-parent-escape-behavior-ignore"
			on:click={setRootEscapeBehaviorIgnore}
		>
			set root escapeBehavior: ignore
		</button>
	</div>
{/if}
