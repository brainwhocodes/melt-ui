<script lang="ts">
	let className = '';
	export { className as class };
</script>

<div class={`melt-alert-dialog__content ${className}`.trim()} data-melt-alert-dialog-content {...$$restProps}>
	<slot />
</div>
