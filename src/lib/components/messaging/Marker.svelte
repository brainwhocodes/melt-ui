<script lang="ts">
	interface Props {
		label: string;
		class?: string;
		children?: import('svelte').Snippet;
		[key: string]: any
	}

	let { label, class: className = '', children, ...rest }: Props = $props();

</script>

<div
	class:melt-marker={true}
	class={className}
	role="separator"
	aria-label={label}
	{...rest}
>
	<span class="melt-marker-line" aria-hidden="true"></span>
	<span class="melt-marker-label">{#if children}{@render children()}{:else}{label}{/if}</span>
	<span class="melt-marker-line" aria-hidden="true"></span>
</div>
