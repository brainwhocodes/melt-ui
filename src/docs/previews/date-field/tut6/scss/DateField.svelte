<script lang="ts">
	import { createDateField, type CreateDateFieldProps } from '$lib/index.js';
	import { CalendarDate } from '@internationalized/date';
	import { untrack } from 'svelte';

	interface Props {
		defaultValue?: CreateDateFieldProps['defaultValue'];
	}

	let { defaultValue = undefined }: Props = $props();

	const {
		elements: { field, segment, label, hiddenInput },
		states: { segmentContents },
	} = createDateField({
		name: 'birthday',
		defaultPlaceholder: new CalendarDate(2023, 10, 11),
		defaultValue: untrack(() => defaultValue),
	});
</script>

<form method="POST">
	<div>
		<span {...$label} use:label>Your Birthday</span>
		<div {...$field} use:field class="">
			{#each $segmentContents as seg, i (i)}
				<div {...$segment(seg.part)} use:segment>
					{seg.value}
				</div>
			{/each}
		</div>
		<input {...$hiddenInput} use:hiddenInput />
	</div>
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
