<script lang="ts">
	import { createPinInput } from '$lib/builders/pin-input/create.js';
	import { melt } from '$lib/internal/actions/index.js';
	import { untrack } from 'svelte';
	import { writable } from 'svelte/store';

	interface Props {
		maxLength?: number;
		value?: string[];
		disabled?: boolean;
		class?: string;
		onValueChange?: (value: string[] | undefined) => void;
		[key: string]: any;
	}

	let {
		maxLength = 6,
		value = $bindable([]),
		disabled = false,
		class: className = '',
		onValueChange,
		...rest
	}: Props = $props();

	const valueStore = writable(untrack(() => value ?? []));

	$effect(() => {
		valueStore.set(value ?? []);
	});

	const {
		elements: { root, input, hiddenInput },
	} = untrack(() =>
		createPinInput({
			value: valueStore,
			disabled,
			onValueChange: (next) => {
				value = next.next as any;
				onValueChange?.(next.next as any);
				return next.next;
			},
		})
	);
</script>

<div {...$root} use:root class={`melt-input-otp ${className}`.trim()} {...rest}>
	{#each Array(maxLength) as _}
		<input
			{...$input()}
			use:input
			class="melt-input-otp-cell"
		/>
	{/each}
	<input {...$hiddenInput} use:hiddenInput />
</div>
