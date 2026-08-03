<script lang="ts">
	import { createDateRangeField } from '$lib/index.js';
	import LocaleCombobox from './LocaleCombobox.svelte';

	const {
		elements: { field, startSegment, endSegment, label },
		states: { segmentContents },
		options: { locale },
	} = createDateRangeField();
</script>

<section>
	<LocaleCombobox
		onSelectedChange={({ next }) => {
			if (next) {
				locale.set(next.value);
			}
			return next;
		}}
	/>
	<div>
		<span {...$label} use:label>Booking Dates</span>
		<div {...$field} use:field>
			{#key $locale}
				{#each $segmentContents.start as seg, i (i)}
					<div {...$startSegment(seg.part)} use:startSegment>
						{seg.value}
					</div>
				{/each}
				<span aria-hidden="true">-</span>
				{#each $segmentContents.end as seg, i (i)}
					<div {...$endSegment(seg.part)} use:endSegment>
						{seg.value}
					</div>
				{/each}
			{/key}
		</div>
	</div>
</section>

<style lang="scss">
	section {

    display: flex;

    width: 100%;

    flex-direction: column;

    align-items: center;

    gap: 0.75rem
}

	[data-melt-datefield-label] {

    user-select: none;

    font-weight: 500;

    

    color: rgb(var(--color-magnum-800) / 1)
}

	[data-melt-datefield-label][data-invalid] {

    

    color: rgb(239 68 68 / 1)
}

	[data-melt-datefield-field] {

    margin-top: 0.125rem;

    display: flex;

    width: 100%;

    min-width: 160px;

    align-items: center;

    border-radius: 0.5rem;

    border-width: 1px;

    border-color: rgb(var(--color-magnum-400) / 0.6);

    

    background-color: rgb(var(--color-white) / 1);

    padding: 0.375rem;

    

    color: rgb(var(--color-magnum-800) / 1);

    

    

    box-shadow: 0 0 #0000, 0 0 #0000, 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)
}
	[data-melt-datefield-field] span {

    padding-left: 0.5rem;

    padding-right: 0.5rem
}

	[data-melt-datefield-field][data-invalid] {

    border-width: 2px;

    

    border-color: rgb(220 38 38 / 1);

    

    color: rgb(220 38 38 / 1)
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
