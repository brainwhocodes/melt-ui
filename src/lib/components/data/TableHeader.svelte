<script lang="ts">
	interface Props {
		class?: string;
		children?: import('svelte').Snippet;
		[key: string]: any
	}

	let { class: className = '', children, ...rest }: Props = $props();

</script>

<thead class={`melt-table-header ${className}`} {...rest}>
	{@render children?.()}
</thead>
