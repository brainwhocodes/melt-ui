<script lang="ts">
	export let selected = false;
	export let disabled = false;

	let className = '';
	export { className as class };
</script>

<div
	{...$$restProps}
	class={`melt-item ${className}`}
	data-state={selected ? 'selected' : 'default'}
	data-selected={selected ? '' : undefined}
	data-disabled={disabled ? '' : undefined}
	aria-disabled={disabled || undefined}
>
	{#if $$slots.media}
		<div class="melt-item-media"><slot name="media" /></div>
	{/if}
	<div class="melt-item-content">
		<slot name="content"><slot /></slot>
	</div>
	{#if $$slots.actions}
		<div class="melt-item-actions"><slot name="actions" /></div>
	{/if}
</div>
