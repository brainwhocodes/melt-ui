<script lang="ts">
	import { getTabsContext } from '$docs/components/tabs/root.svelte';
	import { Npm, Yarn, Pnpm } from '$icons/index.js';
	import { melt } from '$lib/index.js';

	export let tab: string;

	const { trigger } = getTabsContext();
</script>

<button
	use:melt={$trigger(tab)}
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
