<script lang="ts">
	import type { APISchema } from '$docs/types.js';
	import { APITable, APIWrapper } from '$docs/components/index.js';

	interface Props {
		schemas: APISchema[];
	}

	let { schemas }: Props = $props();
</script>

<APIWrapper>
	{#each schemas as schema}
		<APITable data={schema} />
	{/each}
</APIWrapper>
