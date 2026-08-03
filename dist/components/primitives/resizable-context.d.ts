import type { Readable } from 'svelte/store';
export type ResizableDirection = 'horizontal' | 'vertical';
export type ResizableDirectionality = 'ltr' | 'rtl';
export type ResizeSource = 'pointer' | 'keyboard' | 'programmatic';
export type ResizableToken = object;
export interface ResizablePanelConfig {
    defaultSize?: number;
    minSize: number;
    maxSize: number;
    disabled: boolean;
}
export interface ResizablePanelState extends ResizablePanelConfig {
    token: ResizableToken;
    size: number;
}
export interface ResizableState {
    direction: ResizableDirection;
    dir: ResizableDirectionality;
    disabled: boolean;
    panels: ResizablePanelState[];
    handles: ResizableToken[];
}
export interface ResizableResizeDetail {
    sizes: number[];
    handleIndex: number;
    previousSize: number;
    nextSize: number;
    source: ResizeSource;
}
export interface ResizableContext {
    state: Readable<ResizableState>;
    registerPanel: (token: ResizableToken, config: ResizablePanelConfig) => () => void;
    updatePanel: (token: ResizableToken, config: ResizablePanelConfig) => void;
    registerHandle: (token: ResizableToken) => () => void;
    resizeBy: (handle: ResizableToken, delta: number, source: ResizeSource) => ResizableResizeDetail | null;
    resizeTo: (handle: ResizableToken, edge: 'min' | 'max', source: ResizeSource) => ResizableResizeDetail | null;
    getGroupRect: () => DOMRect | null;
}
export declare const RESIZABLE_CONTEXT: unique symbol;
