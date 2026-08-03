<script lang="ts">
	import { cn } from '$docs/utils/index.js';
	import { createTabs } from '$lib/index.js';
	import { cubicInOut } from 'svelte/easing';
	import { crossfade } from 'svelte/transition';

	const {
		elements: { root, list, content, trigger },
		states: { value },
	} = createTabs({
		defaultValue: 'tab-1',
	});

	let className = '';
	export { className as class };

	const triggers = [
		{ id: 'tab-1', title: 'Account' },
		{ id: 'tab-2', title: 'Password' },
		{ id: 'tab-3', title: 'Settings' },
	];

	const [send, receive] = crossfade({
		duration: 250,
		easing: cubicInOut,
	});
</script>

<div
	{...$root} use:root
	class={cn(
		'surface-9c76cb2d99',
		className,
	)}
>
	<div
		{...$list} use:list
		class="preview-surface-neutral-100   preview-state-orientation-layout-col surface-33bfd6089e"
		aria-label="Manage your account"
	>
		{#each triggers as triggerItem}
			<button {...$trigger(triggerItem.id)} use:trigger class="trigger surface-99adbbfd17">
				{triggerItem.title}
				{#if $value === triggerItem.id}
					<div in:send={{ key: 'trigger' }}
						out:receive={{ key: 'trigger' }}
						class="surface-1c6759ce07"></div>
				{/if}
			</button>
		{/each}
	</div>
	<div {...$content('tab-1')} use:content class="surface-f62d607423">
		<p class="surface-67be0bd181">
			Make changes to your account here. Click save when you're done.
		</p>
		<fieldset class="surface-dd297734e7">
			<label
				class="surface-861218ad6c"
				for="name"
			>
				Name
			</label>
			<input id="name" value="Thomas G. Lopes" />
		</fieldset>

		<div class="surface-509cc8d813">
			<button class="save">Save changes</button>
		</div>
	</div>
	<div {...$content('tab-2')} use:content class="surface-7f55a991df">
		<p class="surface-d6742bf2e8">
			Change your password here. Click save when you're done.
		</p>
		<fieldset class="surface-0aa02f6790">
			<label
				class="surface-87b618cf0a"
				for="newPassword"
			>
				New password
			</label>
			<input id="newPassword" type="password" />
		</fieldset>
		<div class="surface-b5cef14450">
			<button class="save">Save changes</button>
		</div>
	</div>
	<div {...$content('tab-3')} use:content class="surface-951d4dd642">
		<p class="surface-a3ad7e2479">
			Change your settings here. Click save when you're done.
		</p>

		<fieldset class="surface-4a1ce72c79">
			<label
				class="surface-f5271faf35"
				for="newEmail"
			>
				New email
			</label>
			<input id="newEmail" type="email" />
		</fieldset>
		<div class="surface-e9a4defc9c">
			<button class="save">Save changes</button>
		</div>
	</div>
</div>

<style lang="scss">
	.trigger {
		display: flex;
		align-items: center;
		justify-content: center;

		cursor: default;
		user-select: none;

		border-radius: 0;
		background-color: rgb(var(--color-neutral-100) / 1);

		color: rgb(var(--color-neutral-900) / 1);
		font-weight: 500;
		line-height: 1;

		flex: 1;
		height: 3rem;
		padding-inline: 0.5rem;
	}

		.trigger:focus {
			position: relative;
		}

		.trigger:focus-visible {
		z-index: 10;
		
		
		box-shadow: 0 0 #0000, 0 0 #0000, 0 0 #0000;
}

		.trigger[data-state='active']:focus {
		position: relative;
}

		.trigger[data-state='active'] {
			background-color: white;
			color: rgb(var(--color-magnum-900) / 1);
		}

	input {
		height: 2rem;
		flex-shrink: 0;
		flex-grow: 1;
		border-radius: 0.375rem;
		border: 1px solid rgb(var(--color-neutral-200) / 1);
		padding-inline: 0.625rem;
		line-height: 1;
		color: rgb(var(--color-neutral-900) / 1);
	}

	input:focus {
			border-color: rgb(var(--color-magnum-400) / 1);
		}

	.save {
		display: inline-flex;
		height: 2rem;
		cursor: default;
		align-items: center;
		justify-content: center;
		border-radius: 0.375rem;
		background-color: rgb(var(--color-magnum-200) / 1);
		padding-inline: 1rem;
		line-height: 1;
		font-weight: 600;
		color: rgb(var(--color-magnum-900) / 1);
		transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
		transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
		transition-duration: 150ms;
	}

	.save:hover {
			opacity: 0.75;
		}

</style>
