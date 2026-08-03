<script module lang="ts">
	export type ButtonVariant = 'default' | 'secondary' | 'outline' | 'ghost' | 'danger';
	export type ButtonSize = 'sm' | 'default' | 'lg' | 'icon';
</script>

<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';



	interface Props {
		class?: string;
		variant?: ButtonVariant;
		size?: ButtonSize;
		type?: HTMLButtonAttributes['type'];
		disabled?: HTMLButtonAttributes['disabled'];
		loading?: boolean;
		loadingLabel?: string;
		children?: import('svelte').Snippet;
		[key: string]: any
	}

	let {
		class: className = '',
		variant = 'default',
		size = 'default',
		type = 'button',
		disabled = false,
		loading = false,
		loadingLabel = 'Loading',
		children,
		...rest
	}: Props = $props();

	type $$Props = HTMLButtonAttributes & {
		class?: string;
		variant?: ButtonVariant;
		size?: ButtonSize;
		loading?: boolean;
		loadingLabel?: string;
	};

	let isDisabled = $derived(Boolean(disabled) || loading);
</script>

<button
	{...rest}
	{type}
	disabled={isDisabled}
	aria-busy={loading || undefined}
	class={`melt-button ${className}`.trim()}
	data-variant={variant}
	data-size={size}
	data-loading={loading || undefined}
>
	{#if loading}
		<span class="melt-button__spinner" aria-hidden="true"></span>
		<span class="melt-sr-only">{loadingLabel}</span>
	{/if}
	<span class="melt-button__content">{@render children?.()}</span>
</button>
