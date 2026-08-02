<script lang="ts">
	import { fly } from 'svelte/transition';
	import { cn, createCopyCodeButton } from '$docs/utils/index.js';
	import { Check, Copy } from '$icons/index.js';

	const { copied, setCodeString, copyCode } = createCopyCodeButton();

	export let copyBtnClasses = '';

	const preTabIndex = (node: HTMLElement) => {
		const pre = node.querySelector('pre');
		if (pre) {
			pre.tabIndex = 0;
		}
	};
</script>

<figure
	use:setCodeString
	class={cn($$restProps.class, 'force-dark')}
	{...$$restProps}
	data-rehype-pretty-code-figure
	use:preTabIndex
>
	<slot />
</figure>
<button
	class={cn('force-dark surface-391c35db9b', copyBtnClasses)}
	aria-label="copy"
	on:click={copyCode}
	data-code-copy
>
	{#if $copied}
		<div in:fly={{ y: -4 }}>
			<Check class="surface-6f0e85f7e6" />
		</div>
	{:else}
		<div in:fly={{ y: 4 }}>
			<Copy class="surface-f114c3f3ec" />
		</div>
	{/if}
</button>

<style lang="scss">
	[data-rehype-pretty-code-figure] :global(pre) {
		font-weight: initial !important;
		border-color: rgb(var(--color-neutral-700) / 1) !important;
		background-color: rgb(var(--color-neutral-800) / 1) !important;
		padding-left: 0.5rem !important;
	}

	:global(:root.dark) [data-rehype-pretty-code-figure] :global(pre) {
		border-color: rgb(var(--color-neutral-700) / 0.5) !important;
		background-color: rgb(var(--color-neutral-800) / 0.5) !important;
		padding-left: 0.5rem !important;
}
	.docs-code-block-copy--inset {
		top: 1rem;
		right: 1rem;
	}
</style>

