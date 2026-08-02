<script lang="ts">
	import { melt } from '$lib/index.js';
	/** Internal helpers */
	import { PreviewWrapper } from '$docs/components/index.js';
	import BaseDialog from './BaseDialog.svelte';
	import Select from './Select.svelte';
</script>

<PreviewWrapper>
	<BaseDialog let:trigger>
		<button
			use:melt={trigger}
			class="preview-space-y-2   preview-type-medium preview-hover-opacity-75    surface-bbee522c5d"
		>
			Open Dialog
		</button>
		<svelte:fragment slot="content" let:title let:description let:close>
			<h2 use:melt={title} class="surface-ddf9e83082">Dialog</h2>
			<p use:melt={description} class="surface-06abffe25a">
				This dialog should contain a select element.
			</p>

			<Select />

			<div class="surface-a7c798766d">
				<button
					use:melt={close}
					class="preview-surface-neutral-100  surface-415205e036"
				>
					Close
				</button>
			</div>
		</svelte:fragment>
	</BaseDialog>
</PreviewWrapper>
