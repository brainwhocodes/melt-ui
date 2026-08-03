<script lang="ts">
	import { createDatePicker, type CreateDatePickerProps } from '$lib/builders/index.js';
	import { ChevronRight, ChevronLeft, Calendar } from '$icons/index.js';
	import { removeUndefined } from '../utils.js';

	interface Props {
		value?: CreateDatePickerProps['value'];
		defaultValue?: CreateDatePickerProps['defaultValue'];
		defaultPlaceholder?: CreateDatePickerProps['defaultPlaceholder'];
		onValueChange?: CreateDatePickerProps['onValueChange'];
		onPlaceholderChange?: CreateDatePickerProps['onPlaceholderChange'];
		isDateUnavailable?: CreateDatePickerProps['isDateUnavailable'];
		isDateDisabled?: CreateDatePickerProps['isDateDisabled'];
		disabled?: CreateDatePickerProps['disabled'];
		readonly?: CreateDatePickerProps['readonly'];
		hourCycle?: CreateDatePickerProps['hourCycle'];
		locale?: CreateDatePickerProps['locale'];
		hideTimeZone?: CreateDatePickerProps['hideTimeZone'];
		dateFieldIds?: CreateDatePickerProps['dateFieldIds'];
		calendarIds?: CreateDatePickerProps['calendarIds'];
		popoverIds?: CreateDatePickerProps['popoverIds'];
		granularity?: CreateDatePickerProps['granularity'];
		calendarLabel?: CreateDatePickerProps['calendarLabel'];
		preventDeselect?: CreateDatePickerProps['preventDeselect'];
		numberOfMonths?: CreateDatePickerProps['numberOfMonths'];
		pagedNavigation?: CreateDatePickerProps['pagedNavigation'];
		placeholder?: CreateDatePickerProps['placeholder'];
		weekStartsOn?: CreateDatePickerProps['weekStartsOn'];
		weekdayFormat?: CreateDatePickerProps['weekdayFormat'];
		fixedWeeks?: CreateDatePickerProps['fixedWeeks'];
		onOutsideClick?: CreateDatePickerProps['onOutsideClick'];
	}

	let {
		value = undefined,
		defaultValue = undefined,
		defaultPlaceholder = undefined,
		onValueChange = undefined,
		onPlaceholderChange = undefined,
		isDateUnavailable = undefined,
		isDateDisabled = undefined,
		disabled = undefined,
		readonly = undefined,
		hourCycle = undefined,
		locale = 'en',
		hideTimeZone = undefined,
		dateFieldIds = undefined,
		calendarIds = undefined,
		popoverIds = undefined,
		granularity = undefined,
		calendarLabel = undefined,
		preventDeselect = undefined,
		numberOfMonths = undefined,
		pagedNavigation = undefined,
		placeholder = undefined,
		weekStartsOn = undefined,
		weekdayFormat = undefined,
		fixedWeeks = undefined,
		onOutsideClick = undefined
	}: Props = $props();

	const {
		elements: {
			calendar,
			heading,
			grid,
			cell,
			field,
			prevButton,
			nextButton,
			segment,
			trigger,
			content,
			label,
			validation,
		},
		states: { value: insideValue, months, headingValue, weekdays, segmentContents },
		options: {
			locale: insideLocale,
			weekdayFormat: weekdayFormatOption,
			numberOfMonths: numberOfMonthsOption,
			fixedWeeks: fixedWeeksOption,
			weekStartsOn: weekStartsOnOption,
		},
	} = createDatePicker(
		removeUndefined({
			value,
			defaultValue,
			defaultPlaceholder,
			onValueChange,
			onPlaceholderChange,
			isDateUnavailable,
			disabled,
			readonly,
			hourCycle,
			locale,
			hideTimeZone,
			granularity,
			dateFieldIds,
			calendarIds,
			preventDeselect,
			calendarLabel,
			numberOfMonths,
			pagedNavigation,
			placeholder,
			weekStartsOn,
			isDateDisabled,
			weekdayFormat,
			popoverIds,
			onOutsideClick,
			fixedWeeks,
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

<main class="surface-7c00586ed5">
	<div class="surface-a69279391c">
		<p class="surface-653f12f973" data-testid="inside-value">{$insideValue}</p>
	</div>
	<div>
		<span {...$label} use:label class="surface-c23c4a5415" data-testid="label">Date</span>
		<div
			{...$field} use:field
			class="surface-604de9a8d4"
			data-testid="field"
		>
			{#each $segmentContents as seg, i (`${i}-${$insideLocale}`)}
				<div
					{...$segment(seg.part)} use:segment
					class="segment surface-cbeed70698"
					data-testid={seg.part === 'literal' ? `literal=${i}` : seg.part}
				>
					{seg.value}
				</div>
			{/each}
			<div class="surface-aa6ad889ce">
				<button {...$trigger} use:trigger data-testid="trigger" class="surface-1e3fc60c1b">
					<Calendar class="surface-e4936214ae" />
				</button>
			</div>
		</div>
		<span {...$validation} use:validation data-testid="validation">validation</span>
	</div>
	<div
		class="surface-6c252a00ff"
		{...$content} use:content
		data-testid="content"
	>
		<div class="surface-5dbf63ddff" {...$calendar} use:calendar data-testid="calendar">
			<header class="surface-fe1c63899e">
				<button {...$prevButton} use:prevButton data-testid="prev-button">
					<ChevronLeft />
				</button>
				<h2 class="surface-405580a61d" {...$heading} use:heading data-testid="heading">
					{$headingValue}
				</h2>
				<button {...$nextButton} use:nextButton data-testid="next-button">
					<ChevronRight />
				</button>
			</header>
			{#each $months as month, i (i)}
				{@const { weeks } = month}
				<table {...$grid} use:grid class="surface-14bfe8255f" data-testid="grid-{i}">
					<thead aria-hidden="true">
						<tr data-testid="weekdays">
							{#each $weekdays as day, idx}
								<th class="surface-e347155b92">
									<div
										class="surface-5cd3545d0f"
										data-testid="weekday-{idx}"
									>
										{day}
									</div>
								</th>
							{/each}
						</tr>
					</thead>
					<tbody>
						{#each weeks as days, i}
							<tr data-testid="week-{i + 1}">
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
	.segment:not([data-segment='literal']) {
    padding-left: 0.125rem;
    padding-right: 0.125rem
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
