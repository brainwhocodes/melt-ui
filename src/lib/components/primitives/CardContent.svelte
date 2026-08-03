<script lang="ts">
	interface Props {
		class?: string;
		children?: import('svelte').Snippet;
		[key: string]: any
	}

	let { class: className = '', children, ...rest }: Props = $props();

</script>

<div {...rest} class={`melt-card__content ${className}`.trim()}>
	{@render children?.()}
</div>
