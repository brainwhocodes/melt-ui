import {
	CalendarDate,
	CalendarDateTime,
	type DateValue,
	HebrewCalendar,
	JapaneseCalendar,
	toZoned,
} from '@internationalized/date';
import { render } from '@testing-library/svelte';
import { userEvent } from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { tick } from 'svelte';
import { get, writable } from 'svelte/store';
import { describe } from 'vitest';
import { type CreateCalendarProps, createCalendar } from '$lib/index.js';
import { testKbd as kbd } from '../utils.js';
import CalendarMultiTest from './CalendarMultiTest.svelte';
import CalendarTest from './CalendarTest.svelte';

const calendarDate = new CalendarDate(1980, 1, 20);
const calendarDateTime = new CalendarDateTime(1980, 1, 20, 12, 30, 0, 0);
const zonedDateTime = toZoned(calendarDateTime, 'America/New_York');

const controlledCalendarDate = writable<DateValue | undefined>(calendarDate);
const controlledCalendarDateTime = writable<DateValue | undefined>(
	calendarDateTime,
);
const controlledZonedDateTime = writable<DateValue | undefined>(zonedDateTime);

const narrowWeekdays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const shortWeekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const longWeekdays = [
	'Sunday',
	'Monday',
	'Tuesday',
	'Wednesday',
	'Thursday',
	'Friday',
	'Saturday',
];

function setup(props: CreateCalendarProps = {}) {
	const user = userEvent.setup();
	const returned = render(CalendarTest, props);
	const calendar = returned.getByTestId('calendar');
	expect(calendar).toBeVisible();
	return {
		...returned,
		user,
		calendar,
	};
}

function setupMulti(props: CreateCalendarProps<true> = {}) {
	const user = userEvent.setup();
	const returned = render(CalendarMultiTest, props);
	const calendar = returned.getByTestId('calendar');
	expect(calendar).toBeVisible();
	return {
		...returned,
		user,
		calendar,
	};
}

function getInMonthCell(calendar: HTMLElement, month: number, day: number) {
	const cell = calendar.querySelector<HTMLElement>(
		`[data-testid="month-${month}-date-${day}"]:not([data-outside-month])`,
	);
	expect(cell).not.toBeNull();
	return cell as HTMLElement;
}

describe('Calendar', () => {
	describe('Accessibility', () => {
		test('has no accessibility violations', async () => {
			const { container } = render(CalendarTest);

			expect(await axe(container)).toHaveNoViolations();
		});
	});

	test('setMonth enforces Gregorian one-based integer bounds', () => {
		const calendar = createCalendar({
			defaultPlaceholder: new CalendarDate(2024, 6, 15),
		});

		calendar.helpers.setMonth(1);
		expect(get(calendar.states.placeholder).month).toBe(1);
		calendar.helpers.setMonth(12);
		expect(get(calendar.states.placeholder).month).toBe(12);

		for (const month of [0, 13, 1.5]) {
			expect(() => calendar.helpers.setMonth(month)).toThrow(
				'Month must be an integer between 1 and 12.',
			);
		}
		expect(get(calendar.states.placeholder).month).toBe(12);
	});

	test('setMonth uses the active calendar month count', () => {
		const calendar = createCalendar({
			defaultPlaceholder: new CalendarDate(new HebrewCalendar(), 5784, 6, 15),
		});

		calendar.helpers.setMonth(13);
		expect(get(calendar.states.placeholder).month).toBe(13);
		expect(() => calendar.helpers.setMonth(14)).toThrow(
			'Month must be an integer between 1 and 13.',
		);
	});
	test('populated with defaultValue - CalendarDate', async () => {
		const { getByTestId, calendar } = setup({
			defaultValue: calendarDate,
		});

		const selectedDay = calendar.querySelector('[data-selected]');
		expect(selectedDay).toHaveTextContent(String(calendarDate.day));

		const heading = getByTestId('heading');
		expect(heading).toHaveTextContent('January 1980');
	});
	test('populated with defaultValue - CalendarDateTime', async () => {
		const { getByTestId, calendar } = setup({
			defaultValue: calendarDateTime,
		});

		const selectedDay = calendar.querySelector('[data-selected]');
		expect(selectedDay).toHaveTextContent(String(calendarDateTime.day));

		const heading = getByTestId('heading');
		expect(heading).toHaveTextContent('January 1980');
	});

	test('populated with defaultValue - ZonedDateTime', async () => {
		const { getByTestId, calendar } = setup({
			defaultValue: zonedDateTime,
		});

		const selectedDay = calendar.querySelector('[data-selected]');
		expect(selectedDay).toHaveTextContent(String(zonedDateTime.day));

		const heading = getByTestId('heading');
		expect(heading).toHaveTextContent('January 1980');
	});

	test('populated with controlled value - CalendarDate', async () => {
		const { getByTestId, calendar } = setup({
			value: controlledCalendarDate,
		});

		const selectedDay = calendar.querySelector('[data-selected]');
		expect(selectedDay).toHaveTextContent(String(calendarDate.day));

		const heading = getByTestId('heading');
		expect(heading).toHaveTextContent('January 1980');
	});

	test('populated with controlled value - CalendarDateTime', async () => {
		const { getByTestId, calendar } = setup({
			value: controlledCalendarDateTime,
		});

		const selectedDay = calendar.querySelector('[data-selected]');
		expect(selectedDay).toHaveTextContent(String(calendarDateTime.day));

		const heading = getByTestId('heading');
		expect(heading).toHaveTextContent('January 1980');
	});

	test('populated with controlled value - ZonedDateTime', async () => {
		const { getByTestId, calendar } = setup({
			value: controlledZonedDateTime,
		});

		const selectedDay = calendar.querySelector('[data-selected]');
		expect(selectedDay).toHaveTextContent(String(zonedDateTime.day));

		const heading = getByTestId('heading');
		expect(heading).toHaveTextContent('January 1980');
	});

	test('keeps CalendarDate selection date-only', async () => {
		const initial = new CalendarDate(2024, 3, 9);
		const value = writable<DateValue | undefined>(initial);
		const { calendar, user } = setup({ value });

		await user.click(getInMonthCell(calendar, 3, 10));

		const selected = get(value);
		expect(selected).toBeInstanceOf(CalendarDate);
		expect(selected?.toString()).toBe('2024-03-10');
	});

	test('preserves updated CalendarDateTime metadata when selecting another day', async () => {
		const initial = new CalendarDateTime(2024, 3, 9, 9, 10, 11, 12);
		const updated = initial.set({
			hour: 22,
			minute: 23,
			second: 24,
			millisecond: 25,
		});
		const value = writable<DateValue | undefined>(initial);
		const { calendar, user } = setup({ value });

		value.set(updated);
		await tick();
		await user.click(getInMonthCell(calendar, 3, 10));

		const selected = get(value);
		expect(selected).toBeInstanceOf(CalendarDateTime);
		expect(selected?.toString()).toBe(updated.set({ day: 10 }).toString());
	});

	test('preserves a non-Gregorian CalendarDateTime across an era boundary', async () => {
		const calendarSystem = new JapaneseCalendar();
		const initial = new CalendarDateTime(
			calendarSystem,
			'heisei',
			31,
			4,
			30,
			9,
			10,
			11,
			12,
		);
		const updated = initial.set({
			hour: 22,
			minute: 23,
			second: 24,
			millisecond: 25,
		});
		const value = writable<DateValue | undefined>(initial);
		const { calendar, user } = setup({ value, numberOfMonths: 2 });

		value.set(updated);
		await tick();
		await user.click(getInMonthCell(calendar, 5, 1));

		const selected = get(value);
		const expected = updated.set({ era: 'reiwa', year: 1, month: 5, day: 1 });
		expect(selected).toBeInstanceOf(CalendarDateTime);
		expect(selected?.calendar.identifier).toBe('japanese');
		expect(selected?.era).toBe('reiwa');
		expect(selected?.toString()).toBe(expected.toString());
	});

	test.each([
		{
			name: 'normal date',
			initial: toZoned(
				new CalendarDateTime(2024, 1, 20, 9, 30, 12, 345),
				'America/New_York',
			),
			updatedTime: { hour: 18, minute: 45, second: 23, millisecond: 456 },
			month: 1,
			day: 21,
		},
		{
			name: 'DST transition',
			initial: toZoned(
				new CalendarDateTime(2024, 3, 9, 1, 30, 12, 345),
				'America/New_York',
			),
			updatedTime: { hour: 2, minute: 30, second: 23, millisecond: 456 },
			month: 3,
			day: 10,
		},
	])(
		'preserves updated ZonedDateTime metadata across a $name',
		async ({ initial, updatedTime, month, day }) => {
			const updated = initial.set(updatedTime);
			const value = writable<DateValue | undefined>(initial);
			const { calendar, user } = setup({ value });

			value.set(updated);
			await tick();
			await user.click(getInMonthCell(calendar, month, day));

			const selected = get(value);
			const expected = updated.set({ day });
			expect(selected?.constructor).toBe(initial.constructor);
			expect(selected?.toString()).toBe(expected.toString());
			expect('timeZone' in selected! && selected.timeZone).toBe(
				'America/New_York',
			);
			expect('offset' in selected! && selected.offset).toBe(expected.offset);
		},
	);

	test('month navigation', async () => {
		const { getByTestId, user } = setup({
			defaultValue: zonedDateTime,
		});

		const heading = getByTestId('heading');
		expect(heading).toHaveTextContent('January 1980');

		const prevButton = getByTestId('prev-button');
		const nextButton = getByTestId('next-button');

		await user.click(nextButton);
		expect(heading).toHaveTextContent('February 1980');

		await user.click(prevButton);
		expect(heading).toHaveTextContent('January 1980');

		await user.click(prevButton);
		expect(heading).toHaveTextContent('December 1979');
	});

	test('allow deselection', async () => {
		const { queryByTestId, user, calendar } = setup({
			defaultValue: zonedDateTime,
		});

		const selectedDay = calendar.querySelector(
			'[data-selected]',
		) as HTMLElement;
		expect(selectedDay).toHaveTextContent(String(zonedDateTime.day));

		await user.click(selectedDay);

		await tick();
		const insideValue = queryByTestId('inside-value');
		expect(insideValue).toHaveTextContent('undefined');
	});

	test('selection with mouse', async () => {
		const { getByTestId, user } = setup({
			defaultPlaceholder: zonedDateTime,
		});

		const secondDayInMonth = getByTestId('month-1-date-2');
		await user.click(secondDayInMonth);
		expect(secondDayInMonth).toHaveAttribute('data-selected');

		const newDate = zonedDateTime.set({ day: 2 });
		const insideValue = getByTestId('inside-value');
		expect(insideValue).toHaveTextContent(newDate.toString());
	});

	test('selection with keyboard', async () => {
		const { getByTestId, user } = setup({
			defaultPlaceholder: zonedDateTime,
		});

		const secondDayInMonth = getByTestId('month-1-date-2');
		secondDayInMonth.focus();
		await user.keyboard(kbd.SPACE);
		expect(secondDayInMonth).toHaveAttribute('data-selected');
		const newDate = zonedDateTime.set({ day: 2 });
		const insideValue = getByTestId('inside-value');
		expect(insideValue).toHaveTextContent(newDate.toString());
		await user.keyboard(kbd.ARROW_RIGHT);
		await user.keyboard(kbd.ENTER);

		const thirdDayInMonth = getByTestId('month-1-date-3');
		expect(thirdDayInMonth).toHaveAttribute('data-selected');
		const newDate2 = zonedDateTime.set({ day: 3 });
		const insideValue2 = getByTestId('inside-value');
		expect(insideValue2).toHaveTextContent(newDate2.toString());
	});

	test('should display multiple months with numberOfMonths prop', async () => {
		const { getByTestId, calendar, user } = setup({
			defaultValue: calendarDateTime,
			numberOfMonths: 2,
		});

		const selectedDay = calendar.querySelector('[data-selected]');
		expect(selectedDay).toHaveTextContent(String(calendarDateTime.day));

		const heading = getByTestId('heading');
		expect(heading).toHaveTextContent('January - February 1980');

		const firstMonthDayDateStr = calendarDateTime.set({ day: 12 }).toString();

		const firstMonthDay = getByTestId('month-1-date-12');
		expect(firstMonthDay).toHaveTextContent('12');
		expect(firstMonthDay).toHaveAttribute('data-value', firstMonthDayDateStr);

		const secondMonthDay = getByTestId('month-2-date-15');

		const secondMonthDayDateStr = calendarDateTime
			.set({ day: 15, month: 2 })
			.toString();

		expect(secondMonthDay).toHaveTextContent('15');
		expect(secondMonthDay).toHaveAttribute('data-value', secondMonthDayDateStr);

		const prevButton = getByTestId('prev-button');
		const nextButton = getByTestId('next-button');

		await user.click(nextButton);
		expect(heading).toHaveTextContent('February - March 1980');
		expect(firstMonthDay).not.toHaveAttribute(
			'data-value',
			firstMonthDayDateStr,
		);

		await user.click(prevButton);
		expect(heading).toHaveTextContent('January - February 1980');
		await user.click(prevButton);
		expect(heading).toHaveTextContent('December 1979 - January 1980');
	});

	test('multiple months (paged navigation)', async () => {
		const { getByTestId, calendar, user } = setup({
			defaultValue: calendarDateTime,
			numberOfMonths: 2,
			pagedNavigation: true,
		});

		const selectedDay = calendar.querySelector('[data-selected]');
		expect(selectedDay).toHaveTextContent(String(calendarDateTime.day));

		const heading = getByTestId('heading');
		expect(heading).toHaveTextContent('January - February 1980');

		const firstMonthDayDateStr = calendarDateTime.set({ day: 12 }).toString();

		const firstMonthDay = getByTestId('month-1-date-12');
		expect(firstMonthDay).toHaveTextContent('12');
		expect(firstMonthDay).toHaveAttribute('data-value', firstMonthDayDateStr);

		const secondMonthDay = getByTestId('month-2-date-15');

		const secondMonthDayDateStr = calendarDateTime
			.set({ day: 15, month: 2 })
			.toString();

		expect(secondMonthDay).toHaveTextContent('15');
		expect(secondMonthDay).toHaveAttribute('data-value', secondMonthDayDateStr);
		const prevButton = getByTestId('prev-button');
		const nextButton = getByTestId('next-button');

		await user.click(nextButton);
		expect(heading).toHaveTextContent('March - April 1980');
		expect(firstMonthDay).not.toHaveAttribute(
			'data-value',
			firstMonthDayDateStr,
		);

		await user.click(prevButton);
		expect(heading).toHaveTextContent('January - February 1980');
		await user.click(prevButton);
		expect(heading).toHaveTextContent('November - December 1979');
	});

	test('fixedWeeks always renders 6 weeks', async () => {
		const valueStore = writable(calendarDate);

		const { getByTestId, queryByTestId, user } = setup({
			value: valueStore,
			fixedWeeks: true,
		});

		const nextButton = getByTestId('next-button');
		const prevButton = getByTestId('prev-button');

		for (let i = 0; i < 12; i++) {
			await user.click(nextButton);
			expect(queryByTestId('week-6')).not.toBeNull();
		}

		valueStore.set(calendarDate);

		for (let i = 0; i < 12; i++) {
			await user.click(prevButton);
			expect(queryByTestId('week-6')).not.toBeNull();
		}
	});
	test('controlled value should update selected value', async () => {
		const valueStore = writable<DateValue | undefined>(undefined);

		const { getByTestId } = setup({
			value: valueStore,
		});

		const insideValue = getByTestId('inside-value');
		expect(insideValue).toHaveTextContent('undefined');
		valueStore.set(calendarDate);

		await tick();
		expect(insideValue).toHaveTextContent('1980-01-20');
		valueStore.set(new CalendarDate(2023, 10, 11));

		await tick();
		expect(insideValue).toHaveTextContent('2023-10-11');
	});

	test('controlled placeholder should change view', async () => {
		const placeholderStore = writable<DateValue>(calendarDate);
		const { getByTestId } = setup({
			defaultValue: calendarDate,
			placeholder: placeholderStore,
		});

		const heading = getByTestId('heading');
		expect(heading).toHaveTextContent('January 1980');

		const insideValue = getByTestId('inside-value');
		expect(insideValue).toHaveTextContent('1980-01-20');

		placeholderStore.set(new CalendarDate(2023, 10, 11));

		await tick();
		expect(heading).toHaveTextContent('October 2023');
		expect(insideValue).toHaveTextContent('1980-01-20');
	});

	test('calendar does not navigate before minValue', async () => {
		const { getByTestId, user } = setup({
			defaultValue: calendarDate,
			minValue: new CalendarDate(1979, 11, 25),
		});

		const prevButton = getByTestId('prev-button');
		await user.click(prevButton);
		const heading = getByTestId('heading');
		expect(heading).toHaveTextContent('December 1979');
		expect(prevButton).not.toHaveAttribute('aria-disabled', 'true');
		expect(prevButton).not.toHaveAttribute('data-disabled');
		await user.click(prevButton);
		expect(heading).toHaveTextContent('November 1979');

		expect(prevButton).toHaveAttribute('aria-disabled', 'true');
		expect(prevButton).toHaveAttribute('data-disabled');

		await user.click(prevButton);
		expect(heading).toHaveTextContent('November 1979');
	});

	test('calendar does not navigate after maxValue', async () => {
		const { getByTestId, user } = setup({
			defaultValue: calendarDate,
			maxValue: new CalendarDate(1980, 4, 1),
		});

		const nextButton = getByTestId('next-button');
		await user.click(nextButton);
		const heading = getByTestId('heading');
		expect(heading).toHaveTextContent('February 1980');
		await user.click(nextButton);
		expect(heading).toHaveTextContent('March 1980');

		expect(nextButton).not.toHaveAttribute('aria-disabled', 'true');
		expect(nextButton).not.toHaveAttribute('data-disabled');

		await user.click(nextButton);
		expect(heading).toHaveTextContent('April 1980');

		expect(nextButton).toHaveAttribute('aria-disabled', 'true');
		expect(nextButton).toHaveAttribute('data-disabled');

		await user.click(nextButton);
		expect(heading).toHaveTextContent('April 1980');
	});

	test('calendar does not navigate after maxValue (with keyboard)', async () => {
		const { getByTestId, user } = setup({
			defaultValue: calendarDate,
			maxValue: new CalendarDate(1980, 3, 31),
		});

		const firstDayInMonth = getByTestId('month-1-date-1');
		firstDayInMonth.focus();
		expect(firstDayInMonth).toHaveFocus();

		const heading = getByTestId('heading');
		expect(heading).toHaveTextContent('January 1980');

		// five keypresses to get to February 1980
		await user.keyboard(kbd.ARROW_DOWN);
		expect(getByTestId('month-1-date-8')).toHaveFocus();
		await user.keyboard(kbd.ARROW_DOWN);
		expect(getByTestId('month-1-date-15')).toHaveFocus();
		await user.keyboard(kbd.ARROW_DOWN);
		expect(getByTestId('month-1-date-22')).toHaveFocus();
		await user.keyboard(kbd.ARROW_DOWN);
		expect(getByTestId('month-1-date-29')).toHaveFocus();
		await user.keyboard(kbd.ARROW_DOWN);
		expect(getByTestId('month-2-date-5')).toHaveFocus();
		expect(heading).toHaveTextContent('February 1980');

		// four keypresses to get to March 1980
		await user.keyboard(kbd.ARROW_DOWN);
		expect(getByTestId('month-2-date-12')).toHaveFocus();
		await user.keyboard(kbd.ARROW_DOWN);
		expect(getByTestId('month-2-date-19')).toHaveFocus();
		await user.keyboard(kbd.ARROW_DOWN);
		expect(getByTestId('month-2-date-26')).toHaveFocus();
		await user.keyboard(kbd.ARROW_DOWN);
		expect(getByTestId('month-3-date-4')).toHaveFocus();
		expect(heading).toHaveTextContent('March 1980');

		// four keypresses to get to April 1980
		await user.keyboard(kbd.ARROW_DOWN);
		expect(getByTestId('month-3-date-11')).toHaveFocus();
		await user.keyboard(kbd.ARROW_DOWN);
		expect(getByTestId('month-3-date-18')).toHaveFocus();
		await user.keyboard(kbd.ARROW_DOWN);
		expect(getByTestId('month-3-date-25')).toHaveFocus();
		await user.keyboard(kbd.ARROW_DOWN);
		expect(getByTestId('month-3-date-25')).toHaveFocus();

		// again for good measure
		await user.keyboard(kbd.ARROW_DOWN);
		await user.keyboard(kbd.ARROW_DOWN);
		await user.keyboard(kbd.ARROW_DOWN);
		await user.keyboard(kbd.ARROW_DOWN);
		await user.keyboard(kbd.ARROW_DOWN);
		expect(getByTestId('month-3-date-25')).toHaveFocus();
		expect(heading).toHaveTextContent('March 1980');
	});

	test('multiple select default Value', async () => {
		const day1 = new CalendarDate(1980, 1, 2);
		const day2 = new CalendarDate(1980, 1, 5);

		const { calendar } = setupMulti({
			defaultValue: [day1, day2],
		});

		const selectedDays = calendar.querySelectorAll('[data-selected]');
		expect(selectedDays).toHaveLength(2);

		expect(selectedDays[0]).toHaveTextContent(String(day1.day));
		expect(selectedDays[1]).toHaveTextContent(String(day2.day));
	});

	test('multiple select controlled value', async () => {
		const day1 = new CalendarDate(1980, 1, 2);
		const day2 = new CalendarDate(1980, 1, 5);
		const value = writable([day1, day2]);
		const { getByTestId, container } = setupMulti({
			value,
		});

		const calendar = getByTestId('calendar');
		expect(calendar).toBeVisible();

		const selectedDays = container.querySelectorAll('[data-selected]');
		expect(selectedDays).toHaveLength(2);

		expect(selectedDays[0]).toHaveTextContent(String(day1.day));
		expect(selectedDays[1]).toHaveTextContent(String(day2.day));
	});

	test('multiple select - prevent deselect false (default)', async () => {
		const day1 = new CalendarDate(1980, 1, 2);
		const day2 = new CalendarDate(1980, 1, 5);

		const { calendar, user } = setupMulti({
			defaultValue: [day1, day2],
		});

		const selectedDays = calendar.querySelectorAll('[data-selected]');
		expect(selectedDays).toHaveLength(2);

		expect(selectedDays[0]).toHaveTextContent(String(day1.day));
		expect(selectedDays[1]).toHaveTextContent(String(day2.day));

		await user.click(selectedDays[0]);
		const selectedDaysAfterClick = calendar.querySelectorAll('[data-selected]');
		expect(selectedDaysAfterClick).toHaveLength(1);
		expect(selectedDaysAfterClick[0]).toHaveTextContent(String(day2.day));
	});

	test('multiple select -  prevent deselect true', async () => {
		const day1 = new CalendarDate(1980, 1, 2);
		const day2 = new CalendarDate(1980, 1, 5);

		const { calendar, user } = setupMulti({
			defaultValue: [day1, day2],
			preventDeselect: true,
		});

		const selectedDays = calendar.querySelectorAll('[data-selected]');
		expect(selectedDays).toHaveLength(2);

		expect(selectedDays[0]).toHaveTextContent(String(day1.day));
		expect(selectedDays[1]).toHaveTextContent(String(day2.day));

		await user.click(selectedDays[0]);
		const selectedDaysAfterClick = calendar.querySelectorAll('[data-selected]');
		expect(selectedDaysAfterClick).toHaveLength(2);
		expect(selectedDaysAfterClick[0]).toHaveTextContent(String(day1.day));
		expect(selectedDaysAfterClick[1]).toHaveTextContent(String(day2.day));
	});

	test('multiple select - allow deselect', async () => {
		const day1 = new CalendarDate(1980, 1, 2);
		const day2 = new CalendarDate(1980, 1, 5);

		const { calendar } = setupMulti({
			defaultValue: [day1, day2],
		});

		const selectedDays = calendar.querySelectorAll('[data-selected]');
		expect(selectedDays).toHaveLength(2);
	});

	test('overridable with multiple', async () => {
		const day1 = new CalendarDate(1980, 1, 10);
		const { getByTestId, calendar, user } = setupMulti({
			defaultValue: [day1],
			onValueChange: ({ curr, next }) => {
				if (next && next.length > 2) {
					return curr;
				} else {
					return next;
				}
			},
		});

		const selectedDays = calendar.querySelectorAll('[data-selected]');
		expect(selectedDays).toHaveLength(1);

		const thirdDayInMonth = getByTestId('month-1-date-3');

		await user.click(thirdDayInMonth);

		const selectedDaysAfterClick = calendar.querySelectorAll('[data-selected]');
		expect(selectedDaysAfterClick).toHaveLength(2);

		const fifthDayInMonth = getByTestId('month-1-date-5');

		await user.click(fifthDayInMonth);

		const selectedDaysAfterClick2 =
			calendar.querySelectorAll('[data-selected]');
		expect(selectedDaysAfterClick2).toHaveLength(2);
	});

	test('overridable with single', async () => {
		const overrideDay = new CalendarDate(1980, 1, 25);

		const { getByTestId, calendar, user } = setup({
			defaultValue: calendarDate,
			onValueChange: () => {
				return overrideDay;
			},
		});

		const selectedDay = calendar.querySelector('[data-selected]');
		expect(selectedDay).toHaveTextContent(String(calendarDate.day));

		const thirdDayInMonth = getByTestId('month-1-date-3');
		await user.click(thirdDayInMonth);

		const selectedDayAfterClick = calendar.querySelector('[data-selected]');
		expect(selectedDayAfterClick).toHaveTextContent(String(overrideDay.day));
	});

	test('unavailable dates behavior', async () => {
		const { getByTestId, user } = setup({
			defaultPlaceholder: calendarDate,
			isDateUnavailable: (date) => {
				return date.day === 3;
			},
		});

		const thirdDayInMonth = getByTestId('month-1-date-3');
		expect(thirdDayInMonth).toHaveAttribute('data-unavailable');
		expect(thirdDayInMonth).toHaveAttribute('aria-disabled', 'true');
		await user.click(thirdDayInMonth);
		expect(thirdDayInMonth).not.toHaveAttribute('data-selected');
	});

	test('disabled prop prevents calendar focus & interaction', async () => {
		const { getByTestId, user } = setup({
			defaultPlaceholder: calendarDate,
			disabled: true,
		});

		const grid = getByTestId('grid-0');
		expect(grid).toHaveAttribute('aria-disabled', 'true');
		expect(grid).toHaveAttribute('data-disabled');

		const firstDayOfMonth = getByTestId('month-1-date-1');
		await user.click(firstDayOfMonth);
		expect(firstDayOfMonth).not.toHaveFocus();
	});

	test('readonly prop prevents selecting dates but allows focus', async () => {
		const { getByTestId, user } = setup({
			defaultPlaceholder: calendarDate,
			readonly: true,
		});

		const grid = getByTestId('grid-0');
		expect(grid).toHaveAttribute('aria-readonly', 'true');
		expect(grid).toHaveAttribute('data-readonly');

		const firstDayOfMonth = getByTestId('month-1-date-1');
		await user.click(firstDayOfMonth);
		expect(firstDayOfMonth).toHaveFocus();
		expect(firstDayOfMonth).not.toHaveAttribute('data-selected');
	});

	test('weekdayFormat prop - `"narrow"` (default)', async () => {
		const { getByTestId } = setup();

		for (const [i, weekday] of narrowWeekdays.entries()) {
			const weekdayElement = getByTestId(`weekday-${i}`);
			expect(weekdayElement).toHaveTextContent(weekday);
		}
	});

	test('weekdayFormat prop - `"short"`', async () => {
		const { getByTestId } = setup({
			weekdayFormat: 'short',
		});

		for (const [i, weekday] of shortWeekdays.entries()) {
			const weekdayElement = getByTestId(`weekday-${i}`);
			expect(weekdayElement).toHaveTextContent(weekday);
		}
	});

	test('weekdayFormat prop - `"long"`', async () => {
		const { getByTestId } = setup({
			weekdayFormat: 'long',
		});

		for (const [i, weekday] of longWeekdays.entries()) {
			const weekdayElement = getByTestId(`weekday-${i}`);
			expect(weekdayElement).toHaveTextContent(weekday);
		}
	});

	test('dynamically change weekdayFormat option', async () => {
		const { getByTestId, user } = setup();

		for (const [i, weekday] of narrowWeekdays.entries()) {
			const weekdayElement = getByTestId(`weekday-${i}`);
			expect(weekdayElement).toHaveTextContent(weekday);
		}

		const cycleButton = getByTestId('cycle-weekday-format');
		await user.click(cycleButton);

		for (const [i, weekday] of shortWeekdays.entries()) {
			const weekdayElement = getByTestId(`weekday-${i}`);
			expect(weekdayElement).toHaveTextContent(weekday);
		}

		await user.click(cycleButton);

		for (const [i, weekday] of longWeekdays.entries()) {
			const weekdayElement = getByTestId(`weekday-${i}`);
			expect(weekdayElement).toHaveTextContent(weekday);
		}
	});

	test('dynamically change numberOfMonths option', async () => {
		const { queryByTestId, getByTestId, user } = setup();

		let grid0 = queryByTestId('grid-0');
		let grid1 = queryByTestId('grid-1');
		expect(grid0).toBeInTheDocument();
		expect(grid1).toBeNull();

		const numberOfMonthsButton = getByTestId('numberOfMonths');
		await user.click(numberOfMonthsButton);

		grid0 = queryByTestId('grid-0');
		grid1 = queryByTestId('grid-1');
		expect(grid0).toBeInTheDocument();
		expect(grid1).toBeInTheDocument();
	});

	test('dynamically change weekStartsOn option', async () => {
		const { getByTestId, user } = setup();

		const weekDaysCopy = [...narrowWeekdays];

		let weekdayElement = getByTestId(`weekdays`);

		for (let i = 0; i < weekDaysCopy.length; i++) {
			expect(weekdayElement.children[i]).toHaveTextContent(weekDaysCopy[i]);
		}

		const weekStartsOnButton = getByTestId('weekStartsOn');
		await user.click(weekStartsOnButton);
		const first = weekDaysCopy.shift();
		if (first) {
			weekDaysCopy.push(first);
		}

		weekdayElement = getByTestId(`weekdays`);
		for (let i = 0; i < weekDaysCopy.length; i++) {
			expect(weekdayElement.children[i]).toHaveTextContent(weekDaysCopy[i]);
		}
	});

	test('dynamically change fixedWeeks option', async () => {
		const { getByTestId, queryByTestId, user } = setup();

		const nextButton = getByTestId('next-button');

		while (queryByTestId('week-6') !== null) {
			await user.click(nextButton);
		}

		const fixedWeeksButton = getByTestId('fixedWeeks');
		await user.click(fixedWeeksButton);

		expect(queryByTestId('week-6')).not.toBeNull();
	});

	test('dynamically changing the locale option also update weekStartsOn', async () => {
		const { getByTestId, user } = setup();

		let weekdayElement = getByTestId(`weekday-0`);
		expect(weekdayElement).toHaveTextContent('S');

		const localeButton = getByTestId('locale');
		await user.click(localeButton);
		weekdayElement = getByTestId(`weekday-0`);
		// L is italian for Lunedì which is Monday (which is different from S which is Sunday)
		expect(weekdayElement).toHaveTextContent('L');
	});

	test('custom ids are applied when provided', async () => {
		const ids = {
			accessibleHeading: 'id-heading',
			calendar: 'id-calendar',
		};

		const { container, calendar } = setup({
			ids,
		});

		const heading = container.querySelector(`#${ids.accessibleHeading}`);
		expect(heading).toBeInTheDocument();
		expect(calendar.id).toBe(ids.calendar);
	});
});
