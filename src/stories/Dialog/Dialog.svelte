<script lang="ts">
	/** Internal helpers */
	import { PreviewWrapper } from '$docs/components/index.js';
	import BaseDialog from './BaseDialog.svelte';
</script>

<PreviewWrapper id="preview">
	<BaseDialog >
		{#snippet children({ trigger })}
				<button
				{...trigger} use:trigger.action
				class="preview-space-y-2   preview-type-medium surface-e8faf32479"
			>
				Open Dialog
			</button>
			{/snippet}
			{#snippet content({ title, description, close })}

				<h2 {...title} use:title.action class="surface-a6d942e8eb">Edit profile</h2>
				<p {...description} use:description.action class="surface-0c39c88064">
					Make changes to your profile here. Click save when you're done.
				</p>

				<fieldset class="surface-95c5f9be8b">
					<label class="surface-9436b080db" for="name"> Name </label>
					<input
						class="preview-border preview-border-solid surface-79b067a8ce"
						id="name"
						value="Thomas G. Lopes"
					/>
				</fieldset>
				<fieldset class="surface-1f9e60bb92">
					<label class="surface-2016627d97" for="username"> Username </label>
					<input
						class="preview-border preview-border-solid surface-8e5b7c8925"
						id="username"
						value="@thomasglopes"
					/>
				</fieldset>
				<div class="surface-3ff63eee4c">
					<button
						{...close} use:close.action
						class="preview-surface-zinc-100      preview-space-x-4 surface-914c2735d6"
					>
						Cancel
					</button>
					<button
						{...close} use:close.action
						class="preview-surface-magnum-100      preview-space-x-4 surface-11e8de979b"
					>
						Save changes
					</button>
				</div>

			{/snippet}
	</BaseDialog>
</PreviewWrapper>
