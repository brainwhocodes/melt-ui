<script lang="ts">
	import { createRadioGroup, melt } from '$lib/index.js';

	const {
		elements: { root, item, hiddenInput },
		helpers: { isChecked },
	} = createRadioGroup({
		defaultValue: 'default',
	});

	const optionsArr = ['default', 'comfortable', 'compact'];
</script>

<div
	use:melt={$root}
	class="surface-20968b6b55"
	aria-label="View density"
>
	{#each optionsArr as option}
		<div class="surface-34f204767b">
			<button
				use:melt={$item(option)}
				class="preview-elevation-sm    preview-hover-surface-magnum-100 surface-b98405fc0e"
				id={option}
				aria-labelledby="{option}-label"
			>
				{#if $isChecked(option)}
					<div class="surface-4eac87b1ea" />
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
	<input name="line-height" use:melt={$hiddenInput} />
</div>
