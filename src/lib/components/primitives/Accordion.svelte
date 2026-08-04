<script lang="ts">
	import { createAccordion } from '$lib/builders/accordion/create.js';
	import { melt } from '$lib/internal/actions/index.js';
	import { untrack, type Snippet } from 'svelte';

	export interface AccordionItemData {
		value: string;
		title: string;
		content: string;
		disabled?: boolean;
	}

	interface Props {
		items?: AccordionItemData[];
		value?: string | string[];
		multiple?: boolean;
		disabled?: boolean;
		class?: string;
		onValueChange?: (value: string | string[] | undefined) => void;
		children?: Snippet;
		[key: string]: any;
	}

	let {
		items = [],
		value = $bindable(),
		multiple = false,
		disabled = false,
		class: className = '',
		onValueChange,
		children,
		...rest
	}: Props = $props();

	const {
		elements: { root, item, trigger, content },
		helpers: { isSelected },
	} = untrack(() =>
		createAccordion({
			multiple: multiple as any,
			disabled,
			onValueChange: (next) => {
				value = next.next as any;
				onValueChange?.(next.next as any);
				return next.next;
			},
		})
	);
</script>

<div {...$root} use:root class={`melt-accordion ${className}`.trim()} {...rest}>
	{#if children}
		{@render children()}
	{:else}
		{#each items as itemData (itemData.value)}
			<div
				{...$item(itemData.value)}
				use:item
				class="melt-accordion-item"
				data-state={$isSelected(itemData.value) ? 'open' : 'closed'}
			>
				<h3 class="melt-accordion-header">
					<button
						{...$trigger(itemData.value)}
						use:trigger
						class="melt-accordion-trigger"
						data-state={$isSelected(itemData.value) ? 'open' : 'closed'}
					>
						{itemData.title}
					</button>
				</h3>
				{#if $isSelected(itemData.value)}
					<div
						{...$content(itemData.value)}
						use:content
						class="melt-accordion-content"
						data-state="open"
					>
						<p>{itemData.content}</p>
					</div>
				{/if}
			</div>
		{/each}
	{/if}
</div>
