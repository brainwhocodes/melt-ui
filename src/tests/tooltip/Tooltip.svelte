<script lang="ts">
	import { createTooltip, type CreateTooltipProps } from '$lib/index.js';
	import type { Writable } from 'svelte/store';
	import { removeUndefined } from '../utils.js';

	type $$Props = CreateTooltipProps;

	export let open: Writable<boolean> | undefined = undefined;
	export let group: CreateTooltipProps['group'] = undefined;
	export let closeOnPointerDown: CreateTooltipProps['closeOnPointerDown'] = false;
	export let ids: CreateTooltipProps['ids'] = undefined;

	const {
		elements: { content, trigger },
		options,
	} = createTooltip(
		removeUndefined({
			open,
			group,
			closeOnPointerDown,
			openDelay: 0,
			closeDelay: 0,
			ids,
			...$$restProps,
		})
	);

	$: options.group.set(group);
</script>

<button {...$trigger} use:trigger data-testid="trigger">Trigger</button>
<div {...$content} use:content data-testid="content" class="surface-9b60fd5cfa">
	Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae provident non quam,
	distinctio dolorum sunt sed minus adipisci. Commodi, alias minima! Nisi architecto corrupti quam
	quisquam totam laborum voluptatem accusantium. Lorem ipsum, dolor sit amet consectetur adipisicing
	elit. Consectetur excepturi dolore quaerat atque laudantium sapiente reiciendis ipsum quisquam eum
	officiis corporis iure nam dicta maiores quam, ipsa accusamus obcaecati. Quidem? Lorem ipsum dolor
	sit amet, consectetur adipisicing elit. Laudantium perspiciatis excepturi eius deleniti laborum
	vero iure, corporis nihil animi consectetur debitis optio blanditiis quia sed velit, accusamus et,
	tempora vel.
</div>
