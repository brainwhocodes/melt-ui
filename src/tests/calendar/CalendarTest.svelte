<script lang="ts">
	import { createCalendar, type CreateCalendarProps } from '$lib/index.js';
	import { ChevronRight, ChevronLeft } from '$icons/index.js';
	import { removeUndefined } from '../utils.js';

	interface Props {
		value?: CreateCalendarProps['value'];
		defaultValue?: CreateCalendarProps['defaultValue'];
		defaultPlaceholder?: CreateCalendarProps['defaultPlaceholder'];
		onValueChange?: CreateCalendarProps['onValueChange'];
		onPlaceholderChange?: CreateCalendarProps['onPlaceholderChange'];
		isDateUnavailable?: CreateCalendarProps['isDateUnavailable'];
		isDateDisabled?: CreateCalendarProps['isDateDisabled'];
		locale?: CreateCalendarProps['locale'];
		calendarLabel?: CreateCalendarProps['calendarLabel'];
		preventDeselect?: CreateCalendarProps['preventDeselect'];
		numberOfMonths?: CreateCalendarProps['numberOfMonths'];
		pagedNavigation?: CreateCalendarProps['pagedNavigation'];
		placeholder?: CreateCalendarProps['placeholder'];
		weekStartsOn?: CreateCalendarProps['weekStartsOn'];
		fixedWeeks?: CreateCalendarProps['fixedWeeks'];
		minValue?: CreateCalendarProps['minValue'];
		maxValue?: CreateCalendarProps['maxValue'];
		multiple?: boolean | undefined;
		disabled?: CreateCalendarProps['disabled'];
		readonly?: CreateCalendarProps['readonly'];
		weekdayFormat?: CreateCalendarProps['weekdayFormat'];
		ids?: CreateCalendarProps['ids'];
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
		multiple = undefined,
		disabled = undefined,
		readonly = undefined,
		weekdayFormat = undefined,
		ids = undefined
	}: Props = $props();

	const {
		elements: { calendar, heading, grid, cell, prevButton, nextButton },
		states: { value: insideValue, months, headingValue, weekdays },
		options: {
			weekdayFormat: weekdayFormatOption,
			numberOfMonths: numberOfMonthsOption,
			fixedWeeks: fixedWeeksOption,
			weekStartsOn: weekStartsOnOption,
			locale: localeOption,
		},
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
			multiple,
			disabled,
			readonly,
			weekdayFormat,
			ids,
		})
	);

	function cycleWeekStart() {
		$weekStartsOnOption = (($weekStartsOnOption + 1) % 7) as typeof $weekStartsOnOption;
	}

	function cycleWeekdayFormat() {
		weekdayFormatOption.update((prev) => {
			switch (prev) {
				case 'narrow':
					return 'short';
				case 'short':
					return 'long';
				case 'long':
					return 'short';
			}
		});
	}
</script>

<main class="surface-d7c2a7f47a">
	<div class="surface-21a2eeac26">
		<div class="surface-d39f1a0ddd">
			<p class="surface-e7163661c8" data-testid="inside-value">{$insideValue}</p>
		</div>

		<div class="surface-8137693dd8">
			<div class="surface-cd44bf9b37" {...$calendar} use:calendar data-testid="calendar">
				<header class="surface-f51db752b9">
					<button {...$prevButton} use:prevButton data-testid="prev-button">
						<ChevronLeft />
					</button>
					<h2 class="surface-422643ec2c" {...$heading} use:heading data-testid="heading">
						{$headingValue}
					</h2>
					<button {...$nextButton} use:nextButton data-testid="next-button">
						<ChevronRight />
					</button>
				</header>
				<div>
					{#each $months as month, i}
						<table {...$grid} use:grid class="surface-29d08cef74" data-testid="grid-{i}">
							<thead aria-hidden="true">
								<tr data-testid="weekdays">
									{#each $weekdays as day, idx}
										<th class="surface-0fae47a5af">
											<div
												class="surface-f9c8faf235"
												data-testid="weekday-{idx}"
											>
												{day}
											</div>
										</th>
									{/each}
								</tr>
							</thead>
							<tbody>
								{#each month.weeks as days, idx}
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
	</div>
	<button onclick={cycleWeekdayFormat} data-testid="cycle-weekday-format">
		Cycle weekdayFormat
	</button>
	<button
		data-testid="numberOfMonths"
		onclick={() => {
			$numberOfMonthsOption++;
		}}>numberOfMonths</button
	>
	<br />
	<button data-testid="weekStartsOn" onclick={cycleWeekStart}>weekStartsOn</button>
	<br />
	<button
		data-testid="fixedWeeks"
		onclick={() => {
			$fixedWeeksOption = !$fixedWeeksOption;
		}}>fixedWeeksOption</button
	>
	<br />
	<button
		data-testid="locale"
		onclick={() => {
			$localeOption = 'it';
		}}>setLocaleToIt</button
	>
</main>

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
