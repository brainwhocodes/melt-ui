# shadcn/ui component inventory

**Audit date:** 2026-08-03  
**Sources:** [official component index](https://ui.shadcn.com/docs/components), [official registry index](https://ui.shadcn.com/r/index.json).

The official docs index contains 69 links and 63 unique canonical labels after removing the six New Components entries repeated under All Components. The matrix preserves first-seen official ordering. `covered` means Melt provides a functional public builder. `component` means Melt now provides a styled Svelte component, including managed behavior where the contract requires it. The component-library surface complements the lower-level builders; neither status is a placeholder or an out-of-scope deferral.

## Canonical component matrix

| Component | Official source/category | Melt status | Melt mapping/rationale | Priority |
|---|---|---|---|---|
| [Attachment](https://ui.shadcn.com/docs/components/attachment) | New Components; `ui/attachment.tsx` | component | `Attachment` provides file metadata, transfer progress, and removal controls. | Complete |
| [Bubble](https://ui.shadcn.com/docs/components/bubble) | New Components; `ui/bubble.tsx` | component | `Bubble` provides incoming, outgoing, and system message surfaces. | Complete |
| [Marker](https://ui.shadcn.com/docs/components/marker) | New Components; `ui/marker.tsx` | component | `Marker` provides semantic transcript separators. | Complete |
| [Message](https://ui.shadcn.com/docs/components/message) | New Components; `ui/message.tsx` | component | `Message` provides structured conversation rows and named content regions. | Complete |
| [Message Scroller](https://ui.shadcn.com/docs/components/message-scroller) | New Components; `ui/message-scroller.tsx` | component | `MessageScroller` provides live-edge following, prepend preservation, and jump controls. | Complete |
| [Toast](https://ui.shadcn.com/docs/components/toast) | New Components; `ui/toast.tsx` | covered | `createToast` provides the state, queue, timers, dismissal, and announcements. | — |
| [Accordion](https://ui.shadcn.com/docs/components/accordion) | All Components; `ui/accordion.tsx` | covered | `createAccordion` provides disclosure state, keyboard behavior, and ARIA relationships. | — |
| [Alert](https://ui.shadcn.com/docs/components/alert) | All Components; `ui/alert.tsx` | component | `Alert` provides semantic callouts with restrained status variants. | Complete |
| [Alert Dialog](https://ui.shadcn.com/docs/components/alert-dialog) | All Components; `ui/alert-dialog.tsx` | component | `AlertDialog` and its title, description, action, and cancel parts provide modal confirmation behavior. | Complete |
| [Aspect Ratio](https://ui.shadcn.com/docs/components/aspect-ratio) | All Components; `ui/aspect-ratio.tsx` | component | `AspectRatio` preserves a validated positive width-to-height ratio. | Complete |
| [Avatar](https://ui.shadcn.com/docs/components/avatar) | All Components; `ui/avatar.tsx` | covered | `createAvatar` provides image loading and fallback state. | — |
| [Badge](https://ui.shadcn.com/docs/components/badge) | All Components; `ui/badge.tsx` | component | `Badge` provides status, metadata, and removable-filter variants. | Complete |
| [Breadcrumb](https://ui.shadcn.com/docs/components/breadcrumb) | All Components; `ui/breadcrumb.tsx` | component | `Breadcrumb` and `BreadcrumbItem` provide semantic hierarchical navigation. | Complete |
| [Button](https://ui.shadcn.com/docs/components/button) | All Components; `ui/button.tsx` | component | `Button` provides native semantics, variants, sizes, and loading state. | Complete |
| [Button Group](https://ui.shadcn.com/docs/components/button-group) | All Components; `ui/button-group.tsx` | component | `ButtonGroup` lays out related controls horizontally or vertically. | Complete |
| [Calendar](https://ui.shadcn.com/docs/components/calendar) | All Components; `ui/calendar.tsx` | covered | `createCalendar` provides date-grid state and navigation. | — |
| [Card](https://ui.shadcn.com/docs/components/card) | All Components; `ui/card.tsx` | component | `Card` and its named regions provide structured content surfaces. | Complete |
| [Carousel](https://ui.shadcn.com/docs/components/carousel) | All Components; `ui/carousel.tsx` | component | `Carousel` provides scroll snap, keyboard controls, dots, and optional autoplay without an engine dependency. | Complete |
| [Chart](https://ui.shadcn.com/docs/components/chart) | All Components; `ui/chart.tsx` | component | `Chart` provides dependency-free accessible line and bar charts using deterministic SVG. | Complete |
| [Checkbox](https://ui.shadcn.com/docs/components/checkbox) | All Components; `ui/checkbox.tsx` | covered | `createCheckbox` provides checked/indeterminate state and form semantics. | — |
| [Collapsible](https://ui.shadcn.com/docs/components/collapsible) | All Components; `ui/collapsible.tsx` | covered | `createCollapsible` provides disclosure state and keyboard semantics. | — |
| [Combobox](https://ui.shadcn.com/docs/components/combobox) | All Components; `ui/combobox.tsx` | covered | `createCombobox` provides input, listbox, filtering, selection, and popup coordination. | — |
| [Command](https://ui.shadcn.com/docs/components/command) | All Components; `ui/command.tsx` | component | `Command` provides keyboard-first search, selection, empty state, and optional modality. | Complete |
| [Context Menu](https://ui.shadcn.com/docs/components/context-menu) | All Components; `ui/context-menu.tsx` | covered | `createContextMenu` provides pointer positioning, keyboard navigation, and dismissal. | — |
| [Data Table](https://ui.shadcn.com/docs/components/data-table) | All Components; docs-only marker | component | `DataTable` provides sorting, filtering, selection, and scoped table semantics. | Complete |
| [Date Picker](https://ui.shadcn.com/docs/components/date-picker) | All Components; docs-only marker | covered | `createDatePicker` composes date-field and calendar state. | — |
| [Dialog](https://ui.shadcn.com/docs/components/dialog) | All Components; `ui/dialog.tsx` | covered | `createDialog` provides modal state, focus management, dismissal, and portals. | — |
| [Direction](https://ui.shadcn.com/docs/components/direction) | All Components; `ui/direction.tsx` | component | `Direction` provides a local left-to-right or right-to-left writing boundary. | Complete |
| [Drawer](https://ui.shadcn.com/docs/components/drawer) | All Components; `ui/drawer.tsx` | component | `Drawer` provides directional modality, drag dismissal, and snap behavior. | Complete |
| [Dropdown Menu](https://ui.shadcn.com/docs/components/dropdown-menu) | All Components; `ui/dropdown-menu.tsx` | covered | `createDropdownMenu` provides menu roles, roving focus, positioning, and dismissal. | — |
| [Empty](https://ui.shadcn.com/docs/components/empty) | All Components; `ui/empty.tsx` | component | `Empty` provides icon, context, and action regions for empty states. | Complete |
| [Field](https://ui.shadcn.com/docs/components/field) | All Components; `ui/field.tsx` | component | `Field` wires labels, descriptions, validation, and arbitrary controls with ARIA. | Complete |
| [Hover Card](https://ui.shadcn.com/docs/components/hover-card) | All Components; `ui/hover-card.tsx` | covered | `createLinkPreview` is the functional hover/focus preview equivalent. | — |
| [Input](https://ui.shadcn.com/docs/components/input) | All Components; `ui/input.tsx` | component | `Input` styles the native input while preserving platform behavior. | Complete |
| [Input Group](https://ui.shadcn.com/docs/components/input-group) | All Components; `ui/input-group.tsx` | component | `InputGroup` provides unified prefix, control, and suffix layout. | Complete |
| [Input OTP](https://ui.shadcn.com/docs/components/input-otp) | All Components; `ui/input-otp.tsx` | covered | `createPinInput` is the functional one-time-code input equivalent. | — |
| [Item](https://ui.shadcn.com/docs/components/item) | All Components; `ui/item.tsx` | component | `Item` provides media, detail, and action regions for compact content rows. | Complete |
| [Kbd](https://ui.shadcn.com/docs/components/kbd) | All Components; `ui/kbd.tsx` | component | `Kbd` provides semantic keyboard-input hints. | Complete |
| [Label](https://ui.shadcn.com/docs/components/label) | All Components; `ui/label.tsx` | covered | `createLabel` provides label/control association behavior. | — |
| [Menubar](https://ui.shadcn.com/docs/components/menubar) | All Components; `ui/menubar.tsx` | covered | `createMenubar` provides persistent menu navigation and keyboard behavior. | — |
| [Native Select](https://ui.shadcn.com/docs/components/native-select) | All Components; `ui/native-select.tsx` | component | `NativeSelect` styles the platform select without replacing its interaction model. | Complete |
| [Navigation Menu](https://ui.shadcn.com/docs/components/navigation-menu) | All Components; `ui/navigation-menu.tsx` | component | `NavigationMenu` provides focus-managed disclosure navigation, portal content, and viewport coordination. | Complete |
| [Pagination](https://ui.shadcn.com/docs/components/pagination) | All Components; `ui/pagination.tsx` | covered | `createPagination` provides page calculations and navigation state. | — |
| [Popover](https://ui.shadcn.com/docs/components/popover) | All Components; `ui/popover.tsx` | covered | `createPopover` provides anchored floating content and dismissal. | — |
| [Progress](https://ui.shadcn.com/docs/components/progress) | All Components; `ui/progress.tsx` | covered | `createProgress` provides progress semantics and value state. | — |
| [Radio Group](https://ui.shadcn.com/docs/components/radio-group) | All Components; `ui/radio-group.tsx` | covered | `createRadioGroup` provides selection, roving tabindex, keyboard navigation, and form serialization. | — |
| [Resizable](https://ui.shadcn.com/docs/components/resizable) | All Components; `ui/resizable.tsx` | component | `ResizableGroup`, `ResizablePanel`, and `ResizableHandle` provide bounded pointer and keyboard panel sizing. | Complete |
| [Scroll Area](https://ui.shadcn.com/docs/components/scroll-area) | All Components; `ui/scroll-area.tsx` | covered | `createScrollArea` provides custom scrollbar interaction and scroll state. | — |
| [Select](https://ui.shadcn.com/docs/components/select) | All Components; `ui/select.tsx` | covered | `createSelect` provides listbox selection, positioning, and keyboard behavior. | — |
| [Separator](https://ui.shadcn.com/docs/components/separator) | All Components; `ui/separator.tsx` | covered | `createSeparator` provides orientation and semantic separator attributes. | — |
| [Sheet](https://ui.shadcn.com/docs/components/sheet) | All Components; `ui/sheet.tsx` | component | `Sheet` and its named regions provide side-attached modal surfaces. | Complete |
| [Sidebar](https://ui.shadcn.com/docs/components/sidebar) | All Components; `ui/sidebar.tsx` | component | `Sidebar` provides responsive, compact, mobile, and persistent application navigation states. | Complete |
| [Skeleton](https://ui.shadcn.com/docs/components/skeleton) | All Components; `ui/skeleton.tsx` | component | `Skeleton` provides a reduced-motion-safe loading placeholder. | Complete |
| [Slider](https://ui.shadcn.com/docs/components/slider) | All Components; `ui/slider.tsx` | covered | `createSlider` provides pointer, keyboard, range, and orientation behavior. | — |
| [Spinner](https://ui.shadcn.com/docs/components/spinner) | All Components; `ui/spinner.tsx` | component | `Spinner` provides a compact accessible busy indicator. | Complete |
| [Switch](https://ui.shadcn.com/docs/components/switch) | All Components; `ui/switch.tsx` | covered | `createSwitch` provides checked state and switch semantics. | — |
| [Table](https://ui.shadcn.com/docs/components/table) | All Components; `ui/table.tsx` | component | `Table` and its row, cell, section, and caption parts style native table markup. | Complete |
| [Tabs](https://ui.shadcn.com/docs/components/tabs) | All Components; `ui/tabs.tsx` | covered | `createTabs` provides tab/panel relationships, selection, and keyboard navigation. | — |
| [Textarea](https://ui.shadcn.com/docs/components/textarea) | All Components; `ui/textarea.tsx` | component | `Textarea` styles the native multiline control while preserving platform behavior. | Complete |
| [Toggle](https://ui.shadcn.com/docs/components/toggle) | All Components; `ui/toggle.tsx` | covered | `createToggle` provides pressed state and button semantics. | — |
| [Toggle Group](https://ui.shadcn.com/docs/components/toggle-group) | All Components; `ui/toggle-group.tsx` | covered | `createToggleGroup` provides grouped single/multiple selection and keyboard behavior. | — |
| [Tooltip](https://ui.shadcn.com/docs/components/tooltip) | All Components; `ui/tooltip.tsx` | covered | `createTooltip` provides hover/focus timing, positioning, and dismissal. | — |
| [Typography](https://ui.shadcn.com/docs/components/typography) | All Components; docs-only marker | component | `Typeset`, `TypesetHeading`, and `TypesetText` provide a styled long-form content system. | Complete |

**Canonical totals:** 63 rows — 28 `covered` builders and 35 styled `component` implementations.

## Gap backlog

Closed. Navigation Menu, Resizable, Message Scroller, Drawer, and Carousel now ship as styled Svelte components with their required managed behavior.

## Registry-only and docs-only metadata

- The re-fetched registry has 62 entries. `sonner` is registry-only and is not a canonical docs-index row; it is a third-party notification integration. `form` is registry metadata without a canonical docs component row. Neither inflates the 63-row matrix.
- `Data Table` and `Typography` are canonical docs rows with no entry in the re-fetched registry index and are marked `docs-only` in their source cells.

## Melt-only public builders

These public builders have no canonical shadcn row and are intentionally not counted as parity rows:

- Existing: `date-field`, `date-range-field`, `date-range-picker`, `range-calendar`, `table-of-contents`, `tags-input`, `toolbar`, `tree`.
- New additions: `alignment-picker`, `color-picker`.

Internal `hidden-input`, `listbox`, and `menu` directories are not public builders. Builder totals: **38 public exports**, **38 `builderMap` entries**, **28 mapped to canonical shadcn rows**, and **10 Melt-only**. The component API adds **35 canonical implementations across six component families**.
