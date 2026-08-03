<script lang="ts">
	import { createToaster } from '$lib/index.js';
	import { flip } from 'svelte/animate';
	import { fly } from 'svelte/transition';
	import { X } from '$icons/index.js';

	type ToastData = {
		title: string;
		description: string;
		color: string;
	};

	const {
		elements: { content, title, description, close },
		helpers: { addToast },
		states: { toasts },
		actions: { portal },
	} = createToaster<ToastData>();

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
		addToast({
			data: toastData[Math.floor(Math.random() * toastData.length)],
		});
	}
</script>

<button
	class="surface-ce9a94c3c9"
	on:click={addRandomToast}
>
	Show toast
</button>

<div
	class="surface-7f5bcb2fb4"
	use:portal
>
	{#each $toasts as { id, data } (id)}
		<div
			{...$content(id)} use:content
			animate:flip={{ duration: 500 }}
			in:fly={{ duration: 150, x: '100%' }}
			out:fly={{ duration: 150, x: '100%' }}
			class="surface-5867f3f88e"
		>
			<div
				class="surface-f4af7a5ebc"
			>
				<div>
					<h3
						{...$title(id)} use:title
						class="surface-1cf3e291ab"
					>
						{data.title}
						<span class="{data.color} surface-d8fc708552"></span>
					</h3>
					<div {...$description(id)} use:description>
						{data.description}
					</div>
				</div>
				<button
					{...$close(id)} use:close
					class="surface-be4ea5e834"
				>
					<X class="surface-32188bbc6d" />
				</button>
			</div>
		</div>
	{/each}
</div>
