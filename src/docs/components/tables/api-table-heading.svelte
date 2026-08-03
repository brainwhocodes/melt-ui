<script lang="ts">
	import { h4 as H4 } from '$docs/components/markdown/index.js';
	import { InfoPopover } from '$docs/components/index.js';
	interface Props {
		children?: import('svelte').Snippet;
		info?: import('svelte').Snippet;
	}

	let { children, info }: Props = $props();
</script>

<div class="surface-ce86cd1b68">
	<H4 class="surface-779c1bc69b">
		{@render children?.()}
	</H4>
	{#if info}
		<InfoPopover>
			{@render info?.()}
		</InfoPopover>
	{/if}
</div>
