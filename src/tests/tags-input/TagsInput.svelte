<script lang="ts">
	import { createTagsInput, type AddTag } from '$lib/index.js';

	interface Props {
		defaultTags?: any;
		unique?: boolean;
		trim?: boolean;
		allowed?: string[] | undefined;
		add?: AddTag | undefined;
	}

	let {
		defaultTags = ['Svelte', 'Typescript'],
		unique = true,
		trim = true,
		allowed = undefined,
		add = undefined
	}: Props = $props();
	const {
		elements: { root, input, tag, deleteTrigger, edit },
		states: { tags },
	} = createTagsInput({
		defaultTags,
		unique,
		allowed,
		add,
		trim,
	});
</script>

<main>
	<div {...$root} use:root>
		{#each $tags as t, i}
			<div data-testid="tag-{i}" {...$tag(t)} use:tag>
				<span>{t.value}</span>
				<button data-testid="delete-tag-{i}" {...$deleteTrigger(t)} use:deleteTrigger> Delete </button>
			</div>
			<div data-testid="edit-tag-{i}" {...$edit(t)} use:edit></div>
		{/each}

		<input {...$input} use:input type="text" placeholder="Enter tags..." />
	</div>
</main>
