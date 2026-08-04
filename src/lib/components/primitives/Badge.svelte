<script lang="ts" module>
	export type BadgeVariant = 'neutral' | 'info' | 'success' | 'warning' | 'danger';
</script>

<script lang="ts">
	interface Props {
		variant?: BadgeVariant;
		removable?: boolean;
		removeLabel?: string;
		disabled?: boolean;
		class?: string;
		onremove?: () => void;
		children?: import('svelte').Snippet;
		remove?: import('svelte').Snippet;
		[key: string]: any;
	}

	let {
		variant = 'neutral',
		removable = false,
		removeLabel = 'Remove',
		disabled = false,
		class: className = '',
		onremove,
		children,
		remove,
		...rest
	}: Props = $props();

	function handleRemove(): void {
		if (!disabled) onremove?.();
	}
</script>

<span
	{...rest}
	class={`melt-badge ${className}`.trim()}
	data-variant={variant}
	data-removable={removable ? '' : undefined}
	data-disabled={disabled ? '' : undefined}
>
	<span class="melt-badge__label">{@render children?.()}</span>
	{#if removable}
		<button
			class="melt-badge__remove"
			type="button"
			aria-label={removeLabel}
			{disabled}
			onclick={handleRemove}
		>
			{#if remove}
				{@render remove()}
			{:else}
				<span aria-hidden="true">×</span>
			{/if}
		</button>
	{/if}
</span>
