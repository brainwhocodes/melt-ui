<script lang="ts">
	import { beforeNavigate } from '$app/navigation';
	import { createSwitch, melt } from '$lib/index.js';
	import { generateId } from '$lib/internal/helpers/index.js';
	import { writable } from 'svelte/store';

	export let checked: boolean | undefined = false;
	export let id: string = generateId();
	export let keepState = false;
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
	<label class="surface-66c0cc5b81" id={labelId} for={id}><slot /></label>
	<button
		use:melt={$root}
		class="force-dark surface-36e9efd785"
		{id}
		aria-labelledby={labelId}
	>
		<div class="thumb surface-a5b7e6f7d3" />
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
