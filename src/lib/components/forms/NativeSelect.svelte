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

	let className = '';
	export { className as class };
	export let id: HTMLSelectAttributes['id'] = undefined;
	export let value: HTMLSelectAttributes['value'] = undefined;
	export let invalid: boolean | undefined = undefined;
	export let disabled: HTMLSelectAttributes['disabled'] = undefined;
	export let required: HTMLSelectAttributes['required'] = undefined;

	type $$Props = HTMLSelectAttributes & {
		class?: string;
		invalid?: boolean;
	};

	const fieldContext = getContext<Readable<FieldContextValue | null>>('melt-field') ?? readable(null);

	$: effectiveId = id ?? $fieldContext?.controlId;
	$: isInvalid = invalid ?? $fieldContext?.invalid ?? false;
	$: isDisabled = disabled ?? $fieldContext?.disabled ?? false;
	$: isRequired = required ?? $fieldContext?.required ?? false;
	$: describedBy = $$restProps['aria-describedby'] ?? $fieldContext?.describedBy;
	$: errorMessage = $$restProps['aria-errormessage'] ?? (isInvalid ? $fieldContext?.errorId : undefined);
</script>

<select
	{...$$restProps}
	id={effectiveId}
	bind:value
	on:input
	on:change
	on:focus
	on:blur
	on:keydown
	on:keyup
	disabled={isDisabled}
	required={isRequired}
	aria-invalid={isInvalid || undefined}
	aria-describedby={describedBy}
	aria-errormessage={errorMessage}
	class={`melt-native-select ${className}`.trim()}
	data-invalid={isInvalid || undefined}
>
	<slot />
</select>
