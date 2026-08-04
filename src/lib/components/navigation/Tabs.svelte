<script lang="ts">
	import { createTabs } from '$lib/builders/tabs/create.js';
	import { melt } from '$lib/internal/actions/index.js';
	import { untrack, type Snippet } from 'svelte';
	import { writable } from 'svelte/store';

	export interface TabData {
		value: string;
		label: string;
		content?: string;
		disabled?: boolean;
	}

	interface Props {
		tabs?: TabData[];
		value?: string;
		orientation?: 'horizontal' | 'vertical';
		class?: string;
		onValueChange?: (value: string | undefined) => void;
		children?: Snippet;
		[key: string]: any;
	}

	let {
		tabs = [],
		value = $bindable(),
		orientation = 'horizontal',
		class: className = '',
		onValueChange,
		children,
		...rest
	}: Props = $props();

	const valueStore = writable(untrack(() => value ?? tabs[0]?.value));

	$effect(() => {
		if (value !== undefined) {
			valueStore.set(value);
		}
	});

	const {
		elements: { root, list, trigger, content },
		states: { value: currentValue },
	} = untrack(() =>
		createTabs({
			defaultValue: untrack(() => tabs[0]?.value),
			value: valueStore,
			orientation,
			onValueChange: (next) => {
				value = next.next;
				onValueChange?.(next.next);
				return next.next;
			},
		})
	);
</script>

<div
	{...$root}
	use:root
	class={`melt-tabs ${className}`.trim()}
	data-orientation={orientation}
	{...rest}
>
	<div {...$list} use:list class="melt-tabs-list" aria-label="Tabs navigation">
		{#each tabs as tab (tab.value)}
			<button
				{...$trigger(tab.value)}
				use:trigger
				class="melt-tabs-trigger"
				data-state={$currentValue === tab.value ? 'active' : 'inactive'}
				disabled={tab.disabled}
			>
				{tab.label}
			</button>
		{/each}
	</div>
	{#if children}
		{@render children()}
	{:else}
		{#each tabs as tab (tab.value)}
			<div
				{...$content(tab.value)}
				use:content
				class="melt-tabs-content"
				hidden={$currentValue !== tab.value}
			>
				{tab.content}
			</div>
		{/each}
	{/if}
</div>
