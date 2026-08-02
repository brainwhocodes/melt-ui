<script lang="ts">
	import { page } from '$app/stores';
	import { Button } from '$docs/components/index.js';

	$: message = $page.status === 404 ? 'Page not found' : 'Something went wrong';
</script>

<main class="surface-8c3e6fbc92">
	<div class="surface-296f29fbd2">
		<p class="surface-8ff14ec283">{$page.status}</p>
		<h1 class="surface-7f11ecb941">{message}</h1>
		<div class="surface-a7c1dcf572">
			<Button href="/docs" class="surface-06e7eb94c6">Back to docs</Button>
		</div>
	</div>
</main>
