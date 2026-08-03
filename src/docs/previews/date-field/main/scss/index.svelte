<script lang="ts">
	import { createDateField } from '$lib/index.js';
	import LocaleCombobox from './LocaleCombobox.svelte';

	const {
		elements: { field, segment, label },
		states: { segmentContents },
		options: { locale },
	} = createDateField();
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
	<div class="surface-3861d05766">
		<span {...$label} use:label>Date</span>
		<div {...$field} use:field>
			{#key $locale}
				{#each $segmentContents as seg}
					<div {...$segment(seg.part)} use:segment>
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
