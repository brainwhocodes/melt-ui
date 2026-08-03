<script lang="ts">
	import { tick } from 'svelte';
	import Button from './Button.svelte';

	interface Props {
		label: string;
		value: string;
		emptyValue?: string;
		editing?: boolean;
		disabled?: boolean;
		loading?: boolean;
		error?: string | undefined;
		saveLabel?: string;
		cancelLabel?: string;
		class?: string;
		onsave?: (detail: { previousValue: string; value: string }) => void;
		oncancel?: (detail: { previousValue: string }) => void;
		[key: string]: any;
	}

	let {
		label,
		value = $bindable(),
		emptyValue = '—',
		editing = $bindable(false),
		disabled = false,
		loading = false,
		error = $bindable(undefined),
		saveLabel = 'Save',
		cancelLabel = 'Cancel',
		class: className = '',
		onsave = undefined,
		oncancel = undefined,
		...rest
	}: Props = $props();

	let draft = $state(value);
	let previousValue = $state(value);
	let input: HTMLInputElement | undefined = $state();
	let root: HTMLDivElement | undefined = $state();

	let displayValue = $derived(value || emptyValue);

	$effect(() => {
		if (!editing) {
			draft = value;
			previousValue = value;
			error = undefined;
		}
	});

	$effect(() => {
		if (editing && input) {
			input.focus();
			input.select();
		}
	});

	function startEditing() {
		if (disabled || loading) return;
		draft = value;
		previousValue = value;
		error = undefined;
		editing = true;
	}

	async function focusDisplayButton() {
		await tick();
		root
			?.querySelector<HTMLButtonElement>('.melt-inline-edit__display')
			?.focus();
	}

	function cancelEditing() {
		draft = previousValue;
		error = undefined;
		editing = false;
		oncancel?.({ previousValue });
		focusDisplayButton();
	}

	function saveEditing() {
		if (loading) return;
		const previous = previousValue;
		value = draft;
		onsave?.({ previousValue: previous, value: draft });
		editing = false;
		focusDisplayButton();
	}
</script>

<div
	bind:this={root}
	class={`melt-inline-edit ${className}`.trim()}
	data-inline-edit
	data-editing={editing || undefined}
	data-disabled={disabled || undefined}
	data-loading={loading || undefined}
	data-invalid={Boolean(error) || undefined}
>
	{#if editing}
		<form
			class="melt-inline-edit__form"
			onsubmit={(event) => {
				event.preventDefault();
				saveEditing();
			}}
			onreset={(event) => {
				event.preventDefault();
				cancelEditing();
			}}
		>
			<label class="melt-sr-only" for={rest.id}>{label}</label>
			<input
				class="melt-input"
				bind:this={input}
				id={rest.id}
				aria-label={label}
				aria-describedby={error ? `${rest.id}-error` : undefined}
				aria-invalid={Boolean(error) || undefined}
				data-invalid={Boolean(error) || undefined}
				bind:value={draft}
				{disabled}
				onkeydown={(event) => {
					if (event.key === 'Escape') {
						event.preventDefault();
						cancelEditing();
					}
				}}
				{...rest}
			/>
			<div class="melt-inline-edit__actions">
				<Button type="submit" size="sm" {loading} loadingLabel="Saving edit" {disabled}>
					{saveLabel}
				</Button>
				<Button type="reset" size="sm" variant="ghost" {disabled}>
					{cancelLabel}
				</Button>
			</div>
			{#if error}
				<p class="melt-inline-edit__error" id={`${rest.id}-error`} role="alert">
					{error}
				</p>
			{/if}
		</form>
	{:else}
		<button
			type="button"
			class="melt-button melt-inline-edit__display"
			data-variant="ghost"
			data-size="default"
			{disabled}
			aria-label={`Edit ${label}`}
			onclick={startEditing}
		>
			<span class="melt-button__content">
				<span class="melt-inline-edit__value">{displayValue}</span>
				<span class="melt-inline-edit__icon" aria-hidden="true">✎</span>
			</span>
		</button>
	{/if}
</div>
