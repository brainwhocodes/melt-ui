<script lang="ts">
	import {
		createDateField,
		melt,
		type CreateDateFieldProps,
	} from '$lib/index.js';

	export let defaultPlaceholder: CreateDateFieldProps['defaultPlaceholder'] =
		undefined;

	const {
		elements: { field, segment, label },
		states: { value, segmentContents },
	} = createDateField({
		defaultPlaceholder,
	});
</script>

<div class="surface-3dfcf0f048">
	<div>
		<span use:melt={$label} class="surface-865035207a"
			>Appointment Date</span
		>
		<div
			use:melt={$field}
			class="surface-eee6a1977f"
		>
			{#each $segmentContents as seg, i (i)}
				<div use:melt={$segment(seg.part)} class="segment surface-063d98d7cb">
					{seg.value}
				</div>
			{/each}
		</div>
	</div>
	<div class="surface-70934f8501">
		<p class="surface-475dfb25d3">
			<span> Selected Date: </span>
			{#if $value}
				{$value}
			{/if}
		</p>
	</div>
</div>

<style lang="scss">
	.segment:not([data-segment='literal']) {
    padding-left: 0.125rem;
    padding-right: 0.125rem
}
	.segment[data-segment="dayPeriod"] {
    padding-left: 0.125rem
}
	.segment[data-segment="hour"] {
    padding-left: 0.25rem
}
	.segment[data-segment="timeZoneName"] {
    padding-left: 0.25rem
}

	.btn {
    border-radius: 0.25rem;
    
    background-color: rgb(var(--color-magnum-600) / 1);
    padding: 0.25rem;
    font-size: 0.75rem;
    line-height: 1rem;
    
    color: rgb(var(--color-white) / 1)
}
</style>
