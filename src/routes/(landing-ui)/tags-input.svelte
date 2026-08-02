<script lang="ts">
	import { cn } from '$docs/utils/index.js';
	import { createTagsInput, melt } from '$lib/index.js';
	import { X } from '$icons/index.js';

	const {
		elements: { root, input, tag, deleteTrigger, edit },
		states: { tags },
	} = createTagsInput({
		defaultTags: ['Svelte', 'Typescript'],
		unique: true,
	});

	let className = '';
	export { className as class };
</script>

<div class={cn('surface-8b578f7b43', className)}>
	<div
		use:melt={$root}
		class="preview-text-magnum-700   preview-elevation-sm surface-d5abb13958"
	>
		{#each $tags as t}
			<div
				use:melt={$tag(t)}
				class="preview-word-break-break-word    preview-state-disabled-surface-magnum-300 preview-state-disabled-hover-interaction-default     preview-state-disabled-focus-no-ring surface-0ba6f19bba"
			>
				<span class="surface-e74faf0c60">{t.value}</span>
				<button
					use:melt={$deleteTrigger(t)}
					class="surface-769ce23e8b"
				>
					<X class="surface-75d59431f9" />
				</button>
			</div>
			<div
				use:melt={$edit(t)}
				class="surface-3fbaccdda7"
			/>
		{/each}

		<input
			use:melt={$input}
			type="text"
			placeholder="Enter tags..."
			class="preview-focus-no-ring surface-474b4a419d"
		/>
	</div>
</div>
