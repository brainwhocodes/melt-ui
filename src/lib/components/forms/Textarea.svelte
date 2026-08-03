<script lang="ts">
	import { getContext } from 'svelte';
	import { readable, type Readable } from 'svelte/store';
	import type { HTMLTextareaAttributes } from 'svelte/elements';

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
		id?: HTMLTextareaAttributes['id'];
		value?: HTMLTextareaAttributes['value'];
		invalid?: boolean | undefined;
		disabled?: HTMLTextareaAttributes['disabled'];
		required?: HTMLTextareaAttributes['required'];
		[key: string]: any
	}

	let {
		class: className = '',
		id = undefined,
		value = $bindable(undefined),
		invalid = undefined,
		disabled = undefined,
		required = undefined,
		...rest
	}: Props = $props();

	type $$Props = HTMLTextareaAttributes & {
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

<textarea
	{...rest}
	id={effectiveId}
	bind:value
	disabled={isDisabled}
	required={isRequired}
	aria-invalid={isInvalid || undefined}
	aria-describedby={describedBy}
	aria-errormessage={errorMessage}
	class={`melt-textarea ${className}`.trim()}
	data-invalid={isInvalid || undefined}
></textarea>
