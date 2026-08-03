import { render } from '@testing-library/svelte';
import { userEvent } from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { describe, expect, it } from 'vitest';
import AlignmentPickerTest from './AlignmentPickerTest.svelte';

const values = [
	'top-start',
	'top-center',
	'top-end',
	'center-start',
	'center',
	'center-end',
	'bottom-start',
	'bottom-center',
	'bottom-end',
] as const;

function setup(props: Record<string, unknown> = {}) {
	const user = userEvent.setup();
	return { ...render(AlignmentPickerTest, props), user };
}

describe('Alignment Picker', () => {
	it('has no accessibility violations', async () => {
		const { container } = setup();
		expect(await axe(container)).toHaveNoViolations();
	});

	it('selects by click and serializes the value', async () => {
		const { user, getByTestId } = setup({ name: 'alignment' });
		await user.click(getByTestId('bottom-end'));
		expect(getByTestId('value')).toHaveTextContent('bottom-end');
		expect(getByTestId('input')).toHaveValue('bottom-end');
	});

	it('moves spatially and wraps around rows and columns', async () => {
		const { user, getByTestId } = setup();
		const center = getByTestId('center');
		await user.click(center);
		await user.keyboard('{ArrowLeft}');
		expect(getByTestId('center-start')).toHaveFocus();
		await user.keyboard('{ArrowUp}');
		expect(getByTestId('top-start')).toHaveFocus();
		await user.keyboard('{ArrowRight}');
		expect(getByTestId('top-center')).toHaveFocus();
		await user.keyboard('{ArrowDown}');
		expect(getByTestId('center')).toHaveFocus();
	});

	it('supports Home and End and skips missing or disabled cells', async () => {
		const { user, getByTestId } = setup({
			items: values
				.filter((value) => value !== 'center-start')
				.map((value) => ({ value, disabled: value === 'top-center' })),
		});
		const start = getByTestId('top-start');
		await user.click(start);
		await user.keyboard('{ArrowRight}');
		expect(getByTestId('top-end')).toHaveFocus();
		await user.keyboard('{End}');
		expect(getByTestId('bottom-end')).toHaveFocus();
		await user.keyboard('{Home}');
		expect(getByTestId('top-start')).toHaveFocus();
	});

	it('reverses horizontal movement in RTL and can disable looping', async () => {
		const { user, getByTestId } = setup({ dir: 'rtl', loop: false });
		await user.click(getByTestId('top-center'));
		await user.keyboard('{ArrowLeft}');
		expect(getByTestId('top-end')).toHaveFocus();
		await user.keyboard('{ArrowUp}');
		expect(getByTestId('top-end')).toHaveFocus();
	});

	it('applies whole-control disablement', async () => {
		const { user, getByTestId } = setup({ disabled: true, name: 'alignment' });
		const button = getByTestId('center');
		expect(button).toBeDisabled();
		await user.click(button);
		expect(getByTestId('value')).toHaveTextContent('center');
		expect(getByTestId('input')).toBeDisabled();
	});
});
