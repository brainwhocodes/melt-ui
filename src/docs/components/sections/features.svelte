<script lang="ts">
	import { CheckCircle } from '$icons/index.js';
	import { h2 as H2 } from '$docs/components/markdown/index.js';
	interface Props {
		features: string[];
		[key: string]: any
	}

	let { features, ...rest }: Props = $props();
</script>

<H2>Features</H2>
<ul class="surface-ce70459016">
	{#each features as feature}
		<li class="surface-5578571e64" {...rest}>
			<CheckCircle class="surface-90bdd95ef3" />
			{feature}
		</li>
	{/each}
</ul>
