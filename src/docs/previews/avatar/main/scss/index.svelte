<script lang="ts">
	import { createAvatar, melt } from '$lib/index.js';

	const {
		elements: { image, fallback },
	} = createAvatar({
		src: 'https://avatars.githubusercontent.com/u/1162160?v=4',
	});

	// With an exaggerated fallback delay
	const {
		elements: { image: imageA, fallback: fallbackA },
	} = createAvatar({
		src: 'https://avatars.githubusercontent.com/u/5968653?v=4',
		delayMs: 650,
	});

	// A blank source to demonstrate the fallback
	const {
		elements: { image: imageB, fallback: fallbackB },
	} = createAvatar({
		src: '',
	});
</script>

<div class="surface-2f5038ed7f">
	<div
		class="surface-cf0cd6d759"
	>
		<img
			use:melt={$image}
			alt="Avatar"
			class="surface-8ba8ae1ab8"
		/>
		<span use:melt={$fallback} class="surface-cd23f34dd7"
			>RH</span
		>
	</div>

	<div
		class="surface-0c7f1bfab0"
	>
		<img
			use:melt={$imageA}
			alt="Avatar"
			class="surface-e558f5c7d4"
		/>
		<span use:melt={$fallbackA} class="surface-70e02ad421"
			>SH</span
		>
	</div>

	<div
		class="surface-53551e5020"
	>
		<img
			use:melt={$imageB}
			alt="Avatar"
			class="surface-d58e91c84a"
		/>
		<span use:melt={$fallbackB} class="surface-6b70cfab40"
			>UI</span
		>
	</div>
</div>
