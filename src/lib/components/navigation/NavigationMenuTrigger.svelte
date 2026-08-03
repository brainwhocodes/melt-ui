<script lang="ts">
	import { getContext, onMount } from 'svelte';
	import {
		NAVIGATION_MENU_ITEM,
		NAVIGATION_MENU_ROOT,
		type NavigationMenuItemContext,
		type NavigationMenuRootContext
	} from './context.js';

	interface Props {
		disabled?: boolean;
		type?: 'button' | 'submit' | 'reset';
		class?: string;
		children?: import('svelte').Snippet;
		[key: string]: any
	}

	let {
		disabled = false,
		type = 'button',
		class: className = '',
		children,
		...rest
	}: Props = $props();


	const root = getContext<NavigationMenuRootContext>(NAVIGATION_MENU_ROOT);
	const item = getContext<NavigationMenuItemContext>(NAVIGATION_MENU_ITEM);
	const activeValue = root.value;
	const rovingValue = root.rovingValue;
	const revision = root.revision;
	let element: HTMLButtonElement | undefined = $state();
	let mounted = $state(false);
	let lastDisabled = $state(disabled);
	let tabIndex: 0 | -1 = $state(-1);
	let itemValue = $derived(item.value());
	let expanded = $derived($activeValue === itemValue);
	$effect(() => {
		tabIndex = disabled ? -1 : root.getTabIndex(itemValue, $rovingValue, $revision);
	});
	$effect(() => {
		if (mounted && disabled !== lastDisabled) {
			lastDisabled = disabled;
			root.notifyTriggerChange();
		}
	});

	onMount(() => {
		mounted = true;
		if (!element) return;
		const unregister = root.registerTrigger(itemValue, element, () => disabled);
		return () => {
			mounted = false;
			unregister();
		};
	});

	function handleClick() {
		root.toggleValue(itemValue);
	}

	function handlePointerEnter(event: PointerEvent) {
		if (event.pointerType !== 'touch') root.scheduleOpen(itemValue);
	}

	function handleKeydown(event: KeyboardEvent) {
		let handled = true;
		switch (event.key) {
			case 'ArrowRight':
				root.moveTrigger(itemValue, root.dir() === 'rtl' ? 'previous' : 'next');
				break;
			case 'ArrowLeft':
				root.moveTrigger(itemValue, root.dir() === 'rtl' ? 'next' : 'previous');
				break;
			case 'Home':
				root.moveTrigger(itemValue, 'first');
				break;
			case 'End':
				root.moveTrigger(itemValue, 'last');
				break;
			case 'ArrowDown':
				if (!disabled) {
					root.setValue(itemValue);
					void root.focusContent(itemValue);
				}
				break;
			case 'Escape':
				root.close(true);
				break;
			default:
				handled = false;
		}
		if (handled) {
			event.preventDefault();
			event.stopPropagation();
		}
	}
</script>

<button
	{...rest}
	bind:this={element}
	class={`melt-navigation-menu__trigger ${className}`.trim()}
	{type}
	{disabled}
	id={root.getTriggerId(itemValue)}
	aria-expanded={expanded}
	aria-controls={root.getContentId(itemValue)}
	tabindex={tabIndex}
	data-state={expanded ? 'open' : 'closed'}
	onclick={handleClick}
	onpointerenter={handlePointerEnter}
	onkeydown={handleKeydown}
>
	{@render children?.()}
	<span class="melt-navigation-menu__trigger-indicator" aria-hidden="true">▾</span>
</button>
