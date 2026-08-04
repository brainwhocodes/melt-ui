<script module lang="ts">
	export interface CommandItem {
		value: string;
		label: string;
		description?: string;
		keywords?: string[];
		group?: string;
		disabled?: boolean;
	}

	export interface CommandGroup {
		id: string;
		label: string;
	}

	let commandInstance = 0;
</script>

<script lang="ts">
	import { onMount, tick, untrack } from 'svelte';

	interface GroupedItem {
		item: CommandItem;
		index: number;
	}

	interface ResultGroup {
		id: string;
		label: string;
		items: GroupedItem[];
	}

	interface Props {
		class?: string;
		id?: string | undefined;
		items?: CommandItem[];
		groups?: CommandGroup[];
		open?: boolean;
		value?: string | null;
		query?: string;
		activeIndex?: number;
		modal?: boolean;
		closeOnSelect?: boolean;
		label?: string;
		searchLabel?: string;
		emptyText?: string;
		onOpenChange?: ((detail: { open: boolean }) => void) | undefined;
		onQueryChange?: ((detail: { query: string }) => void) | undefined;
		onActiveChange?:
			| ((detail: { activeIndex: number; item: CommandItem | null }) => void)
			| undefined;
		onSelect?: ((detail: { value: string; item: CommandItem }) => void) | undefined;
		header?: import('svelte').Snippet;
		footer?: import('svelte').Snippet;
		item?: import('svelte').Snippet<[{ item: CommandItem; active: boolean; selected: boolean }]>;
		empty?: import('svelte').Snippet;
		[key: string]: any;
	}

	let {
		class: className = '',
		id = undefined,
		items = [],
		groups = [],
		open = $bindable(false),
		value = $bindable(null),
		query = $bindable(''),
		activeIndex = $bindable(-1),
		modal = false,
		closeOnSelect = true,
		label = 'Command palette',
		searchLabel = 'Search commands',
		emptyText = 'No commands found.',
		onOpenChange = undefined,
		onQueryChange = undefined,
		onActiveChange = undefined,
		onSelect = undefined,
		header,
		footer,
		item,
		empty,
		...rest
	}: Props = $props();

	let resolvedId = $state(untrack(() => id ?? ''));
	let inputElement: HTMLInputElement | undefined = $state();

	onMount(() => {
		if (!resolvedId) resolvedId = `melt-command-${++commandInstance}`;
	});

	$effect(() => {
		if (id && id !== resolvedId) resolvedId = id;
	});
	const normalizedQuery = $derived(query.trim().toLocaleLowerCase());
	const filteredItems = $derived(filterItems(items, groups, normalizedQuery));
	const resultGroups = $derived(groupItems(filteredItems, groups));
	$effect(() => {
		filteredItems;
		reconcileActive();
	});
	const listId = $derived(resolvedId ? `${resolvedId}-list` : undefined);
	const activeDescendant = $derived(
		activeIndex >= 0 && resolvedId ? `${resolvedId}-option-${activeIndex}` : undefined
	);

	function filterItems(inputItems: CommandItem[], inputGroups: CommandGroup[], inputQuery: string): CommandItem[] {
		if (!inputQuery) return inputItems;
		const groupLabels = new Map(inputGroups.map((group) => [group.id, group.label]));
		return inputItems.filter((item) => {
			const text = [
				item.label,
				item.value,
				item.description ?? '',
				item.group ? groupLabels.get(item.group) ?? item.group : '',
				...(item.keywords ?? [])
			]
				.join(' ')
				.toLocaleLowerCase();
			return text.includes(inputQuery);
		});
	}

	function groupItems(inputItems: CommandItem[], inputGroups: CommandGroup[]): ResultGroup[] {
		const result: ResultGroup[] = [];
		const byId = new Map<string, ResultGroup>();
		for (const group of inputGroups) {
			const resultGroup: ResultGroup = { id: group.id, label: group.label, items: [] };
			result.push(resultGroup);
			byId.set(group.id, resultGroup);
		}
		inputItems.forEach((item, index) => {
			const groupId = item.group ?? '';
			let resultGroup = byId.get(groupId);
			if (!resultGroup) {
				resultGroup = { id: groupId, label: groupId, items: [] };
				result.push(resultGroup);
				byId.set(groupId, resultGroup);
			}
			resultGroup.items.push({ item, index });
		});
		return result.filter((group) => group.items.length > 0);
	}

	function reconcileActiveIndex(inputItems: CommandItem[], current: number): number {
		if (current >= 0 && current < inputItems.length && !inputItems[current].disabled) return current;
		return inputItems.findIndex((item) => !item.disabled);
	}
	function reconcileActive(): void {
		const next = reconcileActiveIndex(filteredItems, activeIndex);
		if (activeIndex !== next) activeIndex = next;
	}


	function moveActive(direction: 1 | -1, edge?: 'start' | 'end'): void {
		if (filteredItems.length === 0) return;
		let next = edge === 'start' ? 0 : edge === 'end' ? filteredItems.length - 1 : activeIndex;
		if (!edge) next = activeIndex < 0 ? (direction > 0 ? 0 : filteredItems.length - 1) : activeIndex + direction;
		while (next >= 0 && next < filteredItems.length && filteredItems[next].disabled) next += direction;
		if (next < 0 || next >= filteredItems.length) return;
		setActive(next);
	}

	function setActive(index: number): void {
		if (index < 0 || index >= filteredItems.length || filteredItems[index].disabled) return;
		activeIndex = index;
		onActiveChange?.({ activeIndex, item: filteredItems[activeIndex] });
		if (resolvedId) document.getElementById(`${resolvedId}-option-${activeIndex}`)?.scrollIntoView?.({ block: 'nearest' });
	}

	function setOpen(next: boolean): void {
		if (open === next) return;
		open = next;
		onOpenChange?.({ open });
	}

	function handleQueryInput(event: Event): void {
		query = (event.currentTarget as HTMLInputElement).value;
		activeIndex = -1;
		onQueryChange?.({ query });
	}

	function selectItem(item: CommandItem): void {
		if (item.disabled) return;
		value = item.value;
		onSelect?.({ value: item.value, item });
		if (closeOnSelect) setOpen(false);
	}

	function handleKeydown(event: KeyboardEvent): void {
		switch (event.key) {
			case 'ArrowDown': event.preventDefault(); moveActive(1); break;
			case 'ArrowUp': event.preventDefault(); moveActive(-1); break;
			case 'Home': event.preventDefault(); moveActive(1, 'start'); break;
			case 'End': event.preventDefault(); moveActive(-1, 'end'); break;
			case 'Enter':
				if (activeIndex >= 0 && filteredItems[activeIndex]) {
					event.preventDefault();
					selectItem(filteredItems[activeIndex]);
				}
				break;
			case 'Escape': event.preventDefault(); setOpen(false); break;
		}
	}

	function manageSurface(node: HTMLElement) {
		const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
		if (node instanceof HTMLDialogElement && !node.open) node.showModal();
		tick().then(() => inputElement?.focus());
		return {
			destroy() {
				if (node instanceof HTMLDialogElement && node.open) node.close();
				if (previousFocus?.isConnected) tick().then(() => previousFocus.focus());
			}
		};
	}

	function handleDialogCancel(event: Event): void {
		event.preventDefault();
		setOpen(false);
	}

	function handleSurfaceClick(event: MouseEvent): void {
		if (modal && event.target === event.currentTarget) setOpen(false);
	}
</script>

{#if open}
	<svelte:element
		this={modal ? 'dialog' : 'div'}
		id={resolvedId || undefined}
		class={`melt-command ${modal ? 'melt-command-modal' : ''} ${className}`}
		role={modal ? undefined : 'region'}
		aria-label={label}
		aria-modal={modal ? 'true' : undefined}
		use:manageSurface
		oncancel={handleDialogCancel}
		onclose={() => setOpen(false)}
		onclick={handleSurfaceClick}
		onkeydown={handleKeydown}
		{...rest}
	>
		<div class="melt-command-panel">
			{@render header?.()}
			<label class="melt-command-search">
				<span class="melt-visually-hidden">{searchLabel}</span>
				<input
					bind:this={inputElement}
					type="search"
					role="combobox"
					value={query}
					placeholder={searchLabel}
					aria-label={searchLabel}
					aria-expanded="true"
					aria-autocomplete="list"
					aria-controls={listId}
					aria-activedescendant={activeDescendant}
					autocomplete="off"
					spellcheck="false"
					oninput={handleQueryInput}
				/>
			</label>
			<div id={listId} class="melt-command-list" role="listbox" aria-label="Commands">
				{#each resultGroups as group (group.id)}
					<div class="melt-command-group" role="group" aria-label={group.label || undefined}>
						{#if group.label}<div class="melt-command-group-label">{group.label}</div>{/if}
						{#each group.items as result (result.item.value)}
							<button
								id={resolvedId ? `${resolvedId}-option-${result.index}` : undefined}
								type="button"
								class="melt-command-item"
								role="option"
								tabindex="-1"
								disabled={result.item.disabled}
								aria-selected={value === result.item.value}
								data-active={activeIndex === result.index || undefined}
								data-selected={value === result.item.value || undefined}
								onmouseenter={() => setActive(result.index)}
								onclick={() => selectItem(result.item)}
							>
								{#if item}
									{@render item({
										item: result.item,
										active: activeIndex === result.index,
										selected: value === result.item.value
									})}
								{:else}
									<span class="melt-command-item-content">
										<span class="melt-command-item-label">{result.item.label}</span>
										{#if result.item.description}<span class="melt-command-item-description">{result.item.description}</span>{/if}
									</span>
								{/if}
							</button>
						{/each}
					</div>
				{:else}
					<div class="melt-command-empty" role="status">
					{#if empty}
						{@render empty()}
					{:else}
						{emptyText}
					{/if}
				</div>
				{/each}
			</div>
			{@render footer?.()}
		</div>
	</svelte:element>
{/if}
