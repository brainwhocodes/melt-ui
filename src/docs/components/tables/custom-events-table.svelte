<script lang="ts">
	import type { APISchema } from '$docs/types.js';
	import { APITableHeading } from '$docs/components/index.js';
	import CustomEventDialog from '../custom-event-dialog.svelte';

	export let data: APISchema['events'];
</script>

{#if data}
	<APITableHeading>
		Custom Events
		<svelte:fragment slot="info">
			Custom events are dispatched with each normal event that we handle. You can override the way
			we handle these events by calling
			<code class="neutral">e.preventDefault()</code> in your event listener.
		</svelte:fragment>
	</APITableHeading>

	<div class="surface-b2ffcaf81e">
		<div class="surface-5e7c273a8e">
			<div class="surface-8081b0b685">
				<table class="surface-20a4ee4540">
					<tbody class="surface-b4f10155df">
						<tr class="surface-4615942637">
							<td class="surface-29653149b9"> Event </td>
							<td class="surface-07d6f28bd2">Value</td>
						</tr>
						{#each data as { name }}
							<tr>
								<td class="surface-7538e58a4c">
									<code>{name}</code>
								</td>
								<td class="surface-512e1786e2">
									<CustomEventDialog />
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>
	</div>
{/if}
