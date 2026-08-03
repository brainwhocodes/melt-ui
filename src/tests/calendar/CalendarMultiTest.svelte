<script lang="ts">
	import { createCalendar, type CreateCalendarProps } from '$lib/builders/index.js';
	import { ChevronRight, ChevronLeft } from '$icons/index.js';
	import { removeUndefined } from '../utils.js';

	type CalendarProps = CreateCalendarProps<true>;

	interface Props {
		value?: CalendarProps['value'];
		defaultValue?: CalendarProps['defaultValue'];
		defaultPlaceholder?: CalendarProps['defaultPlaceholder'];
		onValueChange?: CalendarProps['onValueChange'];
		onPlaceholderChange?: CalendarProps['onPlaceholderChange'];
		isDateUnavailable?: CalendarProps['isDateUnavailable'];
		isDateDisabled?: CalendarProps['isDateDisabled'];
		locale?: CalendarProps['locale'];
		calendarLabel?: CalendarProps['calendarLabel'];
		preventDeselect?: CalendarProps['preventDeselect'];
		numberOfMonths?: CalendarProps['numberOfMonths'];
		pagedNavigation?: CalendarProps['pagedNavigation'];
		placeholder?: CalendarProps['placeholder'];
		weekStartsOn?: CalendarProps['weekStartsOn'];
		fixedWeeks?: CalendarProps['fixedWeeks'];
		minValue?: CalendarProps['minValue'];
		maxValue?: CalendarProps['maxValue'];
		weekdayFormat?: CalendarProps['weekdayFormat'];
	}

	let {
		value = undefined,
		defaultValue = undefined,
		defaultPlaceholder = undefined,
		onValueChange = undefined,
		onPlaceholderChange = undefined,
		isDateUnavailable = undefined,
		isDateDisabled = undefined,
		locale = 'en',
		calendarLabel = undefined,
		preventDeselect = undefined,
		numberOfMonths = undefined,
		pagedNavigation = undefined,
		placeholder = undefined,
		weekStartsOn = undefined,
		fixedWeeks = undefined,
		minValue = undefined,
		maxValue = undefined,
		weekdayFormat = undefined
	}: Props = $props();

	const {
		elements: { calendar, heading, grid, cell, prevButton, nextButton },
		states: { value: insideValue, months, headingValue, weekdays },
	} = createCalendar(
		removeUndefined({
			value,
			defaultValue,
			defaultPlaceholder,
			onValueChange,
			onPlaceholderChange,
			isDateUnavailable,
			isDateDisabled,
			locale,
			calendarLabel,
			preventDeselect,
			numberOfMonths,
			pagedNavigation,
			placeholder,
			weekStartsOn,
			fixedWeeks,
			minValue,
			maxValue,
			multiple: true,
			weekdayFormat,
		})
	);
</script>

<main class="surface-dc4c73e62f">
	<div class="surface-784f6d35ab">
		<div class="surface-ecab0125fb">
			<p class="surface-96802889e9" data-testid="inside-value">{$insideValue}</p>
		</div>

		<div class="surface-993ac9b0fc">
			<div class="surface-4c934c14fc" {...$calendar} use:calendar data-testid="calendar">
				<header class="surface-d6ef1ac3fc">
					<button {...$prevButton} use:prevButton data-testid="prev-button">
						<ChevronLeft />
					</button>
					<h2 class="surface-200ac3de12" {...$heading} use:heading data-testid="heading">
						{$headingValue}
					</h2>
					<button {...$nextButton} use:nextButton data-testid="next-button">
						<ChevronRight />
					</button>
				</header>
				{#each $months as month, i (i)}
					{@const { weeks } = month}
					<table {...$grid} use:grid class="surface-959887a6f8" data-testid="grid-{i}">
						<thead aria-hidden="true">
							<tr>
								{#each $weekdays as day, idx}
									<th class="surface-6856405515">
										<div
											class="surface-add3534651"
											data-testid="day-of-week-{idx}"
										>
											{day}
										</div>
									</th>
								{/each}
							</tr>
						</thead>
						<tbody>
							{#each weeks as days, idx}
								<tr data-testid="week-{idx + 1}">
									{#each days as date}
										<td role="gridcell">
											<div
												{...$cell(date, month.value)} use:cell
												class="cell"
												data-testid="month-{date.month}-date-{date.day}"
											>
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
</main>

<style lang="scss">
	.input {
    display: flex;
    height: 2rem;
    width: 100%;
    border-radius: 0.375rem;
    border-width: 1px;

    border-color: rgb(var(--color-magnum-800) / 1);
    background-color: transparent;
    padding-left: 0.625rem;
    padding-right: 0.625rem;
    font-size: 0.875rem;
    line-height: 1.25rem;
    }
	.input:focus-visible {


    box-shadow: 0 0 #0000, 0 0 #0000, 0 1px 2px 0 rgb(0 0 0 / 0.05);


    }
	.input {
    flex: 1 1 0%;
    align-items: center;
    justify-content: center;
    padding-left: 0.625rem;
    padding-right: 0.625rem;
    font-size: 0.875rem;
    line-height: 1.25rem;
    line-height: 1;

    color: rgb(var(--color-magnum-700) / 1)
}

	.trigger {
    display: inline-flex;
    width: 16rem;
    align-items: center;
    justify-content: center;
    border-radius: 0.25rem;

    background-color: rgb(var(--color-white) / 1);
    padding: 0px;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    padding-top: 0.25rem;
    padding-bottom: 0.25rem;
    font-size: 0.875rem;
    line-height: 1.25rem;
    font-weight: 500;

    color: rgb(var(--color-magnum-900) / 1);
    transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms
}

	.trigger:hover {
    background-color: rgb(var(--color-white) / 0.9)
}

	.trigger:focus-visible {


    box-shadow: 0 0 #0000, 0 0 #0000, 0 1px 2px 0 rgb(0 0 0 / 0.05);


    }

	.close {
    position: absolute;
    right: 0.375rem;
    top: 0.375rem;
    display: flex;
    height: 1.75rem;
    width: 1.75rem;
    align-items: center;
    justify-content: center;
    border-radius: 9999px;

    color: rgb(var(--color-magnum-900) / 1);
    transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms
}

	.close:hover {
    background-color: rgb(var(--color-magnum-500) / 0.1)
}

	.close:focus-visible {


    box-shadow: 0 0 #0000, 0 0 #0000, 0 1px 2px 0 rgb(0 0 0 / 0.05);


    }

	.close {

    background-color: rgb(var(--color-white) / 1);
    padding: 0px;
    font-size: 0.875rem;
    line-height: 1.25rem;
    font-weight: 500
}

	.button {
    display: flex;
    height: 1.5rem;
    width: 1.5rem;
    align-items: center;
    justify-content: center;
    border-radius: 9999px;

    color: rgb(var(--color-magnum-900) / 1);
    transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms
}

	.button:hover {
    background-color: rgb(var(--color-magnum-500) / 0.1)
}

	.button:focus-visible {


    box-shadow: 0 0 #0000, 0 0 #0000, 0 1px 2px 0 rgb(0 0 0 / 0.05);

    }

	.button {

    background-color: rgb(var(--color-white) / 1);
    padding: 0px;
    font-size: 0.875rem;
    line-height: 1.25rem;
    font-weight: 500
}

	.content {
    z-index: 10;
    width: 15rem;
    border-radius: 4px;

    background-color: rgb(var(--color-white) / 1);
    padding: 1.25rem;


    box-shadow: 0 0 #0000, 0 0 #0000, 0 1px 2px 0 rgb(0 0 0 / 0.05)
}

	.buttons-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top-width: 1px;
    border-bottom-width: 1px;

    border-color: rgb(var(--color-magnum-700) / 1);
    padding-top: 0.25rem;
    padding-bottom: 0.25rem
}

	.cell {
    display: flex;
    height: 1.5rem;
    width: 1.5rem;
    cursor: pointer;
    user-select: none;
    align-items: center;
    justify-content: center;
    border-radius: 0.25rem;
    padding: 1rem
}

	.cell:hover {

    background-color: rgb(var(--color-magnum-100) / 1)
}

	.cell:focus {


    box-shadow: 0 0 #0000, 0 0 #0000, 0 1px 2px 0 rgb(0 0 0 / 0.05);

    }

	.cell[data-outside-month] {
    pointer-events: none;
    cursor: default
}

	.cell[data-range-highlighted] {

    background-color: rgb(var(--color-magnum-200) / 1)
}

	.cell[data-selected] {

    background-color: rgb(var(--color-magnum-300) / 1)
}

	.cell[data-disabled] {
    opacity: 0.4
}

	.cell[data-outside-month] {
    opacity: 0.4
}

	.cell:hover[data-outside-month] {
    background-color: transparent
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
