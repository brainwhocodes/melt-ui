// setupTest.ts
/* eslint-disable @typescript-eslint/no-empty-function */

import type { Navigation, Page } from '@sveltejs/kit';
import { configure } from '@testing-library/dom';
import '@testing-library/jest-dom/vitest';
import { toHaveNoViolations } from 'jest-axe';
import ResizeObserver from 'resize-observer-polyfill';
import { readable } from 'svelte/store';
import { expect, vi } from 'vitest';
import * as environment from '$app/environment';
import * as navigation from '$app/navigation';
import * as stores from '$app/stores';


expect.extend(toHaveNoViolations as never);

configure({
	asyncUtilTimeout: 1500,
});

// Mock SvelteKit runtime module $app/environment
vi.mock('$app/environment', (): typeof environment => ({
	browser: false,
	dev: true,
	building: false,
	version: 'any',
}));

// Mock SvelteKit runtime module $app/navigation
vi.mock('$app/navigation', (): typeof navigation => ({
	afterNavigate: () => {},
	beforeNavigate: () => {},
	disableScrollHandling: () => {},
	goto: () => Promise.resolve(),
	invalidate: () => Promise.resolve(),
	invalidateAll: () => Promise.resolve(),
	preloadData: () => Promise.resolve({ data: {}, status: 200, type: 'loaded' }),
	preloadCode: () => Promise.resolve(),
	onNavigate: () => {},
	pushState: () => {},
	replaceState: () => {},
}));

// Mock SvelteKit runtime module $app/stores
vi.mock('$app/stores', (): typeof stores => {
	const getStores: typeof stores.getStores = () => {
		const navigating = readable<Navigation | null>(null);
		const page = readable<Page>({
			url: new URL('http://localhost'),
			params: {},
			route: {
				id: null,
			},
			status: 200,
			error: null,
			data: {},
			form: undefined,
			state: {},
		});
		const updated = {
			subscribe: readable(false).subscribe,
			check: async () => false,
		};

		return { navigating, page, updated };
	};

	const page: typeof stores.page = {
		subscribe(fn) {
			return getStores().page.subscribe(fn);
		},
	};
	const navigating: typeof stores.navigating = {
		subscribe(fn) {
			return getStores().navigating.subscribe(fn);
		},
	};
	const updated: typeof stores.updated = {
		subscribe(fn) {
			return getStores().updated.subscribe(fn);
		},
		check: async () => false,
	};

	return {
		getStores,
		navigating,
		page,
		updated,
	};
});


globalThis.ResizeObserver ??= ResizeObserver;
if (typeof Element !== 'undefined') {
	Element.prototype.animate = (_keyframes, options) => {
		const duration =
			typeof options === 'number'
				? options
				: Number(options?.duration ?? 0);
		let cancelled = false;
		let finishHandler: Animation['onfinish'] = null;
		const animation = {
			currentTime: 0,
			effect: null,
			playState: 'running',
			cancel() {
				cancelled = true;
				animation.playState = 'idle';
			},
			get onfinish() {
				return finishHandler;
			},
			set onfinish(handler) {
				finishHandler = handler;
				if (!handler) return;
				queueMicrotask(() => {
					if (cancelled || finishHandler !== handler) return;
					animation.currentTime = duration;
					animation.playState = 'finished';
					handler.call(
						animation as unknown as Animation,
						new Event('finish') as AnimationPlaybackEvent,
					);
				});
			},
		};
		return animation as unknown as Animation;
	};
}
if (typeof Element !== 'undefined') {
	Element.prototype.scrollIntoView = () => {};
	window.scrollTo = () => {};
}
