<script lang="ts">
	import type { KeyboardSchema } from '$docs/types.js';
	import { Kbd } from '$docs/components/index.js';
	import { transformAPIString } from '$docs/utils/index.js';

	interface Props {
		keyboard: KeyboardSchema;
	}

	let { keyboard }: Props = $props();
</script>

{#if keyboard && keyboard.length}
	<div class="surface-b0b7d304e5">
		<div class="surface-9dcbb18e9a">
			<div class="surface-44be816e1b">
				<table class="surface-0d89222460">
					<tbody class="surface-a827207c7f">
						<tr class="surface-040b34a2fe">
							<td class="surface-e7aea2c7d5">
								Key
							</td>
							<td class="surface-1c7b64ace2">Behavior</td>
						</tr>
						{#each keyboard as { key, behavior }}
							<tr>
								<td class="surface-2cc8e412fb">
									<Kbd>{key}</Kbd>
								</td>
								<td class="surface-31ddb2778c">
									<p>{@html transformAPIString(behavior, true)}</p>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>
	</div>
{/if}
