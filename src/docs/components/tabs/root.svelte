<script lang="ts" module>
	type CreateTabs = ReturnType<typeof createTabs>;
	type Elements = CreateTabs['elements'];

	type TabsContext = Pick<Elements, 'content' | 'list' | 'trigger'> & {
		tabs: Writable<string[]>;
	};

	const setTabsContext = (context: TabsContext) => {
		setContext('tabs', context);
	};

	export const getTabsContext = () => getContext<TabsContext>('tabs');
</script>

<script lang="ts">
	import { createTabs } from '$lib/index.js';
	import { getContext, setContext } from 'svelte';
	import { writable, type Writable } from 'svelte/store';

	interface Props {
		tabs?: string[];
		children?: import('svelte').Snippet<[any]>;
	}

	let { tabs = [], children }: Props = $props();
	const value = writable(tabs[0]);

	const {
		elements: { root, content, list, trigger },
	} = createTabs({
		value,
	});

	$effect(() => {
		value.set(tabs[0]);
	});

	const tabsStore = writable(tabs);
	$effect(() => {
		tabsStore.update(() => tabs);
	});

	setTabsContext({ content, list, trigger, tabs: tabsStore });
</script>

<div {...$root} use:root>
	{@render children?.({ tab: $value, })}
</div>
