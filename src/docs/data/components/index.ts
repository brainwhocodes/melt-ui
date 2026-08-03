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
	},
	'aspect-ratio': {
		name: 'Aspect Ratio',
		category: 'primitives',
		description:
			'A layout primitive that preserves a positive width-to-height ratio.',
		exports: ['AspectRatio'],
	},
	attachment: {
		name: 'Attachment',
		category: 'messaging',
		description:
			'File metadata, transfer progress, and removal controls for conversations.',
		exports: ['Attachment'],
	},
	badge: {
		name: 'Badge',
		category: 'primitives',
		description: 'Compact labels for status, metadata, and removable filters.',
		exports: ['Badge'],
	},
	breadcrumb: {
		name: 'Breadcrumb',
		category: 'navigation',
		description: 'Semantic hierarchical navigation with current-page support.',
		exports: ['Breadcrumb', 'BreadcrumbItem'],
	},
	bubble: {
		name: 'Bubble',
		category: 'messaging',
		description: 'Incoming, outgoing, and system message surfaces.',
		exports: ['Bubble'],
	},
	button: {
		name: 'Button',
		category: 'forms',
		description:
			'A styled native button with variants, sizes, and loading state.',
		exports: ['Button'],
	},
	'button-group': {
		name: 'Button Group',
		category: 'forms',
		description: 'Horizontal or vertical grouping for related controls.',
		exports: ['ButtonGroup'],
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
	},
	chart: {
		name: 'Chart',
		category: 'data',
		description:
			'Accessible dependency-free line and bar charts backed by deterministic SVG.',
		exports: ['Chart'],
	},
	command: {
		name: 'Command',
		category: 'data',
		description:
			'A searchable keyboard-first command surface with optional modality.',
		exports: ['Command'],
	},
	'data-table': {
		name: 'Data Table',
		category: 'data',
		description:
			'Sortable, searchable, selectable tabular data with explicit scope.',
		exports: ['DataTable'],
	},
	direction: {
		name: 'Direction',
		category: 'primitives',
		description:
			'A local writing-direction boundary for left-to-right or right-to-left content.',
		exports: ['Direction'],
	},
	drawer: {
		name: 'Drawer',
		category: 'overlays',
		description:
			'A directional modal drawer with drag dismissal and snap behavior.',
		exports: ['Drawer', 'DrawerTitle', 'DrawerDescription', 'DrawerClose'],
	},
	empty: {
		name: 'Empty',
		category: 'primitives',
		description:
			'A focused empty-state composition with icon, context, and action regions.',
		exports: ['Empty'],
	},
	field: {
		name: 'Field',
		category: 'forms',
		description:
			'Label, description, validation, and control layout with ARIA wiring.',
		exports: ['Field'],
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
	},
	'input-group': {
		name: 'Input Group',
		category: 'forms',
		description: 'A unified input surface with prefix and suffix regions.',
		exports: ['InputGroup'],
	},
	item: {
		name: 'Item',
		category: 'primitives',
		description:
			'A compact content row with media, detail, and action regions.',
		exports: ['Item'],
	},
	kbd: {
		name: 'Kbd',
		category: 'primitives',
		description: 'A semantic keyboard-input hint.',
		exports: ['Kbd'],
	},
	marker: {
		name: 'Marker',
		category: 'messaging',
		description:
			'A labeled transcript separator for dates, unread boundaries, and status.',
		exports: ['Marker'],
	},
	message: {
		name: 'Message',
		category: 'messaging',
		description:
			'A conversation row with avatar, header, body, footer, and actions.',
		exports: ['Message'],
	},
	'message-scroller': {
		name: 'Message Scroller',
		category: 'messaging',
		description:
			'A transcript viewport with live-edge following and prepend preservation.',
		exports: ['MessageScroller'],
	},
	'native-select': {
		name: 'Native Select',
		category: 'forms',
		description: 'A styled native select that retains platform interaction.',
		exports: ['NativeSelect'],
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
	},
	resizable: {
		name: 'Resizable',
		category: 'primitives',
		description:
			'Keyboard and pointer adjustable panel groups with bounded sizing.',
		exports: ['ResizableGroup', 'ResizablePanel', 'ResizableHandle'],
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
	},
	sidebar: {
		name: 'Sidebar',
		category: 'navigation',
		description:
			'A responsive application navigation shell with compact and mobile states.',
		exports: ['Sidebar'],
	},
	skeleton: {
		name: 'Skeleton',
		category: 'primitives',
		description: 'A reduced-motion-safe loading placeholder.',
		exports: ['Skeleton'],
	},
	spinner: {
		name: 'Spinner',
		category: 'primitives',
		description: 'An accessible compact busy indicator.',
		exports: ['Spinner'],
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
	},
	textarea: {
		name: 'Textarea',
		category: 'forms',
		description: 'A styled native multiline text control.',
		exports: ['Textarea'],
	},
	typography: {
		name: 'Typography',
		category: 'primitives',
		description:
			'Readable long-form typesetting with heading and text primitives.',
		exports: ['Typeset', 'TypesetHeading', 'TypesetText'],
	},
} as const satisfies Record<string, ComponentMeta>;

export type ComponentName = keyof typeof componentMap;
