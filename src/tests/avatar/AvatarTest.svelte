<script lang="ts">
	import { createAvatar } from '$lib/index.js';

	export let src = 'https://avatars.githubusercontent.com/u/1162160?v=4';

	const {
		elements: { image, fallback },
	} = createAvatar({
		src,
	});
</script>

<div class="surface-900127e8ae">
	<img {...$image} use:image alt="Avatar" class="surface-baa0bffe7c" data-testid="image" />
	<span {...$fallback} use:fallback class="surface-451ef3ffb0" data-testid="fallback">RH</span
	>
</div>
