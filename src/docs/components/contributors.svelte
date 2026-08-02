<script lang="ts">
	import { page } from '$app/stores';
	import type { FullContributor } from '$routes/docs/[...slug]/+layout.server.js';

	import Contributor from './contributor.svelte';

	const contributors = $page.data.contributors as FullContributor[] | undefined;
</script>

<ul class="surface-7373b185b1">
	{#each contributors ?? [] as contributor}
		<li class="surface-d132c3748d">
			<Contributor {contributor} />
		</li>
	{/each}
</ul>
