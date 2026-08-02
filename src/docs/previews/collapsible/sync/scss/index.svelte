<script lang="ts">
	import Collapsible from './Collapsible.svelte';

	let open = false;
	let disabled = false;
</script>

<div class="surface-9215f3c7cd">
	<button
		on:click={() => (open = !open)}
		class="preview-space-y-3  preview-type-medium surface-641d31549b"
	>
		Open prop: {open}
	</button>
	<button
		on:click={() => (disabled = !disabled)}
		class="preview-space-y-3  preview-type-medium surface-324a2635a7"
	>
		Disabled prop: {disabled}
	</button>
</div>

<Collapsible bind:open bind:disabled />
