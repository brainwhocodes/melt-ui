<script lang="ts">
	import { createDateField, melt } from '$lib/index.js';
	import { CalendarDateTime } from '@internationalized/date';

	const {
		elements: { field, segment, label },
		states: { value, segmentContents },
	} = createDateField({
		defaultPlaceholder: new CalendarDateTime(2023, 10, 11, 12, 30),
	});
</script>

<div class="surface-d3c01e7453">
	<div>
		<span use:melt={$label} class="surface-f0ee317c01"
			>Appointment Date</span
		>
		<div
			use:melt={$field}
			class="surface-5ad758c868"
		>
			{#each $segmentContents as seg, i (i)}
				<div use:melt={$segment(seg.part)} class="segment surface-42134a6f71">
					{seg.value}
				</div>
			{/each}
		</div>
	</div>
	<div class="surface-912a5e7641">
		<p class="surface-71378372c2">
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
