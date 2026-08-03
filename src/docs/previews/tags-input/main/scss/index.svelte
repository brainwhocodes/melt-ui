<script lang="ts">
	import { createTagsInput } from '$lib/index.js';
	import { X } from '$icons/index.js';

	const {
		elements: { root, input, tag, deleteTrigger, edit },
		states: { tags },
	} = createTagsInput({
		defaultTags: ['Svelte', 'Typescript'],
		unique: true,
		add(tag) {
			return { id: tag, value: tag };
		},
		addOnPaste: true,
	});
</script>

<div class="surface-710b53fd44">
	<div
		{...$root} use:root
		class="preview-text-magnum-700   preview-focus-within-ring surface-2d675c3c3d"
	>
		{#each $tags as t}
			<div
				{...$tag(t)} use:tag
				class="preview-word-break-break-word    preview-state-disabled-surface-magnum-300 preview-state-disabled-hover-interaction-default     preview-state-disabled-focus-no-ring surface-f9f4e3cce1"
			>
				<span class="surface-e180e4a09d"
					>{t.value}</span
				>
				<button
					{...$deleteTrigger(t)} use:deleteTrigger
					class="surface-8eb163744f"
				>
					<X class="surface-fab0578b8b" />
				</button>
			</div>
			<div {...$edit(t)} use:edit
				class="surface-74b8858a18"></div>
		{/each}

		<input
			{...$input} use:input
			type="text"
			placeholder="Enter tags..."
			class="surface-e82fb35238"
		/>
	</div>
</div>
