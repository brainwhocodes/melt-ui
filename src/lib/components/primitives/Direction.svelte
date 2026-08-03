<script module lang="ts">
	export type DirectionValue = 'auto' | 'ltr' | 'rtl';
</script>

<script lang="ts">
	interface Props {
		dir?: DirectionValue;
		class?: string;
		children?: import('svelte').Snippet;
		[key: string]: any
	}

	let { dir = 'auto', class: className = '', children, ...rest }: Props = $props();

</script>

<div
	{...rest}
	class={`melt-direction ${className}`.trim()}
	{dir}
	data-direction={dir}
>
	{@render children?.()}
</div>
