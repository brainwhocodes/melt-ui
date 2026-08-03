import { fireEvent, render, waitFor } from '@testing-library/svelte';
import { userEvent } from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { describe, expect, it, vi } from 'vitest';
import ColorPickerTest from './ColorPickerTest.svelte';

function setup(props: Record<string, unknown> = {}) {
	const user = userEvent.setup();
	return { ...render(ColorPickerTest, props), user };
}

function setRect(element: HTMLElement, width = 100, height = 100) {
	vi.spyOn(element, 'getBoundingClientRect').mockReturnValue({
		left: 0,
		top: 0,
		width,
		height,
		right: width,
		bottom: height,
		x: 0,
		y: 0,
		toJSON: () => ({}),
	});
}

function dispatchPointer(
	element: HTMLElement,
	type: 'pointerdown' | 'pointermove' | 'pointerup' | 'pointercancel',
	init: {
		pointerId: number;
		clientX: number;
		clientY?: number;
		button?: number;
	},
) {
	const event = new Event(type, { bubbles: true, cancelable: true });
	for (const [key, value] of Object.entries(init)) {
		Object.defineProperty(event, key, { configurable: true, value });
	}
	element.dispatchEvent(event);
}

describe('Color Picker', () => {
	it('has no accessibility violations and exposes all default controls', async () => {
		const { container, getByTestId } = setup();
		expect(await axe(container)).toHaveNoViolations();
		expect(getByTestId('area-x')).toHaveAttribute('type', 'range');
		expect(getByTestId('area-y')).toHaveAttribute('type', 'range');
		expect(getByTestId('hue')).toHaveAttribute('type', 'range');
		expect(getByTestId('alpha')).toHaveAttribute('type', 'range');
		expect(getByTestId('channel-hex')).toHaveValue('000000');
		expect(getByTestId('hidden')).toHaveValue('#000000FF');
	});

	it('updates area, hue, and alpha by pointer and commits once per interaction', async () => {
		const onValueCommitted = vi.fn();
		const { getByTestId } = setup({
			defaultValue: { hue: 0, saturation: 0, value: 100, alpha: 1 },
			onValueCommitted,
		});
		const area = getByTestId('area');
		const hue = getByTestId('hue-track');
		const alpha = getByTestId('alpha-track');
		setRect(area);
		setRect(hue);
		setRect(alpha);

		dispatchPointer(area, 'pointerdown', {
			pointerId: 1,
			button: 0,
			clientX: 50,
			clientY: 50,
		});
		await waitFor(() =>
			expect(getByTestId('active')).toHaveTextContent('area'),
		);
		dispatchPointer(area, 'pointermove', {
			pointerId: 1,
			clientX: 75,
			clientY: 25,
		});
		dispatchPointer(area, 'pointerup', {
			pointerId: 1,
			clientX: 75,
			clientY: 25,
		});
		await waitFor(() =>
			expect(getByTestId('value')).toHaveTextContent('0,75,75,1'),
		);
		expect(onValueCommitted).toHaveBeenCalledTimes(1);

		dispatchPointer(hue, 'pointerdown', {
			pointerId: 2,
			button: 0,
			clientX: 25,
		});
		dispatchPointer(hue, 'pointerup', { pointerId: 2, clientX: 25 });
		dispatchPointer(alpha, 'pointerdown', {
			pointerId: 3,
			button: 0,
			clientX: 50,
		});
		dispatchPointer(alpha, 'pointercancel', { pointerId: 3, clientX: 50 });
		expect(onValueCommitted).toHaveBeenCalledTimes(3);
	});

	it('supports format switching, channel editing, and stable serialization', async () => {
		const { user, getByTestId } = setup({
			defaultValue: { hue: 0, saturation: 100, value: 100, alpha: 0.5 },
			name: 'color',
		});
		await user.selectOptions(getByTestId('format-select'), 'rgb');
		expect(getByTestId('format')).toHaveTextContent('rgb');
		expect(getByTestId('channel-red')).toHaveValue(255);
		await user.clear(getByTestId('channel-red'));
		await user.type(getByTestId('channel-red'), '128');
		expect(getByTestId('value')).toHaveTextContent(
			'0,100,50.19607843137255,0.5',
		);
		await user.tab();
		await user.selectOptions(getByTestId('format-select'), 'hsl');
		expect(getByTestId('channel-hue')).toBeInTheDocument();
		expect(getByTestId('channel-lightness')).toBeInTheDocument();

		const hslView = setup({
			defaultFormat: 'hsl',
			defaultValue: { hue: 0, saturation: 50, value: 100, alpha: 1 },
		});
		const hslSaturation = hslView
			.getAllByTestId('channel-saturation')
			.at(-1)! as HTMLInputElement;
		expect(hslSaturation).toHaveValue(100);
		hslSaturation.focus();
		hslSaturation.value = '50';
		fireEvent.input(hslSaturation);
		hslSaturation.blur();
		expect(hslView.getAllByTestId('channel-saturation').at(-1)).toHaveValue(50);
	});

	it('uses keyboard ranges, moves between color axes, and blocks readonly mutations', async () => {
		const { user, getByTestId } = setup({
			defaultValue: { hue: 10, saturation: 50, value: 50, alpha: 0.5 },
		});
		getByTestId('hue').focus();
		await user.keyboard('{Shift>}{ArrowRight}{/Shift}');
		expect(getByTestId('value')).toHaveTextContent('20,50,50,0.5');
		await user.keyboard('{End}');
		expect(getByTestId('value')).toHaveTextContent('360,50,50,0.5');

		getByTestId('area-x').focus();
		await user.keyboard('{ArrowUp}');
		expect(getByTestId('value')).toHaveTextContent('360,50,51,0.5');
		expect(getByTestId('area-y')).toHaveFocus();
		await user.keyboard('{ArrowRight}');
		expect(getByTestId('value')).toHaveTextContent('360,51,51,0.5');
		expect(getByTestId('area-x')).toHaveFocus();
		const readonlyView = setup({
			readonly: true,
			defaultValue: { hue: 10, saturation: 50, value: 50, alpha: 0.5 },
		});
		const readonlyRanges = [
			['area-x', '{ArrowRight}'],
			['area-y', '{ArrowUp}'],
			['hue', '{ArrowRight}'],
			['alpha', '{ArrowRight}'],
			['area-x', '{PageDown}'],
			['hue', '{PageUp}'],
			['alpha', '{PageDown}'],
		] as const;
		for (const [testId, key] of readonlyRanges) {
			const range = readonlyView
				.getAllByTestId(testId)
				.at(-1) as HTMLInputElement;
			const before = range.value;
			range.focus();
			await readonlyView.user.keyboard(key);
			expect(range.value).toBe(before);
		}
		const readonlyHue = readonlyView
			.getAllByTestId('hue')
			.at(-1) as HTMLInputElement;
		readonlyHue.value = '200';
		fireEvent.input(readonlyHue);
		expect(readonlyHue.value).toBe('10');
		expect(readonlyView.getAllByTestId('value').at(-1)).toHaveTextContent(
			'10,50,50,0.5',
		);
	});

	it('supports Page keys and vertical track orientation', async () => {
		const { user, getByTestId } = setup({
			defaultValue: { hue: 10, saturation: 50, value: 50, alpha: 0.5 },
		});
		getByTestId('area-x').focus();
		await user.keyboard('{PageDown}');
		expect(getByTestId('value')).toHaveTextContent('10,40,50,0.5');
		getByTestId('hue').focus();
		await user.keyboard('{PageUp}');
		expect(getByTestId('value')).toHaveTextContent('20,40,50,0.5');

		const vertical = setup({
			orientation: 'vertical',
			defaultValue: { hue: 0, saturation: 0, value: 100, alpha: 1 },
		});
		const hueTrack = vertical.getAllByTestId('hue-track').at(-1)!;
		setRect(hueTrack, 20, 100);
		expect(
			vertical.getAllByTestId('hue').at(-1)!.getAttribute('aria-orientation'),
		).toBe('vertical');
		expect(
			vertical.getAllByTestId('hue-thumb').at(-1)!.getAttribute('style'),
		).toContain('inset-block-start');
		dispatchPointer(hueTrack, 'pointerdown', {
			pointerId: 9,
			button: 0,
			clientX: 10,
			clientY: 75,
		});
		dispatchPointer(hueTrack, 'pointerup', {
			pointerId: 9,
			clientX: 10,
			clientY: 75,
		});
		await waitFor(() =>
			expect(vertical.getAllByTestId('value').at(-1)).toHaveTextContent(
				'90,0,100,1',
			),
		);
	});

	it('exposes OKLCH channels and simultaneous format override rows', async () => {
		const { user, getByTestId } = setup({
			defaultValue: { hue: 0, saturation: 0, value: 0, alpha: 1 },
		});
		const colorField = getByTestId('color-input');
		await user.click(colorField);
		expect(colorField).toHaveFocus();
		await user.clear(colorField);
		await user.keyboard('rgb(248 79 204)');
		await user.selectOptions(getByTestId('format-select'), 'oklch');
		expect(getByTestId('channel-lightness')).toHaveValue('70.0');
		expect(getByTestId('channel-chroma')).toHaveValue('0.239');
		expect(getByTestId('channel-hue')).toHaveValue('340.0');
		expect(getByTestId('override-oklch-lightness')).toHaveValue('70.0');
		expect(getByTestId('override-hsl-lightness')).toHaveValue(64);

		const chroma = getByTestId('channel-chroma') as HTMLInputElement;
		const before = getByTestId('value').textContent;
		await user.click(chroma);
		await user.clear(chroma);
		await user.type(chroma, '0.1');
		expect(chroma).toHaveValue('0.1');
		expect(getByTestId('value').textContent).not.toBe(before);
		expect(getByTestId('channel-lightness')).toHaveValue('70.0');
	});

	it('parses the combined color input and recovers invalid text', async () => {
		const { user, getByTestId } = setup({
			defaultValue: { hue: 0, saturation: 0, value: 0, alpha: 1 },
		});
		const colorField = getByTestId('color-input') as HTMLInputElement;
		expect(colorField).toHaveValue('000000FF');
		await user.click(colorField);
		await user.clear(colorField);
		await user.keyboard('#00FF80');
		expect(getByTestId('value')).toHaveTextContent(/^150\.117.*,100,100,1$/);
		await user.clear(colorField);
		await user.keyboard('not a color');
		expect(colorField.dataset.invalid).toBe('true');
		await user.keyboard('{Escape}');
		expect(colorField.dataset.invalid).toBeUndefined();
		expect(colorField).toHaveValue('00FF80FF');

		await user.selectOptions(getByTestId('format-select'), 'oklch');
		await user.click(colorField);
		await user.clear(colorField);
		await user.keyboard('oklch(70% 0.24 340 / 50%)');
		expect(getByTestId('value')).toHaveTextContent(/,0.5$/);
		expect(getByTestId('channel-chroma')).toHaveValue('0.240');
	});

	it('keeps the focused draft and session alpha while typing shorthand hex', async () => {
		const { user, getByTestId } = setup({
			defaultValue: { hue: 0, saturation: 0, value: 0, alpha: 1 },
		});
		const colorField = getByTestId('color-input') as HTMLInputElement;
		await user.click(colorField);
		await user.clear(colorField);
		await user.keyboard('100E18');
		expect(colorField).toHaveValue('100E18');
		expect(getByTestId('value')).toHaveTextContent(/^252,.+,1$/);
		await user.tab();
		expect(colorField).toHaveValue('100E18FF');
		expect(getByTestId('hidden')).toHaveValue('#100E18FF');
	});

	it('copies serialized colors and restores the previous color', async () => {
		const onValueCommitted = vi.fn();
		const { user, getByTestId } = setup({
			defaultValue: { hue: 0, saturation: 100, value: 100, alpha: 1 },
			onValueCommitted,
		});
		const writeText = vi.spyOn(window.navigator.clipboard, 'writeText');
		expect(getByTestId('previous')).toHaveTextContent('0,100,100,1');
		getByTestId('hue').focus();
		await user.keyboard('{ArrowRight}');
		expect(getByTestId('value')).toHaveTextContent('1,100,100,1');

		fireEvent.click(getByTestId('copy-rgb'));
		expect(writeText).toHaveBeenCalledWith('rgb(255 4 0)');
		writeText.mockClear();
		fireEvent.click(getByTestId('copy-active'));
		expect(writeText).toHaveBeenCalledWith('#FF0400');

		fireEvent.click(getByTestId('previous-swatch'));
		await waitFor(() =>
			expect(getByTestId('value')).toHaveTextContent('0,100,100,1'),
		);
		expect(onValueCommitted).toHaveBeenCalledTimes(1);
	});

	it('applies eyedropper results when the API is available', async () => {
		class EyeDropperMock {
			open() {
				return Promise.resolve({ sRGBHex: '#123456' });
			}
		}
		Object.defineProperty(window, 'EyeDropper', {
			value: EyeDropperMock,
			configurable: true,
		});
		const onValueCommitted = vi.fn();
		const { user, getByTestId } = setup({
			defaultValue: { hue: 0, saturation: 0, value: 0, alpha: 0.5 },
			onValueCommitted,
		});
		fireEvent.click(getByTestId('eyedropper'));
		await waitFor(() =>
			expect(getByTestId('value')).toHaveTextContent(/^210,.+,0.5$/),
		);
		expect(getByTestId('hidden')).toHaveValue('#12345680');
		expect(onValueCommitted).toHaveBeenCalledTimes(1);
		delete (window as { EyeDropper?: unknown }).EyeDropper;
	});
});
