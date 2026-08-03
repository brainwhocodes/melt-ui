<script lang="ts">
	import { getTabsContext } from '$docs/components/tabs/root.svelte';
	import { Npm, Yarn, Pnpm } from '$icons/index.js';

	interface Props {
		tab: string;
	}

	let { tab }: Props = $props();

	const { trigger } = getTabsContext();
</script>

<button
	{...$trigger(tab)} use:trigger
	class="surface-77cadcfac1"
>
	<div class="surface-3258a1c48d">
		{#if tab === 'npm'}
			<Npm class="surface-a04818b338" />
		{:else if tab === 'yarn'}
			<Yarn class="surface-e2ee181ebe" />
		{:else if tab === 'pnpm'}
			<Pnpm class="surface-92e37c8387" />
		{/if}
		<span class="surface-83b34ccc25">{tab}</span>
	</div>
</button>
