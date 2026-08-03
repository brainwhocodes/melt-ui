<script lang="ts" module>
	import Dialog from './Dialog.svelte';
	import Popover from './Popover.svelte';
	import Select from './Select.svelte';
	import DropdownMenu from './DropdownMenu.svelte';

	const components = {
		dialog: Dialog,
		popover: Popover,
		select: Select,
		'dropdown-menu': DropdownMenu,
	} as const;

	export type Structure = {
		name: keyof typeof components;
		children?: Structure[];
	};
	export const structure: Structure = {
		name: 'dialog',
		children: [
			{
				name: 'dialog',
				children: [
					{
						name: 'dropdown-menu',
						children: [{ name: 'select' }],
					},
				],
			},
			{
				name: 'popover',
				children: [{ name: 'dialog' }, { name: 'popover' }],
			},
			{ name: 'select' },
		],
	};
</script>

<script lang="ts">
	import PortalNested from './PortalNested.svelte';
	import type { CreateDialogProps } from '$lib/index.js';


	interface Props {
		portal: CreateDialogProps['portal'];
		forceVisible: CreateDialogProps['forceVisible'];
		cmp?: Structure;
		isRoot?: boolean;
	}

	let {
		portal,
		forceVisible,
		cmp = structure,
		isRoot = true
	}: Props = $props();
	let resolvedCmp = $derived(components[cmp.name]);
</script>

{#if isRoot}
	{@const SvelteComponent = resolvedCmp}
	<main>
		<SvelteComponent {portal} {forceVisible}>
			{#each cmp.children ?? [] as child}
				<PortalNested cmp={child} isRoot={false} {portal} {forceVisible} />
			{/each}
		</SvelteComponent>
	</main>
{:else}
	{@const SvelteComponent_1 = resolvedCmp}
	<SvelteComponent_1 {portal} {forceVisible}>
		{#each cmp.children ?? [] as child}
			<PortalNested cmp={child} isRoot={false} {portal} {forceVisible} />
		{/each}
	</SvelteComponent_1>
{/if}
