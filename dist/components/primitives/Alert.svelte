<script context="module" lang="ts">
	export type AlertVariant = 'neutral' | 'info' | 'success' | 'warning' | 'danger';
</script>

<script lang="ts">
	export let variant: AlertVariant = 'neutral';
	let className = '';
	export { className as class };
</script>

<div
	{...$$restProps}
	class={`melt-alert ${className}`.trim()}
	data-variant={variant}
	role="alert"
>
	{#if $$slots.title}
		<div class="melt-alert__title">
			<slot name="title" />
		</div>
	{/if}
	{#if $$slots.content}
		<div class="melt-alert__content">
			<slot name="content" />
		</div>
	{:else if $$slots.default}
		<div class="melt-alert__content">
			<slot />
		</div>
	{/if}
</div>
