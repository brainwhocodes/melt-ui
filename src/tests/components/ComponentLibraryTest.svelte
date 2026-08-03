<script lang="ts">
	import {
		Alert,
		AlertDialog,
		AlertDialogAction,
		AlertDialogCancel,
		AlertDialogContent,
		AlertDialogDescription,
		AlertDialogTitle,
		AspectRatio,
		Attachment,
		Badge,
		Breadcrumb,
		BreadcrumbItem,
		Bubble,
		Button,
		ButtonGroup,
		Card,
		CardContent,
		CardDescription,
		CardFooter,
		CardHeader,
		CardTitle,
		Carousel,
		CarouselDots,
		CarouselNext,
		CarouselPrevious,
		CarouselSlide,
		CarouselViewport,
		Chart,
		Command,
		DataTable,
		Direction,
		Drawer,
		DrawerClose,
		DrawerContent,
		DrawerDescription,
		DrawerHandle,
		DrawerTitle,
		Empty,
		Field,
		Input,
		InputGroup,
		Item,
		Kbd,
		Marker,
		Message,
		MessageScroller,
		NativeSelect,
		NavigationMenu,
		NavigationMenuContent,
		NavigationMenuItem,
		NavigationMenuLink,
		NavigationMenuTrigger,
		NavigationMenuViewport,
		ResizableGroup,
		ResizableHandle,
		ResizablePanel,
		Sheet,
		SheetClose,
		SheetContent,
		SheetDescription,
		SheetTitle,
		Sidebar,
		Skeleton,
		Spinner,
		Table,
		TableBody,
		TableCaption,
		TableCell,
		TableHead,
		TableHeader,
		TableRow,
		Textarea,
		Typeset,
		TypesetHeading,
		TypesetText,
		type ChartSeries,
		type CommandItem,
		type DataTableColumn,
	} from '$lib/index.js';

	let alertOpen = false;
	let sheetOpen = false;
	let drawerOpen = false;
	let navValue = '';
	let guidesDisabled = false;
	let showGuides = true;
	let carouselIndex = 1;
	let showSecondSlide = true;
	let panelSizes = [50, 50];
	let commandOpen = true;
	let commandValue: string | null = null;

	const columns: DataTableColumn[] = [
		{ key: 'name', header: 'Name', accessor: 'name', sortable: true },
		{ key: 'score', header: 'Score', accessor: 'score', sortable: true, numeric: true },
	];
	const rows = [
		{ id: 'a', name: 'Ada', score: 91 },
		{ id: 'g', name: 'Grace', score: 98 },
	];
	const commandItems: CommandItem[] = [
		{ value: 'new-file', label: 'New file', keywords: ['create'] },
		{ value: 'open-settings', label: 'Open settings' },
	];
	const chartSeries: ChartSeries[] = [{ name: 'Requests', values: [4, 7], color: 'currentColor' }];
</script>

<section aria-label="Forms and primitives">
	<ButtonGroup>
		<Button>Save</Button>
		<Button variant="outline">Cancel</Button>
	</ButtonGroup>
	<Field id="email" label="Email" description="Work address" error="Email is required" required invalid>
		<Input type="email" value="" />
	</Field>
	<InputGroup>
		<span slot="prefix">$</span>
		<Input aria-label="Amount" />
		<span slot="suffix">USD</span>
	</InputGroup>
	<NativeSelect aria-label="Role"><option>Developer</option></NativeSelect>
	<Textarea aria-label="Notes" />
	<Alert variant="success"><span slot="title">Ready</span>Components loaded.</Alert>
	<AspectRatio ratio={16 / 9}><span>Media</span></AspectRatio>
	<Badge removable>Stable</Badge>
	<Card>
		<CardHeader><CardTitle>Account</CardTitle><CardDescription>Profile details</CardDescription></CardHeader>
		<CardContent>Content</CardContent>
		<CardFooter>Footer</CardFooter>
	</Card>
	<Direction dir="rtl">مرحبا</Direction>
	<Empty><span slot="title">No results</span><span slot="description">Try another query.</span></Empty>
	<Item selected><span slot="media">A</span>Item content<span slot="actions">Action</span></Item>
	<Kbd keys={['Ctrl', 'K']} />
	<Skeleton width="4rem" height="1rem" />
	<Spinner label="Loading records" />
	<Typeset><TypesetHeading level={2}>Heading</TypesetHeading><TypesetText>Readable text.</TypesetText></Typeset>
</section>

<Breadcrumb>
	<BreadcrumbItem href="/">Home</BreadcrumbItem>
	<BreadcrumbItem current>Components</BreadcrumbItem>
</Breadcrumb>

<NavigationMenu bind:value={navValue} delay={0} label="Docs navigation">
	<NavigationMenuItem value="products">
		<NavigationMenuTrigger>Products</NavigationMenuTrigger>
		<NavigationMenuContent><NavigationMenuLink href="/components">Components link</NavigationMenuLink></NavigationMenuContent>
	</NavigationMenuItem>
	{#if showGuides}
		<NavigationMenuItem value="guides">
			<NavigationMenuTrigger disabled={guidesDisabled}>Guides</NavigationMenuTrigger>
			<NavigationMenuContent><NavigationMenuLink href="/guides">Guides link</NavigationMenuLink></NavigationMenuContent>
		</NavigationMenuItem>
	{/if}
	<NavigationMenuViewport slot="viewport" />
</NavigationMenu>
<Button on:click={() => (navValue = '')}>Close navigation externally</Button>
<Button on:click={() => (guidesDisabled = true)}>Disable Guides</Button>
<Button on:click={() => (showGuides = false)}>Unmount Guides</Button>

<Sidebar label="Workspace"><span slot="header">Workspace</span><a href="/inbox">Inbox</a><span slot="footer">Signed in</span></Sidebar>

<Carousel bind:activeIndex={carouselIndex} label="Highlights">
	<CarouselViewport>
		<CarouselSlide index={0}>First slide</CarouselSlide>
		{#if showSecondSlide}<CarouselSlide index={1}>Second slide</CarouselSlide>{/if}
	</CarouselViewport>
	<CarouselPrevious />
	<CarouselNext />
	<CarouselDots />
</Carousel>
<Button on:click={() => (showSecondSlide = false)}>Remove active slide</Button>

<ResizableGroup bind:sizes={panelSizes}>
	<ResizablePanel defaultSize={50} minSize={20}>Editor</ResizablePanel>
	<ResizableHandle aria-label="Resize editor and preview" />
	<ResizablePanel defaultSize={50} minSize={20}>Preview</ResizablePanel>
</ResizableGroup>

<MessageScroller label="Support transcript">
	<Marker label="Today" />
	<Message id="message-1" sender="Sam" timestamp="10:00"><Bubble>Can you help?</Bubble></Message>
	<Attachment name="brief.pdf" size="12 KB" removable />
</MessageScroller>

<Table>
	<TableCaption>Simple data</TableCaption>
	<TableHeader><TableRow><TableHead>Name</TableHead></TableRow></TableHeader>
	<TableBody><TableRow><TableCell>Ada</TableCell></TableRow></TableBody>
</Table>
<DataTable {columns} {rows} keyAccessor="id" searchable selectable caption="People" />
<Chart labels={['Mon', 'Tue']} series={chartSeries} title="Requests" />
<Command bind:open={commandOpen} bind:value={commandValue} items={commandItems} label="Actions" />

<Button on:click={() => (alertOpen = true)}>Open alert dialog</Button>
<AlertDialog bind:open={alertOpen}>
	<AlertDialogContent>
		<AlertDialogTitle>Delete draft?</AlertDialogTitle>
		<AlertDialogDescription>This cannot be undone.</AlertDialogDescription>
		<AlertDialogCancel>Keep draft</AlertDialogCancel>
		<AlertDialogAction>Delete draft</AlertDialogAction>
	</AlertDialogContent>
</AlertDialog>

<Button on:click={() => (sheetOpen = true)}>Open sheet</Button>
<Sheet bind:open={sheetOpen}>
	<SheetContent side="right"><SheetTitle>Details</SheetTitle><SheetDescription>Secondary work</SheetDescription><SheetClose ariaLabel="Close sheet">Close sheet</SheetClose></SheetContent>
</Sheet>

<Button on:click={() => (drawerOpen = true)}>Open drawer</Button>
<Drawer bind:open={drawerOpen} direction="bottom">
	<DrawerContent><DrawerHandle /><DrawerTitle>Filters</DrawerTitle><DrawerDescription>Refine results</DrawerDescription><DrawerClose ariaLabel="Close drawer">Close drawer</DrawerClose></DrawerContent>
</Drawer>
