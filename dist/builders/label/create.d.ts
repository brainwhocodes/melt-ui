import type { MeltActionReturn } from '../../internal/types.js';
import type { LabelEvents } from './events.js';
export declare function createLabel(): {
    elements: {
        root: import("../../internal/helpers/index.js").MeltElement<import("../../internal/helpers/store/types.js").Stores | undefined, (node: HTMLElement) => MeltActionReturn<LabelEvents["root"]>, (() => Record<string, any> | ((...args: any[]) => Record<string, any>)) | ((values: unknown) => Record<string, any> | ((...args: any[]) => Record<string, any>)) | ((values: unknown[]) => Record<string, any> | ((...args: any[]) => Record<string, any>)) | ((values: [unknown, ...unknown[]]) => Record<string, any> | ((...args: any[]) => Record<string, any>)), "label">;
    };
};
