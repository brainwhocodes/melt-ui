<script lang="ts">
	import { createCalendar } from '$lib/index.js';
	import { ChevronRight, ChevronLeft } from '$icons/index.js';
	import LocaleCombobox from './LocaleCombobox.svelte';

	const {
		elements: { calendar, heading, grid, cell, prevButton, nextButton },
		states: { months, headingValue, weekdays },
		helpers: { isDateDisabled, isDateUnavailable },
		options: { locale },
	} = createCalendar();
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
</section>

<style lang="scss">
	[data-melt-calendar] {

    width: 100%;

    border-radius: 0.5rem;

    

    background-color: rgb(var(--color-white) / 1);

    padding: 0.75rem;

    

    color: rgb(var(--color-magnum-800) / 1);

    

    

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

    gap: 2rem
}

	[data-melt-calendar-prevbutton] {

    border-radius: 0.5rem;

    padding: 0.25rem;

    transition-property: all;

    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);

    transition-duration: 150ms
}

	[data-melt-calendar-prevbutton]:hover {

    

    background-color: rgb(var(--color-magnum-100) / 1)
}

	[data-melt-calendar-nextbutton] {

    border-radius: 0.5rem;

    padding: 0.25rem;

    transition-property: all;

    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);

    transition-duration: 150ms
}

	[data-melt-calendar-nextbutton]:hover {

    

    background-color: rgb(var(--color-magnum-100) / 1)
}

	[data-melt-calendar-heading] {

    font-weight: 600;

    

    color: rgb(var(--color-magnum-800) / 1)
}

	th {

    font-size: 0.875rem;

    line-height: 1.25rem;

    font-weight: 600;

    

    color: rgb(var(--color-magnum-800) / 1)
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

    

    background-color: rgb(var(--color-magnum-100) / 1)
}

	[data-melt-calendar-cell]:focus {

    

    

    box-shadow: 0 0 #0000, 0 0 #0000, 0 1px 2px 0 rgb(0 0 0 / 0.05);

    

    }

	[data-melt-calendar-cell][data-outside-visible-months] {

    pointer-events: none;

    cursor: default
}

	[data-melt-calendar-cell][data-range-highlighted] {

    

    background-color: rgb(var(--color-magnum-200) / 1)
}

	[data-melt-calendar-cell][data-selected] {

    

    background-color: rgb(var(--color-magnum-300) / 1);

    

    color: rgb(var(--color-magnum-900) / 1)
}

	[data-melt-calendar-cell][data-disabled] {

    opacity: 0.4
}

	[data-melt-calendar-cell][data-outside-visible-months] {

    opacity: 0.4
}

	[data-melt-calendar-cell]:hover[data-outside-visible-months] {

    background-color: transparent
}

	[data-melt-calendar-cell][data-outside-month='true'][data-outside-visible-months='true'] {

    opacity: 0
}
</style>
