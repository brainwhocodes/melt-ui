import { act, render } from '@testing-library/svelte';
import { userEvent } from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { writable } from 'svelte/store';
import { describe } from 'vitest';
import { testKbd as kbd } from '../utils.js';
import TabsTest from './TabsTest.svelte';

const tabs = ['1', '2', '3', '4', '5'];

function expectTabRelationships(
	container: HTMLElement,
	selectedValue?: string,
) {
	const triggers = Array.from(
		container.querySelectorAll<HTMLElement>('[role="tab"]'),
	);
	const panels = Array.from(
		container.querySelectorAll<HTMLElement>('[role="tabpanel"]'),
	);

	expect(triggers).toHaveLength(panels.length);
	expect(new Set(triggers.map((trigger) => trigger.id)).size).toBe(
		triggers.length,
	);
	expect(new Set(panels.map((panel) => panel.id)).size).toBe(panels.length);

	for (const trigger of triggers) {
		const value = trigger.dataset.value;
		const panel = panels.find(
			(candidate) => candidate.id === trigger.getAttribute('aria-controls'),
		);

		expect(trigger.id).not.toBe('');
		expect(trigger).toHaveAttribute(
			'aria-selected',
			String(value === selectedValue),
		);
		expect(panel).toBeDefined();
		expect(panel).toHaveAttribute('aria-labelledby', trigger.id);
	}

	expect(
		triggers.filter(
			(trigger) => trigger.getAttribute('aria-selected') === 'true',
		),
	).toHaveLength(selectedValue === undefined ? 0 : 1);
}

describe('Tabs', () => {
	test('has no accessibility violations', async () => {
		const { container } = render(TabsTest);
		expect(await axe(container)).toHaveNoViolations();
	});

	test('tablist renders tabs', async () => {
		const { getByTestId } = render(TabsTest, {
			tabValues: tabs,
		});

		const tabList = getByTestId('list');

		const tabTriggers = tabList.querySelectorAll('[role="tab"]');
		expect(tabTriggers.length).toBe(tabs.length);
	});

	test('can navigate tabs with arrow keys', async () => {
		const { getByTestId } = render(TabsTest, {
			tabValues: tabs,
		});

		const firstTrigger = getByTestId('1-trigger');
		firstTrigger.focus();

		for (const tab of tabs) {
			expect(getByTestId(`${tab}-trigger`)).toHaveFocus();
			await userEvent.keyboard(kbd.ARROW_RIGHT);
		}

		const lastTrigger = getByTestId(`${tabs[tabs.length - 1]}-trigger`);
		lastTrigger.focus();

		for (const tab of [...tabs].reverse()) {
			expect(getByTestId(`${tab}-trigger`)).toHaveFocus();
			await userEvent.keyboard(kbd.ARROW_LEFT);
		}
	});

	test('connects each tab and panel in a client render', () => {
		const { container } = render(TabsTest, { tabValues: tabs });

		expectTabRelationships(container, tabs[0]);
	});

	test('selects no trigger when the controlled value does not resolve to a rendered tab', () => {
		const value = writable('missing');
		const { container } = render(TabsTest, { tabValues: tabs, value });

		expectTabRelationships(container);
	});

	test('selects no trigger when the controlled value resolves to a disabled tab', () => {
		const value = writable('3');
		const { container } = render(TabsTest, {
			tabValues: tabs,
			disabledValues: ['3'],
			value,
		});

		expectTabRelationships(container);
	});

	test('keeps relationships resolvable as controlled selection changes', async () => {
		const value = writable('2');
		const { container } = render(TabsTest, { tabValues: tabs, value });

		expectTabRelationships(container, '2');

		await act(() => value.set('4'));

		expectTabRelationships(container, '4');
	});
});
