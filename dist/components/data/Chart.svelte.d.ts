import { SvelteComponentTyped } from "svelte";
export type ChartType = 'line' | 'bar';
export interface ChartSeries {
    name: string;
    values: Array<number | null>;
    color?: string;
}
declare const __propDef: {
    props: {
        [x: string]: any;
        class?: string | undefined;
        type?: ChartType | undefined;
        labels?: string[] | undefined;
        series?: ChartSeries[] | undefined;
        width?: number | undefined;
        height?: number | undefined;
        viewBox?: string | undefined | undefined;
        title?: string | undefined;
        description?: string | undefined | undefined;
        valueFormatter?: ((value: number) => string) | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        table: {
            labels: string[];
            series: ChartSeries[];
        };
        summary: {
            summary: string;
        };
    };
};
export type ChartProps = typeof __propDef.props;
export type ChartEvents = typeof __propDef.events;
export type ChartSlots = typeof __propDef.slots;
export default class Chart extends SvelteComponentTyped<ChartProps, ChartEvents, ChartSlots> {
}
export {};
