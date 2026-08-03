<script lang="ts">
	interface Props {
		class?: string;
		children?: import('svelte').Snippet;
		[key: string]: any
	}

	let { class: className = '', children, ...rest }: Props = $props();

</script>

<header class={`melt-drawer__header ${className}`.trim()} {...rest}>
	{@render children?.()}
</header>
