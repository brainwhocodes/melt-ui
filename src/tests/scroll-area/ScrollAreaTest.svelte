<script lang="ts">
	import { untrack } from 'svelte';
	import { createScrollArea, type CreateScrollAreaProps } from '$lib/index.js';
	import { removeUndefined } from '../utils.js';

	const flavors = [
		'Vanilla',
		'Chocolate',
		'Strawberry',
		'Mint Chocolate Chip',
		'Cookies and Cream',
		'Rocky Road',
		'Pistachio',
		'Neapolitan',
		'Butter Pecan',
		'Salted Caramel',
		'Coffee',
		'Mango',
		'Raspberry Ripple',
		'Lemon Sorbet',
		'Green Tea',
		'Coconut',
		'Black Cherry',
		'Banana',
		'Almond Fudge',
		'Cinnamon',
		'Blueberry Cheesecake',
		'Tiramisu',
		'Red Velvet',
		'Matcha',
		'Peanut Butter Cup',
		'Cookie Dough',
		'Rum Raisin',
		'Birthday Cake',
		'Lychee',
		'Honey Lavender',
	];

	type $$Props = CreateScrollAreaProps & {
		height?: string;
		width?: string;
	};


	interface Props {
		height?: string;
		width?: string;
		type?: $$Props['type'];
		showReplacementControls?: boolean;
		[key: string]: any
	}

	let {
		height = '288px',
		width = '490px',
		type = 'hover',
		showReplacementControls = false,
		...rest
	}: Props = $props();
	let viewportKey = $state(0);
	let contentKey = $state(0);

	const {
		elements: { root, content, viewport, corner, scrollbarY, thumbY, scrollbarX, thumbX },
	} = createScrollArea(
		removeUndefined(
			untrack(() => ({
				type,
				...rest,
			}))
		)
	);
</script>

{#if showReplacementControls}
	<button onclick={() => (contentKey += 1)}>Replace content</button>
	<button onclick={() => (viewportKey += 1)}>Replace viewport</button>
{/if}

<div
	{...$root} use:root
	class="surface-dd98ba04e8"
	data-testid="root"
	style:width
	style:height
>
	{#key viewportKey}
	<div {...$viewport} use:viewport class="surface-21c0571fcb" data-testid="viewport">
			{#key contentKey}
		<div {...$content} use:content data-testid="content">
			<div class="surface-c7bdfb16e3" data-testid="inner-content">
				<h4 class="surface-326c4ede34">Endless Flavors</h4>
				<div data-testid="hover">Hover me please</div>
				{#each flavors as flavor (flavor)}
					<div class="surface-6c4a72920c">
						{flavor}
					</div>
					<div role="separator" class="surface-e612aa3495"></div>
				{/each}
			</div>
		</div>
			{/key}
	</div>
	{/key}
	<div
		{...$scrollbarY} use:scrollbarY
		data-testid="scrollbar-y"
		class="surface-ef0fe9b491"
	>
		<div {...$thumbY} use:thumbY
			data-testid="thumb-y"
			class="surface-11f7db2078"></div>
	</div>

	<div
		{...$scrollbarX} use:scrollbarX
		data-testid="scrollbar-x"
		class="surface-dc91fd5f6b"
	>
		<div {...$thumbX} use:thumbX data-testid="thumb-x" class="surface-c948684bbb"></div>
	</div>
	<div {...$corner} use:corner></div>
</div>
