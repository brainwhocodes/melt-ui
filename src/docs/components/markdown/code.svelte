<script lang="ts">
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>

<code class="neutral surface-c1c04166ce">
	{@render children?.()}
</code>
