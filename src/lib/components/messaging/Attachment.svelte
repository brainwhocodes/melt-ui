<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let name: string;
	export let size: number | string | undefined = undefined;
	export let mediaType: string | undefined = undefined;
	export let href: string | undefined = undefined;
	export let progress: number | undefined = undefined;
	export let removable = false;
	export let disabled = false;
	export let removeLabel = 'Remove attachment';
	let className = '';
	export { className as class };

	const dispatch = createEventDispatcher<{
		remove: { name: string };
	}>();

	$: normalizedProgress = progress === undefined
		? undefined
		: Math.min(100, Math.max(0, Number.isFinite(progress) ? progress : 0));
	$: formattedSize = typeof size === 'number'
		? formatBytes(Math.max(0, size))
		: size;

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
		if (!disabled) dispatch('remove', { name });
	}
</script>

<article
	class:melt-attachment={true}
	class:melt-attachment-disabled={disabled}
	class={className}
	data-progress={normalizedProgress}
	{...$$restProps}
>
	{#if $$slots.preview}
		<div class="melt-attachment-preview" aria-hidden="true">
			<slot name="preview" />
		</div>
	{/if}

	<div class="melt-attachment-content">
		<div class="melt-attachment-name">
			{#if href && !disabled}
				<a class="melt-attachment-link" {href}><slot>{name}</slot></a>
			{:else}
				<span><slot>{name}</slot></span>
			{/if}
		</div>

		{#if $$slots.metadata || formattedSize || mediaType}
			<div class="melt-attachment-metadata">
				<slot name="metadata">
					{#if mediaType}<span>{mediaType}</span>{/if}
					{#if mediaType && formattedSize}<span aria-hidden="true">·</span>{/if}
					{#if formattedSize}<span>{formattedSize}</span>{/if}
				</slot>
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
			on:click={handleRemove}
		>
			<slot name="remove" aria-hidden="true">×</slot>
		</button>
	{/if}
</article>
