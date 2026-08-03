---
title: Avatar
description: An image element with a fallback for representing the user.
---

<script lang="ts">
    import { APIReference } from '$docs/components'
    let { schemas } = $props()
</script>

## Anatomy

- **Image**: The image element that displays the user's profile picture
- **Fallback**: The fallback element that displays while the image loads or if the image fails to
  load

## API Reference

<APIReference {schemas} />
