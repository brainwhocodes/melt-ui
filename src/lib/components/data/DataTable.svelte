<script context="module" lang="ts">
	export type DataTableKey = string | number;
	export type DataTableSortDirection = 'asc' | 'desc';
	export type DataTableRow = Record<string, unknown>;
	export type DataTableAccessor = string | ((row: DataTableRow, index: number) => unknown);
	export type DataTableKeyAccessor = string | ((row: DataTableRow, index: number) => DataTableKey);

	export interface DataTableColumn {
		key: string;
		header: string;
		accessor?: DataTableAccessor;
		sortable?: boolean;
		searchable?: boolean;
		numeric?: boolean;
		format?: (value: unknown, row: DataTableRow, index: number) => string | number;
		compare?: (
			left: unknown,
			right: unknown,
			leftRow: DataTableRow,
			rightRow: DataTableRow
		) => number;
	}
</script>

<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	interface PreparedRow {
		row: DataTableRow;
		key: DataTableKey;
		label: string;
		index: number;
		values: Record<string, unknown>;
		searchText: string;
	}

	const dispatch = createEventDispatcher<{
		sortchange: { key: string | null; direction: DataTableSortDirection };
		querychange: { query: string };
		selectionchange: { selectedKeys: DataTableKey[]; visibleKeys: DataTableKey[] };
	}>();

	let className = '';
	export { className as class };
	export let columns: DataTableColumn[] = [];
	export let rows: DataTableRow[] = [];
	export let keyAccessor: DataTableKeyAccessor = (_row, index) => index;
	export let rowLabel: (row: DataTableRow, index: number) => string = (_row, index) =>
		`Row ${index + 1}`;
	export let caption = 'Data table';
	export let showCaption = false;
	export let searchable = false;
	export let searchLabel = 'Search rows';
	export let query = '';
	export let clientSort = true;
	export let sortKey: string | null = null;
	export let sortDirection: DataTableSortDirection = 'asc';
	export let selectable = false;
	export let selectedKeys: DataTableKey[] = [];
	export let emptyText = 'No rows to display.';
	export let noResultsText = 'No rows match your search.';

	const hasRowAction = Boolean($$slots.rowAction);

	$: preparedRows = prepareRows(rows, columns, keyAccessor, rowLabel);
	$: normalizedQuery = query.trim().toLocaleLowerCase();
	$: filteredRows = normalizedQuery
		? preparedRows.filter((prepared) => prepared.searchText.includes(normalizedQuery))
		: preparedRows;
	$: visibleRows = clientSort
		? sortRows(filteredRows, columns, sortKey, sortDirection)
		: filteredRows;
	$: visibleKeys = visibleRows.map((prepared) => prepared.key);
	$: publicVisibleRows = visibleRows.map((prepared) => prepared.row);
	$: selectedKeySet = new Set(selectedKeys);
	$: selectedVisibleCount = visibleKeys.reduce<number>(
		(count, key) => count + (selectedKeySet.has(key) ? 1 : 0),
		0
	);
	$: allVisibleSelected = visibleKeys.length > 0 && selectedVisibleCount === visibleKeys.length;
	$: someVisibleSelected = selectedVisibleCount > 0 && !allVisibleSelected;
	$: columnCount = columns.length + (selectable ? 1 : 0) + (hasRowAction ? 1 : 0);

	function readAccessor(row: DataTableRow, index: number, accessor: DataTableAccessor): unknown {
		return typeof accessor === 'function' ? accessor(row, index) : row[accessor];
	}

	function prepareRows(
		inputRows: DataTableRow[],
		inputColumns: DataTableColumn[],
		getKey: DataTableKeyAccessor,
		getLabel: (row: DataTableRow, index: number) => string
	): PreparedRow[] {
		return inputRows.map((row, index) => {
			const values: Record<string, unknown> = {};
			const searchableValues: string[] = [];

			for (const column of inputColumns) {
				const value = readAccessor(row, index, column.accessor ?? column.key);
				values[column.key] = value;
				if (column.searchable !== false && value != null) searchableValues.push(String(value));
			}

			const key = readAccessor(row, index, getKey);
			if (typeof key !== 'string' && typeof key !== 'number') {
				throw new TypeError('DataTable keyAccessor must return a string or number.');
			}

			return {
				row,
				key,
				label: getLabel(row, index),
				index,
				values,
				searchText: searchableValues.join(' ').toLocaleLowerCase()
			};
		});
	}

	function sortRows(
		inputRows: PreparedRow[],
		inputColumns: DataTableColumn[],
		key: string | null,
		direction: DataTableSortDirection
	): PreparedRow[] {
		if (!key) return inputRows;
		const column = inputColumns.find((candidate) => candidate.key === key && candidate.sortable);
		if (!column) return inputRows;
		const multiplier = direction === 'asc' ? 1 : -1;

		return [...inputRows].sort((left, right) => {
			const compared = column.compare
				? column.compare(left.values[key], right.values[key], left.row, right.row)
				: compareValues(left.values[key], right.values[key]);
			return compared === 0 ? left.index - right.index : compared * multiplier;
		});
	}

	function compareValues(left: unknown, right: unknown): number {
		if (Object.is(left, right)) return 0;
		if (left == null) return 1;
		if (right == null) return -1;
		if (typeof left === 'number' && typeof right === 'number') return left - right;
		if (left instanceof Date && right instanceof Date) return left.getTime() - right.getTime();
		return String(left).localeCompare(String(right), undefined, {
			numeric: true,
			sensitivity: 'base'
		});
	}

	function getSortState(
		column: DataTableColumn,
		activeKey: string | null,
		direction: DataTableSortDirection
	): 'ascending' | 'descending' | 'none' | undefined {
		if (!column.sortable) return undefined;
		if (activeKey !== column.key) return 'none';
		return direction === 'asc' ? 'ascending' : 'descending';
	}

	function setSort(column: DataTableColumn): void {
		if (!column.sortable) return;
		if (sortKey === column.key) sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
		else {
			sortKey = column.key;
			sortDirection = 'asc';
		}
		dispatch('sortchange', { key: sortKey, direction: sortDirection });
	}

	function handleSearchInput(event: Event): void {
		query = (event.currentTarget as HTMLInputElement).value;
		dispatch('querychange', { query });
	}
	function handleVisibleSelection(event: Event): void {
		setVisibleSelected((event.currentTarget as HTMLInputElement).checked);
	}

	function handleRowSelection(event: Event, key: DataTableKey): void {
		setRowSelected(key, (event.currentTarget as HTMLInputElement).checked);
	}


	function setRowSelected(key: DataTableKey, checked: boolean): void {
		const next = new Set(selectedKeys);
		if (checked) next.add(key);
		else next.delete(key);
		selectedKeys = [...next];
		dispatch('selectionchange', { selectedKeys, visibleKeys });
	}

	function setVisibleSelected(checked: boolean): void {
		const next = new Set(selectedKeys);
		for (const key of visibleKeys) {
			if (checked) next.add(key);
			else next.delete(key);
		}
		selectedKeys = [...next];
		dispatch('selectionchange', { selectedKeys, visibleKeys });
	}

	function indeterminate(node: HTMLInputElement, value: boolean) {
		node.indeterminate = value;
		return {
			update(next: boolean) {
				node.indeterminate = next;
			}
		};
	}

	function displayValue(column: DataTableColumn, prepared: PreparedRow): string | number {
		const value = prepared.values[column.key];
		if (column.format) return column.format(value, prepared.row, prepared.index);
		return value == null ? '' : String(value);
	}
</script>

<div class={`melt-data-table ${className}`} {...$$restProps}>
	{#if searchable || selectable || $$slots.toolbar}
		<div class="melt-data-table-toolbar">
			{#if searchable}
				<label class="melt-data-table-search">
					<span class="melt-visually-hidden">{searchLabel}</span>
					<input
						type="search"
						value={query}
						placeholder={searchLabel}
						aria-label={searchLabel}
						on:input={handleSearchInput}
					/>
				</label>
			{/if}
			{#if selectable}
				<p class="melt-data-table-selection" aria-live="polite">
					{selectedVisibleCount} of {visibleKeys.length} visible rows selected
				</p>
			{/if}
			<slot name="toolbar" rows={publicVisibleRows} {selectedKeys} />
		</div>
	{/if}

	<!-- The labeled region is intentionally focusable so keyboard users can scroll wide tables. -->
	<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
	<div class="melt-data-table-viewport" tabindex="0" role="region" aria-label={caption}>
		<table class="melt-table melt-data-table-table">
			<caption class:melt-visually-hidden={!showCaption}>{caption}</caption>
			<thead class="melt-table-header">
				<tr class="melt-table-row">
					{#if selectable}
						<th class="melt-table-head melt-data-table-select" scope="col">
							<input
								type="checkbox"
								checked={allVisibleSelected}
								use:indeterminate={someVisibleSelected}
								disabled={visibleKeys.length === 0}
								aria-label="Select all visible rows"
								on:change={handleVisibleSelection}
							/>
						</th>
					{/if}
					{#each columns as column (column.key)}
						<th
							class={`melt-table-head ${column.numeric ? 'melt-data-table-numeric' : ''}`}
							scope="col"
							aria-sort={getSortState(column, sortKey, sortDirection)}
						>
							{#if column.sortable}
								<button
									type="button"
									class="melt-data-table-sort"
									on:click={() => setSort(column)}
								>
									<span>{column.header}</span>
									<span class="melt-data-table-sort-indicator" aria-hidden="true">
										{sortKey === column.key ? (sortDirection === 'asc' ? '↑' : '↓') : '↕'}
									</span>
								</button>
							{:else}
								{column.header}
							{/if}
						</th>
					{/each}
					{#if hasRowAction}<th class="melt-table-head melt-data-table-action" scope="col">Actions</th>{/if}
				</tr>
			</thead>
			<tbody class="melt-table-body">
				{#each visibleRows as prepared (prepared.key)}
					<tr class="melt-table-row" data-selected={selectedKeySet.has(prepared.key) || undefined}>
						{#if selectable}
							<td class="melt-table-cell melt-data-table-select">
								<input
									type="checkbox"
									checked={selectedKeySet.has(prepared.key)}
									aria-label={`Select ${prepared.label}`}
									on:change={(event) => handleRowSelection(event, prepared.key)}
								/>
							</td>
						{/if}
						{#each columns as column (column.key)}
							<td class={`melt-table-cell ${column.numeric ? 'melt-data-table-numeric' : ''}`}>
								<slot
									name="cell"
									row={prepared.row}
									rowIndex={prepared.index}
									{column}
									value={prepared.values[column.key]}
								>
									{displayValue(column, prepared)}
								</slot>
							</td>
						{/each}
						{#if hasRowAction}
							<td class="melt-table-cell melt-data-table-action">
								<slot name="rowAction" row={prepared.row} rowIndex={prepared.index} />
							</td>
						{/if}
					</tr>
				{:else}
					<tr class="melt-table-row">
						<td class="melt-table-cell melt-data-table-empty" colspan={Math.max(columnCount, 1)}>
							<slot name="empty" query={normalizedQuery}>
								{normalizedQuery ? noResultsText : emptyText}
							</slot>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
