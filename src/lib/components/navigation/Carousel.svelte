<script lang="ts" module>
	import { getContext } from 'svelte';
	import type { Action } from 'svelte/action';
	import type { Writable } from 'svelte/store';

	export type CarouselOrientation = 'horizontal' | 'vertical';

	export interface CarouselContext {
		activeIndex: Writable<number>;
		orientation: Writable<CarouselOrientation>;
		indices: Writable<number[]>;
		attachViewport: Action<HTMLElement>;
		attachSlide: (node: HTMLElement, index: number) => { destroy: () => void };
		registerSlide: (index: number) => () => void;
		scrollTo: (index: number) => void;
		goBy: (amount: number) => void;
		handleKeydown: (event: KeyboardEvent) => void;
		canGoPrevious: (index: number, indices: number[]) => boolean;
		canGoNext: (index: number, indices: number[]) => boolean;
	}

	const CAROUSEL_CONTEXT = 'melt-carousel';

	export function getCarouselContext(): CarouselContext {
		return getContext<CarouselContext>(CAROUSEL_CONTEXT);
	}
</script>

<script lang="ts">
	import { onDestroy, setContext, untrack } from 'svelte';
	import { writable } from 'svelte/store';


	interface Props {
		class?: string;
		activeIndex?: number;
		orientation?: CarouselOrientation;
		loop?: boolean;
		autoplayInterval?: number;
		pauseOnHover?: boolean;
		pauseOnFocus?: boolean;
		label?: string;
		onchange?: (detail: { activeIndex: number }) => void;
		children?: import('svelte').Snippet<[any]>;
		[key: string]: any
	}

	let {
		class: className = '',
		activeIndex = $bindable(0),
		orientation = 'horizontal',
		loop = false,
		autoplayInterval = 0,
		pauseOnHover = true,
		pauseOnFocus = true,
		label = 'Carousel',
		onchange = undefined,
		children,
		...rest
	}: Props = $props();

	const activeIndexStore = writable(normalizeIndex(activeIndex));
	const orientationStore = writable<CarouselOrientation>(untrack(() => orientation));
	const indicesStore = writable<number[]>([]);
	const registeredIndices = new Map<number, number>();
	const slides = new Map<number, HTMLElement>();

	let currentActiveIndex = $state(normalizeIndex(activeIndex));
	let viewport: HTMLElement | null = null;
	let root: HTMLElement | null = $state(null);
	let frame = 0;
	let timer: ReturnType<typeof setInterval> | null = null;
	let mounted = $state(false);
	let pointerPaused = $state(false);
	let focusPaused = $state(false);
	let reconcileScheduled = false;
	let destroyed = false;

	function normalizeIndex(index: number): number {
		return Number.isFinite(index) ? Math.max(0, Math.trunc(index)) : 0;
	}

	function sortedIndices(): number[] {
		return Array.from(registeredIndices.keys()).sort((a, b) => a - b);
	}

	function updateIndices(): void {
		indicesStore.set(sortedIndices());
		if (reconcileScheduled) return;
		reconcileScheduled = true;
		void Promise.resolve().then(() => {
			reconcileScheduled = false;
			if (destroyed) return;
			const resolvedIndex = targetIndex(currentActiveIndex);
			if (resolvedIndex === currentActiveIndex) return;
			setActiveIndex(resolvedIndex, mounted);
			if (mounted) scrollViewportTo(resolvedIndex, false);
		});
	}

	function registerSlide(index: number): () => void {
		const normalized = normalizeIndex(index);
		registeredIndices.set(normalized, (registeredIndices.get(normalized) ?? 0) + 1);
		updateIndices();

		return () => {
			const registrations = registeredIndices.get(normalized) ?? 0;
			if (registrations <= 1) registeredIndices.delete(normalized);
			else registeredIndices.set(normalized, registrations - 1);
			updateIndices();
		};
	}

	function attachSlide(node: HTMLElement, index: number): { destroy: () => void } {
		const normalized = normalizeIndex(index);
		slides.set(normalized, node);
		return {
			destroy() {
				if (slides.get(normalized) === node) slides.delete(normalized);
			},
		};
	}

	function prefersReducedMotion(): boolean {
		return typeof window !== 'undefined'
			&& typeof window.matchMedia === 'function'
			&& window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	}

	function setActiveIndex(index: number, emit: boolean): void {
		const next = normalizeIndex(index);
		if (next === currentActiveIndex) return;
		currentActiveIndex = next;
		activeIndex = next;
		activeIndexStore.set(next);
		if (emit) onchange?.({ activeIndex: next });
	}

	function targetIndex(index: number): number {
		const indices = sortedIndices();
		if (indices.length === 0) return normalizeIndex(index);
		const normalized = normalizeIndex(index);
		if (indices.includes(normalized)) return normalized;
		if (normalized <= indices[0]) return indices[0];
		if (normalized >= indices[indices.length - 1]) return indices[indices.length - 1];

		let closest = indices[0];
		let distance = Math.abs(normalized - closest);
		for (let i = 1; i < indices.length; i += 1) {
			const candidateDistance = Math.abs(normalized - indices[i]);
			if (candidateDistance < distance) {
				closest = indices[i];
				distance = candidateDistance;
			}
		}
		return closest;
	}

	export function scrollTo(index: number): void {
		const next = targetIndex(index);
		setActiveIndex(next, true);
		scrollViewportTo(next, false);
	}

	function scrollViewportTo(index: number, immediate: boolean): void {
		if (!viewport) return;
		const slide = slides.get(index);
		if (!slide) return;
		const viewportRect = viewport.getBoundingClientRect();
		const slideRect = slide.getBoundingClientRect();
		const behavior: ScrollBehavior = immediate || prefersReducedMotion() ? 'auto' : 'smooth';

		if (orientation === 'horizontal') {
			const left = viewport.scrollLeft + slideRect.left + slideRect.width / 2 - viewportRect.left - viewportRect.width / 2;
			if (typeof viewport.scrollTo === 'function') viewport.scrollTo({ left, behavior });
			else viewport.scrollLeft = left;
		} else {
			const top = viewport.scrollTop + slideRect.top + slideRect.height / 2 - viewportRect.top - viewportRect.height / 2;
			if (typeof viewport.scrollTo === 'function') viewport.scrollTo({ top, behavior });
			else viewport.scrollTop = top;
		}
	}

	function goBy(amount: number): void {
		const indices = sortedIndices();
		if (indices.length === 0) return;
		let position = indices.indexOf(currentActiveIndex);
		if (position < 0) position = 0;
		let nextPosition = position + amount;
		if (loop) nextPosition = (nextPosition % indices.length + indices.length) % indices.length;
		else nextPosition = Math.max(0, Math.min(indices.length - 1, nextPosition));
		scrollTo(indices[nextPosition]);
	}

	function canGoPrevious(index: number, indices: number[]): boolean {
		if (indices.length < 2) return false;
		return loop || index > indices[0];
	}

	function canGoNext(index: number, indices: number[]): boolean {
		if (indices.length < 2) return false;
		return loop || index < indices[indices.length - 1];
	}

	function isInteractiveTarget(target: EventTarget | null): boolean {
		if (!(target instanceof HTMLElement) || target === viewport) return false;
		return Boolean(target.closest('a, button, input, select, textarea, [contenteditable="true"]'));
	}

	function handleKeydown(event: KeyboardEvent): void {
		if (isInteractiveTarget(event.target)) return;
		const indices = sortedIndices();
		if (indices.length === 0) return;
		let handled = true;

		if (event.key === 'Home') scrollTo(indices[0]);
		else if (event.key === 'End') scrollTo(indices[indices.length - 1]);
		else if (orientation === 'horizontal' && event.key === 'ArrowLeft') {
			const rtl = viewport ? getComputedStyle(viewport).direction === 'rtl' : false;
			goBy(rtl ? 1 : -1);
		} else if (orientation === 'horizontal' && event.key === 'ArrowRight') {
			const rtl = viewport ? getComputedStyle(viewport).direction === 'rtl' : false;
			goBy(rtl ? -1 : 1);
		} else if (orientation === 'vertical' && event.key === 'ArrowUp') goBy(-1);
		else if (orientation === 'vertical' && event.key === 'ArrowDown') goBy(1);
		else handled = false;

		if (handled) event.preventDefault();
	}

	function syncActiveFromScroll(): void {
		frame = 0;
		if (!viewport || slides.size === 0) return;
		const viewportRect = viewport.getBoundingClientRect();
		const viewportCenter = orientation === 'horizontal'
			? viewportRect.left + viewportRect.width / 2
			: viewportRect.top + viewportRect.height / 2;
		let closestIndex = currentActiveIndex;
		let closestDistance = Number.POSITIVE_INFINITY;

		for (const [index, slide] of slides) {
			const rect = slide.getBoundingClientRect();
			const center = orientation === 'horizontal'
				? rect.left + rect.width / 2
				: rect.top + rect.height / 2;
			const distance = Math.abs(center - viewportCenter);
			if (distance < closestDistance) {
				closestDistance = distance;
				closestIndex = index;
			}
		}
		setActiveIndex(closestIndex, true);
	}

	function handleScroll(): void {
		if (frame) return;
		frame = requestAnimationFrame(syncActiveFromScroll);
	}

	function attachViewport(node: HTMLElement): { destroy: () => void } {
		viewport = node;
		node.addEventListener('scroll', handleScroll, { passive: true });
		mounted = true;
		queueMicrotask(() => scrollViewportTo(currentActiveIndex, true));
		restartAutoplay();

		return {
			destroy() {
				node.removeEventListener('scroll', handleScroll);
				if (viewport === node) viewport = null;
				if (frame) cancelAnimationFrame(frame);
				frame = 0;
				mounted = false;
				clearAutoplay();
			},
		};
	}

	function clearAutoplay(): void {
		if (timer !== null) clearInterval(timer);
		timer = null;
	}

	function restartAutoplay(): void {
		clearAutoplay();
		if (!mounted || autoplayInterval <= 0 || pointerPaused || focusPaused || prefersReducedMotion()) return;
		const indices = sortedIndices();
		if (indices.length < 2 || (!loop && currentActiveIndex >= indices[indices.length - 1])) return;
		timer = setInterval(() => goBy(1), Math.max(1, autoplayInterval));
	}

	function handlePointerEnter(): void {
		if (!pauseOnHover) return;
		pointerPaused = true;
		restartAutoplay();
	}

	function handlePointerLeave(): void {
		if (!pauseOnHover) return;
		pointerPaused = false;
		restartAutoplay();
	}

	function handleFocusIn(): void {
		if (!pauseOnFocus) return;
		focusPaused = true;
		restartAutoplay();
	}

	function handleFocusOut(event: FocusEvent): void {
		if (!pauseOnFocus || (event.relatedTarget instanceof Node && root?.contains(event.relatedTarget))) return;
		focusPaused = false;
		restartAutoplay();
	}
	$effect(() => {
		if (!pauseOnHover && pointerPaused) pointerPaused = false;
	});
	$effect(() => {
		if (!pauseOnFocus && focusPaused) focusPaused = false;
	});

	setContext<CarouselContext>(CAROUSEL_CONTEXT, {
		activeIndex: activeIndexStore,
		orientation: orientationStore,
		indices: indicesStore,
		attachViewport,
		attachSlide,
		registerSlide,
		scrollTo,
		goBy,
		handleKeydown,
		canGoPrevious,
		canGoNext,
	});

	$effect(() => {
		if (activeIndex !== currentActiveIndex) {
			currentActiveIndex = targetIndex(activeIndex);
			activeIndex = currentActiveIndex;
			activeIndexStore.set(currentActiveIndex);
			if (mounted) scrollViewportTo(currentActiveIndex, false);
		}
	});
	$effect(() => {
		orientationStore.set(orientation);
	});
	$effect(() => {
		if (mounted) {
			$indicesStore;
			autoplayInterval;
			loop;
			activeIndex;
			pauseOnHover;
			pauseOnFocus;
			restartAutoplay();
		}
	});

	onDestroy(() => {
		clearAutoplay();
		destroyed = true;
		if (frame) cancelAnimationFrame(frame);
	});
</script>

<div
	{...rest}
	bind:this={root}
	class={`melt-carousel ${className}`.trim()}
	role="region"
	aria-roledescription="carousel"
	aria-label={label}
	data-orientation={orientation}
	data-loop={loop ? '' : undefined}
	onpointerenter={handlePointerEnter}
	onpointerleave={handlePointerLeave}
	onfocusin={handleFocusIn}
	onfocusout={handleFocusOut}
>
	{@render children?.({ activeIndex, scrollTo, })}
</div>
