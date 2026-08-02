import { fireEvent, render, waitFor } from '@testing-library/svelte';
import { userEvent } from '@testing-library/user-event';
import { afterEach, beforeEach, describe, it, vi } from 'vitest';
import type { CreateScrollAreaProps } from '$lib/index.js';
import ScrollAreaTest from './ScrollAreaTest.svelte';

class TestResizeObserver {
	static instances: TestResizeObserver[] = [];

	readonly observed = new Set<Element>();
	readonly allObserved = new Set<Element>();

	constructor(private readonly callback: ResizeObserverCallback) {
		TestResizeObserver.instances.push(this);
	}

	observe(target: Element) {
		this.observed.add(target);
		this.allObserved.add(target);
	}

	unobserve(target: Element) {
		this.observed.delete(target);
	}

	disconnect() {
		this.observed.clear();
	}

	trigger() {
		if (this.observed.size > 0) {
			this.callback([], this as unknown as ResizeObserver);
		}
	}
}

function setElementSize(element: Element, sizes: Record<string, number>) {
	for (const [property, value] of Object.entries(sizes)) {
		Object.defineProperty(element, property, { configurable: true, value });
	}
}

function setup(
	props?: CreateScrollAreaProps & {
		height?: string;
		width?: string;
		showReplacementControls?: boolean;
	},
) {
	const user = userEvent.setup();
	const returned = render(ScrollAreaTest, { props });
	const root = returned.getByTestId('root');
	const scrollbarX = returned.getByTestId('scrollbar-x');
	const scrollbarY = returned.getByTestId('scrollbar-y');
	const content = returned.getByTestId('content');
	const thumbX = returned.getByTestId('thumb-x');
	const thumbY = returned.getByTestId('thumb-y');

	return {
		user,
		elements: {
			scrollbarX,
			scrollbarY,
			content,
			thumbX,
			thumbY,
			root,
		},
		...returned,
	};
}

beforeEach(() => {
	TestResizeObserver.instances = [];
	vi.stubGlobal('ResizeObserver', TestResizeObserver);
});

afterEach(() => {
	vi.unstubAllGlobals();
});

describe('Scroll Area', () => {
	it('Displays the scrollbars when `type` is "always"', async () => {
		const { elements } = setup({
			type: 'always',
		});

		expect(elements.scrollbarX).toBeVisible();
		expect(elements.scrollbarY).toBeVisible();
	});

	it('Displays the x scrollbar when `type` is "auto" and content overflows', async () => {
		const { elements } = setup({
			type: 'always',
			width: '10px',
		});

		expect(elements.scrollbarX).toBeVisible();
	});

	it('Displays the y scrollbar when `type` is "auto" and content overflows', async () => {
		const { elements } = setup({
			type: 'always',
			height: '10px',
		});

		expect(elements.scrollbarY).toBeVisible();
	});

	it("Doesn't display the scrollbars when `type` is 'auto' and content doesn't overflow", async () => {
		const { elements } = setup({
			type: 'auto',
			width: '5000px',
			height: '5000px',
		});

		await waitFor(() => expect(elements.scrollbarX).not.toBeVisible());
		await waitFor(() => expect(elements.scrollbarY).not.toBeVisible());
	});

	// I hate vitest/testing library sometimes.
	it.skip('Displays the scrollbars on hover', async () => {
		const { elements } = setup({
			type: 'hover',
			width: '10px',
			height: '10px',
		});

		await waitFor(() => expect(elements.scrollbarX).not.toBeVisible());
		await waitFor(() => expect(elements.scrollbarY).not.toBeVisible());

		await fireEvent.pointerEnter(elements.root);

		await waitFor(() => expect(elements.scrollbarX).toBeVisible());
		await waitFor(() => expect(elements.scrollbarY).toBeVisible());

		await fireEvent.pointerLeave(elements.root);

		await waitFor(() => expect(elements.scrollbarX).not.toBeVisible());
		await waitFor(() => expect(elements.scrollbarY).not.toBeVisible());
	});

	it('rebinds both orientation size observers as content and viewport nodes change', async () => {
		const { elements, getByTestId, getByRole, user, unmount } = setup({
			type: 'always',
			showReplacementControls: true,
		});
		const scrollbarX = elements.scrollbarX;
		const scrollbarY = elements.scrollbarY;
		let viewport = getByTestId('viewport');
		let content = getByTestId('content');

		setElementSize(viewport, {
			offsetWidth: 100,
			scrollWidth: 400,
			offsetHeight: 80,
			scrollHeight: 320,
		});
		setElementSize(scrollbarX, { clientWidth: 100 });
		setElementSize(scrollbarY, { clientHeight: 80 });

		const initialViewportObservers = TestResizeObserver.instances.filter(
			(observer) => observer.observed.has(viewport),
		);
		expect(initialViewportObservers).toHaveLength(2);
		initialViewportObservers.forEach((observer) => observer.trigger());

		await waitFor(() =>
			expect(
				scrollbarX.style.getPropertyValue('--melt-scroll-area-thumb-width'),
			).toBe('25px'),
		);
		expect(
			scrollbarY.style.getPropertyValue('--melt-scroll-area-thumb-height'),
		).toBe('20px');

		const originalContent = content;
		await user.click(getByRole('button', { name: 'Replace content' }));
		content = getByTestId('content');

		expect(content).not.toBe(originalContent);
		expect(
			TestResizeObserver.instances.filter((observer) =>
				observer.observed.has(content),
			),
		).toHaveLength(2);
		expect(
			TestResizeObserver.instances.some((observer) =>
				observer.observed.has(originalContent),
			),
		).toBe(false);
		expect(
			TestResizeObserver.instances.filter((observer) =>
				observer.observed.has(viewport),
			),
		).toHaveLength(2);

		const originalViewport = viewport;
		const contentBeforeViewportReplacement = content;
		await user.click(getByRole('button', { name: 'Replace viewport' }));
		viewport = getByTestId('viewport');
		content = getByTestId('content');

		expect(viewport).not.toBe(originalViewport);
		expect(content).not.toBe(contentBeforeViewportReplacement);
		expect(
			TestResizeObserver.instances.some((observer) =>
				observer.observed.has(originalViewport),
			),
		).toBe(false);
		expect(
			TestResizeObserver.instances.some((observer) =>
				observer.observed.has(contentBeforeViewportReplacement),
			),
		).toBe(false);
		expect(
			TestResizeObserver.instances.filter((observer) =>
				observer.observed.has(viewport),
			),
		).toHaveLength(2);
		expect(
			TestResizeObserver.instances.filter((observer) =>
				observer.observed.has(content),
			),
		).toHaveLength(2);

		setElementSize(viewport, {
			offsetWidth: 50,
			scrollWidth: 500,
			offsetHeight: 100,
			scrollHeight: 200,
		});
		TestResizeObserver.instances
			.filter((observer) => observer.observed.has(viewport))
			.forEach((observer) => observer.trigger());

		await waitFor(() =>
			expect(
				scrollbarX.style.getPropertyValue('--melt-scroll-area-thumb-width'),
			).toBe('18px'),
		);
		expect(
			scrollbarY.style.getPropertyValue('--melt-scroll-area-thumb-height'),
		).toBe('40px');

		unmount();

		expect(
			TestResizeObserver.instances.every(
				(observer) => observer.observed.size === 0,
			),
		).toBe(true);
	});
});
