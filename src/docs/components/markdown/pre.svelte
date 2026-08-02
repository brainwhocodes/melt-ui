<script lang="ts">
	import { cn, createCopyCodeButton } from '$docs/utils/index.js';
	import { getUsingPreprocessor } from '$routes/store.js';
	import { fly } from 'svelte/transition';
	import { Check, Copy } from '$icons/index.js';

	let className: string | undefined | null = undefined;
	export { className as class };

	const usingPreprocessor = getUsingPreprocessor();

	const { copied, copyCode, setCodeString } = createCopyCodeButton();

	let isPPBlock: boolean | undefined = undefined;
	const setIsPPBlock = (node: HTMLElement) => {
		isPPBlock = node.dataset.nonPp === undefined;
	};

	$: show =
		isPPBlock === undefined ||
		(isPPBlock && $usingPreprocessor) ||
		(!isPPBlock && !$usingPreprocessor);
</script>

{#if show}
	<!-- svelte-ignore a11y-no-noninteractive-tabindex -- This is needed to be acessible -->
	<pre
		use:setCodeString
		use:setIsPPBlock
		class={cn(
			'force-dark surface-ea5bc47c74',
			isPPBlock === undefined && 'preview-state-non-pp-preview-hidden',
			className
		)}
		tabindex="0"
		{...$$restProps}>
    <slot />
	</pre>
	{#if isPPBlock !== undefined}
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
	{/if}
{/if}

<style lang="scss">
	/* Override theme colors for WCAG concerns */
	pre :global([style*='color: #6A737D']) {
		color: #727e8b !important;
	}

	pre {
		font-weight: initial;
	}

	pre :global(span) {
		display: inline;
	}
</style>
