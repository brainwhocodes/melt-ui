<script lang="ts">
	import DateField from './DateField.svelte';
	import { parseDate } from '@internationalized/date';

	const userBirthday = '1992-10-11';
	const userBirthday2 = undefined;
</script>

<div>
	<DateField defaultValue={parseDate(userBirthday)} />
	<DateField defaultValue={userBirthday2} />
</div>

<style lang="scss">
	div {
    display: flex;
    flex-direction: column;
    gap: 1.5rem
}
</style>
