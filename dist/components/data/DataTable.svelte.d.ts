import { SvelteComponentTyped } from "svelte";
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
    compare?: (left: unknown, right: unknown, leftRow: DataTableRow, rightRow: DataTableRow) => number;
}
declare const __propDef: {
    props: {
        [x: string]: any;
        class?: string | undefined;
        columns?: DataTableColumn[] | undefined;
        rows?: DataTableRow[] | undefined;
        keyAccessor?: DataTableKeyAccessor | undefined;
        rowLabel?: ((row: DataTableRow, index: number) => string) | undefined;
        caption?: string | undefined;
        showCaption?: boolean | undefined;
        searchable?: boolean | undefined;
        searchLabel?: string | undefined;
        query?: string | undefined;
        clientSort?: boolean | undefined;
        sortKey?: string | null | undefined;
        sortDirection?: DataTableSortDirection | undefined;
        selectable?: boolean | undefined;
        selectedKeys?: DataTableKey[] | undefined;
        emptyText?: string | undefined;
        noResultsText?: string | undefined;
    };
    events: {
        sortchange: CustomEvent<{
            key: string | null;
            direction: DataTableSortDirection;
        }>;
        querychange: CustomEvent<{
            query: string;
        }>;
        selectionchange: CustomEvent<{
            selectedKeys: DataTableKey[];
            visibleKeys: DataTableKey[];
        }>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        toolbar: {
            rows: DataTableRow[];
            selectedKeys: DataTableKey[];
        };
        cell: {
            row: DataTableRow;
            rowIndex: number;
            column: DataTableColumn;
            value: unknown;
        };
        rowAction: {
            row: DataTableRow;
            rowIndex: number;
        };
        empty: {
            query: string;
        };
    };
};
export type DataTableProps = typeof __propDef.props;
export type DataTableEvents = typeof __propDef.events;
export type DataTableSlots = typeof __propDef.slots;
export default class DataTable extends SvelteComponentTyped<DataTableProps, DataTableEvents, DataTableSlots> {
}
export {};
