<script lang="ts">
	import { createSwitch } from '$lib/builders/switch/create.js';
	import { melt } from '$lib/internal/actions/index.js';
	import { untrack } from 'svelte';

	interface Props {
		checked?: boolean;
		disabled?: boolean;
		required?: boolean;
		name?: string;
		value?: string;
		label?: string;
		class?: string;
		onCheckedChange?: (checked: boolean) => void;
		[key: string]: any;
	}

	let {
		checked = $bindable(false),
		disabled = false,
		required = false,
		name,
		value,
		label = '',
		class: className = '',
		onCheckedChange,
		...rest
	}: Props = $props();

	const {
		elements: { root, input },
		states: { checked: isChecked },
	} = untrack(() =>
		createSwitch({
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

<label class={`melt-switch-wrapper ${className}`.trim()}>
	<button
		{...$root}
		use:root
		class="melt-switch"
		data-state={$isChecked ? 'checked' : 'unchecked'}
		{...rest}
	>
		<span class="melt-switch-thumb" data-state={$isChecked ? 'checked' : 'unchecked'}></span>
	</button>
	<input {...$input} use:input />
	{#if label}
		<span class="melt-switch-label">{label}</span>
	{/if}
</label>
