<script lang="ts">
	import { getContext } from 'svelte';
	import { readable, type Readable } from 'svelte/store';
	import type { HTMLSelectAttributes } from 'svelte/elements';

	type FieldContextValue = {
		controlId?: string;
		describedBy?: string;
		errorId?: string;
		invalid: boolean;
		disabled: boolean;
		required: boolean;
	};


	interface Props {
		class?: string;
		id?: HTMLSelectAttributes['id'];
		value?: HTMLSelectAttributes['value'];
		invalid?: boolean | undefined;
		disabled?: HTMLSelectAttributes['disabled'];
		required?: HTMLSelectAttributes['required'];
		children?: import('svelte').Snippet;
		[key: string]: any
	}

	let {
		class: className = '',
		id = undefined,
		value = $bindable(undefined),
		invalid = undefined,
		disabled = undefined,
		required = undefined,
		children,
		...rest
	}: Props = $props();

	type $$Props = HTMLSelectAttributes & {
		class?: string;
		invalid?: boolean;
	};

	const fieldContext = getContext<Readable<FieldContextValue | null>>('melt-field') ?? readable(null);

	let effectiveId = $derived(id ?? $fieldContext?.controlId);
	let isInvalid = $derived(invalid ?? $fieldContext?.invalid ?? false);
	let isDisabled = $derived(disabled ?? $fieldContext?.disabled ?? false);
	let isRequired = $derived(required ?? $fieldContext?.required ?? false);
	let describedBy = $derived(rest['aria-describedby'] ?? $fieldContext?.describedBy);
	let errorMessage = $derived(rest['aria-errormessage'] ?? (isInvalid ? $fieldContext?.errorId : undefined));
</script>

<select
	{...rest}
	id={effectiveId}
	bind:value
	disabled={isDisabled}
	required={isRequired}
	aria-invalid={isInvalid || undefined}
	aria-describedby={describedBy}
	aria-errormessage={errorMessage}
	class={`melt-native-select ${className}`.trim()}
	data-invalid={isInvalid || undefined}
>
	{@render children?.()}
</select>
