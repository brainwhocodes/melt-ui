<script lang="ts">
	import PreviewWrapper from '$docs/components/preview-wrapper.svelte';
	import { createCollapsible, type CreateCollapsibleProps } from '$lib/index.js';
	import { ChevronsUpDown, X } from '$icons/index.js';

	interface Props {
		defaultOpen?: boolean;
		open?: CreateCollapsibleProps['open'];
		disabled?: CreateCollapsibleProps['disabled'];
		onOpenChange?: CreateCollapsibleProps['onOpenChange'];
	}

	let {
		defaultOpen = false,
		open = undefined,
		disabled = false,
		onOpenChange = undefined
	}: Props = $props();

	const {
		elements: { root, content, trigger },
		states: { open: localOpen },
		options: { disabled: localDisabled },
	} = createCollapsible({
		defaultOpen,
		open,
		disabled,
		onOpenChange,
	});

	$effect(() => {
		localOpen.set(defaultOpen ?? false);
	});
	$effect(() => {
		localDisabled.set(disabled ?? false);
	});
</script>

<main>
	<PreviewWrapper>
		<div {...$root} use:root class="surface-3cd2c00bea">
			<div class="surface-aa2c053172">
				<span class="surface-58b03cd9cc"> @thomasglopes starred 3 repositories </span>
				<button
					{...$trigger} use:trigger
					class="surface-f849fa43f5"
					aria-label={localOpen ? 'Close' : 'Open'}
					data-testid="trigger"
				>
					<div class="abs-center" aria-hidden="true">
						{#if $localOpen}
							<X class="surface-b892565096" />
						{:else}
							<ChevronsUpDown class="surface-5cebd2aa3a" />
						{/if}
					</div>
				</button>
			</div>

			<div class="surface-d0dd166244">
				<span class="surface-7f3f4d5957">melt-ui/melt-ui</span>
			</div>

			<div {...$content} use:content data-testid="content">
				<div class="surface-fca850d1da">
					<div class="surface-cc2acff3aa">
						<span class="surface-bded08a04c">sveltejs/svelte</span>
					</div>
					<div class="surface-6921a8cfa4">
						<span class="surface-5d0903bf28">sveltejs/kit</span>
					</div>
				</div>
			</div>
		</div>
	</PreviewWrapper>
</main>

<style lang="scss">
	.abs-center {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
</style>
