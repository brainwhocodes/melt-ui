<script lang="ts">
	interface Props {
		label?: string;
		class?: string;
		children?: import('svelte').Snippet;
		[key: string]: any
	}

	let { label = 'Breadcrumb', class: className = '', children, ...rest }: Props = $props();

</script>

<nav {...rest} class={`melt-breadcrumb ${className}`.trim()} aria-label={label}>
	<ol class="melt-breadcrumb__list">
		{@render children?.()}
	</ol>
</nav>
