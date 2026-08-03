<script lang="ts">
	import { createRadioGroup } from '$lib/index.js';

	const {
		elements: { root, item, hiddenInput },
		helpers: { isChecked },
	} = createRadioGroup({
		defaultValue: 'default',
		name: 'line-height',
	});

	const optionsArr = ['default', 'comfortable', 'compact'];
</script>

<div
	{...$root} use:root
	class="surface-20968b6b55"
	aria-label="View density"
>
	{#each optionsArr as option}
		<div class="surface-34f204767b">
			<button
				{...$item(option)} use:item
				class="preview-elevation-sm    preview-hover-surface-magnum-100 surface-b98405fc0e"
				id={option}
				aria-labelledby="{option}-label"
			>
				{#if $isChecked(option)}
					<div class="surface-4eac87b1ea"></div>
				{/if}
			</button>
			<label
				class="surface-e1a4957c70"
				for={option}
				id="{option}-label"
			>
				{option}
			</label>
		</div>
	{/each}
	<input {...$hiddenInput} use:hiddenInput />
</div>
