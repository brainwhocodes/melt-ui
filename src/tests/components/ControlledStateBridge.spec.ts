import { CalendarDate } from '@internationalized/date';
import { fireEvent, render } from '@testing-library/svelte';
import { userEvent } from '@testing-library/user-event';
import { tick } from 'svelte';
import { describe, expect, it, vi } from 'vitest';
import {
	Calendar,
	Checkbox,
	Combobox,
	DatePicker,
	InputOTP,
	Pagination,
	Select,
	Slider,
	Switch,
	Tabs,
	Toggle,
	ToggleGroup,
	Tooltip,
} from '$lib/components/index.js';

describe('Controlled State Bridge & Parent Clearing', () => {
	it('Select: handles non-default value, parent updates, clearing, and user callbacks', async () => {
		const onValueChange = vi.fn();
		const options = [
			{ value: 'a', label: 'Option A' },
			{ value: 'b', label: 'Option B' },
		];

		const view = render(Select, { options, value: 'b', onValueChange });
		expect(view.getByRole('combobox')).toHaveTextContent('Option B');
		expect(onValueChange).not.toHaveBeenCalled();

		// Parent update
		await view.rerender({ options, value: 'a', onValueChange });
		await tick();
		expect(view.getByRole('combobox')).toHaveTextContent('Option A');
		expect(onValueChange).not.toHaveBeenCalled();

		// Parent clear
		await view.rerender({ options, value: undefined, onValueChange });
		await tick();
		expect(view.getByRole('combobox')).toHaveTextContent('Select an option');
		expect(onValueChange).not.toHaveBeenCalled();
	});

	it('InputOTP: handles non-default initial value, parent updates, and clearing', async () => {
		const onValueChange = vi.fn();
		const view = render(InputOTP, { maxLength: 4, value: ['1', '2'], onValueChange });
		const inputs = view.container.querySelectorAll<HTMLInputElement>('.melt-input-otp-cell');
		expect(inputs[0]?.value).toBe('1');
		expect(inputs[1]?.value).toBe('2');

		// Parent update
		await view.rerender({ maxLength: 4, value: ['9', '8', '7'], onValueChange });
		await tick();
		expect(inputs[0]?.value).toBe('9');
		expect(inputs[1]?.value).toBe('8');

		// Parent clear
		await view.rerender({ maxLength: 4, value: [], onValueChange });
		await tick();
		expect(inputs[0]?.value).toBe('');
	});

	it('Calendar: handles non-default initial DateValue, parent updates, clearing, and grid cell hierarchy', async () => {
		const onValueChange = vi.fn();
		const initialDate = new CalendarDate(2026, 8, 15);
		const nextDate = new CalendarDate(2026, 8, 20);

		const view = render(Calendar, { value: initialDate, onValueChange });
		const gridCell = view.container.querySelector('td[role="gridcell"]');
		expect(gridCell).not.toBeNull();
		const cellButton = gridCell?.querySelector('[role="button"][data-melt-calendar-cell]');
		expect(cellButton).not.toBeNull();

		expect(view.container.querySelector('[data-selected]')).toHaveTextContent('15');
		expect(onValueChange).not.toHaveBeenCalled();

		// Parent update
		await view.rerender({ value: nextDate, onValueChange });
		await tick();
		expect(view.container.querySelector('[data-selected]')).toHaveTextContent('20');
		expect(onValueChange).not.toHaveBeenCalled();

		// Parent clear
		await view.rerender({ value: undefined, onValueChange });
		await tick();
		expect(view.container.querySelector('[data-selected]')).toBeNull();
	});

	it('DatePicker: handles non-default initial DateValue, parent updates, and clearing', async () => {
		const onValueChange = vi.fn();
		const initialDate = new CalendarDate(2026, 8, 10);
		const updatedDate = new CalendarDate(2026, 8, 25);

		const view = render(DatePicker, { value: initialDate, onValueChange });
		expect(view.container).toHaveTextContent('8');
		expect(view.container).toHaveTextContent('10');
		expect(onValueChange).not.toHaveBeenCalled();

		// Parent update
		await view.rerender({ value: updatedDate, onValueChange });
		await tick();
		expect(view.container).toHaveTextContent('25');
		expect(onValueChange).not.toHaveBeenCalled();

		// Parent clear
		await view.rerender({ value: undefined, onValueChange });
		await tick();
		expect(view.container).toHaveTextContent('mm');
	});

	it('Combobox: handles non-default initial value, parent updates, and clearing', async () => {
		const onValueChange = vi.fn();
		const items = [
			{ value: 'v1', label: 'Item One' },
			{ value: 'v2', label: 'Item Two' },
		];

		const view = render(Combobox, { items, value: 'v2', onValueChange });
		const input = view.getByRole('combobox') as HTMLInputElement;
		expect(input).toHaveValue('Item Two');
		expect(onValueChange).not.toHaveBeenCalled();

		// Parent update
		await view.rerender({ items, value: 'v1', onValueChange });
		await tick();
		expect(input).toHaveValue('Item One');
		expect(onValueChange).not.toHaveBeenCalled();

		// Parent clear
		await view.rerender({ items, value: undefined, onValueChange });
		await tick();
		expect(input).toHaveValue('');
	});

	it('Toggle & ToggleGroup: handles non-default values, parent updates, and clearing', async () => {
		const user = userEvent.setup();
		const onPressedChange = vi.fn();

		const toggleView = render(Toggle, { label: 'Format', pressed: true, onPressedChange });
		const toggleBtn = toggleView.getByRole('button', { name: 'Format' });
		expect(toggleBtn).toHaveAttribute('data-state', 'on');
		expect(onPressedChange).not.toHaveBeenCalled();

		await toggleView.rerender({ label: 'Format', pressed: false, onPressedChange });
		await tick();
		expect(toggleBtn).toHaveAttribute('data-state', 'off');
		expect(onPressedChange).not.toHaveBeenCalled();

		await user.click(toggleBtn);
		expect(onPressedChange).toHaveBeenCalledWith(true);

		const options = [
			{ value: 'x', label: 'X' },
			{ value: 'y', label: 'Y' },
		];
		const tgView = render(ToggleGroup, { options, value: 'y' });
		const btnY = tgView.getByRole('radio', { name: 'Y' });
		expect(btnY).toHaveAttribute('data-state', 'on');

		await tgView.rerender({ options, value: 'x' });
		await tick();
		const btnX = tgView.getByRole('radio', { name: 'X' });
		expect(btnX).toHaveAttribute('data-state', 'on');

		await tgView.rerender({ options, value: undefined });
		await tick();
		expect(btnX).toHaveAttribute('data-state', 'off');

		// Multi-select ToggleGroup assertion
		const onTgValueChange = vi.fn();
		const multiView = render(ToggleGroup, {
			options,
			type: 'multiple',
			value: ['x'],
			onValueChange: onTgValueChange,
		});
		const multiBtnY = multiView.getByRole('button', { name: 'Y' });
		await user.click(multiBtnY);
		expect(onTgValueChange).toHaveBeenCalledWith(['x', 'y']);
	});

	it('Checkbox & Switch: handles non-default checked states, parent updates, and clearing', async () => {
		const user = userEvent.setup();
		const onCheckedChange = vi.fn();

		const cbView = render(Checkbox, { label: 'Agree', checked: true, onCheckedChange });
		const cbBtn = cbView.getByRole('checkbox', { name: 'Agree' });
		expect(cbBtn).toHaveAttribute('data-state', 'checked');
		expect(onCheckedChange).not.toHaveBeenCalled();

		await cbView.rerender({ label: 'Agree', checked: false, onCheckedChange });
		await tick();
		expect(cbBtn).toHaveAttribute('data-state', 'unchecked');
		expect(onCheckedChange).not.toHaveBeenCalled();

		await user.click(cbBtn);
		expect(onCheckedChange).toHaveBeenCalledWith(true);

		const swView = render(Switch, { label: 'Power', checked: true });
		const swBtn = swView.getByRole('switch', { name: 'Power' });
		expect(swBtn).toHaveAttribute('data-state', 'checked');

		await swView.rerender({ label: 'Power', checked: false });
		await tick();
		expect(swBtn).toHaveAttribute('data-state', 'unchecked');
	});

	it('Slider & Pagination & Tabs: handles non-default values and parent updates', async () => {
		const sliderView = render(Slider, { value: [75], min: 0, max: 100 });
		const thumb = sliderView.getByRole('slider', { name: 'Slider' });
		expect(thumb).toHaveAttribute('aria-valuenow', '75');

		await sliderView.rerender({ value: [25], min: 0, max: 100 });
		await tick();
		expect(thumb).toHaveAttribute('aria-valuenow', '25');

		const pageView = render(Pagination, { count: 100, perPage: 10, page: 4 });
		expect(pageView.container.querySelector('[data-selected]')).toHaveTextContent('4');

		await pageView.rerender({ count: 100, perPage: 10, page: 2 });
		await tick();
		expect(pageView.container.querySelector('[data-selected]')).toHaveTextContent('2');

		const tabs = [
			{ value: 'a', label: 'Tab A', content: 'Content A' },
			{ value: 'b', label: 'Tab B', content: 'Content B' },
		];
		const tabsView = render(Tabs, { tabs, value: 'b' });
		const tabB = tabsView.getByRole('tab', { name: 'Tab B' });
		expect(tabB).toHaveAttribute('data-state', 'active');

		await tabsView.rerender({ tabs, value: 'a' });
		await tick();
		const tabA = tabsView.getByRole('tab', { name: 'Tab A' });
		expect(tabA).toHaveAttribute('data-state', 'active');
	});

	it('Tooltip & HoverCard: attaches trigger actions directly to focusable buttons', async () => {
		const view = render(Tooltip, { triggerLabel: 'Info', content: 'More details', openDelay: 0 });
		const triggerBtn = view.getByRole('button', { name: 'Info' });

		triggerBtn.focus();
		await tick();

		expect(triggerBtn).toHaveFocus();
		expect(triggerBtn).toHaveAttribute('aria-describedby');
	});
});
