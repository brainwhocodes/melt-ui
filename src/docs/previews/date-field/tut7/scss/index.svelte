<script lang="ts">
	import { createDateField, type Matcher } from '$lib/index.js';
	import { CalendarDate } from '@internationalized/date';

	const isFirstOrFifteenth: Matcher = (date) => {
		return date.day === 1 || date.day === 15;
	};

	const {
		elements: { field, segment, label, hiddenInput, validation },
		states: { segmentContents },
	} = createDateField({
		name: 'appointmentDate',
		defaultValue: new CalendarDate(2023, 10, 14),
		isDateUnavailable: isFirstOrFifteenth,
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
	<small {...$validation} use:validation
		>Date must not be the 1st or 15th of the month.</small
	>
</form>

<style lang="scss">
	form {

    display: flex;

    width: 100%;

    flex-direction: column;

    align-items: center;

    gap: 0.75rem
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
