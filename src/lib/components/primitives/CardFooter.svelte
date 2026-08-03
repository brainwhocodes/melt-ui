<script lang="ts">
	interface Props {
		class?: string;
		children?: import('svelte').Snippet;
		[key: string]: any
	}

	let { class: className = '', children, ...rest }: Props = $props();

</script>

<footer {...rest} class={`melt-card__footer ${className}`.trim()}>
	{@render children?.()}
</footer>
