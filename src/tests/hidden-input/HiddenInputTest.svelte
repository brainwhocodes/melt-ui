<script lang="ts" module>
	export type HiddenInputProps = CreateHiddenInputProps & {
		onChange?: (event: Event) => void;
	};
</script>

<script lang="ts">
	import {
		createHiddenInput,
		type CreateHiddenInputProps,
	} from '$lib/builders/hidden-input/index.js';
	import { noop } from '$lib/internal/helpers/callbacks.js';

	type $$Props = HiddenInputProps;
	interface Props {
		name?: $$Props['name'];
		value: $$Props['value'];
		disabled?: $$Props['disabled'];
		required?: $$Props['required'];
		onChange?: $$Props['onChange'];
	}

	let {
		name = undefined,
		value,
		disabled = undefined,
		required = undefined,
		onChange = noop
	}: Props = $props();

	const hiddenInput = createHiddenInput({
		name,
		value,
		disabled,
		required,
	});
</script>

<input {...$hiddenInput} use:hiddenInput onchange={onChange} data-testid="input" />
