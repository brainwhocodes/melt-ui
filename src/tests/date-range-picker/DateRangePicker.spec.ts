import { get, type Writable } from 'svelte/store';
import { describe } from 'vitest';
import { createDateRangePicker } from '$lib/index.js';

describe('DateRangePicker', () => {
	test('exposes complete Calendar defaults as required writable options', () => {
		const picker = createDateRangePicker();
		const numberOfMonths: Writable<number> = picker.options.numberOfMonths;

		expect(get(numberOfMonths)).toBe(1);
		expect(get(picker.options.preventDeselect)).toBe(false);
		expect(get(picker.options.pagedNavigation)).toBe(false);
		expect(get(picker.options.weekStartsOn)).toBe(0);
		expect(get(picker.options.fixedWeeks)).toBe(false);
		expect(get(picker.options.calendarLabel)).toBe('Event Date');
	});

	test('keeps omitted Calendar option stores isolated between instances', () => {
		const first = createDateRangePicker();
		const second = createDateRangePicker();

		expect(first.options.numberOfMonths).not.toBe(
			second.options.numberOfMonths,
		);
		first.options.numberOfMonths.set(2);
		first.options.fixedWeeks.set(true);
		first.options.weekStartsOn.set(1);

		expect(get(first.options.numberOfMonths)).toBe(2);
		expect(get(first.states.months)).toHaveLength(2);
		expect(get(second.options.numberOfMonths)).toBe(1);
		expect(get(second.options.fixedWeeks)).toBe(false);
		expect(get(second.options.weekStartsOn)).toBe(0);
	});

	test('retains explicit Calendar option values', () => {
		const picker = createDateRangePicker({
			numberOfMonths: 3,
			preventDeselect: true,
			pagedNavigation: true,
			weekStartsOn: 2,
			fixedWeeks: true,
			calendarLabel: 'Travel dates',
		});

		expect(get(picker.options.numberOfMonths)).toBe(3);
		expect(get(picker.states.months)).toHaveLength(3);
		expect(get(picker.options.preventDeselect)).toBe(true);
		expect(get(picker.options.pagedNavigation)).toBe(true);
		expect(get(picker.options.weekStartsOn)).toBe(2);
		expect(get(picker.options.fixedWeeks)).toBe(true);
		expect(get(picker.options.calendarLabel)).toBe('Travel dates');
	});
});
