---
title: Toggle Group
description: A set of two-state buttons that can be toggled on or off.
---

<script lang="ts">
    import { APIReference, KbdTable } from '$docs/components'
    let { schemas, keyboard } = $props()
</script>

## Anatomy

- **Root**: The toggle group container component
- **Item**: A toggle group item component

## API Reference

<APIReference {schemas} />

## Accessibility

Adheres to the [Button WAI-ARIA design pattern](https://www.w3.org/WAI/ARIA/apg/patterns/button/)

<KbdTable {keyboard} />
