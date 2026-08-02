<script lang="ts">
	import { melt } from '$lib/index.js';
	/** Internal helpers */
	import { PreviewWrapper } from '$docs/components/index.js';
	import BaseDialog from './BaseDialog.svelte';
</script>

<PreviewWrapper>
	<BaseDialog let:trigger>
		<button
			use:melt={trigger}
			class="preview-space-y-2    preview-type-medium preview-hover-opacity-75     surface-d43daaee9a"
		>
			Open First
		</button>
		<svelte:fragment slot="content" let:title let:description let:close>
			<h2 use:melt={title} class="surface-ec73974b0f">First Dialog</h2>
			<p use:melt={description} class="surface-a3fca57a29">
				Open the second dialog from here.
			</p>

			<div class="surface-299d0d544d">
				<button
					use:melt={close}
					class="preview-surface-neutral-100  surface-19e79f87c1"
				>
					Close
				</button>
				<BaseDialog let:trigger={secondTrigger}>
					<button
						use:melt={secondTrigger}
						class="preview-surface-magnum-100      preview-space-x-4 surface-3ea7902605"
					>
						Open nested
					</button>
					<svelte:fragment
						slot="content"
						let:title={secondTitle}
						let:description={secondDescription}
						let:close={secondClose}
					>
						<h2 use:melt={secondTitle} class="surface-5dd11ed258">Second Dialog</h2>
						<p use:melt={secondDescription} class="surface-112001a5c4">Cool!</p>

						<div class="surface-d772b76e4b">
							<button
								use:melt={secondClose}
								class="preview-surface-neutral-100       preview-space-x-4 surface-1a01c8485a"
							>
								Close
							</button>
						</div>
					</svelte:fragment>
				</BaseDialog>
			</div>
		</svelte:fragment>
	</BaseDialog>
</PreviewWrapper>
