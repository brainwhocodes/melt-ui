<script lang="ts">
	import { Tabs } from '$docs/components/index.js';
	interface Props {
		npm?: import('svelte').Snippet;
		yarn?: import('svelte').Snippet;
		pnpm?: import('svelte').Snippet;
	}

	let { npm, yarn, pnpm }: Props = $props();
</script>

<Tabs tabs={['npm', 'yarn', 'pnpm']} >
	{#snippet children({ tab })}
		{#if tab === 'npm'}
			{@render npm?.()}
		{:else if tab === 'yarn'}
			{@render yarn?.()}
		{:else if tab === 'pnpm'}
			{@render pnpm?.()}
		{/if}
	{/snippet}
</Tabs>
