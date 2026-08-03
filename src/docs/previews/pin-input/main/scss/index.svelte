<script lang="ts">
	import { createPinInput } from '$lib/index.js';

	const {
		elements: { root, input },
	} = createPinInput({
		defaultValue: ['1', '2', '3', '4', '5'],
	});
</script>

<div {...$root} use:root class="surface-8ec19c4842">
	{#each Array.from({ length: 5 }) as _}
		<input
			class="surface-845d0427a8"
			{...$input()} use:input
		/>
	{/each}
</div>
