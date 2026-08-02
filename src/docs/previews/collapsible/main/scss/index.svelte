<script lang="ts">
	import { createCollapsible, melt } from '$lib/index.js';
	import { ChevronsUpDown, X } from '$icons/index.js';
	import { slide } from 'svelte/transition';

	const {
		elements: { root, content, trigger },
		states: { open },
	} = createCollapsible({
		forceVisible: true,
	});
</script>

<div
	use:melt={$root}
	class="surface-435e2a486b"
>
	<div class="surface-048a245a02">
		<span class="surface-28dd1970c5">
			@thomasglopes starred 3 repositories
		</span>
		<button
			use:melt={$trigger}
			class="preview-text-sm     preview-state-disabled-interaction-not-allowed     surface-c728a99e4d"
			aria-label="Toggle"
		>
			<div class="abs-center">
				{#if $open}
					<X class="surface-3533141060" />
				{:else}
					<ChevronsUpDown class="surface-4f3f17dcd5" />
				{/if}
			</div>
		</button>
	</div>

	<div class="surface-65830d847c">
		<span class="surface-352be3914d">melt-ui/melt-ui</span>
	</div>

	<div
		style:position="absolute"
		style:top="calc(100% + 10px)"
		style:right="0"
		style:left="0"
	>
		{#if $open}
			<div use:melt={$content} transition:slide>
				<div class="surface-6067ae930c">
					<div class="surface-6693006615">
						<span class="surface-ea2604d07b">sveltejs/svelte</span>
					</div>
					<div class="surface-e4e97ecd40">
						<span class="surface-092bc97c8e">sveltejs/kit</span>
					</div>
				</div>
			</div>
		{/if}
	</div>
</div>

<style lang="scss">
	.abs-center {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
	}
</style>
