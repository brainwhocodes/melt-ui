<script lang="ts">
	import { createCollapsible, melt } from '$lib/index.js';
	import { createSync } from '$lib/sync.js';
	import { ChevronsUpDown, X } from '$icons/index.js';
	import { slide } from 'svelte/transition';

	export let open = false;
	export let disabled = false;

	const {
		elements: { root, content, trigger },
		states,
		options,
	} = createCollapsible({ forceVisible: true });

	const sync = createSync({ ...states, ...options });
	$: sync.open(open, (v) => (open = v));
	$: sync.disabled(disabled);
</script>

<div
	use:melt={$root}
	class="surface-db5e2ef0a2"
>
	<div class="surface-1f4381ec43">
		<span class="surface-5ba74af5d6">
			@thomasglopes starred 3 repositories
		</span>
		<button
			use:melt={$trigger}
			class="preview-text-sm     preview-state-disabled-interaction-not-allowed     surface-0898cc4cbc"
			aria-label="Toggle"
		>
			<div class="abs-center">
				{#if open}
					<X class="surface-4c1d180af2" />
				{:else}
					<ChevronsUpDown class="surface-666abd1130" />
				{/if}
			</div>
		</button>
	</div>

	<div class="surface-e253d726dc">
		<span class="surface-3aab9bed92">melt-ui/melt-ui</span>
	</div>

	<div
		style:position="absolute"
		style:top="calc(100% + 10px)"
		style:right="0"
		style:left="0"
	>
		{#if open}
			<div use:melt={$content} transition:slide>
				<div class="surface-54a0e0f101">
					<div class="surface-db0decaee8">
						<span class="surface-07f7cdbf4e">sveltejs/svelte</span>
					</div>
					<div class="surface-278cacdabd">
						<span class="surface-c4100f20d4">sveltejs/kit</span>
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
