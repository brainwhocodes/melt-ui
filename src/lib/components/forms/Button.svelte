<script context="module" lang="ts">
	export type ButtonVariant = 'default' | 'secondary' | 'outline' | 'ghost' | 'danger';
	export type ButtonSize = 'sm' | 'default' | 'lg' | 'icon';
</script>

<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';


	let className = '';
	export { className as class };
	export let variant: ButtonVariant = 'default';
	export let size: ButtonSize = 'default';
	export let type: HTMLButtonAttributes['type'] = 'button';
	export let disabled: HTMLButtonAttributes['disabled'] = false;
	export let loading = false;
	export let loadingLabel = 'Loading';

	type $$Props = HTMLButtonAttributes & {
		class?: string;
		variant?: ButtonVariant;
		size?: ButtonSize;
		loading?: boolean;
		loadingLabel?: string;
	};

	$: isDisabled = Boolean(disabled) || loading;
</script>

<button
	{...$$restProps}
	{type}
	disabled={isDisabled}
	aria-busy={loading || undefined}
	class={`melt-button ${className}`.trim()}
	data-variant={variant}
	data-size={size}
	data-loading={loading || undefined}
	on:click
	on:focus
	on:blur
	on:keydown
	on:keyup
>
	{#if loading}
		<span class="melt-button__spinner" aria-hidden="true"></span>
		<span class="melt-sr-only">{loadingLabel}</span>
	{/if}
	<span class="melt-button__content"><slot /></span>
</button>
