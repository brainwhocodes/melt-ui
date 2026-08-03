<script lang="ts">

	interface Props {
		density?: 'comfortable' | 'compact';
		class?: string;
		children?: import('svelte').Snippet;
		[key: string]: any
	}

	let { density = 'comfortable', class: className = '', children, ...rest }: Props = $props();

</script>

<article
	{...rest}
	class={`melt-typeset ${className}`}
	data-density={density}
>
	{@render children?.()}
</article>
