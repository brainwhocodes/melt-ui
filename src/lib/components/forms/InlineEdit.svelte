<script lang="ts">
	import { createEventDispatcher, tick } from 'svelte';
	import type { HTMLInputAttributes } from 'svelte/elements';
	import Button from './Button.svelte';

	type $$Props = {
		label: string;
		value: string;
		emptyValue?: string;
		editing?: boolean;
		disabled?: boolean;
		loading?: boolean;
		error?: string;
		saveLabel?: string;
		cancelLabel?: string;
		id?: string;
		class?: string;
	} & Omit<
		HTMLInputAttributes,
		'value' | 'disabled' | 'class' | 'id' | 'aria-label' | 'aria-describedby' | 'aria-invalid'
	>;

	export let label: string;
	export let value: string;
	export let emptyValue = '—';
	export let editing = false;
	export let disabled = false;
	export let loading = false;
	export let error: string | undefined = undefined;
	export let saveLabel = 'Save';
	export let cancelLabel = 'Cancel';

	let className = '';
	export { className as class };

	const dispatch = createEventDispatcher<{
		cancel: { previousValue: string };
		save: { previousValue: string; value: string };
	}>();

	let draft = value;
	let previousValue = value;
	let input: HTMLInputElement;
	let root: HTMLDivElement;

	$: displayValue = value || emptyValue;

	$: if (!editing) {
		draft = value;
		previousValue = value;
		error = undefined;
	}

	$: if (editing && input) {
		input.focus();
		input.select();
	}

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
		dispatch('cancel', { previousValue });
		focusDisplayButton();
	}

	function saveEditing() {
		if (loading) return;
		const previous = previousValue;
		value = draft;
		dispatch('save', { previousValue: previous, value: draft });
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
			on:submit|preventDefault={saveEditing}
			on:reset|preventDefault={cancelEditing}
		>
			<label class="melt-sr-only" for={$$restProps.id}>{label}</label>
			<input
				class="melt-input"
				bind:this={input}
				id={$$restProps.id}
				aria-label={label}
				aria-describedby={error ? `${$$restProps.id}-error` : undefined}
				aria-invalid={Boolean(error) || undefined}
				data-invalid={Boolean(error) || undefined}
				bind:value={draft}
				{disabled}
				on:keydown={(event) => {
					if (event.key === 'Escape') {
						event.preventDefault();
						cancelEditing();
					}
				}}
				{...$$restProps}
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
				<p class="melt-inline-edit__error" id={`${$$restProps.id}-error`} role="alert">
					{error}
				</p>
			{/if}
		</form>
	{:else}
		<Button
			class="melt-inline-edit__display"
			variant="ghost"
			{disabled}
			aria-label={`Edit ${label}`}
			on:click={startEditing}
		>
			<span class="melt-inline-edit__value">{displayValue}</span>
			<span class="melt-inline-edit__icon" aria-hidden="true">✎</span>
		</Button>
	{/if}
</div>
