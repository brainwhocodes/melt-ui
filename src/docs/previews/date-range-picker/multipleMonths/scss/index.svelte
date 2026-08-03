<script lang="ts">
	import { createDateRangePicker } from '$lib/index.js';
	import { ChevronRight, ChevronLeft, Calendar } from '$icons/index.js';
	import { fade } from 'svelte/transition';

	const {
		elements: {
			calendar,
			cell,
			content,
			field,
			grid,
			heading,
			label,
			nextButton,
			prevButton,
			startSegment,
			endSegment,
			trigger,
		},
		states: { months, headingValue, weekdays, segmentContents, open },
		helpers: { isDateDisabled, isDateUnavailable },
	} = createDateRangePicker({
		forceVisible: true,
		fixedWeeks: true,
		numberOfMonths: 2,
	});
</script>

<div class="picker-container">
	<div>
		<span {...$label} use:label>Date</span>
		<div {...$field} use:field>
			{#each $segmentContents.start as seg}
				<div {...$startSegment(seg.part)} use:startSegment>
					{seg.value}
				</div>
			{/each}
			<div aria-hidden="true">-</div>
			{#each $segmentContents.end as seg}
				<div {...$endSegment(seg.part)} use:endSegment>
					{seg.value}
				</div>
			{/each}
			<div class="button-container">
				<button {...$trigger} use:trigger>
					<Calendar size={16} />
				</button>
			</div>
		</div>
	</div>
	{#if $open}
		<div transition:fade={{ duration: 100 }} {...$content} use:content>
			<div {...$calendar} use:calendar>
				<header>
					<button {...$prevButton} use:prevButton>
						<ChevronLeft size={24} />
					</button>
					<div {...$heading} use:heading>
						{$headingValue}
					</div>
					<button {...$nextButton} use:nextButton>
						<ChevronRight size={24} />
					</button>
				</header>
				<div>
					{#each $months as month}
						<table {...$grid} use:grid>
							<thead aria-hidden="true">
								<tr>
									{#each $weekdays as day}
										<th>
											<div>
												{day}
											</div>
										</th>
									{/each}
								</tr>
							</thead>
							<tbody>
								{#each month.weeks as weekDates}
									<tr>
										{#each weekDates as date}
											<td
												role="gridcell"
												aria-disabled={$isDateDisabled(date) ||
													$isDateUnavailable(date)}
											>
												<div {...$cell(date, month.value)} use:cell>
													{date.day}
												</div>
											</td>
										{/each}
									</tr>
								{/each}
							</tbody>
						</table>
					{/each}
				</div>
			</div>
		</div>
	{/if}
</div>

<style lang="scss">
	.picker-container {

    display: flex;

    width: 100%;

    flex-direction: column;

    align-items: center;

    gap: 0.75rem
}

	.button-container {

    margin-left: 1rem;

    display: flex;

    width: 100%;

    align-items: center;

    justify-content: flex-end
}

	[data-melt-popover-content] {

    z-index: 10;

    min-width: 320px;

    border-radius: 0.5rem;

    

    background-color: rgb(var(--color-neutral-900) / 1);

    

    

    box-shadow: 0 0 #0000, 0 0 #0000, 0 1px 2px 0 rgb(0 0 0 / 0.05)
}

	[data-melt-popover-trigger] {

    border-radius: 0.375rem;

    

    background-color: rgb(var(--color-magnum-400) / 1);

    padding: 0.25rem;

    

    color: rgb(var(--color-neutral-950) / 1);

    transition-property: all;

    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);

    transition-duration: 150ms
}

	[data-melt-popover-trigger]:hover {

    background-color: rgb(var(--color-magnum-400) / 0.8)
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

	[data-melt-calendar] {

    width: 100%;

    border-radius: 0.5rem;

    background-color: rgb(var(--color-neutral-800) / 0.9);

    padding: 0.75rem;

    

    color: rgb(var(--color-white) / 1);

    

    

    box-shadow: 0 0 #0000, 0 0 #0000, 0 1px 2px 0 rgb(0 0 0 / 0.05)
}

	header {

    display: flex;

    align-items: center;

    justify-content: space-between;

    padding-bottom: 0.5rem
}

	header + div {

    display: flex;

    align-items: center;

    gap: 1.5rem
}

	[data-melt-calendar-prevbutton] {

    border-radius: 0.5rem;

    padding: 0.25rem;

    transition-property: all;

    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);

    transition-duration: 150ms
}

	[data-melt-calendar-prevbutton]:hover {

    background-color: rgb(var(--color-magnum-500) / 0.2)
}

	[data-melt-calendar-nextbutton] {

    border-radius: 0.5rem;

    padding: 0.25rem;

    transition-property: all;

    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);

    transition-duration: 150ms
}

	[data-melt-calendar-nextbutton]:hover {

    background-color: rgb(var(--color-magnum-500) / 0.2)
}

	[data-melt-calendar-prevbutton][data-disabled] {

    pointer-events: none;

    border-radius: 0.5rem;

    padding: 0.25rem;

    opacity: 0.4
}

	[data-melt-calendar-nextbutton][data-disabled] {

    pointer-events: none;

    border-radius: 0.5rem;

    padding: 0.25rem;

    opacity: 0.4
}

	[data-melt-calendar-heading] {

    font-weight: 600
}

	th {

    font-size: 0.875rem;

    line-height: 1.25rem;

    font-weight: 600
}

	th div {

    display: flex;

    height: 1.5rem;

    width: 1.5rem;

    align-items: center;

    justify-content: center;

    padding: 1rem
}

	[data-melt-calendar-grid] {

    width: 100%
}

	[data-melt-calendar-cell] {

    display: flex;

    height: 1.5rem;

    width: 1.5rem;

    cursor: pointer;

    user-select: none;

    align-items: center;

    justify-content: center;

    border-radius: 0.5rem;

    padding: 1rem
}

	[data-melt-calendar-cell]:hover {

    background-color: rgb(var(--color-magnum-500) / 0.2)
}

	[data-melt-calendar-cell]:focus {

    

    

    box-shadow: 0 0 #0000, 0 0 #0000, 0 1px 2px 0 rgb(0 0 0 / 0.05);

    

    }

	[data-melt-calendar-cell][data-highlighted] {

    background-color: rgb(var(--color-magnum-600) / 0.2)
}

	[data-melt-calendar-cell][data-range-highlighted] {

    background-color: rgb(var(--color-magnum-600) / 0.2)
}

	[data-melt-calendar-cell][data-disabled] {

    pointer-events: none;

    opacity: 0.4
}

	[data-melt-calendar-cell][data-unavailable] {

    pointer-events: none;

    

    color: rgb(248 113 113 / 1);

    text-decoration-line: line-through
}

	[data-melt-calendar-cell][data-selected] {

    

    background-color: rgb(var(--color-magnum-400) / 1);

    

    color: rgb(var(--color-neutral-950) / 1)
}

	[data-melt-calendar-cell][data-outside-visible-months] {

    pointer-events: none;

    cursor: default;

    opacity: 0.4
}

	[data-melt-calendar-cell][data-outside-visible-months]:hover {

    background-color: transparent
}

	[data-melt-calendar-cell][data-outside-month] {

    pointer-events: none;

    cursor: default;

    opacity: 0
}

	[data-melt-calendar-cell][data-outside-month]:hover {

    background-color: transparent
}
</style>
