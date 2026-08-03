<script lang="ts">
	import { beforeNavigate } from '$app/navigation';
	import { createSwitch } from '$lib/index.js';
	import { generateId } from '$lib/internal/helpers/index.js';
	import { writable } from 'svelte/store';

	interface Props {
		checked?: boolean | undefined;
		id?: string;
		keepState?: boolean;
		children?: import('svelte').Snippet;
	}

	let {
		checked = $bindable(false),
		id = generateId(),
		keepState = false,
		children
	}: Props = $props();
	const checkedStore = writable(checked);

	const {
		elements: { root },
		states: { checked: isChecked },
	} = createSwitch({
		checked: checkedStore,
	});

	isChecked.subscribe((value) => {
		checked = value;
	});

	beforeNavigate(() => {
		if (keepState) return;
		checkedStore.set(false);
	});

	let labelId = generateId();
</script>

<div class="surface-ecf965eff6">
	<label class="surface-66c0cc5b81" id={labelId} for={id}>{@render children?.()}</label>
	<button
		{...$root} use:root
		class="force-dark surface-36e9efd785"
		{id}
		aria-labelledby={labelId}
	>
		<div class="thumb surface-a5b7e6f7d3"></div>
	</button>
</div>

<style lang="scss">
	button {
		--w: 2.75rem;
		--padding: 0.125rem;
		width: var(--w);
	}

	.thumb {
		--size: 1.25rem;
		width: var(--size);
		height: var(--size);
		transform: translateX(var(--padding));
	}

	:global([data-state='checked']) .thumb {
		transform: translateX(calc(var(--w) - var(--size) - var(--padding)));
	}
</style>
