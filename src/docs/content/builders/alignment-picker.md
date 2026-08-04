---
title: Alignment Picker
description: A nine-point logical alignment control with spatial keyboard navigation
---

<script lang="ts">
    import { APIReference, KbdTable, Preview } from '$docs/components'
    let { schemas, keyboard, snippets, previews } = $props()
</script>

## Usage

`createAlignmentPicker` provides a fixed nine-value alignment domain: `top-start`, `top-center`,
`top-end`, `center-start`, `center`, `center-end`, `bottom-start`, `bottom-center`, and
`bottom-end`.

<Preview code={snippets.main}>
    <previews.main />
</Preview>

## Anatomy

- Apply `elements.root` to a consumer-labelled element with `role="radiogroup"`.
- Apply `elements.item({ value })` to each button-backed radio item.
- Apply `elements.hiddenInput` to an input when submitting the selected value in a form.
- Use the item logical value as its accessible label. The builder exposes `data-row` and
  `data-column` coordinates for styling.

The builder does not impose a visual layout. Consumers can render the nine items as a 3×3 grid,
a toolbar, or another equivalent layout while preserving the logical positions.

## Controlled state

Pass a `Writable<AlignmentPickerValue>` through `value` for controlled state, or use
`defaultValue` for uncontrolled state. `onValueChange` uses Melt's change-function contract.
`loop` defaults to `true`; set it to `false` to stop at the first or last eligible item in a row or
column. `dir="rtl"` reverses horizontal visual movement without changing the logical values.

## Keyboard interaction

<kbd>ArrowLeft</kbd> and <kbd>ArrowRight</kbd> move within the current row. <kbd>ArrowUp</kbd> and
<kbd>ArrowDown</kbd> move within the current column. Disabled or unrendered cells are skipped.
<kbd>Home</kbd> selects the first rendered enabled item and <kbd>End</kbd> selects the last.

<KbdTable {keyboard} />

## Forms

Set `name` to serialize the selected logical value through the hidden input. The input is disabled
when the whole picker is disabled.

## Accessibility

The root uses `role="radiogroup"`; each item uses `role="radio"`, `aria-checked`, native
`disabled`, and roving `tabindex`. Provide an accessible name on the root and a readable label for
each logical position. The builder intentionally does not infer an accessible name from visual
icons.

## API Reference

<APIReference {schemas} />
