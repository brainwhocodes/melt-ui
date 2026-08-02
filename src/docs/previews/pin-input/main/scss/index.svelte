<script lang="ts">
	import { createPinInput, melt } from '$lib/index.js';

	const {
		elements: { root, input },
	} = createPinInput({
		defaultValue: ['1', '2', '3', '4', '5'],
	});
</script>

<div use:melt={$root} class="surface-8ec19c4842">
	{#each Array.from({ length: 5 }) as _}
		<input
			class="surface-845d0427a8"
			use:melt={$input()}
		/>
	{/each}
</div>
