<script lang="ts">
	import { createCalendar, melt } from '$lib/index.js';
	import { CalendarDate } from '@internationalized/date';
	import { ChevronRight, ChevronLeft } from '$icons/index.js';

	const defaultValue = [
		new CalendarDate(2023, 10, 1),
		new CalendarDate(2023, 10, 12),
	];

	const {
		elements: { calendar, heading, grid, cell, prevButton, nextButton },
		states: { months, headingValue, weekdays },
		helpers: { isDateDisabled, isDateUnavailable },
	} = createCalendar({
		defaultValue,
		multiple: true,
		onValueChange: ({ next }) => {
			if (next && next.length > 3) {
				next.shift();
				return next;
			} else {
				return next;
			}
		},
	});
</script>

<div use:melt={$calendar}>
	<header>
		<button use:melt={$prevButton}>
			<ChevronLeft size={24} />
		</button>
		<div use:melt={$heading}>
			{$headingValue}
		</div>
		<button use:melt={$nextButton}>
			<ChevronRight size={24} />
		</button>
	</header>
	<div>
		{#each $months as month}
			<table use:melt={$grid}>
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
									<div use:melt={$cell(date, month.value)}>
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

<style lang="scss">
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
