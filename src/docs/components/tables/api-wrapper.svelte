<script lang="ts">
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>

<div class="surface-dbd2adc4c4">
	{@render children?.()}
</div>
