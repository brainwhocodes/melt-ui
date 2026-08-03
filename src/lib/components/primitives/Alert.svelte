<script module lang="ts">
	export type AlertVariant = 'neutral' | 'info' | 'success' | 'warning' | 'danger';
</script>

<script lang="ts">
	interface Props {
		variant?: AlertVariant;
		class?: string;
		title?: import('svelte').Snippet;
		content?: import('svelte').Snippet;
		children?: import('svelte').Snippet;
		[key: string]: any
	}

	let {
		variant = 'neutral',
		class: className = '',
		title,
		content,
		children,
		...rest
	}: Props = $props();

</script>

<div
	{...rest}
	class={`melt-alert ${className}`.trim()}
	data-variant={variant}
	role="alert"
>
	{#if title}
		<div class="melt-alert__title">
			{@render title?.()}
		</div>
	{/if}
	{#if content}
		<div class="melt-alert__content">
			{@render content?.()}
		</div>
	{:else if children}
		<div class="melt-alert__content">
			{@render children?.()}
		</div>
	{/if}
</div>
