<script context="module" lang="ts">
	let nextFieldId = 0;
</script>

<script lang="ts">
	import { onMount, setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import type { HTMLAttributes } from 'svelte/elements';

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
	export let id: HTMLAttributes<HTMLDivElement>['id'] = undefined;
	export let label: string | undefined = undefined;
	export let description: string | undefined = undefined;
	export let error: string | undefined = undefined;
	export let required = false;
	export let invalid = false;
	export let disabled = false;

	type $$Props = HTMLAttributes<HTMLDivElement> & {
		class?: string;
		label?: string;
		description?: string;
		error?: string;
		required?: boolean;
		invalid?: boolean;
		disabled?: boolean;
	};

	let generatedId: string | undefined;
	const fieldContext = writable<FieldContextValue>({
		invalid: false,
		disabled: false,
		required: false
	});
	setContext('melt-field', fieldContext);

	onMount(() => {
		generatedId = `melt-field-${++nextFieldId}`;
	});

	$: fieldId = id ?? generatedId;
	$: controlId = fieldId ? `${fieldId}-control` : undefined;
	$: descriptionId = fieldId ? `${fieldId}-description` : undefined;
	$: errorId = fieldId ? `${fieldId}-error` : undefined;
	$: hasDescription = Boolean(description || $$slots.description);
	$: hasError = Boolean(error || $$slots.error);
	$: isInvalid = invalid || hasError;
	$: describedBy = [hasDescription ? descriptionId : undefined, hasError ? errorId : undefined]
		.filter(Boolean)
		.join(' ') || undefined;
	$: fieldContext.set({ controlId, describedBy, errorId: hasError ? errorId : undefined, invalid: isInvalid, disabled, required });
</script>

<div
	{...$$restProps}
	id={fieldId}
	class={`melt-field ${className}`.trim()}
	data-invalid={isInvalid || undefined}
	data-disabled={disabled || undefined}
	data-required={required || undefined}
>
	{#if label || $$slots.label}
		<label class="melt-field__label" for={controlId}>
			<slot name="label">{label}</slot>
			{#if required}<span class="melt-field__required" aria-hidden="true">*</span>{/if}
		</label>
	{/if}

	<div class="melt-field__control"><slot /></div>

	{#if hasDescription}
		<div class="melt-field__description" id={descriptionId}>
			<slot name="description">{description}</slot>
		</div>
	{/if}

	{#if hasError}
		<div class="melt-field__error" id={errorId}>
			<slot name="error">{error}</slot>
		</div>
	{/if}
</div>
