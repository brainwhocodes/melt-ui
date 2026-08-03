<script lang="ts">
	import { cn } from '$docs/utils/index.js';
	import { getTabsContext } from './root.svelte';
	import Tab from './tab.svelte';

	const { list, tabs } = getTabsContext();

	interface Props {
		class?: string;
	}

	let { class: className = '' }: Props = $props();

</script>

<div class={cn('surface-1ea62c22d4', className)} {...$list} use:list>
	{#each $tabs as tab}
		<Tab {tab} />
	{/each}
</div>
