<script lang="ts">
	import { createLabel, melt } from '$lib/index.js';

	const {
		elements: { root },
	} = createLabel();
</script>

<form>
	<div class="surface-f61d65d8ed">
		<label
			use:melt={$root}
			for="email"
			class="surface-373b51d04f"
			data-melt-part="root"
		>
			<span>Email</span>
		</label>
		<input
			type="text"
			id="email"
			class="surface-701b06e198"
			placeholder="vanilla@melt-ui.com"
		/>
	</div>
</form>
