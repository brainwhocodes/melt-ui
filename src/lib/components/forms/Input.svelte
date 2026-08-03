<script lang="ts">
  import type { HTMLInputAttributes } from 'svelte/elements';
  type Props = HTMLInputAttributes & { class?: string; invalid?: boolean };
  let { class: className = '', value = undefined, invalid = false, disabled = false, required = false, ...rest }: Props = $props();
</script>
<input {...rest} {value} {disabled} {required} aria-invalid={invalid || undefined} class={`melt-input ${className}`.trim()} data-invalid={invalid || undefined} />
