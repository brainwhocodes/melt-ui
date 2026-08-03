<script lang="ts" module>
	type CodeEntry = Record<string, string | undefined>;

	export type PreviewProps = {
		class?: string;
		code: {
			[codingStyle: string]: CodeEntry | null;
		};
	};
</script>

<script lang="ts">
	import CodeBlock from './code-block.svelte';
	import PreviewWrapper from './preview-wrapper.svelte';
	import Switch from './switch.svelte';
	import { TabsList, TabsRoot } from './file-tabs/index.js';
	import type { PreviewVariants } from './preview-wrapper.svelte';

	type $$Props = PreviewProps & {
		viewCode: boolean;
		variant?: PreviewVariants['variant'];
		size?: PreviewVariants['size'];
		position?: PreviewVariants['position'];
	};

	interface Props {
		code: $$Props['code'];
		variant?: $$Props['variant'];
		size?: $$Props['size'];
		position?: $$Props['position'];
		viewCode?: boolean;
		children?: import('svelte').Snippet;
	}

	let {
		code,
		variant = 'dark',
		size = 'default',
		position = 'default',
		viewCode = $bindable(false),
		children
	}: Props = $props();

	let codingStyleObj = $derived(code.scss ?? {});

	let files = $derived(Object.keys(codingStyleObj).sort((a, b) => {
		if (a === 'index.svelte') return -1;
		if (b === 'index.svelte') return 1;
		return a.localeCompare(b);
	}));
</script>

<div class="surface-2e3526fcaf">
	<div class="surface-a303ed20da">
		<Switch bind:checked={viewCode}>View code</Switch>
	</div>
</div>

<div class="surface-3034e361cb" data-comp-preview>
	{#if viewCode}
		<TabsRoot tabs={files} >
			{#snippet children({ tab })}
						<TabsList />
				<CodeBlock>{@html codingStyleObj[tab] ?? ''}</CodeBlock>
								{/snippet}
				</TabsRoot>
	{:else}
		<PreviewWrapper {variant} {size} {position}>
			{@render children?.()}
		</PreviewWrapper>
	{/if}
</div>
