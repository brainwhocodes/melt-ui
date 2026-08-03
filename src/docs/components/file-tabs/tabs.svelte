<script lang="ts">
	import List from './list.svelte';
	import Root from './root.svelte';

	interface Props {
		tabs?: string[];
		children?: import('svelte').Snippet<[any]>;
	}

	let { tabs = [], children }: Props = $props();

	const children_render = $derived(children);
</script>

<Root {tabs} >
	{#snippet children({ tab })}
		<List />
		{@render children_render?.({ tab, })}
	{/snippet}
</Root>
