<script lang="ts" module>
	export type ToastData = {
		title: string;
		description: string;
		color: string;
	};
</script>

<script lang="ts">
	import { writable, type Writable } from 'svelte/store';
	import { createToaster, type CreateToasterProps } from '$lib/index.js';
	import { flip } from 'svelte/animate';
	import Toast from './toast.svelte';
	import SelectHover from './select-hover.svelte';

	const hover: Writable<CreateToasterProps['hover']> = writable('pause');

	let {
		elements,
		helpers: { addToast },
		states: { toasts },
		actions: { portal },
	} = $derived(createToaster<ToastData>({ hover: $hover }));

	const toastData: ToastData[] = [
		{
			title: 'Success',
			description: 'Congratulations! It worked!',
			color: 'toast-color-success',
		},
		{
			title: 'Warning',
			description: 'Please check again.',
			color: 'toast-color-warning',
		},
		{
			title: 'Error',
			description: 'Something did not work!',
			color: 'toast-color-error',
		},
	];

	function addRandomToast() {
		addToast({ data: toastData[Math.floor(Math.random() * toastData.length)] });
	}
</script>

<SelectHover bind:value={$hover} />

<button
	class="surface-6036e059a6"
	onclick={addRandomToast}
>
	Show toast
</button>

<div
	class="surface-c1879e45d1"
	use:portal
>
	{#each $toasts as toast (toast.id)}
		<div animate:flip={{ duration: 500 }}>
			<Toast {elements} {toast} />
		</div>
	{/each}
</div>
