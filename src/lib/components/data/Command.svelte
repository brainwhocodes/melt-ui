<script context="module" lang="ts">
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
	import { createEventDispatcher, onMount, tick } from 'svelte';

	interface GroupedItem {
		item: CommandItem;
		index: number;
	}

	interface ResultGroup {
		id: string;
		label: string;
		items: GroupedItem[];
	}

	const dispatch = createEventDispatcher<{
		openchange: { open: boolean };
		querychange: { query: string };
		activechange: { activeIndex: number; item: CommandItem | null };
		select: { value: string; item: CommandItem };
	}>();

	let className = '';
	export { className as class };
	export let id: string | undefined = undefined;
	export let items: CommandItem[] = [];
	export let groups: CommandGroup[] = [];
	export let open = false;
	export let value: string | null = null;
	export let query = '';
	export let activeIndex = -1;
	export let modal = false;
	export let closeOnSelect = true;
	export let label = 'Command palette';
	export let searchLabel = 'Search commands';
	export let emptyText = 'No commands found.';

	let resolvedId = id ?? '';
	let inputElement: HTMLInputElement;

	onMount(() => {
		if (!resolvedId) resolvedId = `melt-command-${++commandInstance}`;
	});

	$: if (id && id !== resolvedId) resolvedId = id;
	$: normalizedQuery = query.trim().toLocaleLowerCase();
	$: filteredItems = filterItems(items, groups, normalizedQuery);
	$: resultGroups = groupItems(filteredItems, groups);
	$: {
		filteredItems;
		reconcileActive();
	}
	$: listId = resolvedId ? `${resolvedId}-list` : undefined;
	$: activeDescendant =
		activeIndex >= 0 && resolvedId ? `${resolvedId}-option-${activeIndex}` : undefined;

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
		dispatch('activechange', { activeIndex, item: filteredItems[activeIndex] });
		if (resolvedId) document.getElementById(`${resolvedId}-option-${activeIndex}`)?.scrollIntoView?.({ block: 'nearest' });
	}

	function setOpen(next: boolean): void {
		if (open === next) return;
		open = next;
		dispatch('openchange', { open });
	}

	function handleQueryInput(event: Event): void {
		query = (event.currentTarget as HTMLInputElement).value;
		activeIndex = -1;
		dispatch('querychange', { query });
	}

	function selectItem(item: CommandItem): void {
		if (item.disabled) return;
		value = item.value;
		dispatch('select', { value: item.value, item });
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
		on:cancel={handleDialogCancel}
		on:close={() => setOpen(false)}
		on:click={handleSurfaceClick}
		on:keydown={handleKeydown}
		{...$$restProps}
	>
		<div class="melt-command-panel">
			<slot name="header" />
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
					on:input={handleQueryInput}
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
								on:mouseenter={() => setActive(result.index)}
								on:click={() => selectItem(result.item)}
							>
								<slot name="item" item={result.item} active={activeIndex === result.index} selected={value === result.item.value}>
									<span class="melt-command-item-content">
										<span class="melt-command-item-label">{result.item.label}</span>
										{#if result.item.description}<span class="melt-command-item-description">{result.item.description}</span>{/if}
									</span>
								</slot>
							</button>
						{/each}
					</div>
				{:else}
					<div class="melt-command-empty" role="status"><slot name="empty">{emptyText}</slot></div>
				{/each}
			</div>
			<slot name="footer" />
		</div>
	</svelte:element>
{/if}
