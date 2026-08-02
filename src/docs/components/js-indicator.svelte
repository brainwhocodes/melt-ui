<script>
	import { browser } from '$app/environment';
</script>

<!-- Dev-only indicator for responsive development -->

<div
	class="surface-68e7cc63b8"
	data-browser={browser ? '' : undefined}
>
	{browser ? 'js' : 'ssr'}
</div>
