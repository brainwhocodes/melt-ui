<script lang="ts">
	interface Props {
		class?: string;
		children?: import('svelte').Snippet;
		[key: string]: any
	}

	let { class: className = '', children, ...rest }: Props = $props();

</script>

<div class={`melt-alert-dialog__content ${className}`.trim()} data-melt-alert-dialog-content {...rest}>
	{@render children?.()}
</div>
