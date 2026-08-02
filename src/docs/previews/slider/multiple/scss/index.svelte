<script lang="ts">
	import { writable } from 'svelte/store';
	import Slider from './slider.svelte';

	const value1 = writable([30, 40, 50, 60, 70]);
	const value2 = writable([30, 40, 50, 60, 70]);
</script>

<div class="surface-2867456c36">
	<div class="surface-4d525600eb">
		<code>autoSort: false; value: [{$value1}]</code>
		<Slider value={value1} autoSort={false} />
	</div>
	<div class="surface-e212316d7e">
		<code>autoSort: true; value: [{$value2}]</code>
		<Slider value={value2} />
	</div>
</div>
