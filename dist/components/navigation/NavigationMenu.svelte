<script context="module" lang="ts">
	let nextNavigationMenuId = 0;
</script>

<script lang="ts">
	import { createEventDispatcher, onDestroy, setContext, tick } from 'svelte';
	import { writable } from 'svelte/store';
	import {
		NAVIGATION_MENU_ROOT,
		type NavigationMenuDirection,
		type NavigationMenuRootContext
	} from './context.js';

	export let value = '';
	export let delay = 150;
	export let label = 'Main navigation';
	export let dir: 'ltr' | 'rtl' = 'ltr';
	export let id = `melt-navigation-menu-${++nextNavigationMenuId}`;
	let className = '';
	export { className as class };

	type TriggerRegistration = {
		value: string;
		element: HTMLButtonElement;
		disabled: () => boolean;
	};

	const dispatch = createEventDispatcher<{
		change: { value: string };
		open: { value: string };
		close: { value: string };
	}>();
	const valueStore = writable(value);
	const rovingValueStore = writable('');
	const revision = writable(0);
	const triggers: TriggerRegistration[] = [];
	const contents = new Map<string, HTMLElement>();
	let root: HTMLElement;
	let viewport: HTMLElement | undefined;
	let timer: ReturnType<typeof setTimeout> | undefined;
	let outsideListening = false;
	let rovingValue = '';

	function setRovingValue(nextValue: string): void {
		if (nextValue === rovingValue) return;
		rovingValue = nextValue;
		rovingValueStore.set(nextValue);
	}

	function reconcileRovingValue(preferredValue = value): void {
		const enabled = enabledTriggers();
		const preferred = enabled.find((trigger) => trigger.value === preferredValue);
		const current = enabled.find((trigger) => trigger.value === rovingValue);
		setRovingValue(preferred?.value ?? current?.value ?? enabled[0]?.value ?? '');
	}

	function notifyRegistrationChange(closeUnavailableActive = false): void {
		if (closeUnavailableActive && value && !enabledTriggers().some((trigger) => trigger.value === value)) {
			setValue('');
		}
		reconcileRovingValue();
		revision.update((current) => current + 1);
	}

	function notifyTriggerChange(): void {
		notifyRegistrationChange(true);
	}
	function syncPortalState(nextValue: string): void {
		for (const [contentValue, element] of contents) {
			const active = contentValue === nextValue;
			element.hidden = !active;
			element.dataset.state = active ? 'open' : 'closed';
		}
		if (viewport) {
			viewport.dataset.state = nextValue ? 'open' : 'closed';
			if (nextValue) viewport.removeAttribute('aria-hidden');
			else viewport.setAttribute('aria-hidden', 'true');
		}
	}


	function setValue(nextValue: string) {
		if (nextValue && !isDisabled(nextValue)) setRovingValue(nextValue);
		if (nextValue === value) return;
		const previousValue = value;
		value = nextValue;
		valueStore.set(nextValue);
		syncPortalState(nextValue);
		dispatch('change', { value: nextValue });
		if (nextValue) dispatch('open', { value: nextValue });
		else if (previousValue) dispatch('close', { value: previousValue });
	}

	function toggleValue(nextValue: string) {
		cancelScheduledChange();
		if (!isDisabled(nextValue)) setValue(value === nextValue ? '' : nextValue);
	}

	function scheduleOpen(nextValue: string) {
		cancelScheduledChange();
		if (isDisabled(nextValue) || value === nextValue) return;
		timer = setTimeout(() => setValue(nextValue), Math.max(0, delay));
	}

	function scheduleClose(openValue: string) {
		cancelScheduledChange();
		if (value !== openValue) return;
		timer = setTimeout(() => setValue(''), Math.max(0, delay));
	}

	function cancelScheduledChange() {
		if (timer !== undefined) {
			clearTimeout(timer);
			timer = undefined;
		}
	}

	function close(returnFocus = false) {
		cancelScheduledChange();
		const previousValue = value;
		setValue('');
		if (returnFocus && previousValue) {
			void tick().then(() => triggers.find((trigger) => trigger.value === previousValue)?.element.focus());
		}
	}

	function registerTrigger(
		triggerValue: string,
		element: HTMLButtonElement,
		disabled: () => boolean
	) {
		const registration = { value: triggerValue, element, disabled };
		triggers.push(registration);
		notifyRegistrationChange();
		return () => {
			const index = triggers.indexOf(registration);
			if (index !== -1) triggers.splice(index, 1);
			notifyRegistrationChange(true);
		};
	}

	function registerContent(contentValue: string, element: HTMLElement) {
		contents.set(contentValue, element);
		viewport?.appendChild(element);
		syncPortalState(value);
		return () => {
			contents.delete(contentValue);
		};
	}

	function registerViewport(element: HTMLElement) {
		viewport = element;
		for (const content of contents.values()) viewport.appendChild(content);
		syncPortalState(value);
		return () => {
			if (viewport === element) viewport = undefined;
		};
	}

	function enabledTriggers() {
		return triggers.filter((trigger) => !trigger.disabled());
	}

	function moveTrigger(currentValue: string, direction: NavigationMenuDirection) {
		const enabled = enabledTriggers();
		if (!enabled.length) return;
		const currentIndex = enabled.findIndex((trigger) => trigger.value === currentValue);
		let nextIndex = currentIndex < 0 ? 0 : currentIndex;
		if (direction === 'first') nextIndex = 0;
		else if (direction === 'last') nextIndex = enabled.length - 1;
		else if (direction === 'next') nextIndex = (nextIndex + 1) % enabled.length;
		else nextIndex = (nextIndex - 1 + enabled.length) % enabled.length;
		const next = enabled[nextIndex];
		setRovingValue(next.value);
		next.element.focus();
		if (value) setValue(next.value);
	}

	async function focusContent(contentValue: string) {
		await tick();
		const content = contents.get(contentValue);
		if (!content) return;
		const focusable = content.querySelector<HTMLElement>(
			'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
		);
		(focusable ?? content).focus();
	}

	function getTabIndex(triggerValue: string, currentRovingValue: string, _revision: number): 0 | -1 {
		if (isDisabled(triggerValue)) return -1;
		return currentRovingValue === triggerValue ? 0 : -1;
	}

	function getTriggerId(triggerValue: string) {
		return `${id}-trigger-${encodeURIComponent(triggerValue)}`;
	}

	function getContentId(contentValue: string) {
		return `${id}-content-${encodeURIComponent(contentValue)}`;
	}

	function isDisabled(triggerValue: string) {
		return triggers.find((trigger) => trigger.value === triggerValue)?.disabled() ?? false;
	}

	function handleOutsidePointerDown(event: PointerEvent) {
		if (root && !root.contains(event.target as Node)) close(false);
	}

	function syncOutsideListener(openValue: string) {
		if (typeof document === 'undefined') return;
		if (openValue && !outsideListening) {
			document.addEventListener('pointerdown', handleOutsidePointerDown);
			outsideListening = true;
		} else if (!openValue && outsideListening) {
			document.removeEventListener('pointerdown', handleOutsidePointerDown);
			outsideListening = false;
		}
	}


	const context: NavigationMenuRootContext = {
		value: valueStore,
		rovingValue: rovingValueStore,
		revision,
		getValue: () => value,
		setValue,
		toggleValue,
		scheduleOpen,
		scheduleClose,
		cancelScheduledChange,
		notifyTriggerChange,
		close,
		registerTrigger,
		registerContent,
		registerViewport,
		moveTrigger,
		focusContent,
		getTabIndex,
		getTriggerId,
		getContentId,
		isDisabled,
		dir: () => dir
	};
	setContext(NAVIGATION_MENU_ROOT, context);

	$: valueStore.set(value);
	$: syncPortalState(value);
	$: reconcileRovingValue(value);
	$: syncOutsideListener(value);

	onDestroy(() => {
		cancelScheduledChange();
		if (outsideListening) document.removeEventListener('pointerdown', handleOutsidePointerDown);
	});
</script>

<nav
	{...$$restProps}
	bind:this={root}
	id={id}
	class={`melt-navigation-menu ${className}`.trim()}
	aria-label={label}
	{dir}
	data-state={value ? 'open' : 'closed'}
>
	<ul class="melt-navigation-menu__list">
		<slot />
	</ul>
	<slot name="viewport" />
</nav>
