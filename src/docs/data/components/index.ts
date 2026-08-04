export type ComponentCategory =
	| 'data'
	| 'forms'
	| 'messaging'
	| 'navigation'
	| 'overlays'
	| 'primitives';

export type ComponentMeta = {
	name: string;
	category: ComponentCategory;
	description: string;
	exports: readonly string[];
	example: string;
};

export const componentMap = {
	alert: {
		name: 'Alert',
		category: 'primitives',
		description:
			'Semantic status and callout content with restrained visual variants.',
		exports: ['Alert'],
		example: `<Alert variant="success">Saved.</Alert>`,
	},
	'alert-dialog': {
		name: 'Alert Dialog',
		category: 'overlays',
		description:
			'A modal confirmation surface with safe focus and cancellation behavior.',
		exports: [
			'AlertDialog',
			'AlertDialogTitle',
			'AlertDialogDescription',
			'AlertDialogAction',
			'AlertDialogCancel',
		],
		example: `<AlertDialog>
  <AlertDialogTitle>Delete draft?</AlertDialogTitle>
  <AlertDialogDescription>This cannot be undone.</AlertDialogDescription>
  <AlertDialogCancel>Keep</AlertDialogCancel>
  <AlertDialogAction>Delete</AlertDialogAction>
</AlertDialog>`,
	},
	'aspect-ratio': {
		name: 'Aspect Ratio',
		category: 'primitives',
		description:
			'A layout primitive that preserves a positive width-to-height ratio.',
		exports: ['AspectRatio'],
		example: `<AspectRatio ratio={16 / 9}>
  <img src="cover.png" alt="" />
</AspectRatio>`,
	},
	attachment: {
		name: 'Attachment',
		category: 'messaging',
		description:
			'File metadata, transfer progress, and removal controls for conversations.',
		exports: ['Attachment'],
		example: `<Attachment name="brief.pdf" size="1.2 MB" progress={68} />`,
	},
	badge: {
		name: 'Badge',
		category: 'primitives',
		description: 'Compact labels for status, metadata, and removable filters.',
		exports: ['Badge'],
		example: `<Badge variant="success">Stable</Badge>`,
	},
	breadcrumb: {
		name: 'Breadcrumb',
		category: 'navigation',
		description: 'Semantic hierarchical navigation with current-page support.',
		exports: ['Breadcrumb', 'BreadcrumbItem'],
		example: `<Breadcrumb>
  <BreadcrumbItem href="/">Home</BreadcrumbItem>
  <BreadcrumbItem href="/docs">Docs</BreadcrumbItem>
</Breadcrumb>`,
	},
	bubble: {
		name: 'Bubble',
		category: 'messaging',
		description: 'Incoming, outgoing, and system message surfaces.',
		exports: ['Bubble'],
		example: `<Bubble variant="incoming">How can I help?</Bubble>`,
	},
	button: {
		name: 'Button',
		category: 'forms',
		description:
			'A styled native button with variants, sizes, and loading state.',
		exports: ['Button'],
		example: `<Button>Save changes</Button>`,
	},
	'button-group': {
		name: 'Button Group',
		category: 'forms',
		description: 'Horizontal or vertical grouping for related controls.',
		exports: ['ButtonGroup'],
		example: `<ButtonGroup>
  <Button>Save</Button>
  <Button variant="outline">Cancel</Button>
</ButtonGroup>`,
	},
	card: {
		name: 'Card',
		category: 'primitives',
		description: 'A structured content surface with named regions.',
		exports: [
			'Card',
			'CardHeader',
			'CardTitle',
			'CardDescription',
			'CardContent',
			'CardFooter',
		],
		example: `<Card>
  <CardHeader>
    <CardTitle>Project</CardTitle>
    <CardDescription>Release details</CardDescription>
  </CardHeader>
  <CardContent>Content</CardContent>
  <CardFooter>Footer</CardFooter>
</Card>`,
	},
	carousel: {
		name: 'Carousel',
		category: 'navigation',
		description:
			'A scroll-snap carousel with keyboard, controls, dots, and optional autoplay.',
		exports: [
			'Carousel',
			'CarouselViewport',
			'CarouselSlide',
			'CarouselPrevious',
			'CarouselNext',
			'CarouselDots',
		],
		example: `<Carousel>
  <CarouselViewport>
    <CarouselSlide>Slide one</CarouselSlide>
  </CarouselViewport>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>`,
	},
	chart: {
		name: 'Chart',
		category: 'data',
		description:
			'Accessible dependency-free line and bar charts backed by deterministic SVG.',
		exports: ['Chart'],
		example: `<Chart type="line" series={[{ name: 'Requests', values: [4, 8, 12] }]} />`,
	},
	command: {
		name: 'Command',
		category: 'data',
		description:
			'A searchable keyboard-first command surface with optional modality.',
		exports: ['Command'],
		example: `<Command items={[{ value: 'save', label: 'Save file' }]} />`,
	},
	'data-table': {
		name: 'Data Table',
		category: 'data',
		description:
			'Sortable, searchable, selectable tabular data with explicit scope.',
		exports: ['DataTable'],
		example: `<DataTable caption="People" columns={columns} rows={rows} />`,
	},
	direction: {
		name: 'Direction',
		category: 'primitives',
		description:
			'A local writing-direction boundary for left-to-right or right-to-left content.',
		exports: ['Direction'],
		example: `<Direction dir="rtl">مرحبا</Direction>`,
	},
	drawer: {
		name: 'Drawer',
		category: 'overlays',
		description:
			'A directional modal drawer with drag dismissal and snap behavior.',
		exports: ['Drawer', 'DrawerTitle', 'DrawerDescription', 'DrawerClose'],
		example: `<Drawer>
  <DrawerTitle>Filters</DrawerTitle>
  <DrawerDescription>Refine results</DrawerDescription>
</Drawer>`,
	},
	empty: {
		name: 'Empty',
		category: 'primitives',
		description:
			'A focused empty-state composition with icon, context, and action regions.',
		exports: ['Empty'],
		example: `<Empty>
  <span slot="title">No results</span>
  <span slot="description">Try another query.</span>
</Empty>`,
	},
	field: {
		name: 'Field',
		category: 'forms',
		description:
			'Label, description, validation, and control layout with ARIA wiring.',
		exports: ['Field'],
		example: `<Field label="Email" description="Used for notifications">
  <Input type="email" />
</Field>`,
	},
	'inline-edit': {
		name: 'Inline Edit',
		category: 'forms',
		description:
			'A direct value editor with explicit save, cancel, and keyboard recovery.',
		exports: ['InlineEdit'],
		example: `<InlineEdit label="Project name" bind:value />`,
	},
	input: {
		name: 'Input',
		category: 'forms',
		description: 'A styled native input that preserves platform behavior.',
		exports: ['Input'],
		example: `<Input aria-label="Email" type="email" />`,
	},
	'input-group': {
		name: 'Input Group',
		category: 'forms',
		description: 'A unified input surface with prefix and suffix regions.',
		exports: ['InputGroup'],
		example: `<InputGroup>
  <span slot="prefix">$</span>
  <Input aria-label="Amount" />
</InputGroup>`,
	},
	item: {
		name: 'Item',
		category: 'primitives',
		description:
			'A compact content row with media, detail, and action regions.',
		exports: ['Item'],
		example: `<Item>
  <span slot="media">A</span>
  Release notes
  <span slot="actions">Open</span>
</Item>`,
	},
	kbd: {
		name: 'Kbd',
		category: 'primitives',
		description: 'A semantic keyboard-input hint.',
		exports: ['Kbd'],
		example: `<Kbd keys={['Ctrl', 'K']} />`,
	},
	marker: {
		name: 'Marker',
		category: 'messaging',
		description:
			'A labeled transcript separator for dates, unread boundaries, and status.',
		exports: ['Marker'],
		example: `<Marker label="Today" />`,
	},
	message: {
		name: 'Message',
		category: 'messaging',
		description:
			'A conversation row with avatar, header, body, footer, and actions.',
		exports: ['Message'],
		example: `<Message sender="Ada" timestamp="09:41">
  Ready to review.
</Message>`,
	},
	'message-scroller': {
		name: 'Message Scroller',
		category: 'messaging',
		description:
			'A transcript viewport with live-edge following and prepend preservation.',
		exports: ['MessageScroller'],
		example: `<MessageScroller label="Support transcript">
  <Message sender="Ada">Ready.</Message>
</MessageScroller>`,
	},
	'native-select': {
		name: 'Native Select',
		category: 'forms',
		description: 'A styled native select that retains platform interaction.',
		exports: ['NativeSelect'],
		example: `<NativeSelect aria-label="Role">
  <option>Developer</option>
</NativeSelect>`,
	},
	'navigation-menu': {
		name: 'Navigation Menu',
		category: 'navigation',
		description: 'Accessible disclosure navigation for rich site destinations.',
		exports: [
			'NavigationMenu',
			'NavigationMenuItem',
			'NavigationMenuTrigger',
			'NavigationMenuContent',
			'NavigationMenuLink',
			'NavigationMenuViewport',
		],
		example: `<NavigationMenu>
  <NavigationMenuItem value="docs">
    <NavigationMenuTrigger>Docs</NavigationMenuTrigger>
    <NavigationMenuContent>
      <NavigationMenuLink href="/docs">Overview</NavigationMenuLink>
    </NavigationMenuContent>
  </NavigationMenuItem>
</NavigationMenu>`,
	},
	resizable: {
		name: 'Resizable',
		category: 'primitives',
		description:
			'Keyboard and pointer adjustable panel groups with bounded sizing.',
		exports: ['ResizableGroup', 'ResizablePanel', 'ResizableHandle'],
		example: `<ResizableGroup>
  <ResizablePanel>Editor</ResizablePanel>
  <ResizableHandle />
  <ResizablePanel>Preview</ResizablePanel>
</ResizableGroup>`,
	},
	sheet: {
		name: 'Sheet',
		category: 'overlays',
		description: 'A side-attached modal surface for focused secondary work.',
		exports: [
			'Sheet',
			'SheetHeader',
			'SheetTitle',
			'SheetDescription',
			'SheetFooter',
			'SheetClose',
		],
		example: `<Sheet>
  <SheetHeader>
    <SheetTitle>Details</SheetTitle>
  </SheetHeader>
  <SheetContent>Content</SheetContent>
  <SheetFooter>Actions</SheetFooter>
</Sheet>`,
	},
	sidebar: {
		name: 'Sidebar',
		category: 'navigation',
		description:
			'A responsive application navigation shell with compact and mobile states.',
		exports: ['Sidebar'],
		example: `<Sidebar label="Application navigation">
  <a href="/docs">Docs</a>
</Sidebar>`,
	},
	skeleton: {
		name: 'Skeleton',
		category: 'primitives',
		description: 'A reduced-motion-safe loading placeholder.',
		exports: ['Skeleton'],
		example: `<Skeleton width="10rem" height="1rem" />`,
	},
	spinner: {
		name: 'Spinner',
		category: 'primitives',
		description: 'An accessible compact busy indicator.',
		exports: ['Spinner'],
		example: `<Spinner label="Loading" />`,
	},
	table: {
		name: 'Table',
		category: 'data',
		description: 'Styled native table primitives for structured data.',
		exports: [
			'Table',
			'TableHeader',
			'TableBody',
			'TableFooter',
			'TableRow',
			'TableHead',
			'TableCell',
			'TableCaption',
		],
		example: `<Table>
  <TableHeader>
    <TableRow><TableHead>Name</TableHead></TableRow>
  </TableHeader>
  <TableBody>
    <TableRow><TableCell>Ada</TableCell></TableRow>
  </TableBody>
</Table>`,
	},
	textarea: {
		name: 'Textarea',
		category: 'forms',
		description: 'A styled native multiline text control.',
		exports: ['Textarea'],
		example: `<Textarea aria-label="Notes" />`,
	},
	typography: {
		name: 'Typography',
		category: 'primitives',
		description:
			'Readable long-form typesetting with heading and text primitives.',
		exports: ['Typeset', 'TypesetHeading', 'TypesetText'],
		example: `<Typeset>
  <TypesetHeading level={2}>Heading</TypesetHeading>
  <TypesetText>Readable body copy.</TypesetText>
</Typeset>`,
	},
	accordion: {
		name: 'Accordion',
		category: 'primitives',
		description: 'A vertically stacked set of interactive headings that reveal content.',
		exports: ['Accordion'],
		example: `<Accordion items={[{ value: '1', title: 'Details', content: 'Info' }]} />`,
	},
	avatar: {
		name: 'Avatar',
		category: 'primitives',
		description: 'An image element with fallback representation for users.',
		exports: ['Avatar'],
		example: `<Avatar src="/user.png" fallback="JD" />`,
	},
	calendar: {
		name: 'Calendar',
		category: 'primitives',
		description: 'Accessible date grid calendar for single date selection.',
		exports: ['Calendar'],
		example: `<Calendar />`,
	},
	checkbox: {
		name: 'Checkbox',
		category: 'forms',
		description: 'A control that allows toggling between checked and unchecked state.',
		exports: ['Checkbox'],
		example: `<Checkbox label="Accept terms" />`,
	},
	collapsible: {
		name: 'Collapsible',
		category: 'primitives',
		description: 'An interactive component which expands or collapses a panel.',
		exports: ['Collapsible'],
		example: `<Collapsible label="Toggle info"><p>Panel content</p></Collapsible>`,
	},
	combobox: {
		name: 'Combobox',
		category: 'forms',
		description: 'Autocomplete input with suggestions and filtering.',
		exports: ['Combobox'],
		example: `<Combobox items={[{ value: '1', label: 'Option 1' }]} />`,
	},
	'context-menu': {
		name: 'Context Menu',
		category: 'overlays',
		description: 'Right-click menu surface with accessible keyboard focus.',
		exports: ['ContextMenu'],
		example: `<ContextMenu items={[{ value: 'edit', label: 'Edit' }]}>Right click here</ContextMenu>`,
	},
	'date-picker': {
		name: 'Date Picker',
		category: 'forms',
		description: 'Pop-over date selection input combining field and calendar.',
		exports: ['DatePicker'],
		example: `<DatePicker />`,
	},
	dialog: {
		name: 'Dialog',
		category: 'overlays',
		description: 'Accessible modal dialog surface with focus trap.',
		exports: ['Dialog'],
		example: `<Dialog title="Settings" description="Manage preferences" />`,
	},
	'dropdown-menu': {
		name: 'Dropdown Menu',
		category: 'overlays',
		description: 'Button-triggered action and navigation menu.',
		exports: ['DropdownMenu'],
		example: `<DropdownMenu items={[{ value: 'profile', label: 'Profile' }]} />`,
	},
	'hover-card': {
		name: 'Hover Card',
		category: 'overlays',
		description: 'Link preview overlay triggered on hover or focus.',
		exports: ['HoverCard'],
		example: `<HoverCard>Preview content</HoverCard>`,
	},
	'input-otp': {
		name: 'Input OTP',
		category: 'forms',
		description: 'Segmented passcode or one-time pin entry control.',
		exports: ['InputOTP'],
		example: `<InputOTP maxLength={6} />`,
	},
	label: {
		name: 'Label',
		category: 'forms',
		description: 'Accessible form control label.',
		exports: ['Label'],
		example: `<Label for="email">Email</Label>`,
	},
	menubar: {
		name: 'Menubar',
		category: 'navigation',
		description: 'Persistent horizontal application top menu bar.',
		exports: ['Menubar'],
		example: `<Menubar menus={[{ label: 'File', items: [{ value: 'new', label: 'New' }] }]} />`,
	},
	pagination: {
		name: 'Pagination',
		category: 'navigation',
		description: 'Paged navigation links with current-page indicator.',
		exports: ['Pagination'],
		example: `<Pagination count={100} perPage={10} />`,
	},
	popover: {
		name: 'Popover',
		category: 'overlays',
		description: 'Rich content overlay anchored to a trigger element.',
		exports: ['Popover'],
		example: `<Popover triggerLabel="Info"><p>Details</p></Popover>`,
	},
	progress: {
		name: 'Progress',
		category: 'primitives',
		description: 'Task completion progress bar indicator.',
		exports: ['Progress'],
		example: `<Progress value={65} max={100} />`,
	},
	'radio-group': {
		name: 'Radio Group',
		category: 'forms',
		description: 'Exclusive single-selection radio option list.',
		exports: ['RadioGroup'],
		example: `<RadioGroup options={[{ value: 'a', label: 'Option A' }]} />`,
	},
	'scroll-area': {
		name: 'Scroll Area',
		category: 'primitives',
		description: 'Custom styled scrollbar viewport container.',
		exports: ['ScrollArea'],
		example: `<ScrollArea><p>Scrollable content</p></ScrollArea>`,
	},
	select: {
		name: 'Select',
		category: 'forms',
		description: 'Custom popover option selector button.',
		exports: ['Select'],
		example: `<Select options={[{ value: '1', label: 'Item 1' }]} />`,
	},
	separator: {
		name: 'Separator',
		category: 'primitives',
		description: 'Visual or semantic content separator line.',
		exports: ['Separator'],
		example: `<Separator orientation="horizontal" />`,
	},
	slider: {
		name: 'Slider',
		category: 'forms',
		description: 'Range input slider control.',
		exports: ['Slider'],
		example: `<Slider value={[50]} min={0} max={100} />`,
	},
	switch: {
		name: 'Switch',
		category: 'forms',
		description: 'Toggle switch control for boolean settings.',
		exports: ['Switch'],
		example: `<Switch label="Notifications" />`,
	},
	tabs: {
		name: 'Tabs',
		category: 'navigation',
		description: 'Layered section tab view container.',
		exports: ['Tabs'],
		example: `<Tabs tabs={[{ value: 'account', label: 'Account', content: 'Account details' }]} />`,
	},
	toast: {
		name: 'Toast',
		category: 'messaging',
		description: 'Succinct temporary status feedback banner.',
		exports: ['Toast'],
		example: `<Toast title="Changes saved" variant="success" />`,
	},
	toggle: {
		name: 'Toggle',
		category: 'forms',
		description: 'Two-state toggle button.',
		exports: ['Toggle'],
		example: `<Toggle label="Bold" />`,
	},
	'toggle-group': {
		name: 'Toggle Group',
		category: 'forms',
		description: 'Grouped set of toggle buttons.',
		exports: ['ToggleGroup'],
		example: `<ToggleGroup options={[{ value: 'b', label: 'B' }]} />`,
	},
	tooltip: {
		name: 'Tooltip',
		category: 'overlays',
		description: 'Hover or focus informational popup hint.',
		exports: ['Tooltip'],
		example: `<Tooltip content="Help text"><button>Hover me</button></Tooltip>`,
	},
} as const satisfies Record<string, ComponentMeta>;

export type ComponentName = keyof typeof componentMap;
