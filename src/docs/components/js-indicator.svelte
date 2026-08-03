<script lang="ts">
	import { onMount } from 'svelte';

	let mounted = $state(false);

	onMount(() => {
		mounted = true;
	});
</script>

<!-- Dev-only indicator for responsive development -->

<div
	class="surface-68e7cc63b8"
	data-browser={mounted ? '' : undefined}
>
	{mounted ? 'js' : 'ssr'}
</div>
