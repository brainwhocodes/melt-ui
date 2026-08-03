---
title: Table of Contents
description: An organized list of the content on your page.
---

<script lang="ts">
    import { APIReference, KbdTable } from '$docs/components'
    let { schemas, keyboard } = $props()
</script>

## Anatomy

- **Item**: The anchor item for each content.

## API Reference

<APIReference {schemas} />

## Keyboard Navigation

<KbdTable {keyboard} />
