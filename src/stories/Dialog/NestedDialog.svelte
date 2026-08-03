<script lang="ts">
	/** Internal helpers */
	import { PreviewWrapper } from '$docs/components/index.js';
	import BaseDialog from './BaseDialog.svelte';
</script>

<PreviewWrapper>
	<BaseDialog let:trigger>
		<button
			{...trigger} use:trigger.action
			class="preview-space-y-2    preview-type-medium preview-hover-opacity-75     surface-d43daaee9a"
		>
			Open First
		</button>
		<svelte:fragment slot="content" let:title let:description let:close>
			<h2 {...title} use:title.action class="surface-ec73974b0f">First Dialog</h2>
			<p {...description} use:description.action class="surface-a3fca57a29">
				Open the second dialog from here.
			</p>

			<div class="surface-299d0d544d">
				<button
					{...close} use:close.action
					class="preview-surface-neutral-100  surface-19e79f87c1"
				>
					Close
				</button>
				<BaseDialog let:trigger={secondTrigger}>
					<button
						{...secondTrigger} use:secondTrigger.action
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
						<h2 {...secondTitle} use:secondTitle.action class="surface-5dd11ed258">Second Dialog</h2>
						<p {...secondDescription} use:secondDescription.action class="surface-112001a5c4">Cool!</p>

						<div class="surface-d772b76e4b">
							<button
								{...secondClose} use:secondClose.action
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
