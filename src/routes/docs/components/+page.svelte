<script lang="ts">
	import { componentMap, type ComponentCategory } from '$docs/data/components/index.js';
	import {
		Alert,
		Badge,
		Button,
		ButtonGroup,
		Field,
		InlineEdit,
		Input,
		Spinner,
	} from '$lib/components/index.js';

	const categories: readonly { key: ComponentCategory; label: string; description: string }[] = [
		{
			key: 'forms',
			label: 'Forms',
			description: 'Native controls with consistent states, labels, and validation.',
		},
		{
			key: 'navigation',
			label: 'Navigation',
			description: 'Keyboard-first wayfinding and responsive application structure.',
		},
		{
			key: 'overlays',
			label: 'Overlays',
			description: 'Modal surfaces with focus management, dismissal, and return.',
		},
		{
			key: 'data',
			label: 'Data',
			description: 'Tables, charts, and command surfaces without heavyweight engines.',
		},
		{
			key: 'messaging',
			label: 'Messaging',
			description: 'Conversation presentation and live-edge transcript behavior.',
		},
		{
			key: 'primitives',
			label: 'Primitives',
			description: 'Composable layout, status, loading, and content foundations.',
		},
	];

	const components = Object.entries(componentMap);

	type PreviewState = 'ready' | 'busy' | 'invalid';
	let previewState: PreviewState = $state('ready');
	let inlineEditValue = $state('Component gallery');
</script>

<svelte:head>
	<title>Components | Melt UI</title>
	<meta
		name="description"
		content="Accessible, styled Svelte components designed for fast applications and fast builds."
	/>
</svelte:head>

<main class="component-catalog">
	<header class="component-catalog__header">
		<p class="component-catalog__eyebrow">Svelte component library</p>
		<h1>Components</h1>
		<p>
			Accessible defaults, native platform behavior, and no runtime styling engine. Import the shared
			stylesheet once, then ship only the Svelte components you use.
		</p>
		<pre><code>import '@melt-ui/svelte/styles.css';
import {`{ Button, Field, Input }`} from '@melt-ui/svelte';</code></pre>
	</header>

	<section class="component-catalog__preview" aria-labelledby="preview-title">
		<div class="component-catalog__preview-copy">
			<p class="component-catalog__eyebrow">Live preview</p>
			<h2 id="preview-title">Built to compose</h2>
			<p>
				The defaults are production-ready, while tokens and ordinary class names keep every layer
				customizable.
			</p>
			<div class="component-catalog__preview-status">
				{#if previewState === 'busy'}
					<Spinner size="sm" label="Preview is busy" />
					<span>Submitting</span>
				{:else}
					<Badge variant={previewState === 'invalid' ? 'danger' : 'success'}>
						{previewState === 'invalid' ? 'Needs attention' : 'Accessible by default'}
					</Badge>
				{/if}
			</div>
			<ButtonGroup aria-label="Preview state">
				<Button
					size="sm"
					variant={previewState === 'ready' ? 'secondary' : 'ghost'}
					aria-pressed={previewState === 'ready'}
					onclick={() => (previewState = 'ready')}>Ready</Button
				>
				<Button
					size="sm"
					variant={previewState === 'busy' ? 'secondary' : 'ghost'}
					aria-pressed={previewState === 'busy'}
					onclick={() => (previewState = 'busy')}>Loading</Button
				>
				<Button
					size="sm"
					variant={previewState === 'invalid' ? 'secondary' : 'ghost'}
					aria-pressed={previewState === 'invalid'}
					onclick={() => (previewState = 'invalid')}>Error</Button
				>
			</ButtonGroup>
		</div>
		<div class="component-catalog__preview-form">
			<Field
				id="component-preview-email"
				label="Work email"
				description="We only use this address for your workspace."
				required
				invalid={previewState === 'invalid'}
				error={previewState === 'invalid' ? 'Enter a valid work email.' : undefined}
			>
				<Input type="email" placeholder="you@company.com" />
			</Field>
			<InlineEdit id="component-preview-name" label="Preview name" bind:value={inlineEditValue} />
			<Alert variant={previewState === 'invalid' ? 'warning' : 'info'}>
				{#snippet title()}
								<span >
						{previewState === 'invalid' ? 'Review the highlighted field' : 'Native Svelte, shared CSS'}
					</span>
							{/snippet}
				{#snippet content()}
								<span >
						{previewState === 'invalid'
							? 'Validation messages are connected to their controls automatically.'
							: 'No runtime styling engine and no component-level style injection.'}
					</span>
							{/snippet}
			</Alert>
			<ButtonGroup aria-label="Preview actions">
				<Button loading={previewState === 'busy'} loadingLabel="Inviting teammate">
					Invite teammate
				</Button>
				<Button variant="outline" disabled={previewState !== 'ready'}>Save draft</Button>
			</ButtonGroup>
		</div>
	</section>

	<nav class="component-catalog__jump" aria-label="Component categories">
		{#each categories as category}
			<a href={`#${category.key}`}>{category.label}</a>
		{/each}
	</nav>

	<div class="component-catalog__groups">
		{#each categories as category}
			<section id={category.key} class="component-catalog__group">
				<header>
					<h2>{category.label}</h2>
					<p>{category.description}</p>
				</header>
				<ul>
					{#each components.filter(([, component]) => component.category === category.key) as [slug, component]}
						<li>
							<div>
								<h3>{component.name}</h3>
								<p>{component.description}</p>
							</div>
							<div class="component-catalog__example">
								<code>{component.example}</code>
								<span>{component.exports.join(', ')}</span>
							</div>
							<span class="component-catalog__slug">{slug}</span>
						</li>
					{/each}
				</ul>
			</section>
		{/each}
	</div>
</main>

<style>
	.component-catalog {
		width: min(100% - 2rem, 70rem);
		margin-inline: auto;
		padding-block: clamp(3rem, 8vw, 7rem);
		color: rgb(var(--color-neutral-50));
	}

	.component-catalog__header {
		max-width: 46rem;
	}

	.component-catalog__eyebrow {
		margin: 0 0 0.75rem;
		color: rgb(var(--color-magnum-400));
		font: 600 0.75rem/1.4 var(--font-mono, monospace);
		letter-spacing: 0.08em;
		text-transform: uppercase;
	}

	h1,
	h2,
	h3,
	p {
		margin-block-start: 0;
	}

	h1 {
		margin-block-end: 1rem;
		font-size: clamp(2.5rem, 7vw, 5rem);
		line-height: 0.95;
		letter-spacing: -0.05em;
	}

	.component-catalog__header > p:not(.component-catalog__eyebrow) {
		max-width: 65ch;
		color: rgb(var(--color-neutral-300));
		font-size: 1.1rem;
		line-height: 1.7;
	}

	pre {
		overflow-x: auto;
		margin-block: 2rem 0;
		padding: 1rem 1.25rem;
		border: 1px solid rgb(var(--color-neutral-700));
		border-radius: 0.5rem;
		background: rgb(var(--color-neutral-900));
	}

	pre:focus-visible {
		outline: 2px solid rgb(var(--color-magnum-400));
		outline-offset: 2px;
	}

	.component-catalog__preview {
		display: grid;
		grid-template-columns: minmax(0, 0.8fr) minmax(18rem, 1fr);
		gap: clamp(2rem, 6vw, 5rem);
		align-items: center;
		margin-block: clamp(3rem, 8vw, 6rem);
		padding: clamp(1.5rem, 4vw, 3rem);
		border: 1px solid rgb(var(--color-neutral-800));
		border-radius: 0.75rem;
		background: rgb(var(--color-neutral-900));
	}

	.component-catalog__preview h2 {
		margin-block-end: 1rem;
		font-size: clamp(1.75rem, 4vw, 2.75rem);
		letter-spacing: -0.04em;
	}

	.component-catalog__preview-copy > p:not(.component-catalog__eyebrow) {
		color: rgb(var(--color-neutral-400));
		line-height: 1.65;
	}

	.component-catalog__preview-status {
		display: flex;
		gap: 0.75rem;
		align-items: center;
		margin-block-start: 1.5rem;
	}

	.component-catalog__preview-form {
		display: grid;
		gap: 1rem;
		padding: clamp(1rem, 3vw, 1.5rem);
		border: 1px solid rgb(var(--color-neutral-700));
		border-radius: 0.625rem;
		background: rgb(var(--color-neutral-950));
	}

	.component-catalog__jump {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem 1rem;
		margin-block: clamp(3rem, 8vw, 6rem);
		padding-block: 1rem;
		border-block: 1px solid rgb(var(--color-neutral-800));
	}

	.component-catalog__jump a {
		color: rgb(var(--color-neutral-200));
		text-underline-offset: 0.25rem;
	}

	.component-catalog__groups {
		display: grid;
		gap: clamp(4rem, 8vw, 7rem);
	}

	.component-catalog__group > header {
		display: grid;
		grid-template-columns: minmax(10rem, 0.35fr) 1fr;
		gap: 1.5rem;
		align-items: baseline;
		margin-block-end: 1.5rem;
	}

	.component-catalog__group h2 {
		font-size: clamp(1.75rem, 4vw, 2.5rem);
		letter-spacing: -0.035em;
	}

	.component-catalog__group > header p,
	.component-catalog__group li p {
		color: rgb(var(--color-neutral-400));
		line-height: 1.6;
	}

	.component-catalog__group ul {
		margin: 0;
		padding: 0;
		border-block-start: 1px solid rgb(var(--color-neutral-800));
		list-style: none;
	}

	.component-catalog__group li {
		display: grid;
		grid-template-columns: minmax(12rem, 0.8fr) minmax(16rem, 1fr) auto;
		gap: 1.5rem;
		align-items: start;
		padding-block: 1.25rem;
		border-block-end: 1px solid rgb(var(--color-neutral-800));
	}

	.component-catalog__group h3 {
		margin-block-end: 0.35rem;
		font-size: 1rem;
	}

	.component-catalog__group li p {
		margin-block-end: 0;
		font-size: 0.9rem;
	}

	.component-catalog__group li code,
	.component-catalog__slug {
		font-size: 0.75rem;
		line-height: 1.6;
	}

	.component-catalog__example {
		display: grid;
		gap: 0.625rem;
		min-width: 0;
	}

	.component-catalog__example code {
		display: block;
		overflow-x: auto;
		padding: 0.875rem 1rem;
		border: 1px solid rgb(var(--color-neutral-800));
		border-radius: 0.5rem;
		background: rgb(var(--color-neutral-950));
		white-space: pre;
		tab-size: 2;
	}

	.component-catalog__example code:focus-visible {
		outline: 2px solid rgb(var(--color-magnum-400));
		outline-offset: 2px;
	}

	.component-catalog__example span {
		color: rgb(var(--color-magnum-300));
		font-size: 0.75rem;
	}

	.component-catalog__group li code {
		color: rgb(var(--color-neutral-100));
	}

	.component-catalog__slug {
		color: rgb(var(--color-neutral-500));
	}

	@media (width < 64rem) {
		.component-catalog__preview {
			grid-template-columns: 1fr;
		}

		.component-catalog__preview-form :global(.melt-button-group) {
			flex-direction: column;
		}

		.component-catalog__preview-form :global(.melt-button) {
			width: 100%;
		}
		.component-catalog__group > header,
		.component-catalog__group li {
			grid-template-columns: 1fr;
			gap: 0.5rem;
		}

		.component-catalog__slug {
			display: none;
		}
	}
</style>
