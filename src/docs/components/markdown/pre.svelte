<script lang="ts">
	import { cn, createCopyCodeButton } from '$docs/utils/index.js';
	import { fly } from 'svelte/transition';
	import { Check, Copy } from '$icons/index.js';

	let className: string | undefined | null = undefined;
	export { className as class };

	const { copied, copyCode, setCodeString } = createCopyCodeButton();
</script>

<!-- svelte-ignore a11y-no-noninteractive-tabindex -- This is needed to be accessible -->
<pre
	use:setCodeString
	class={cn('force-dark surface-ea5bc47c74', className)}
	tabindex="0"
	{...$$restProps}>
	<slot />
</pre>
<button
	class="surface-15b0fea8f4"
	aria-label="copy"
	on:click={copyCode}
	data-code-copy
>
	{#if $copied}
		<div in:fly={{ y: -4 }}>
			<Check class="surface-2047aab20f" />
		</div>
	{:else}
		<div in:fly={{ y: 4 }}>
			<Copy class="surface-99a95ae560" />
		</div>
	{/if}
</button>

<style lang="scss">
	/* Override theme colors for WCAG concerns */
	pre :global([style*='#6A737D']) {
		color: #8b949e !important;
	}

	pre {
		font-weight: initial;
	}

	pre :global(span) {
		display: inline;
	}
</style>
