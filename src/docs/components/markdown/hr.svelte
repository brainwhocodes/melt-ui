<script lang="ts">
	import { cn } from '$docs/utils/index.js';

	interface Props {
		class?: string | undefined | null;
		[key: string]: any
	}

	let { class: className = undefined, ...rest }: Props = $props();

</script>

<hr class={cn('surface-cb2aa92885', className)} {...rest} />
