export { default as Attachment } from './Attachment.svelte';
export { default as Bubble } from './Bubble.svelte';
export { default as Marker } from './Marker.svelte';
export { default as Message } from './Message.svelte';
export { default as MessageScroller } from './MessageScroller.svelte';

export type BubbleVariant = 'incoming' | 'outgoing' | 'system';
export type MessageVariant = BubbleVariant;
export type MessageScrollerPrependDetail = {
	previousScrollHeight: number;
	scrollHeight: number;
	delta: number;
	scrollTop: number;
};
