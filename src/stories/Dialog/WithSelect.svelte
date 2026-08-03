<script lang="ts">
	/** Internal helpers */
	import { PreviewWrapper } from '$docs/components/index.js';
	import BaseDialog from './BaseDialog.svelte';
	import Select from './Select.svelte';
</script>

<PreviewWrapper>
	<BaseDialog >
		{#snippet children({ trigger })}
				<button
				{...trigger} use:trigger.action
				class="preview-space-y-2   preview-type-medium preview-hover-opacity-75    surface-bbee522c5d"
			>
				Open Dialog
			</button>
			{/snippet}
			{#snippet content({ title, description, close })}

				<h2 {...title} use:title.action class="surface-ddf9e83082">Dialog</h2>
				<p {...description} use:description.action class="surface-06abffe25a">
					This dialog should contain a select element.
				</p>

				<Select />

				<div class="surface-a7c798766d">
					<button
						{...close} use:close.action
						class="preview-surface-neutral-100  surface-415205e036"
					>
						Close
					</button>
				</div>

			{/snippet}
	</BaseDialog>
</PreviewWrapper>
