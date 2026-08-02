<script lang="ts">
	import DateRangeField from './DateRangeField.svelte';
</script>

<div>
	<DateRangeField locale="en-US" />
	<DateRangeField locale="en-UK" />
	<DateRangeField locale="de" />
	<DateRangeField locale="fr" />
</div>

<style lang="scss">
	div {
    display: flex;
    flex-direction: column;
    gap: 1.5rem
}
</style>
