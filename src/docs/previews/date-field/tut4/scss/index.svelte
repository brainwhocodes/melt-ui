<script lang="ts">
	import { createDateField } from '$lib/index.js';
	import { now } from '@internationalized/date';

	const {
		elements: { field, segment, label, hiddenInput },
		states: { value, segmentContents },
	} = createDateField({
		name: 'appointmentDate',
		defaultPlaceholder: now('America/Los_Angeles'),
	});
</script>

<form method="POST">
	<div>
		<span {...$label} use:label>Appointment Date</span>
		<div {...$field} use:field class="">
			{#each $segmentContents as seg, i (i)}
				<div {...$segment(seg.part)} use:segment>
					{seg.value}
				</div>
			{/each}
		</div>
		<input {...$hiddenInput} use:hiddenInput />
	</div>
	<p>
		You Selected:
		{#if $value}
			{$value}
		{/if}
	</p>
</form>

<style lang="scss">
	form {

    display: flex;

    width: 100%;

    flex-direction: column;

    align-items: center;

    gap: 0.75rem
}

	p {

    width: 100%;

    text-align: left;

    font-size: 0.875rem;

    line-height: 1.25rem;

    font-weight: 500;

    

    color: rgb(var(--color-neutral-200) / 1)
}

	[data-melt-datefield-label] {

    user-select: none;

    font-weight: 500;

    

    color: rgb(var(--color-white) / 1)
}

	[data-melt-datefield-label][data-invalid] {

    

    color: rgb(239 68 68 / 1)
}

	[data-melt-datefield-field] {

    margin-top: 0.375rem;

    display: flex;

    width: 100%;

    min-width: 200px;

    align-items: center;

    border-radius: 0.5rem;

    border-width: 1px;

    border-color: rgb(var(--color-magnum-400) / 0.6);

    background-color: rgb(var(--color-neutral-800) / 0.8);

    padding: 0.375rem;

    

    color: rgb(var(--color-magnum-400) / 1)
}

	[data-melt-datefield-field][data-invalid] {

    

    border-color: rgb(248 113 113 / 1)
}

	[data-melt-datefield-segment][data-invalid] {

    

    color: rgb(239 68 68 / 1)
}

	[data-melt-datefield-segment]:not([data-segment='literal']) {

    padding-left: 0.125rem;

    padding-right: 0.125rem
}

	[data-melt-datefield-validation] {

    align-self: flex-start;

    

    color: rgb(239 68 68 / 1)
}
</style>
