import { fireEvent } from '@testing-library/svelte';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { useInteractOutside } from '$lib/internal/actions/interact-outside/index.js';

describe('useInteractOutside', () => {
	afterEach(() => {
		document.body.replaceChildren();
		vi.useRealTimers();
	});

	test('restores the previous layer after destroying the top layer', async () => {
		vi.useFakeTimers();

		const firstLayer = document.createElement('div');
		const secondLayer = document.createElement('div');
		const outside = document.createElement('button');
		document.body.append(firstLayer, secondLayer, outside);

		const firstOutside = vi.fn();
		const secondOutside = vi.fn();
		const firstAction = useInteractOutside(firstLayer, {
			onInteractOutside: firstOutside,
		});
		const secondAction = useInteractOutside(secondLayer, {
			onInteractOutside: secondOutside,
		});

		secondAction.destroy();
		fireEvent.pointerDown(outside);
		fireEvent.pointerUp(outside);
		await vi.advanceTimersByTimeAsync(25);

		expect(firstOutside).toHaveBeenCalledTimes(1);
		expect(secondOutside).not.toHaveBeenCalled();

		firstAction.destroy();
	});

	test('uses the captured path when the event target is detached', async () => {
		vi.useFakeTimers();

		const layer = document.createElement('div');
		const outside = document.createElement('button');
		document.body.append(layer, outside);

		const onOutside = vi.fn();
		const action = useInteractOutside(layer, {
			onInteractOutside: onOutside,
		});
		outside.addEventListener('pointerup', () => {
			outside.remove();
		});

		fireEvent.pointerDown(outside);
		fireEvent.pointerUp(outside);
		await vi.advanceTimersByTimeAsync(25);

		expect(onOutside).toHaveBeenCalledTimes(1);

		action.destroy();
	});

	test('does not treat a descendant in the composed path as outside', async () => {
		vi.useFakeTimers();

		const layer = document.createElement('div');
		const inside = document.createElement('button');
		layer.append(inside);
		document.body.append(layer);

		const onOutside = vi.fn();
		const action = useInteractOutside(layer, {
			onInteractOutside: onOutside,
		});

		fireEvent.pointerDown(inside);
		fireEvent.pointerUp(inside);
		await vi.advanceTimersByTimeAsync(25);

		expect(onOutside).not.toHaveBeenCalled();

		action.destroy();
	});
});
