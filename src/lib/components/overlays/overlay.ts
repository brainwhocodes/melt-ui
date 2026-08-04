import { getContext, setContext } from 'svelte';
import type { Writable } from 'svelte/store';

export type OverlayCloseReason =
	| 'action'
	| 'backdrop'
	| 'cancel'
	| 'close-button'
	| 'escape'
	| 'programmatic'
	| 'snap'
	| 'swipe';

export type OverlayOpenChange = (
	open: boolean,
	reason: OverlayCloseReason,
) => void;

export interface OverlayContext {
	close: (reason?: OverlayCloseReason) => void;
	registerTitle: (id: string) => () => void;
	registerDescription: (id: string) => () => void;
}

export type DrawerDirection = 'top' | 'right' | 'bottom' | 'left';

export interface DrawerContext extends OverlayContext {
	direction: Writable<DrawerDirection>;
	activeSnapPoint: Writable<number>;
	dismissThreshold: Writable<number>;
	snapPoints: Writable<number[]>;
	setActiveSnapPoint: (value: number) => void;
}

export const alertDialogContext = Symbol('melt-alert-dialog');
export const sheetContext = Symbol('melt-sheet');
export const drawerContext = Symbol('melt-drawer');

export function provideOverlayContext<T>(key: symbol, context: T): T {
	setContext(key, context);
	return context;
}

export function useOverlayContext<T>(key: symbol, component: string): T {
	const context = getContext<T | undefined>(key);
	if (!context) {
		throw new Error(
			`${component} must be used inside its matching root component.`,
		);
	}
	return context;
}

const FOCUSABLE_SELECTOR = [
	'a[href]',
	'area[href]',
	'button:not([disabled])',
	'input:not([disabled]):not([type="hidden"])',
	'select:not([disabled])',
	'textarea:not([disabled])',
	'iframe',
	'[contenteditable="true"]',
	'[tabindex]:not([tabindex="-1"])',
].join(',');

export function getFocusableElements(container: HTMLElement): HTMLElement[] {
	if (typeof window === 'undefined') return [];
	return Array.from(
		container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
	).filter((element) => {
		const style = window.getComputedStyle(element);
		return (
			element.tabIndex >= 0 &&
			!element.hidden &&
			!element.closest('[hidden], [aria-hidden="true"]') &&
			style.display !== 'none' &&
			style.visibility !== 'hidden'
		);
	});
}

export function focusInitial(
	container: HTMLElement,
	preferredSelector?: string,
): void {
	if (typeof window === 'undefined') return;
	queueMicrotask(() => {
		if (!container.isConnected) return;
		const preferred = preferredSelector
			? container.querySelector<HTMLElement>(preferredSelector)
			: null;
		const autofocus = container.querySelector<HTMLElement>('[autofocus]');
		const target =
			preferred ?? autofocus ?? getFocusableElements(container)[0] ?? container;
		if (target === container && !container.hasAttribute('tabindex'))
			container.tabIndex = -1;
		target.focus({ preventScroll: true });
	});
}

export function containFocus(container: HTMLElement): () => void {
	if (typeof document === 'undefined') return () => undefined;

	const handleKeydown = (event: KeyboardEvent) => {
		if (event.key !== 'Tab') return;
		const focusable = getFocusableElements(container);
		if (focusable.length === 0) {
			event.preventDefault();
			container.focus({ preventScroll: true });
			return;
		}
		const first = focusable[0];
		const last = focusable[focusable.length - 1];
		const active = document.activeElement;
		if (event.shiftKey && (active === first || !container.contains(active))) {
			event.preventDefault();
			last.focus({ preventScroll: true });
		} else if (
			!event.shiftKey &&
			(active === last || !container.contains(active))
		) {
			event.preventDefault();
			first.focus({ preventScroll: true });
		}
	};
	const handleFocus = (event: FocusEvent) => {
		if (container.contains(event.target as Node)) return;
		(getFocusableElements(container)[0] ?? container).focus({
			preventScroll: true,
		});
	};
	container.addEventListener('keydown', handleKeydown);
	document.addEventListener('focusin', handleFocus);
	return () => {
		container.removeEventListener('keydown', handleKeydown);
		document.removeEventListener('focusin', handleFocus);
	};
}

interface BodyStyleSnapshot {
	overflow: string;
	position: string;
	top: string;
	left: string;
	right: string;
	width: string;
	paddingRight: string;
	scrollX: number;
	scrollY: number;
}

let bodyLockCount = 0;
let bodySnapshot: BodyStyleSnapshot | undefined;

export function lockBodyScroll(): () => void {
	if (typeof document === 'undefined' || typeof window === 'undefined')
		return () => undefined;
	bodyLockCount += 1;
	if (bodyLockCount === 1) {
		const body = document.body;
		const computedPadding =
			Number.parseFloat(window.getComputedStyle(body).paddingRight) || 0;
		const scrollbarWidth = Math.max(
			0,
			window.innerWidth - document.documentElement.clientWidth,
		);
		bodySnapshot = {
			overflow: body.style.overflow,
			position: body.style.position,
			top: body.style.top,
			left: body.style.left,
			right: body.style.right,
			width: body.style.width,
			paddingRight: body.style.paddingRight,
			scrollX: window.scrollX,
			scrollY: window.scrollY,
		};
		body.style.overflow = 'hidden';
		body.style.position = 'fixed';
		body.style.top = `${-bodySnapshot.scrollY}px`;
		body.style.left = `${-bodySnapshot.scrollX}px`;
		body.style.right = '0';
		body.style.width = '100%';
		if (scrollbarWidth > 0)
			body.style.paddingRight = `${computedPadding + scrollbarWidth}px`;
	}

	let released = false;
	return () => {
		if (
			released ||
			typeof document === 'undefined' ||
			typeof window === 'undefined'
		)
			return;
		released = true;
		bodyLockCount = Math.max(0, bodyLockCount - 1);
		if (bodyLockCount !== 0 || !bodySnapshot) return;
		const body = document.body;
		const snapshot = bodySnapshot;
		bodySnapshot = undefined;
		body.style.overflow = snapshot.overflow;
		body.style.position = snapshot.position;
		body.style.top = snapshot.top;
		body.style.left = snapshot.left;
		body.style.right = snapshot.right;
		body.style.width = snapshot.width;
		body.style.paddingRight = snapshot.paddingRight;
		window.scrollTo(snapshot.scrollX, snapshot.scrollY);
	};
}

function inertOutside(dialog: HTMLDialogElement): () => void {
	const restored: Array<{
		element: HTMLElement;
		inert: boolean;
		ariaHidden: string | null;
	}> = [];
	let branch: HTMLElement = dialog;
	let parent = branch.parentElement;
	while (parent) {
		for (const sibling of Array.from(parent.children)) {
			if (sibling === branch || !(sibling instanceof HTMLElement)) continue;
			restored.push({
				element: sibling,
				inert: sibling.inert,
				ariaHidden: sibling.getAttribute('aria-hidden'),
			});
			sibling.inert = true;
			sibling.setAttribute('aria-hidden', 'true');
		}
		branch = parent;
		parent = parent.parentElement;
	}
	return () => {
		for (const { element, inert, ariaHidden } of restored) {
			element.inert = inert;
			if (ariaHidden === null) element.removeAttribute('aria-hidden');
			else element.setAttribute('aria-hidden', ariaHidden);
		}
	};
}

export function showModal(dialog: HTMLDialogElement): () => void {
	if (typeof window === 'undefined') return () => undefined;
	if (dialog.open) return () => undefined;
	if (typeof dialog.showModal === 'function') {
		try {
			dialog.showModal();
			return () => undefined;
		} catch {
			// Fall through to the guarded non-native modal behavior.
		}
	}
	dialog.setAttribute('open', '');
	dialog.setAttribute('aria-modal', 'true');
	return inertOutside(dialog);
}

export function hideModal(dialog: HTMLDialogElement): void {
	if (typeof window === 'undefined') return;
	if (dialog.open && typeof dialog.close === 'function') {
		try {
			dialog.close();
			return;
		} catch {
			// Removing the attribute is the fallback for incomplete dialog implementations.
		}
	}
	dialog.removeAttribute('open');
}

export function restoreFocus(element: HTMLElement | null): void {
	if (typeof window === 'undefined' || !element?.isConnected) return;
	queueMicrotask(() => element.focus({ preventScroll: true }));
}

let overlayId = 0;
export function createOverlayId(prefix: string): string {
	overlayId += 1;
	return `${prefix}-${overlayId}`;
}
