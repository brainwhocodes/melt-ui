<script lang="ts">
	import type { HTMLImgAttributes } from 'svelte/elements';
	import { cn } from '$docs/utils/index.js';


	interface Props {
		class?: string | undefined | null;
		src?: HTMLImgAttributes['src'];
		alt?: HTMLImgAttributes['alt'];
		[key: string]: any
	}

	let { class: className = undefined, src = undefined, alt = undefined, ...rest }: Props = $props();
</script>

<img {src} {alt} class={cn('surface-46938324e7', className)} {...rest} />
