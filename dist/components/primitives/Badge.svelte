<script context="module" lang="ts">
	export type BadgeVariant = 'neutral' | 'info' | 'success' | 'warning' | 'danger';
</script>

<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let variant: BadgeVariant = 'neutral';
	export let removable = false;
	export let removeLabel = 'Remove';
	export let disabled = false;
	let className = '';
	export { className as class };

	const dispatch = createEventDispatcher<{ remove: void }>();

	function remove(): void {
		if (!disabled) dispatch('remove');
	}
</script>

<span
	{...$$restProps}
	class={`melt-badge ${className}`.trim()}
	data-variant={variant}
	data-removable={removable ? '' : undefined}
	data-disabled={disabled ? '' : undefined}
>
	<span class="melt-badge__label"><slot /></span>
	{#if removable}
		<button
			class="melt-badge__remove"
			type="button"
			aria-label={removeLabel}
			{disabled}
			on:click={remove}
		>
			<slot name="remove"><span aria-hidden="true">×</span></slot>
		</button>
	{/if}
</span>
