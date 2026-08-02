<script lang="ts">
	import { CheckCircle } from '$icons/index.js';
	import { h2 as H2 } from '$docs/components/markdown/index.js';
	export let features: string[];
</script>

<H2>Features</H2>
<ul class="surface-ce70459016">
	{#each features as feature}
		<li class="surface-5578571e64" {...$$restProps}>
			<CheckCircle class="surface-90bdd95ef3" />
			{feature}
		</li>
	{/each}
</ul>
