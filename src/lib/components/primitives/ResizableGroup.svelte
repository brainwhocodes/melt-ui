<script lang="ts">
	import { setContext, untrack } from 'svelte';
	import { writable } from 'svelte/store';
	import {
		RESIZABLE_CONTEXT,
		type ResizableContext,
		type ResizableDirection,
		type ResizableDirectionality,
		type ResizablePanelConfig,
		type ResizableResizeDetail,
		type ResizableState,
		type ResizableToken,
		type ResizeSource,
	} from './resizable-context.js';

	interface Props {
		direction?: ResizableDirection;
		dir?: ResizableDirectionality;
		sizes?: number[];
		disabled?: boolean;
		class?: string;
		onresize?: (detail: ResizableResizeDetail) => void;
		children?: import('svelte').Snippet;
		[key: string]: any;
	}

	let {
		direction = 'horizontal',
		dir = 'ltr',
		sizes = $bindable([]),
		disabled = false,
		class: className = '',
		onresize,
		children,
		...rest
	}: Props = $props();

	interface PanelRegistration {
		token: ResizableToken;
		config: ResizablePanelConfig;
	}

	const initialSizes = sizes.slice();
	let groupElement: HTMLElement | undefined = $state();
	// Tokens are compared by identity, so these arrays must stay unproxied.
	let panels = $state.raw<PanelRegistration[]>([]);
	let handles = $state.raw<ResizableToken[]>([]);
	let currentSizes = $state<number[]>([]);

	const resizableState = writable<ResizableState>(
		untrack(() => ({ direction, dir, disabled, panels: [], handles: [] }))
	);

	const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
	const finite = (value: number | undefined): value is number =>
		typeof value === 'number' && Number.isFinite(value);
	const sameSizes = (a: number[], b: number[]) =>
		a.length === b.length && a.every((value, index) => Math.abs(value - b[index]) < 0.0001);

	function normalizeConfig(config: ResizablePanelConfig): ResizablePanelConfig {
		const minSize = finite(config.minSize) ? clamp(config.minSize, 0, 100) : 0;
		const requestedMax = finite(config.maxSize) ? clamp(config.maxSize, 0, 100) : 100;
		return {
			...config,
			minSize,
			maxSize: Math.max(minSize, requestedMax),
			defaultSize: finite(config.defaultSize) ? clamp(config.defaultSize, 0, 100) : undefined,
		};
	}

	function fitSizes(values: number[]): number[] {
		if (!panels.length) return [];

		let next = panels.map((panel, index) => finite(values[index]) ? Math.max(0, values[index]) : 0);
		const total = next.reduce((sum, value) => sum + value, 0);
		if (total > 0) next = next.map((value) => (value / total) * 100);
		else next = next.map(() => 100 / panels.length);

		next = next.map((value, index) =>
			clamp(value, panels[index].config.minSize, panels[index].config.maxSize)
		);

		for (let pass = 0; pass < panels.length + 1; pass += 1) {
			const difference = 100 - next.reduce((sum, value) => sum + value, 0);
			if (Math.abs(difference) < 0.0001) break;
			const candidates = next
				.map((value, index) => ({ value, index, config: panels[index].config }))
				.filter(({ value, config }) =>
					difference > 0 ? value < config.maxSize : value > config.minSize
				);
			if (!candidates.length) break;
			const share = difference / candidates.length;
			for (const candidate of candidates) {
				next[candidate.index] = clamp(
					next[candidate.index] + share,
					candidate.config.minSize,
					candidate.config.maxSize
				);
			}
		}

		return next;
	}

	function defaultSizes(): number[] {
		const requested = panels.map(({ config }) => config.defaultSize);
		const specifiedTotal = requested.reduce<number>(
			(sum, value) => sum + (finite(value) ? value : 0),
			0
		);
		const missingCount = requested.filter((value) => !finite(value)).length;
		const missingSize = missingCount ? Math.max(0, 100 - specifiedTotal) / missingCount : 0;
		return fitSizes(requested.map((value) => finite(value) ? value : missingSize));
	}

	function refreshState() {
		resizableState.set({
			direction,
			dir,
			disabled,
			panels: panels.map(({ token, config }, index) => ({
				token,
				...config,
				size: currentSizes[index] ?? config.defaultSize ?? 0,
			})),
			handles: handles.slice(),
		});
	}

	function publishSizes(next: number[]) {
		currentSizes = next;
		sizes = next.slice();
		refreshState();
	}

	function initializeSizes() {
		if (initialSizes.length > panels.length) {
			refreshState();
			return;
		}
		const requested = initialSizes.length === panels.length ? initialSizes : defaultSizes();
		publishSizes(fitSizes(requested));
	}

	function registerPanel(token: ResizableToken, config: ResizablePanelConfig) {
		panels = [...panels, { token, config: normalizeConfig(config) }];
		initializeSizes();
		return () => {
			const index = panels.findIndex((panel) => panel.token === token);
			if (index < 0) return;
			panels = panels.filter((panel) => panel.token !== token);
			currentSizes = currentSizes.filter((_, sizeIndex) => sizeIndex !== index);
			publishSizes(fitSizes(currentSizes));
		};
	}

	function updatePanel(token: ResizableToken, config: ResizablePanelConfig) {
		const index = panels.findIndex((panel) => panel.token === token);
		if (index < 0) return;
		const normalized = normalizeConfig(config);
		const previous = panels[index].config;
		if (
			previous.defaultSize === normalized.defaultSize &&
			previous.minSize === normalized.minSize &&
			previous.maxSize === normalized.maxSize &&
			previous.disabled === normalized.disabled
		) return;
		panels = panels.map((panel, panelIndex) =>
			panelIndex === index ? { token, config: normalized } : panel
		);
		publishSizes(fitSizes(currentSizes));
	}

	function registerHandle(token: ResizableToken) {
		handles = [...handles, token];
		refreshState();
		return () => {
			handles = handles.filter((handle) => handle !== token);
			refreshState();
		};
	}

	function resizeBy(handle: ResizableToken, delta: number, source: ResizeSource) {
		const handleIndex = handles.indexOf(handle);
		const previous = panels[handleIndex];
		const next = panels[handleIndex + 1];
		if (
			disabled ||
			handleIndex < 0 ||
			!previous ||
			!next ||
			previous.config.disabled ||
			next.config.disabled ||
			!Number.isFinite(delta)
		) return null;

		const pairSize = currentSizes[handleIndex] + currentSizes[handleIndex + 1];
		const minimum = Math.max(previous.config.minSize, pairSize - next.config.maxSize);
		const maximum = Math.min(previous.config.maxSize, pairSize - next.config.minSize);
		const oldPreviousSize = currentSizes[handleIndex];
		const nextPreviousSize = clamp(oldPreviousSize + delta, minimum, maximum);
		if (Math.abs(nextPreviousSize - oldPreviousSize) < 0.0001) return null;

		const updated = currentSizes.slice();
		updated[handleIndex] = nextPreviousSize;
		updated[handleIndex + 1] = pairSize - nextPreviousSize;
		publishSizes(updated);
		const detail: ResizableResizeDetail = {
			sizes: updated.slice(),
			handleIndex,
			previousSize: nextPreviousSize,
			nextSize: updated[handleIndex + 1],
			source,
		};
		onresize?.(detail);
		return detail;
	}

	function resizeTo(handle: ResizableToken, edge: 'min' | 'max', source: ResizeSource) {
		const handleIndex = handles.indexOf(handle);
		const previous = panels[handleIndex];
		const next = panels[handleIndex + 1];
		if (!previous || !next) return null;
		const pairSize = currentSizes[handleIndex] + currentSizes[handleIndex + 1];
		const minimum = Math.max(previous.config.minSize, pairSize - next.config.maxSize);
		const maximum = Math.min(previous.config.maxSize, pairSize - next.config.minSize);
		const target = edge === 'min' ? minimum : maximum;
		return resizeBy(handle, target - currentSizes[handleIndex], source);
	}

	const context: ResizableContext = {
		state: resizableState,
		registerPanel,
		updatePanel,
		registerHandle,
		resizeBy,
		resizeTo,
		getGroupRect: () => groupElement?.getBoundingClientRect() ?? null,
	};
	setContext(RESIZABLE_CONTEXT, context);

	$effect(() => {
		if (
			panels.length &&
			sizes.length === panels.length &&
			!sameSizes(sizes, currentSizes)
		) publishSizes(fitSizes(sizes));
	});
	$effect(() => {
		direction;
		dir;
		disabled;
		untrack(() => refreshState());
	});
</script>

<div
	bind:this={groupElement}
	{...rest}
	class={`melt-resizable-group ${className}`}
	data-direction={direction}
	data-disabled={disabled ? '' : undefined}
	dir={dir}
>
	{@render children?.()}
</div>
