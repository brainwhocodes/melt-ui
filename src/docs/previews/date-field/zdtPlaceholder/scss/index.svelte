<script lang="ts">
	import DateField from './DateField.svelte';
	import { now, getLocalTimeZone } from '@internationalized/date';

	const withLocalTimeZone = now(getLocalTimeZone());
	const withLosAngelesTimeZone = now('America/Los_Angeles');
</script>

<div class="surface-86586825ba">
	<DateField defaultPlaceholder={withLocalTimeZone} />
	<DateField defaultPlaceholder={withLosAngelesTimeZone} />
</div>
