<script lang="ts">
	import { cn } from '$docs/utils/index.js';
	import { createPinInput } from '$lib/index.js';

	const {
		elements: { root, input },
	} = createPinInput({
		placeholder: '•',
		defaultValue: ['1', '0', '4', '5', ''],
	});

	let className = '';
	export { className as class };
</script>

<div {...$root} use:root class={cn('surface-b530640d7f', className)}>
	{#each Array.from({ length: 5 }) as _}
		<input
			class="surface-fe6ff160de"
			{...$input()} use:input
		/>
	{/each}
</div>
