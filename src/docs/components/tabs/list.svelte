<script lang="ts">
	import { cn } from '$docs/utils/index.js';
	import { getTabsContext } from './root.svelte';
	import Tab from './tab.svelte';

	const { list, tabs } = getTabsContext();

	let className = '';
	export { className as class };
</script>

<div class={cn('surface-1ea62c22d4', className)} {...$list} use:list>
	{#each $tabs as tab}
		<Tab {tab} />
	{/each}
</div>
