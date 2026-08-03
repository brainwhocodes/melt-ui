<script context="module" lang="ts">
	export type ChartType = 'line' | 'bar';
	export interface ChartSeries {
		name: string;
		values: Array<number | null>;
		color?: string;
	}
</script>

<script lang="ts">
	interface NormalizedSeries {
		name: string;
		values: Array<number | null>;
		color: string;
	}

	interface ChartPoint {
		x: number;
		y: number;
		value: number;
		label: string;
	}

	const seriesColors = [
		'var(--melt-chart-series-1)',
		'var(--melt-chart-series-2)',
		'var(--melt-chart-series-3)',
		'var(--melt-chart-series-4)',
		'var(--melt-chart-series-5)'
	];
	const tickFractions = [0, 0.25, 0.5, 0.75, 1];
	const numberFormatter = new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 });

	let className = '';
	export { className as class };
	export let type: ChartType = 'line';
	export let labels: string[] = [];
	export let series: ChartSeries[] = [];
	export let width = 640;
	export let height = 320;
	export let viewBox: string | undefined = undefined;
	export let title = 'Chart';
	export let description: string | undefined = undefined;
	export let valueFormatter: (value: number) => string = defaultValueFormatter;

	$: chartWidth = Math.max(160, finiteDimension(width, 640));
	$: chartHeight = Math.max(140, finiteDimension(height, 320));
	$: resolvedViewBox = viewBox ?? `0 0 ${chartWidth} ${chartHeight}`;
	$: plot = {
		left: Math.min(52, chartWidth * 0.16),
		top: 20,
		right: chartWidth - 16,
		bottom: chartHeight - 44
	};
	$: plotWidth = Math.max(1, plot.right - plot.left);
	$: plotHeight = Math.max(1, plot.bottom - plot.top);
	$: normalizedSeries = normalizeSeries(series, labels.length);
	$: finiteValues = normalizedSeries.flatMap((entry) =>
		entry.values.filter((value): value is number => value !== null)
	);
	$: domain = getDomain(finiteValues);
	$: yTicks = tickFractions.map((fraction) => ({
		value: domain.max - domain.range * fraction,
		y: plot.top + plotHeight * fraction
	}));
	$: zeroY = valueToY(0, domain.min, domain.range, plot.top, plotHeight);
	$: lineSeries =
		type === 'line'
			? normalizedSeries.map((entry) => ({
					...entry,
					points: getLinePoints(entry, labels, plot.left, plotWidth, plot.top, plotHeight, domain),
					segments: getLineSegments(
						entry,
						labels,
						plot.left,
						plotWidth,
						plot.top,
						plotHeight,
						domain
					)
				}))
			: [];
	$: bars =
		type === 'bar'
			? getBars(normalizedSeries, labels, plot.left, plotWidth, plot.top, plotHeight, domain)
			: [];
	$: summary = getSummary(normalizedSeries, labels, finiteValues, valueFormatter);

	function finiteDimension(value: number, fallback: number): number {
		return Number.isFinite(value) && value > 0 ? value : fallback;
	}

	function defaultValueFormatter(value: number): string {
		return numberFormatter.format(value);
	}

	function normalizeSeries(input: ChartSeries[], labelCount: number): NormalizedSeries[] {
		return input.map((entry, index) => ({
			name: entry.name,
			color: entry.color ?? seriesColors[index % seriesColors.length],
			values: Array.from({ length: labelCount }, (_, valueIndex) => {
				const value = entry.values[valueIndex];
				return typeof value === 'number' && Number.isFinite(value) ? value : null;
			})
		}));
	}

	function getDomain(values: number[]): { min: number; max: number; range: number } {
		if (values.length === 0) return { min: 0, max: 1, range: 1 };
		let min = 0;
		let max = 0;
		for (const value of values) {
			if (value < min) min = value;
			if (value > max) max = value;
		}
		if (min === max) return { min, max: min + 1, range: 1 };
		return { min, max, range: max - min };
	}

	function valueToY(value: number, min: number, range: number, top: number, available: number): number {
		return top + ((min + range - value) / range) * available;
	}

	function xForIndex(index: number, count: number, left: number, available: number): number {
		return count <= 1 ? left + available / 2 : left + (index / (count - 1)) * available;
	}

	function getLinePoints(
		entry: NormalizedSeries,
		inputLabels: string[],
		left: number,
		availableWidth: number,
		top: number,
		availableHeight: number,
		inputDomain: { min: number; range: number }
	): ChartPoint[] {
		const points: ChartPoint[] = [];
		entry.values.forEach((value, index) => {
			if (value === null) return;
			points.push({
				x: xForIndex(index, inputLabels.length, left, availableWidth),
				y: valueToY(value, inputDomain.min, inputDomain.range, top, availableHeight),
				value,
				label: inputLabels[index]
			});
		});
		return points;
	}

	function getLineSegments(
		entry: NormalizedSeries,
		inputLabels: string[],
		left: number,
		availableWidth: number,
		top: number,
		availableHeight: number,
		inputDomain: { min: number; range: number }
	): string[] {
		const segments: string[] = [];
		let current: string[] = [];
		entry.values.forEach((value, index) => {
			if (value === null) {
				if (current.length > 0) segments.push(current.join(' '));
				current = [];
				return;
			}
			current.push(
				`${xForIndex(index, inputLabels.length, left, availableWidth)},${valueToY(
					value,
					inputDomain.min,
					inputDomain.range,
					top,
					availableHeight
				)}`
			);
		});
		if (current.length > 0) segments.push(current.join(' '));
		return segments;
	}

	function getBars(
		inputSeries: NormalizedSeries[],
		inputLabels: string[],
		left: number,
		availableWidth: number,
		top: number,
		availableHeight: number,
		inputDomain: { min: number; range: number }
	) {
		const result: Array<{
			x: number;
			y: number;
			width: number;
			height: number;
			color: string;
			value: number;
			label: string;
			seriesName: string;
		}> = [];
		if (inputLabels.length === 0 || inputSeries.length === 0) return result;
		const groupWidth = availableWidth / inputLabels.length;
		const innerWidth = groupWidth * 0.76;
		const barWidth = Math.max(1, innerWidth / inputSeries.length);
		const baseline = valueToY(0, inputDomain.min, inputDomain.range, top, availableHeight);

		inputLabels.forEach((label, labelIndex) => {
			inputSeries.forEach((entry, seriesIndex) => {
				const value = entry.values[labelIndex];
				if (value === null) return;
				const valueY = valueToY(value, inputDomain.min, inputDomain.range, top, availableHeight);
				result.push({
					x: left + labelIndex * groupWidth + (groupWidth - innerWidth) / 2 + seriesIndex * barWidth,
					y: Math.min(valueY, baseline),
					width: Math.max(1, barWidth - 2),
					height: Math.abs(baseline - valueY),
					color: entry.color,
					value,
					label,
					seriesName: entry.name
				});
			});
		});
		return result;
	}

	function getSummary(
		inputSeries: NormalizedSeries[],
		inputLabels: string[],
		values: number[],
		format: (value: number) => string
	): string {
		if (values.length === 0) return 'No chart data is available.';
		let minimum = values[0];
		let maximum = values[0];
		for (let index = 1; index < values.length; index += 1) {
			if (values[index] < minimum) minimum = values[index];
			if (values[index] > maximum) maximum = values[index];
		}
		return `${inputSeries.length} series across ${inputLabels.length
		} ${inputLabels.length === 1 ? 'category' : 'categories'}. Values range from ${format(
			minimum
		)} to ${format(maximum)}.`;
	}
	function formatTableValue(value: number | null): string {
		return value === null ? 'Not available' : valueFormatter(value);
	}
</script>

<figure class={`melt-chart ${className}`} {...$$restProps}>
	<div class="melt-chart-viewport">
		<svg
			class="melt-chart-svg"
			role="img"
			aria-label={title}
			width={chartWidth}
			height={chartHeight}
			viewBox={resolvedViewBox}
			preserveAspectRatio="xMidYMid meet"
		>
			<title>{title}</title>
			{#if description}<desc>{description}</desc>{/if}

			<g class="melt-chart-grid" aria-hidden="true">
				{#each yTicks as tick}
					<line x1={plot.left} x2={plot.right} y1={tick.y} y2={tick.y} />
					<text x={plot.left - 8} y={tick.y} text-anchor="end" dominant-baseline="middle">
						{valueFormatter(tick.value)}
					</text>
				{/each}
				{#each labels as label, index}
					<text
						x={type === 'bar'
							? plot.left + ((index + 0.5) / Math.max(labels.length, 1)) * plotWidth
							: xForIndex(index, labels.length, plot.left, plotWidth)}
						y={plot.bottom + 22}
						text-anchor="middle"
					>
						{label}
					</text>
				{/each}
				<line class="melt-chart-axis" x1={plot.left} x2={plot.right} y1={zeroY} y2={zeroY} />
			</g>

			{#if type === 'line'}
				{#each lineSeries as entry}
					<g class="melt-chart-line-series" aria-hidden="true">
						{#each entry.segments as points}
							<polyline {points} fill="none" stroke={entry.color} vector-effect="non-scaling-stroke" />
						{/each}
						{#each entry.points as point}
							<circle cx={point.x} cy={point.y} r="3.5" fill={entry.color} />
						{/each}
					</g>
				{/each}
			{:else}
				<g class="melt-chart-bars" aria-hidden="true">
					{#each bars as bar}
						<rect
							x={bar.x}
							y={bar.y}
							width={bar.width}
							height={bar.height}
							fill={bar.color}
							rx="2"
						/>
					{/each}
				</g>
			{/if}
		</svg>
	</div>

	<ul class="melt-chart-legend" aria-label="Chart legend">
		{#each normalizedSeries as entry}
			<li style={`--melt-chart-series-color: ${entry.color}`}>
				<span class="melt-chart-legend-mark" aria-hidden="true"></span>{entry.name}
			</li>
		{/each}
	</ul>


	<div class="melt-chart-data">
		<slot name="table" {labels} {series}>
			<table class="melt-table melt-chart-table">
				<caption>Data for {title}</caption>
				<thead class="melt-table-header">
					<tr class="melt-table-row">
						<th class="melt-table-head" scope="col">Category</th>
						{#each normalizedSeries as entry}<th class="melt-table-head" scope="col">{entry.name}</th>{/each}
					</tr>
				</thead>
				<tbody class="melt-table-body">
					{#each labels as label, labelIndex}
						<tr class="melt-table-row">
							<th class="melt-table-cell" scope="row">{label}</th>
							{#each normalizedSeries as entry}
								<td class="melt-table-cell melt-data-table-numeric">
									{formatTableValue(entry.values[labelIndex])}
								</td>
							{/each}
						</tr>
					{/each}
				</tbody>
			</table>
		</slot>
	</div>
	<figcaption class="melt-chart-summary">
		<slot name="summary" {summary}>{summary}</slot>
	</figcaption>
</figure>
