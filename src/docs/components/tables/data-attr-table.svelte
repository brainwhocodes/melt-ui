<script lang="ts">
	import type { APISchema } from '$docs/types.js';
	import { transformAPIString } from '$docs/utils/index.js';
	import { APITableHeading } from '$docs/components/index.js';

	export let data: APISchema['dataAttributes'];
</script>

{#if data}
	<APITableHeading>
		Data Attributes
		<svelte:fragment slot="info">
			Data attributes are set on each element which can be used for styling or however else you want
			to use them. They are prefixed with <code class="neutral">data-</code>.
		</svelte:fragment>
	</APITableHeading>

	<div class="surface-6080e285bb">
		<div class="surface-1a0a093d96">
			<div class="surface-743a6a7d12">
				<table class="surface-4acdcaec51">
					<tbody class="surface-d04f3c138a">
						<tr class="surface-161f422285">
							<td class="surface-b448bad6d1">
								Data Attribute
							</td>
							<td class="surface-d088e670aa">Value</td>
						</tr>
						{#each data as { name, value }}
							<tr>
								<td class="surface-6ed67e8e92">
									<code>{`[${name}]`}</code>
								</td>
								<td class="surface-4bf8972a60">
									<p>{@html transformAPIString(value)}</p>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>
	</div>
{/if}
