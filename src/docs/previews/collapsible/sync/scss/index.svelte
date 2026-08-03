<script lang="ts">
	import Collapsible from './Collapsible.svelte';

	let open = $state(false);
	let disabled = $state(false);
</script>

<div class="surface-9215f3c7cd">
	<button
		onclick={() => (open = !open)}
		class="preview-space-y-3  preview-type-medium surface-641d31549b"
	>
		Open prop: {open}
	</button>
	<button
		onclick={() => (disabled = !disabled)}
		class="preview-space-y-3  preview-type-medium surface-324a2635a7"
	>
		Disabled prop: {disabled}
	</button>
</div>

<Collapsible bind:open bind:disabled />
