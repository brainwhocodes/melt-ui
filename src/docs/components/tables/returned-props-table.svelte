<script lang="ts">
	import type { APISchema } from '$docs/types.js';
	import { transformAPIString } from '$docs/utils/index.js';
	import { APITableHeading, InfoPopover } from '$docs/components/index.js';

	interface Props {
		data: APISchema['returnedProps'];
		title?: string;
		tableHeading?: string;
		info?: import('svelte').Snippet;
	}

	let {
		data,
		title = 'Returns',
		tableHeading = 'Returned Prop',
		info
	}: Props = $props();

	const info_render = $derived(info);
</script>

{#if data}
	<APITableHeading>
		{title}
		{#snippet info()}

				{#if info_render}{@render info_render()}{:else}
					Builder functions return an object which enables the creation of the essential elements for
					a component. Along with the elements, this object may also include additional properties
					such as stores to manage the component's state or helper functions that simplify interaction
					with the component.
				{/if}

			{/snippet}
	</APITableHeading>

	<div class="surface-6854fd0f5e">
		<div class="surface-24d80be4e6">
			<div class="surface-a30cc37b11">
				<table class="surface-3d875f85c8">
					<tbody class="surface-b6b04dc345">
						<tr class="surface-e611cdbe7a">
							<td class="surface-987c5f9ba6">
								{tableHeading}
							</td>
							<td class="surface-cb803b48d7">Description</td>
						</tr>
						{#each data as returnedProp}
							<tr>
								<td class="surface-c7644153cd">
									<div class="mdsvex surface-73e09183ae">
										<div>
											{#if returnedProp.link}
												<a
													href={returnedProp.link}
													class="surface-093f43cdb8"
												>
													<code>
														{returnedProp.name}
													</code>
												</a>
											{:else}
												<code>{returnedProp.name}</code>
											{/if}
										</div>
										{#if returnedProp.type}
											<InfoPopover iconClasses="docs-info-popover-icon--muted">
												<code class="inline-code neutral">
													{transformAPIString(returnedProp.type)}
												</code>
											</InfoPopover>
										{/if}
									</div>
								</td>
								<td class="surface-b28319b848">
									{#if returnedProp.description}
										<div class="surface-99b94d1e8d">
											<p>
												{@html transformAPIString(returnedProp.description, true)}
											</p>
										</div>
									{/if}
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>
	</div>
{/if}
