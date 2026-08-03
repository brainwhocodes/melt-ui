<script lang="ts">
	export let label: string;
	let className = '';
	export { className as class };
</script>

<div
	class:melt-marker={true}
	class={className}
	role="separator"
	aria-label={label}
	{...$$restProps}
>
	<span class="melt-marker-line" aria-hidden="true"></span>
	<span class="melt-marker-label"><slot>{label}</slot></span>
	<span class="melt-marker-line" aria-hidden="true"></span>
</div>
