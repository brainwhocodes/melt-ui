<script lang="ts">
	interface Props {
		name: string;
		size?: number | string | undefined;
		mediaType?: string | undefined;
		href?: string | undefined;
		progress?: number | undefined;
		removable?: boolean;
		disabled?: boolean;
		removeLabel?: string;
		onremove?: (detail: { name: string }) => void;
		class?: string;
		preview?: import('svelte').Snippet;
		children?: import('svelte').Snippet;
		metadata?: import('svelte').Snippet;
		remove?: import('svelte').Snippet<[any]>;
		[key: string]: any
	}

	let {
		name,
		size = undefined,
		mediaType = undefined,
		href = undefined,
		progress = undefined,
		removable = false,
		disabled = false,
		removeLabel = 'Remove attachment',
		onremove = undefined,
		class: className = '',
		preview,
		children,
		metadata,
		remove,
		...rest
	}: Props = $props();


	function formatBytes(bytes: number): string {
		if (bytes < 1024) return `${bytes} B`;
		const units = ['KB', 'MB', 'GB', 'TB'];
		let value = bytes / 1024;
		let unit = units[0];
		for (let index = 1; value >= 1024 && index < units.length; index += 1) {
			value /= 1024;
			unit = units[index];
		}
		return `${value < 10 ? value.toFixed(1) : Math.round(value)} ${unit}`;
	}

	function handleRemove(): void {
		if (!disabled) onremove?.({ name });
	}
	let normalizedProgress = $derived(progress === undefined
		? undefined
		: Math.min(100, Math.max(0, Number.isFinite(progress) ? progress : 0)));
	let formattedSize = $derived(typeof size === 'number'
		? formatBytes(Math.max(0, size))
		: size);
</script>

<article
	class:melt-attachment={true}
	class:melt-attachment-disabled={disabled}
	class={className}
	data-progress={normalizedProgress}
	{...rest}
>
	{#if preview}
		<div class="melt-attachment-preview" aria-hidden="true">
			{@render preview?.()}
		</div>
	{/if}

	<div class="melt-attachment-content">
		<div class="melt-attachment-name">
			{#if href && !disabled}
				<a class="melt-attachment-link" {href}>{#if children}{@render children()}{:else}{name}{/if}</a>
			{:else}
				<span>{#if children}{@render children()}{:else}{name}{/if}</span>
			{/if}
		</div>

		{#if metadata || formattedSize || mediaType}
			<div class="melt-attachment-metadata">
				{#if metadata}{@render metadata()}{:else}
					{#if mediaType}<span>{mediaType}</span>{/if}
					{#if mediaType && formattedSize}<span aria-hidden="true">·</span>{/if}
					{#if formattedSize}<span>{formattedSize}</span>{/if}
				{/if}
			</div>
		{/if}

		{#if normalizedProgress !== undefined}
			<progress class="melt-attachment-progress"
				max="100"
				value={normalizedProgress}
				aria-label={`Upload progress for ${name}`}></progress>
		{/if}
	</div>

	{#if removable}
		<button
			class="melt-attachment-remove"
			type="button"
			disabled={disabled}
			aria-label={`${removeLabel}: ${name}`}
			onclick={handleRemove}
		>
			{#if remove}{@render remove({ 'aria-hidden': 'true' })}{:else}×{/if}
		</button>
	{/if}
</article>
