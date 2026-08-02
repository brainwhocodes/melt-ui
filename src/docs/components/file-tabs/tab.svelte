<script lang="ts">
	import { getTabsContext } from '$docs/components/tabs/root.svelte';
	import { melt } from '$lib/index.js';

	export let tab: string;

	const { trigger } = getTabsContext();
</script>

<button
	use:melt={$trigger(tab)}
	class="surface-26b6cbd1b9"
>
	<div class="surface-0e39bfa48e">
		<span class="surface-f1c327dc73">{tab}</span>
	</div>
</button>
