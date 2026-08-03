<script lang="ts">
	interface Props {
		class?: string;
		children?: import('svelte').Snippet;
		[key: string]: any
	}

	let { class: className = '', children, ...rest }: Props = $props();

</script>

<h3 {...rest} class={`melt-card__title ${className}`.trim()}>
	{@render children?.()}
</h3>
