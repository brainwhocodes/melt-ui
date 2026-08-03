<script context="module" lang="ts">
	let nextSidebarId = 0;
</script>

<script lang="ts">
	import { createEventDispatcher, onDestroy, onMount, setContext, tick } from 'svelte';
	import { writable } from 'svelte/store';
	import { SIDEBAR_ROOT, type SidebarContext } from './context.js';

	export let collapsed = false;
	export let open = false;
	export let compact = true;
	export let label = 'Sidebar';
	export let id = `melt-sidebar-${++nextSidebarId}`;
	let className = '';
	export { className as class };

	const dispatch = createEventDispatcher<{
		change: { collapsed: boolean; open: boolean };
		collapseChange: { collapsed: boolean };
		openChange: { open: boolean };
	}>();
	const collapsedStore = writable(collapsed);
	const openStore = writable(open);
	let isMobile = false;
	let toggleButton: HTMLButtonElement;
	let escapeListening = false;

	function setCollapsed(next: boolean) {
		if (collapsed === next) return;
		collapsed = next;
		collapsedStore.set(next);
		dispatch('collapseChange', { collapsed: next });
		dispatch('change', { collapsed: next, open });
	}

	function setOpen(next: boolean, returnFocus = false) {
		if (open === next) return;
		open = next;
		openStore.set(next);
		dispatch('openChange', { open: next });
		dispatch('change', { collapsed, open: next });
		if (!next && returnFocus) void tick().then(() => toggleButton?.focus());
	}

	function toggle() {
		if (isMobile) setOpen(!open);
		else setCollapsed(!collapsed);
	}

	function handleEscape(event: KeyboardEvent) {
		if (event.key !== 'Escape' || !isMobile || !open) return;
		event.preventDefault();
		setOpen(false, true);
	}

	function syncEscapeListener(active: boolean) {
		if (typeof window === 'undefined') return;
		if (active && !escapeListening) {
			window.addEventListener('keydown', handleEscape);
			escapeListening = true;
		} else if (!active && escapeListening) {
			window.removeEventListener('keydown', handleEscape);
			escapeListening = false;
		}
	}

	const context: SidebarContext = {
		collapsed: collapsedStore,
		open: openStore,
		toggle
	};
	setContext(SIDEBAR_ROOT, context);

	$: collapsedStore.set(collapsed);
	$: openStore.set(open);
	$: syncEscapeListener(isMobile && open);

	onMount(() => {
		if (typeof window.matchMedia !== 'function') return;
		const media = window.matchMedia('(max-width: 47.999rem)');
		const update = () => {
			isMobile = media.matches;
		};
		update();
		media.addEventListener('change', update);
		return () => media.removeEventListener('change', update);
	});

	onDestroy(() => {
		if (escapeListening) window.removeEventListener('keydown', handleEscape);
	});
</script>


<div
	{...$$restProps}
	class={`melt-sidebar-shell ${className}`.trim()}
	data-collapsed={collapsed ? '' : undefined}
	data-open={open ? '' : undefined}
	data-compact={compact ? '' : undefined}
	data-mobile={isMobile ? '' : undefined}
>
	<button
		bind:this={toggleButton}
		class="melt-sidebar__toggle"
		type="button"
		aria-controls={id}
		aria-expanded={isMobile ? open : !collapsed}
		aria-label={isMobile ? (open ? 'Close sidebar' : 'Open sidebar') : collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
		on:click={toggle}
	>
		<span aria-hidden="true">☰</span>
	</button>

	{#if isMobile && open}
		<button class="melt-sidebar__backdrop"
			type="button"
			aria-label="Close sidebar"
			tabindex="-1"
			on:click={() => setOpen(false, true)}></button>
	{/if}

	<aside
		{id}
		class="melt-sidebar"
		aria-label={label}
		aria-hidden={(isMobile && !open) || (!isMobile && collapsed && !compact) ? 'true' : undefined}
		inert={(isMobile && !open) || (!isMobile && collapsed && !compact) || undefined}
		data-state={isMobile ? (open ? 'open' : 'closed') : collapsed ? 'collapsed' : 'expanded'}
	>
		<header class="melt-sidebar__header">
			<slot name="header" />
		</header>
		<div class="melt-sidebar__content">
			<slot name="content"><slot /></slot>
		</div>
		<footer class="melt-sidebar__footer">
			<slot name="footer" />
		</footer>
	</aside>
</div>
