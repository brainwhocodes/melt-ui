<script lang="ts">
	import { mount, onMount, unmount } from 'svelte';
	import Slider from './Slider.svelte';

	export let elementRoot: HTMLElement;

	onMount(() => {
		if (elementRoot) {
			const shadowRoot = elementRoot.attachShadow({ mode: 'open' });
			const styleElement = document.createElement('style');
			styleElement.innerHTML = `
				.root {
					display: flex; align-items: center; position:relative; height:20px; width:200px
				}
				.range-wrapper {
					height:3px; width: 100%; background: rgb(0 0 0 / 0.4)
				}
				.range {
    			height: 3px; background: white;
  			}
				.thumb {
					height: 20px;
					width: 20px;
					border-radius: 100%;
					background: white;

				}
    }`;

			const componentRoot = document.createElement('div');
			shadowRoot.appendChild(componentRoot);

			shadowRoot.appendChild(styleElement);
			const component = mount(Slider, {
				target: componentRoot,
				props: {
					componentRoot,
				},
			});
			return () => {
				void unmount(component);
			};
		}
	});
</script>

<main bind:this={elementRoot}></main>
