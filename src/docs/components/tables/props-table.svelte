<script lang="ts">
	import type { APISchema } from '$docs/types.js';
	import { transformAPIString } from '$docs/utils/index.js';
	import { APITableHeading } from '$docs/components/index.js';
	import TypeDialog from '../type-dialog.svelte';
	import A from '../markdown/a.svelte';
	function replaceDoubleQuotes(str: string) {
		return str.replace(/"/g, "'");
	}

	interface Props {
		data: APISchema['props'];
	}

	let { data }: Props = $props();
</script>

{#if data}
	<APITableHeading>
		Props
		{#snippet info()}

				Props are passed as an object to the function and are used to configure the behavior of the
				builder function or element.

			{/snippet}
	</APITableHeading>

	<div class="surface-57049b098b">
		<div class="surface-fc78663666">
			<div class="surface-5e725e50cf">
				<table class="surface-a7422addce">
					<tbody class="surface-c51613bbb0">
						<tr class="surface-3cd6be3cd9">
							<td class="surface-d63359750d"> Prop </td>
							<td class="surface-3d38d2eb7f">Default</td>
							<td class="surface-73358fca12">Type / Description</td>
						</tr>
						{#each data as prop}
							<tr>
								<td class="surface-f1f4e189ef">
									<code>{prop.name}</code>
									{#if prop.required}
										<span class="surface-25dacae874">*</span>
									{/if}
								</td>
								<td class="surface-510c580f21">
									<span>
										{#if prop.default}
											<code class="neutral">
												{replaceDoubleQuotes(prop.default)}
											</code>
										{:else}
											-
										{/if}
									</span>
								</td>
								<td class="surface-c7060a9c88">
									<div class="surface-b5a358af38">
										{#if prop.longType}
											<TypeDialog
												code={prop.longType.highlightedCode}
												name={transformAPIString(prop.type)}
											/>
										{:else if prop.type}
											<code class="neutral">
												{transformAPIString(prop.type)}
											</code>
										{/if}
									</div>
									{#if prop.description}
										<div class="surface-ecb93aeadc">
											<p>
												{@html transformAPIString(prop.description, true)}
											</p>
											{#if prop.see}
												<p class="surface-50a2dd4c3a">
													See <A href={prop.see.href}>{prop.see.label}</A>
												</p>
											{/if}
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
