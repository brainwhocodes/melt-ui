<script lang="ts">
	interface Props {
		class?: string;
		children?: import('svelte').Snippet;
		[key: string]: any
	}

	let { class: className = '', children, ...rest }: Props = $props();

</script>

<footer class={`melt-drawer__footer ${className}`.trim()} {...rest}>
	{@render children?.()}
</footer>
