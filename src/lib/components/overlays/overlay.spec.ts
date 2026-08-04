import { afterEach, describe, expect, it } from 'vitest';
import { containFocus, getFocusableElements } from './overlay.js';

afterEach(() => {
	document.body.replaceChildren();
});

describe('overlay focus containment', () => {
	it('skips controls excluded from the tab order when wrapping focus', () => {
		const container = document.createElement('div');
		const first = document.createElement('button');
		const excluded = document.createElement('button');
		const last = document.createElement('button');
		excluded.tabIndex = -1;
		container.append(first, excluded, last);
		document.body.append(container);

		expect(getFocusableElements(container)).toEqual([first, last]);
		const release = containFocus(container);
		first.focus();
		first.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', shiftKey: true, bubbles: true, cancelable: true }));
		expect(last).toHaveFocus();
		expect(excluded).not.toHaveFocus();
		release();
	});
});
