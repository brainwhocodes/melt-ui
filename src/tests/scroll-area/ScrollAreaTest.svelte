<script lang="ts">
	import { createScrollArea, melt, type CreateScrollAreaProps } from '$lib/index.js';
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

	export let height = '288px';
	export let width = '490px';

	export let type: $$Props['type'] = 'hover';
	export let showReplacementControls = false;
	let viewportKey = 0;
	let contentKey = 0;

	const {
		elements: { root, content, viewport, corner, scrollbarY, thumbY, scrollbarX, thumbX },
	} = createScrollArea(
		removeUndefined({
			type,
			...$$restProps,
		})
	);
</script>

{#if showReplacementControls}
	<button on:click={() => (contentKey += 1)}>Replace content</button>
	<button on:click={() => (viewportKey += 1)}>Replace viewport</button>
{/if}

<div
	use:melt={$root}
	class="surface-dd98ba04e8"
	data-testid="root"
	style:width
	style:height
>
	{#key viewportKey}
	<div use:melt={$viewport} class="surface-21c0571fcb" data-testid="viewport">
			{#key contentKey}
		<div use:melt={$content} data-testid="content">
			<div class="surface-c7bdfb16e3" data-testid="inner-content">
				<h4 class="surface-326c4ede34">Endless Flavors</h4>
				<div data-testid="hover">Hover me please</div>
				{#each flavors as flavor (flavor)}
					<div class="surface-6c4a72920c">
						{flavor}
					</div>
					<div role="separator" class="surface-e612aa3495" />
				{/each}
			</div>
		</div>
			{/key}
	</div>
	{/key}
	<div
		use:melt={$scrollbarY}
		data-testid="scrollbar-y"
		class="surface-ef0fe9b491"
	>
		<div
			use:melt={$thumbY}
			data-testid="thumb-y"
			class="surface-11f7db2078"
		/>
	</div>

	<div
		use:melt={$scrollbarX}
		data-testid="scrollbar-x"
		class="surface-dc91fd5f6b"
	>
		<div use:melt={$thumbX} data-testid="thumb-x" class="surface-c948684bbb" />
	</div>
	<div use:melt={$corner} />
</div>
