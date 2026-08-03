<script lang="ts">
	export let compact = false;
	let className = '';
	export { className as class };
</script>

<div
	{...$$restProps}
	class={`melt-empty ${className}`.trim()}
	data-compact={compact ? '' : undefined}
>
	{#if $$slots.icon}
		<div class="melt-empty__icon"><slot name="icon" /></div>
	{/if}
	{#if $$slots.title}
		<h3 class="melt-empty__title"><slot name="title" /></h3>
	{/if}
	{#if $$slots.description}
		<div class="melt-empty__description"><slot name="description" /></div>
	{:else if $$slots.default}
		<div class="melt-empty__description"><slot /></div>
	{/if}
	{#if $$slots.action}
		<div class="melt-empty__action"><slot name="action" /></div>
	{/if}
</div>
