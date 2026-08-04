import { fireEvent, render, waitFor, within } from '@testing-library/svelte';
import { userEvent } from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { describe, expect, it, vi } from 'vitest';
import ComponentLibraryTest from './ComponentLibraryTest.svelte';

describe('styled component library', () => {
	it('has no automatically detectable navigation accessibility violations', async () => {
		const view = render(ComponentLibraryTest);
		const navigation = view.getByRole('navigation', {
			name: 'Docs navigation',
		});
		expect(await axe(navigation)).toHaveNoViolations();
	});

	it('renders semantic form, content, navigation, carousel, and resizable primitives', async () => {
		const user = userEvent.setup();
		const view = render(ComponentLibraryTest);

		const email = view.getByLabelText(/email/i);
		expect(email).toHaveAttribute('aria-invalid', 'true');
		expect(email).toHaveAccessibleDescription('Work address Email is required');
		expect(view.getByRole('alert')).toHaveTextContent('Components loaded.');

		const inlineDisplay = view.getByRole('button', {
			name: 'Edit Project name',
		});
		await user.click(inlineDisplay);
		const inlineInput = view.getByRole('textbox', { name: 'Project name' });
		expect(inlineInput).toHaveFocus();
		expect(inlineInput).toHaveValue('Melt UI');
		await user.clear(inlineInput);
		await user.type(inlineInput, 'Component gallery');
		await user.keyboard('{Enter}');
		expect(view.getAllByText('Component gallery')).toHaveLength(2);

		await user.click(view.getByRole('button', { name: 'Edit Project name' }));
		const reopenedInlineInput = view.getByRole('textbox', {
			name: 'Project name',
		});
		await user.keyboard('{Escape}');
		expect(
			view.getByRole('button', { name: 'Edit Project name' }),
		).toHaveFocus();
		expect(
			view.getByRole('button', { name: 'Edit Project name' }),
		).toHaveTextContent('Component gallery');

		expect(
			view.getByRole('status', { name: 'Loading records' }),
		).toBeInTheDocument();
		expect(
			view.getByRole('navigation', { name: 'Breadcrumb' }),
		).toHaveTextContent('Components');

		const products = view.getByRole('button', { name: 'Products' });
		const guides = view.getByRole('button', { name: 'Guides' });
		expect(products).toHaveAttribute('tabindex', '0');
		expect(guides).toHaveAttribute('tabindex', '-1');
		await fireEvent.click(products);
		await waitFor(() =>
			expect(products).toHaveAttribute('aria-expanded', 'true'),
		);
		await waitFor(() => {
			const link = view.container.querySelector<HTMLAnchorElement>(
				'a[href="/components"]',
			);
			expect(link).toBeInTheDocument();
			expect(link?.closest('[hidden], [aria-hidden="true"]')).toBeNull();
		});
		await user.click(
			view.getByRole('button', { name: 'Close navigation externally' }),
		);
		await waitFor(() =>
			expect(
				view.container
					.querySelector<HTMLAnchorElement>('a[href="/components"]')
					?.closest('.melt-navigation-menu__content'),
			).toHaveAttribute('hidden'),
		);
		await fireEvent.click(products);
		products.focus();
		await user.keyboard('{ArrowRight}');
		expect(guides).toHaveFocus();
		expect(products).toHaveAttribute('tabindex', '-1');
		expect(guides).toHaveAttribute('tabindex', '0');
		await user.keyboard('{Escape}');
		await waitFor(() =>
			expect(guides).toHaveAttribute('aria-expanded', 'false'),
		);
		expect(products).toHaveAttribute('tabindex', '-1');
		expect(guides).toHaveAttribute('tabindex', '0');
		await fireEvent.click(guides);
		await waitFor(() =>
			expect(guides).toHaveAttribute('aria-expanded', 'true'),
		);
		expect(products).toHaveAttribute('tabindex', '-1');
		expect(guides).toHaveAttribute('tabindex', '0');

		expect(view.getByRole('button', { name: 'Go to slide 2' })).toHaveAttribute(
			'aria-current',
			'true',
		);
		await user.click(view.getByRole('button', { name: 'Previous slide' }));
		expect(view.getByRole('button', { name: 'Go to slide 1' })).toHaveAttribute(
			'aria-current',
			'true',
		);
		await user.click(view.getByRole('button', { name: 'Next slide' }));
		expect(view.getByRole('button', { name: 'Go to slide 2' })).toHaveAttribute(
			'aria-current',
			'true',
		);
		await user.click(view.getByRole('button', { name: 'Remove active slide' }));
		await waitFor(() =>
			expect(
				view.queryByRole('button', { name: 'Go to slide 2' }),
			).not.toBeInTheDocument(),
		);
		expect(view.getByRole('button', { name: 'Go to slide 1' })).toHaveAttribute(
			'aria-current',
			'true',
		);

		const separator = view.getByRole('separator', {
			name: 'Resize editor and preview',
		});
		expect(separator).toHaveAttribute('aria-valuenow', '50');
		separator.focus();
		await user.keyboard('{ArrowRight}');
		expect(separator).toHaveAttribute('aria-valuenow', '51');
	});

	it('keeps one tabbable navigation trigger when the active trigger becomes unavailable', async () => {
		const user = userEvent.setup();
		const disabledView = render(ComponentLibraryTest);
		const disabledProducts = disabledView.getByRole('button', {
			name: 'Products',
		});
		const disabledGuides = disabledView.getByRole('button', { name: 'Guides' });

		await user.click(disabledGuides);
		await waitFor(() =>
			expect(disabledGuides).toHaveAttribute('tabindex', '0'),
		);
		await user.click(
			disabledView.getByRole('button', { name: 'Disable Guides' }),
		);
		await waitFor(() => {
			expect(disabledGuides).toBeDisabled();
			expect(disabledGuides).toHaveAttribute('tabindex', '-1');
			expect(disabledProducts).toHaveAttribute('tabindex', '0');
		});
		disabledView.unmount();

		const unmountedView = render(ComponentLibraryTest);
		const unmountedProducts = unmountedView.getByRole('button', {
			name: 'Products',
		});
		await user.click(unmountedView.getByRole('button', { name: 'Guides' }));
		await waitFor(() =>
			expect(
				unmountedView.getByRole('button', { name: 'Guides' }),
			).toHaveAttribute('tabindex', '0'),
		);
		await user.click(
			unmountedView.getByRole('button', { name: 'Unmount Guides' }),
		);
		expect(
			unmountedView.queryByRole('button', { name: 'Guides' }),
		).not.toBeInTheDocument();
		expect(unmountedProducts).toHaveAttribute('tabindex', '0');
	});

	it('sorts, filters, selects, and executes data commands', async () => {
		const user = userEvent.setup();
		const view = render(ComponentLibraryTest);
		const table = view.getByRole('table', { name: 'People' });
		const nameSort = within(table).getByRole('button', { name: /name/i });

		await fireEvent.click(nameSort);
		await waitFor(() =>
			expect(nameSort.closest('th')).toHaveAttribute('aria-sort', 'ascending'),
		);
		await fireEvent.click(nameSort);
		await waitFor(() =>
			expect(nameSort.closest('th')).toHaveAttribute('aria-sort', 'descending'),
		);

		await user.type(
			view.getByRole('searchbox', { name: 'Search rows' }),
			'Grace',
		);
		expect(within(table).queryByText('Ada')).not.toBeInTheDocument();
		expect(within(table).getByText('Grace')).toBeInTheDocument();
		await user.click(
			within(table).getByRole('checkbox', { name: 'Select all visible rows' }),
		);
		expect(view.getByText('1 of 1 visible rows selected')).toBeInTheDocument();

		const commandSearch = view.getByRole('combobox', {
			name: 'Search commands',
		});
		await user.clear(commandSearch);
		await user.type(commandSearch, 'settings');
		await user.keyboard('{Enter}');
		await waitFor(() =>
			expect(
				view.queryByRole('region', { name: 'Actions' }),
			).not.toBeInTheDocument(),
		);
	});

	it('provides modal cancellation, focus return, and close controls', async () => {
		const user = userEvent.setup();
		const view = render(ComponentLibraryTest);
		const alertTrigger = view.getByRole('button', {
			name: 'Open alert dialog',
		});

		await user.click(alertTrigger);
		const alertDialog = view.getByRole('alertdialog', {
			name: 'Delete draft?',
		});
		expect(alertDialog).toHaveAttribute('open');
		expect(view.getByRole('button', { name: 'Keep draft' })).toHaveFocus();
		await user.click(view.getByRole('button', { name: 'Keep draft' }));
		await waitFor(() => expect(alertDialog).not.toHaveAttribute('open'));
		expect(alertTrigger).toHaveFocus();

		await user.click(view.getByRole('button', { name: 'Open sheet' }));
		expect(view.getByRole('dialog', { name: 'Details' })).toHaveAttribute(
			'open',
		);
		await user.click(view.getByRole('button', { name: 'Close sheet' }));

		await user.click(view.getByRole('button', { name: 'Open drawer' }));
		expect(view.getByRole('dialog', { name: 'Filters' })).toHaveAttribute(
			'open',
		);
		await user.click(view.getByRole('button', { name: 'Close drawer' }));
	});

	it('tracks the transcript live edge and exposes a jump action', async () => {
		const user = userEvent.setup();
		const view = render(ComponentLibraryTest);
		vi.stubGlobal('matchMedia', (query: string) => ({
			matches: query === '(prefers-reduced-motion: reduce)',
			media: query,
			onchange: null,
			addEventListener: vi.fn(),
			removeEventListener: vi.fn(),
			addListener: vi.fn(),
			removeListener: vi.fn(),
			dispatchEvent: vi.fn(),
		}));
		const viewport = view.getByRole('log', { name: 'Support transcript' });
		Object.defineProperties(viewport, {
			scrollHeight: { configurable: true, value: 1000 },
			clientHeight: { configurable: true, value: 200 },
		});
		const scrollTo = vi.fn(({ top }: ScrollToOptions) => {
			viewport.scrollTop = top ?? viewport.scrollTop;
		});
		Object.defineProperty(viewport, 'scrollTo', {
			configurable: true,
			value: scrollTo,
		});
		viewport.scrollTop = 0;
		await fireEvent.scroll(viewport);

		const jump = await view.findByRole('button', { name: 'Jump to latest' });
		await user.click(jump);
		expect(viewport.scrollTop).toBe(1000);
		expect(scrollTo).toHaveBeenCalledWith({ top: 1000, behavior: 'auto' });
		await waitFor(() =>
			expect(
				view.queryByRole('button', { name: 'Jump to latest' }),
			).not.toBeInTheDocument(),
		);
		vi.unstubAllGlobals();
	});

	it('renders, interacts, and satisfies accessibility for all 28 new pre-styled components', async () => {
		const user = userEvent.setup();
		const view = render(ComponentLibraryTest);

		expect(view.getByText('Header 1')).toBeInTheDocument();
		expect(view.getByText('JD')).toBeInTheDocument();
		expect(view.getByLabelText('Subscribe')).toBeInTheDocument();
		expect(view.getByRole('button', { name: 'Expand info' })).toBeInTheDocument();
		expect(view.getByText('Right click target')).toBeInTheDocument();
		expect(view.getByText('Username')).toBeInTheDocument();
		expect(view.getByRole('navigation', { name: 'Pagination' })).toBeInTheDocument();
		expect(view.getByText('Success')).toBeInTheDocument();
		expect(view.getByRole('button', { name: 'Bold' })).toBeInTheDocument();

		// State bridge & ARIA assertions
		const progress = view.getByRole('meter', { name: 'Progress' });
		expect(progress).toHaveAttribute('aria-valuenow', '45');

		const checkbox = view.getByLabelText('Subscribe');
		expect(checkbox).toHaveAttribute('data-state', 'unchecked');
		await user.click(checkbox);
		expect(checkbox).toHaveAttribute('data-state', 'checked');

		const switchEl = view.getByLabelText('Dark mode');
		expect(switchEl).toHaveAttribute('data-state', 'unchecked');
		await user.click(switchEl);
		expect(switchEl).toHaveAttribute('data-state', 'checked');

		const sliderThumb = view.getByRole('slider', { name: 'Slider' });
		expect(sliderThumb).toHaveAttribute('aria-valuenow', '30');

		const tab1 = view.getByRole('tab', { name: 'Tab 1' });
		expect(tab1).toHaveAttribute('data-state', 'active');

		expect(await axe(view.container)).toHaveNoViolations();
	});
});
