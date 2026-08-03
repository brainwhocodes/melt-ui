<script lang="ts">
	interface Props {
		class?: string;
		children?: import('svelte').Snippet;
		[key: string]: any
	}

	let { class: className = '', children, ...rest }: Props = $props();

</script>

<header {...rest} class={`melt-card__header ${className}`.trim()}>
	{@render children?.()}
</header>
