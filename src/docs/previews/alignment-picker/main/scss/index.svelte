<script lang="ts">
	import { createAlignmentPicker, type AlignmentPickerValue } from '$lib/index.js';

	const values: AlignmentPickerValue[] = [
		'top-start', 'top-center', 'top-end',
		'center-start', 'center', 'center-end',
		'bottom-start', 'bottom-center', 'bottom-end',
	];
	const { elements: { root, item } } = createAlignmentPicker();
</script>

<div {...$root} use:root class="alignment-picker-preview" aria-label="Alignment">
	{#each values as value}
		<button {...$item({ value })} use:item class="alignment-picker-preview__item" aria-label={value}>
			<span class="alignment-picker-preview__dot" aria-hidden="true"></span>
		</button>
	{/each}
</div>
