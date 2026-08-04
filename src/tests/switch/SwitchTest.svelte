<script lang="ts">
	import { untrack } from 'svelte';
	import { createSwitch, type CreateSwitchProps } from '$lib/index.js';

	interface Props {
		checked?: CreateSwitchProps['checked'];
		defaultChecked?: CreateSwitchProps['defaultChecked'];
		disabled?: CreateSwitchProps['disabled'];
		name?: CreateSwitchProps['name'];
		onCheckedChange?: CreateSwitchProps['onCheckedChange'];
		required?: CreateSwitchProps['required'];
		value?: CreateSwitchProps['value'];
	}

	let {
		checked = undefined,
		defaultChecked = undefined,
		disabled = undefined,
		name = undefined,
		onCheckedChange = undefined,
		required = undefined,
		value = undefined
	}: Props = $props();

	const {
		elements: { root, input },
	} = createSwitch(
		untrack(() => ({
			checked,
			defaultChecked,
			disabled,
			name,
			onCheckedChange,
			required,
			value,
		}))
	);
</script>

<main>
	<form>
		<label id="switch-label" for="switch" data-testid="label"> Airplane mode </label>
		<button {...$root} use:root id="switch" aria-labelledby="switch-label" data-testid="switch"></button>
		<input {...$input} use:input data-testid="input" />
	</form>
</main>
