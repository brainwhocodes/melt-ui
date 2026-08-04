<script lang="ts">
	import { createCheckbox } from '$lib/builders/checkbox/create.js';
	import { melt } from '$lib/internal/actions/index.js';
	import { untrack } from 'svelte';
	import { writable } from 'svelte/store';

	interface Props {
		checked?: boolean | 'indeterminate';
		disabled?: boolean;
		required?: boolean;
		name?: string;
		value?: string;
		label?: string;
		class?: string;
		onCheckedChange?: (checked: boolean | 'indeterminate') => void;
		[key: string]: any;
	}

	let {
		checked = $bindable(false),
		disabled = false,
		required = false,
		name,
		value = 'on',
		label = '',
		class: className = '',
		onCheckedChange,
		...rest
	}: Props = $props();

	const checkedStore = writable(untrack(() => checked));

	$effect(() => {
		if (checked !== undefined) {
			checkedStore.set(checked);
		}
	});

	const {
		elements: { root, input },
		states: { checked: isChecked },
	} = untrack(() =>
		createCheckbox({
			checked: checkedStore,
			disabled,
			required,
			name,
			value,
			onCheckedChange: (next) => {
				checked = next.next;
				onCheckedChange?.(next.next);
				return next.next;
			},
		})
	);
</script>

<label class={`melt-checkbox-wrapper ${className}`.trim()}>
	<button
		{...$root}
		use:root
		aria-label={label || 'Checkbox'}
		class="melt-checkbox"
		data-state={$isChecked === 'indeterminate' ? 'indeterminate' : $isChecked ? 'checked' : 'unchecked'}
		{...rest}
	>
		{#if $isChecked === true}
			<svg class="melt-checkbox-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
				<polyline points="20 6 9 17 4 12"></polyline>
			</svg>
		{:else if $isChecked === 'indeterminate'}
			<svg class="melt-checkbox-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
				<line x1="5" y1="12" x2="19" y2="12"></line>
			</svg>
		{/if}
	</button>
	<input {...$input} use:input />
	{#if label}
		<span class="melt-checkbox-label">{label}</span>
	{/if}
</label>
