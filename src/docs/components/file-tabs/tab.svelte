<script lang="ts">
	import { getTabsContext } from '$docs/components/tabs/root.svelte';

	interface Props {
		tab: string;
	}

	let { tab }: Props = $props();

	const { trigger } = getTabsContext();
</script>

<button
	{...$trigger(tab)} use:trigger
	class="surface-26b6cbd1b9"
>
	<div class="surface-0e39bfa48e">
		<span class="surface-f1c327dc73">{tab}</span>
	</div>
</button>
