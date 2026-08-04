<script lang="ts">
	import { onMount, tick, untrack } from 'svelte';

	type PrependDetail = {
		previousScrollHeight: number;
		scrollHeight: number;
		delta: number;
		scrollTop: number;
	};

	interface Props {
		follow?: boolean;
		atLiveEdge?: boolean;
		threshold?: number;
		label?: string;
		jumpLabel?: string;
		jumpBehavior?: ScrollBehavior;
		live?: 'off' | 'polite';
		class?: string;
		onfollowchange?: (detail: { follow: boolean }) => void;
		onliveedgechange?: (detail: { atLiveEdge: boolean }) => void;
		onprepend?: (detail: PrependDetail) => void;
		onprependpreserved?: (detail: PrependDetail) => void;
		onjump?: (detail: { behavior: ScrollBehavior }) => void;
		children?: import('svelte').Snippet;
		jump?: import('svelte').Snippet;
		[key: string]: any;
	}

	let {
		follow = true,
		atLiveEdge = true,
		threshold = 48,
		label = 'Conversation',
		jumpLabel = 'Jump to latest',
		jumpBehavior = 'smooth',
		live = 'polite',
		class: className = '',
		onfollowchange,
		onliveedgechange,
		onprepend,
		onprependpreserved,
		onjump,
		children,
		jump,
		...rest
	}: Props = $props();

	let viewport: HTMLElement;
	let content: HTMLElement;
	let observer: ResizeObserver | undefined;
	let mounted = $state(false);
	let preserveDepth = 0;
	let latestFrame: number | undefined;
	let previousFollow = $state(untrack(() => follow));
	let lastContentHeight = $state(0);
	let hasResizeObserver = $state(false);

	let safeThreshold = $derived(Number.isFinite(threshold) ? Math.max(0, threshold) : 48);

	function distanceFromLiveEdge(): number {
		if (!viewport) return 0;
		return Math.max(0, viewport.scrollHeight - viewport.scrollTop - viewport.clientHeight);
	}

	function publishLiveEdge(next: boolean): void {
		if (atLiveEdge === next) return;
		atLiveEdge = next;
		onliveedgechange?.({ atLiveEdge: next });
	}

	function publishFollow(next: boolean): void {
		if (follow === next) return;
		follow = next;
		onfollowchange?.({ follow: next });
	}

	function measureLiveEdge(syncFollow = true): boolean {
		const next = distanceFromLiveEdge() <= safeThreshold;
		publishLiveEdge(next);
		if (syncFollow) publishFollow(next);
		return next;
	}

	function resolveScrollBehavior(behavior: ScrollBehavior): ScrollBehavior {
		if (behavior !== 'smooth' || typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
			return behavior;
		}
		return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : behavior;
	}

	function setScrollTop(top: number, behavior: ScrollBehavior): void {
		if (!viewport) return;
		if (typeof viewport.scrollTo === 'function') {
			viewport.scrollTo({ top, behavior: resolveScrollBehavior(behavior) });
		} else {
			viewport.scrollTop = top;
		}
	}

	function queueScrollToLatest(behavior: ScrollBehavior = 'auto'): void {
		if (!mounted || !viewport || preserveDepth > 0) return;
		if (latestFrame !== undefined && typeof cancelAnimationFrame === 'function') {
			cancelAnimationFrame(latestFrame);
		}
		const run = () => {
			latestFrame = undefined;
			if (!viewport || preserveDepth > 0 || !follow || !atLiveEdge) return;
			setScrollTop(viewport.scrollHeight, behavior);
			publishLiveEdge(true);
		};
		if (typeof requestAnimationFrame === 'function') {
			latestFrame = requestAnimationFrame(run);
		} else {
			run();
		}
	}

	function handleScroll(): void {
		if (preserveDepth === 0) measureLiveEdge(true);
	}

	function handleViewportKeydown(event: KeyboardEvent): void {
		if (event.target !== event.currentTarget || !viewport) return;
		let top: number | undefined;
		if (event.key === 'PageUp') top = viewport.scrollTop - viewport.clientHeight * 0.9;
		else if (event.key === 'PageDown') top = viewport.scrollTop + viewport.clientHeight * 0.9;
		else if (event.key === 'Home') top = 0;
		else if (event.key === 'End') {
			event.preventDefault();
			scrollToLatest('auto');
			return;
		}
		if (top === undefined) return;
		event.preventDefault();
		setScrollTop(Math.max(0, top), 'auto');
	}

	export function scrollToLatest(behavior: ScrollBehavior = jumpBehavior): void {
		if (!viewport) return;
		publishFollow(true);
		publishLiveEdge(true);
		setScrollTop(viewport.scrollHeight, behavior);
	}

	export function scrollToMessage(
		id: string,
		behavior: ScrollBehavior = 'smooth',
	): boolean {
		if (!viewport || !content) return false;
		const target = Array.from(
			content.querySelectorAll<HTMLElement>('[data-message-id], [id]'),
		).find((element) => element.dataset.messageId === id || element.id === id);
		if (!target) return false;

		const viewportRect = viewport.getBoundingClientRect();
		const targetRect = target.getBoundingClientRect();
		let top = viewport.scrollTop;
		if (targetRect.top < viewportRect.top) {
			top += targetRect.top - viewportRect.top;
		} else if (targetRect.bottom > viewportRect.bottom) {
			top += targetRect.bottom - viewportRect.bottom;
		}
		const resolvedBehavior = resolveScrollBehavior(behavior);
		setScrollTop(top, resolvedBehavior);
		if (resolvedBehavior === 'auto') measureLiveEdge(true);
		else if (typeof requestAnimationFrame === 'function') requestAnimationFrame(() => measureLiveEdge(true));
		return true;
	}

	export function prepareForPrepend(): () => Promise<PrependDetail> {
		const previousScrollHeight = viewport?.scrollHeight ?? 0;
		const previousScrollTop = viewport?.scrollTop ?? 0;
		preserveDepth += 1;
		let finished = false;

		return async () => {
			if (finished) {
				return {
					previousScrollHeight,
					scrollHeight: viewport?.scrollHeight ?? previousScrollHeight,
					delta: 0,
					scrollTop: viewport?.scrollTop ?? previousScrollTop,
				};
			}
			finished = true;
			await tick();
			const scrollHeight = viewport?.scrollHeight ?? previousScrollHeight;
			const delta = scrollHeight - previousScrollHeight;
			if (viewport && delta !== 0) viewport.scrollTop = previousScrollTop + delta;
			preserveDepth = Math.max(0, preserveDepth - 1);
			const detail = {
				previousScrollHeight,
				scrollHeight,
				delta,
				scrollTop: viewport?.scrollTop ?? previousScrollTop,
			};
			onprepend?.(detail);
			onprependpreserved?.(detail);
			return detail;
		};
	}

	export async function preservePrepend<T>(update: () => T | Promise<T>): Promise<T> {
		const finish = prepareForPrepend();
		try {
			const result = await update();
			await finish();
			return result;
		} catch (error) {
			await finish();
			throw error;
		}
	}

	function handleJump(): void {
		const behavior = resolveScrollBehavior(jumpBehavior);
		scrollToLatest(behavior);
		onjump?.({ behavior });
	}

	$effect(() => {
		if (!mounted || !content) return;
		if (follow && !previousFollow) {
			publishLiveEdge(true);
			queueScrollToLatest('auto');
		}
		previousFollow = follow;

		if (!hasResizeObserver) {
			const height = content.scrollHeight;
			if (height !== lastContentHeight) {
				if (follow && atLiveEdge) queueScrollToLatest('auto');
				lastContentHeight = height;
			}
		}
	});

	onMount(() => {
		mounted = true;
		viewport.addEventListener('scroll', handleScroll, { passive: true });
		hasResizeObserver = typeof ResizeObserver !== 'undefined';
		lastContentHeight = content.scrollHeight;

		if (hasResizeObserver) {
			observer = new ResizeObserver(() => {
				if (preserveDepth > 0) return;
				if (follow && atLiveEdge) queueScrollToLatest('auto');
				else measureLiveEdge(false);
			});
			observer.observe(content);
		}

		void tick().then(() => {
			if (!mounted) return;
			if (follow) {
				publishLiveEdge(true);
				queueScrollToLatest('auto');
			} else {
				measureLiveEdge(false);
			}
		});

		return () => {
			mounted = false;
			viewport.removeEventListener('scroll', handleScroll);
			observer?.disconnect();
			observer = undefined;
			if (latestFrame !== undefined && typeof cancelAnimationFrame === 'function') {
				cancelAnimationFrame(latestFrame);
			}
			latestFrame = undefined;
		};
	});
</script>

<div
	class:melt-message-scroller={true}
	class:melt-message-scroller-following={follow}
	class={className}
	data-follow={follow}
	data-live-edge={atLiveEdge}
	{...rest}
>
	<!-- svelte-ignore a11y_no_noninteractive_tabindex, a11y_no_noninteractive_element_interactions -->
	<section
		class="melt-message-scroller-viewport"
		bind:this={viewport}
		role="log"
		aria-label={label}
		aria-live={live}
		aria-relevant="additions text"
		aria-atomic="false"
		tabindex="0"
		onkeydown={handleViewportKeydown}
	>
		<div class="melt-message-scroller-content" bind:this={content}>
			{@render children?.()}
		</div>
	</section>

	{#if !atLiveEdge}
		<button class="melt-message-scroller-jump" type="button" onclick={handleJump}>
			{#if jump}
				{@render jump()}
			{:else}
				{jumpLabel}
			{/if}
		</button>
	{/if}
</div>
