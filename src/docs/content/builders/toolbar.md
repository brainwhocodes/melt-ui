---
title: Toolbar
description:
  A container for grouping a set of controls, such as buttons, toggle groups or dropdown menus.
---

<script lang="ts">
    import { APIReference, KbdTable } from '$docs/components'
    let { schemas, keyboard } = $props()
</script>

## API Reference

<APIReference {schemas} />

## Accessibility

Adheres to the [Toolbar WAI-ARIA design pattern](https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/)

<KbdTable {keyboard} />
