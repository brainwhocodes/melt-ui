<script lang="ts">
	import { createToolbar, type CreateToolbarProps, type CreateToolbarGroupProps } from '$lib/index.js';

	export let loop: CreateToolbarProps['loop'] = undefined;
	export let orientation: CreateToolbarProps['orientation'] = undefined;

	export let toolbarGroup1Props: CreateToolbarGroupProps<'multiple'> = {
		type: 'multiple',
		defaultValue: undefined,
		disabled: undefined,
		onValueChange: undefined,
		value: undefined,
	};

	export let toolbarGroup2Props: CreateToolbarGroupProps = {
		type: 'single',
		defaultValue: undefined,
		disabled: undefined,
		onValueChange: undefined,
		value: undefined,
	};

	export let linksFirst = false;
	export let buttonsFirst = false;
	export let linksButtonsOnly = false;

	const {
		elements: { root, button, link, separator },
		builders: { createToolbarGroup },
	} = createToolbar({
		loop,
		orientation,
	});

	const {
		elements: { group: fontGroup, item: fontItem },
	} = createToolbarGroup(toolbarGroup1Props);

	const {
		elements: { group: alignGroup, item: alignItem },
	} = createToolbarGroup(toolbarGroup2Props);
</script>

<main>
	<div {...$root} use:root data-testid="root">
		{#if linksFirst}
			<a href="/" {...$link} use:link data-testid="link-1"> link-1 </a>
		{/if}
		{#if buttonsFirst}
			<button {...$button} use:button data-testid="button-1"> button-1 </button>
		{/if}
		{#if !linksButtonsOnly}
			<div {...$fontGroup} use:fontGroup data-testid="group-1">
				<button {...$fontItem('item-1')} use:fontItem data-testid="item-1"> item-1 </button>
				<button {...$fontItem('item-2')} use:fontItem data-testid="item-2"> item-2 </button>
				<button {...$fontItem('item-3')} use:fontItem data-testid="item-3"> item-3 </button>
			</div>
			<div {...$separator} use:separator></div>
			<div {...$alignGroup} use:alignGroup data-testid="group-2">
				<button {...$alignItem('item-4')} use:alignItem data-testid="item-4"> item-4 </button>
				<button {...$alignItem('item-5')} use:alignItem data-testid="item-5"> item-5 </button>
				<button {...$alignItem('item-6')} use:alignItem data-testid="item-6"> item-6</button>
			</div>
			<div {...$separator} use:separator></div>
		{/if}
		{#if !linksFirst}
			<a href="/" {...$link} use:link data-testid="link-1"> link-1 </a>
		{/if}
		{#if !buttonsFirst}
			<button {...$button} use:button data-testid="button-1"> button-1 </button>
		{/if}
	</div>
</main>
