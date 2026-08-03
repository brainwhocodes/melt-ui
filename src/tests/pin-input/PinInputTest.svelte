<script lang="ts">
	import { createPinInput, type CreatePinInputProps } from '$lib/index.js';

	interface Props {
		placeholder?: CreatePinInputProps['placeholder'];
		name?: CreatePinInputProps['name'];
		disabled?: CreatePinInputProps['disabled'];
		type?: CreatePinInputProps['type'];
		defaultValue?: CreatePinInputProps['defaultValue'];
		value?: CreatePinInputProps['value'];
		onValueChange?: CreatePinInputProps['onValueChange'];
	}

	let {
		placeholder = '○',
		name = undefined,
		disabled = false,
		type = 'text',
		defaultValue = ['1', '2', '3', '4', '5'],
		value = undefined,
		onValueChange = undefined
	}: Props = $props();

	const {
		elements: { root, input, hiddenInput },
	} = createPinInput({
		placeholder,
		name,
		disabled,
		type,
		defaultValue,
		value,
		onValueChange,
	});
</script>

<main>
	<div {...$root} use:root data-testid="root">
		{#each Array(5) as _, i}
			<input {...$input()} use:input data-testid="input-{i + 1}" />
		{/each}
		<input {...$hiddenInput} use:hiddenInput data-testid="hidden-input" />
	</div>
</main>
