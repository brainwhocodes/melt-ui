import type { Writable } from 'svelte/store';

export type NavigationMenuDirection = 'next' | 'previous' | 'first' | 'last';

export interface NavigationMenuRootContext {
	value: Writable<string>;
	rovingValue: Writable<string>;
	revision: Writable<number>;
	getValue: () => string;
	setValue: (value: string) => void;
	toggleValue: (value: string) => void;
	scheduleOpen: (value: string) => void;
	scheduleClose: (value: string) => void;
	cancelScheduledChange: () => void;
	notifyTriggerChange: () => void;
	close: (returnFocus?: boolean) => void;
	registerTrigger: (
		value: string,
		element: HTMLButtonElement,
		disabled: () => boolean,
	) => () => void;
	registerContent: (value: string, element: HTMLElement) => () => void;
	registerViewport: (element: HTMLElement) => () => void;
	moveTrigger: (value: string, direction: NavigationMenuDirection) => void;
	focusContent: (value: string) => Promise<void>;
	getTabIndex: (value: string, rovingValue: string, revision: number) => 0 | -1;
	getTriggerId: (value: string) => string;
	getContentId: (value: string) => string;
	isDisabled: (value: string) => boolean;
	dir: () => 'ltr' | 'rtl';
}

export interface NavigationMenuItemContext {
	value: () => string;
}

export const NAVIGATION_MENU_ROOT = {};
export const NAVIGATION_MENU_ITEM = {};

export interface SidebarContext {
	collapsed: Writable<boolean>;
	open: Writable<boolean>;
	toggle: () => void;
}

export const SIDEBAR_ROOT = {};
