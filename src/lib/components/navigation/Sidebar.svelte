<script module lang="ts">
	let nextSidebarId = 0;
</script>

<script lang="ts">
	import { onDestroy, onMount, setContext, tick } from 'svelte';
	import { writable } from 'svelte/store';
	import { SIDEBAR_ROOT, type SidebarContext } from './context.js';

	interface Props {
		collapsed?: boolean;
		open?: boolean;
		compact?: boolean;
		label?: string;
		id?: any;
		onchange?: (detail: { collapsed: boolean; open: boolean }) => void;
		onCollapseChange?: (detail: { collapsed: boolean }) => void;
		onOpenChange?: (detail: { open: boolean }) => void;
		class?: string;
		header?: import('svelte').Snippet;
		content?: import('svelte').Snippet;
		children?: import('svelte').Snippet;
		footer?: import('svelte').Snippet;
		[key: string]: any
	}

	let {
		collapsed = $bindable(false),
		open = $bindable(false),
		compact = true,
		label = 'Sidebar',
		id = `melt-sidebar-${++nextSidebarId}`,
		onchange = undefined,
		onCollapseChange = undefined,
		onOpenChange = undefined,
		class: className = '',
		header,
		content,
		children,
		footer,
		...rest
	}: Props = $props();


	const collapsedStore = writable(collapsed);
	const openStore = writable(open);
	let isMobile = $state(false);
	let toggleButton: HTMLButtonElement | undefined = $state();
	let escapeListening = false;

	function setCollapsed(next: boolean) {
		if (collapsed === next) return;
		collapsed = next;
		collapsedStore.set(next);
		onCollapseChange?.({ collapsed: next });
		onchange?.({ collapsed: next, open });
	}

	function setOpen(next: boolean, returnFocus = false) {
		if (open === next) return;
		open = next;
		openStore.set(next);
		onOpenChange?.({ open: next });
		onchange?.({ collapsed, open: next });
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

	$effect(() => {
		collapsedStore.set(collapsed);
	});
	$effect(() => {
		openStore.set(open);
	});
	$effect(() => {
		syncEscapeListener(isMobile && open);
	});

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
	{...rest}
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
		onclick={toggle}
	>
		<span aria-hidden="true">☰</span>
	</button>

	{#if isMobile && open}
		<button class="melt-sidebar__backdrop"
			type="button"
			aria-label="Close sidebar"
			tabindex="-1"
			onclick={() => setOpen(false, true)}></button>
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
			{@render header?.()}
		</header>
		<div class="melt-sidebar__content">
			{#if content}{@render content()}{:else}{@render children?.()}{/if}
		</div>
		<footer class="melt-sidebar__footer">
			{@render footer?.()}
		</footer>
	</aside>
</div>
