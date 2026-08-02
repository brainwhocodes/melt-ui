<script lang="ts">
	import { createSwitch, melt } from '$lib/index.js';

	const {
		elements: { root, input },
	} = createSwitch();
</script>

<form>
	<div class="surface-fcff3b1170">
		<label
			class="surface-af9bb4f646"
			for="airplane-mode"
			id="airplane-mode-label"
		>
			Airplane mode
		</label>
		<button
			use:melt={$root}
			class="surface-cef0a81386"
			id="airplane-mode"
			aria-labelledby="airplane-mode-label"
		>
			<span class="thumb surface-f2d79cb68b" />
		</button>
		<input use:melt={$input} />
	</div>
</form>

<style lang="scss">
	button {
		--w: 2.75rem;
		--padding: 0.125rem;
		width: var(--w);
	}

	.thumb {
		--size: 1.25rem;
		width: var(--size);
		height: var(--size);
		transform: translateX(var(--padding));
	}

	:global([data-state='checked']) .thumb {
		transform: translateX(calc(var(--w) - var(--size) - var(--padding)));
	}
</style>
