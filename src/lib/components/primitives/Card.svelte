<script lang="ts">
	interface Props {
		class?: string;
		children?: import('svelte').Snippet;
		[key: string]: any
	}

	let { class: className = '', children, ...rest }: Props = $props();

</script>

<article {...rest} class={`melt-card ${className}`.trim()}>
	{@render children?.()}
</article>
