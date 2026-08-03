<script lang="ts">
	import { Construction } from '$icons/index.js';
	import { a as A } from '$docs/components/index.js';
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>

<div
	class="docs-construction preview-space-4 surface-b70a116fbe"
>
	<p>
		<Construction class="surface-31fdf35ba5" />
		<span class="surface-f2c16b9536">In Construction:</span>
		{#if children}{@render children()}{:else}
			This page is still a WIP. Please check back later, or help us by contributing to
			<A href="https://github.com/melt-ui/melt-ui">Melt UI</A>.
		{/if}
	</p>
</div>

<style lang="scss">
	.docs-construction {
		@media (min-width: 1024px) {
			flex-direction: row;
		}
	}
</style>
