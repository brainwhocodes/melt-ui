import type { ColorPickerFormat, ColorPickerValue } from './types.js';

export type RGB = { red: number; green: number; blue: number };
export type HSL = { hue: number; saturation: number; lightness: number };
export type OKLCH = { lightness: number; chroma: number; hue: number };

export const clamp = (value: number, min: number, max: number) =>
	Math.min(max, Math.max(min, value));

export function normalizeColor(value: ColorPickerValue): ColorPickerValue {
	if (
		!Number.isFinite(value.hue) ||
		!Number.isFinite(value.saturation) ||
		!Number.isFinite(value.value) ||
		!Number.isFinite(value.alpha)
	) {
		throw new Error(
			'Invalid color picker value: hue, saturation, value, and alpha must be finite numbers.',
		);
	}
	return {
		hue: clamp(value.hue, 0, 360),
		saturation: clamp(value.saturation, 0, 100),
		value: clamp(value.value, 0, 100),
		alpha: clamp(value.alpha, 0, 1),
	};
}

export function hsvaToRgbFloat(color: ColorPickerValue): RGB {
	const h = color.hue / 60;
	const s = color.saturation / 100;
	const v = color.value / 100;
	const chroma = v * s;
	const x = chroma * (1 - Math.abs((h % 2) - 1));
	const m = v - chroma;
	let red = 0;
	let green = 0;
	let blue = 0;

	if (h < 1) [red, green, blue] = [chroma, x, 0];
	else if (h < 2) [red, green, blue] = [x, chroma, 0];
	else if (h < 3) [red, green, blue] = [0, chroma, x];
	else if (h < 4) [red, green, blue] = [0, x, chroma];
	else if (h < 5) [red, green, blue] = [x, 0, chroma];
	else [red, green, blue] = [chroma, 0, x];

	return {
		red: (red + m) * 255,
		green: (green + m) * 255,
		blue: (blue + m) * 255,
	};
}

export function hsvaToRgb(color: ColorPickerValue): RGB {
	const { red, green, blue } = hsvaToRgbFloat(color);
	return {
		red: Math.round(red),
		green: Math.round(green),
		blue: Math.round(blue),
	};
}

export function rgbToHsl({ red, green, blue }: RGB): HSL {
	const r = red / 255;
	const g = green / 255;
	const b = blue / 255;
	const max = Math.max(r, g, b);
	const min = Math.min(r, g, b);
	const delta = max - min;
	const lightness = (max + min) / 2;
	let hue = 0;
	let saturation = 0;

	if (delta !== 0) {
		saturation = delta / (1 - Math.abs(2 * lightness - 1));
		if (max === r) hue = 60 * (((g - b) / delta) % 6);
		else if (max === g) hue = 60 * ((b - r) / delta + 2);
		else hue = 60 * ((r - g) / delta + 4);
		if (hue < 0) hue += 360;
	}

	return {
		hue: clamp(hue, 0, 360),
		saturation: saturation * 100,
		lightness: lightness * 100,
	};
}

export function hslToRgb({ hue, saturation, lightness }: HSL): RGB {
	const h = hue / 360;
	const s = saturation / 100;
	const l = lightness / 100;
	const chroma = (1 - Math.abs(2 * l - 1)) * s;
	const x = chroma * (1 - Math.abs(((h * 6) % 2) - 1));
	const m = l - chroma / 2;
	let red = 0;
	let green = 0;
	let blue = 0;

	if (h < 1 / 6) [red, green, blue] = [chroma, x, 0];
	else if (h < 2 / 6) [red, green, blue] = [x, chroma, 0];
	else if (h < 3 / 6) [red, green, blue] = [0, chroma, x];
	else if (h < 4 / 6) [red, green, blue] = [0, x, chroma];
	else if (h < 5 / 6) [red, green, blue] = [x, 0, chroma];
	else [red, green, blue] = [chroma, 0, x];

	return {
		red: Math.round((red + m) * 255),
		green: Math.round((green + m) * 255),
		blue: Math.round((blue + m) * 255),
	};
}

export function hsvaToHsl(color: ColorPickerValue): HSL {
	return rgbToHsl(hsvaToRgb(color));
}

const srgbToLinear = (channel: number) =>
	channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
const linearToSrgb = (channel: number) =>
	channel <= 0.0031308 ? channel * 12.92 : 1.055 * channel ** (1 / 2.4) - 0.055;

export function rgbToOklch({ red, green, blue }: RGB): OKLCH {
	const r = srgbToLinear(clamp(red / 255, 0, 1));
	const g = srgbToLinear(clamp(green / 255, 0, 1));
	const b = srgbToLinear(clamp(blue / 255, 0, 1));
	const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
	const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
	const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
	const labA = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s;
	const labB = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;
	let hue = (Math.atan2(labB, labA) * 180) / Math.PI;
	if (hue < 0) hue += 360;
	return {
		lightness: clamp(
			(0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s) * 100,
			0,
			100,
		),
		chroma: Math.sqrt(labA * labA + labB * labB),
		hue,
	};
}

export function oklchToRgb({ lightness, chroma, hue }: OKLCH): RGB {
	const l = lightness / 100;
	const labA = chroma * Math.cos((hue * Math.PI) / 180);
	const labB = chroma * Math.sin((hue * Math.PI) / 180);
	const lCube = (l + 0.3963377774 * labA + 0.2158037573 * labB) ** 3;
	const mCube = (l - 0.1055613458 * labA - 0.0638541728 * labB) ** 3;
	const sCube = (l - 0.0894841775 * labA - 1.291485548 * labB) ** 3;
	const red = linearToSrgb(
		4.0767416621 * lCube - 3.3077115913 * mCube + 0.2309699292 * sCube,
	);
	const green = linearToSrgb(
		-1.2684380046 * lCube + 2.6097574011 * mCube - 0.3413193965 * sCube,
	);
	const blue = linearToSrgb(
		-0.0041960863 * lCube - 0.7034186147 * mCube + 1.707614701 * sCube,
	);
	return {
		red: clamp(red, 0, 1) * 255,
		green: clamp(green, 0, 1) * 255,
		blue: clamp(blue, 0, 1) * 255,
	};
}

export function hsvaToOklch(color: ColorPickerValue): OKLCH {
	return rgbToOklch(hsvaToRgbFloat(color));
}

export function oklchToHsva(
	oklch: OKLCH,
	alpha: number,
	hue = 0,
): ColorPickerValue {
	return rgbToHsva(oklchToRgb(oklch), alpha, hue);
}

export function rgbToHsva(rgb: RGB, alpha: number, hue = 0): ColorPickerValue {
	const red = rgb.red / 255;
	const green = rgb.green / 255;
	const blue = rgb.blue / 255;
	const max = Math.max(red, green, blue);
	const min = Math.min(red, green, blue);
	const delta = max - min;
	let nextHue = hue;
	if (delta !== 0) {
		if (max === red) nextHue = 60 * (((green - blue) / delta) % 6);
		else if (max === green) nextHue = 60 * ((blue - red) / delta + 2);
		else nextHue = 60 * ((red - green) / delta + 4);
		if (nextHue < 0) nextHue += 360;
	}
	return normalizeColor({
		hue: nextHue,
		saturation: max === 0 ? 0 : (delta / max) * 100,
		value: max * 100,
		alpha,
	});
}

const toHex = (value: number) =>
	Math.round(value).toString(16).padStart(2, '0');

export function formatHex(color: ColorPickerValue) {
	const { red, green, blue } = hsvaToRgb(color);
	return `${toHex(red)}${toHex(green)}${toHex(blue)}`.toUpperCase();
}

export function formatSerializedHex(color: ColorPickerValue) {
	return `${formatHex(color)}${toHex(color.alpha * 255)}`.toUpperCase();
}

export function parseHex(input: string, alphaFallback: number) {
	const value = input.trim().replace(/^#/, '');
	if (![3, 4, 6, 8].includes(value.length) || !/^[0-9a-f]+$/i.test(value))
		return null;
	const expanded =
		value.length <= 4
			? value
					.split('')
					.map((part) => part + part)
					.join('')
			: value;
	const hasAlpha = expanded.length === 8;
	const rgb = {
		red: Number.parseInt(expanded.slice(0, 2), 16),
		green: Number.parseInt(expanded.slice(2, 4), 16),
		blue: Number.parseInt(expanded.slice(4, 6), 16),
	};
	const alpha = hasAlpha
		? Number.parseInt(expanded.slice(6, 8), 16) / 255
		: alphaFallback;
	return rgbToHsva(rgb, alpha);
}

export function formatChannel(
	color: ColorPickerValue,
	channel: string,
	format: ColorPickerFormat = 'hsv',
) {
	const rgb = hsvaToRgb(color);
	const hsl = hsvaToHsl(color);
	const oklch = format === 'oklch' ? hsvaToOklch(color) : null;
	switch (channel) {
		case 'hex':
			return formatHex(color);
		case 'red':
			return String(rgb.red);
		case 'green':
			return String(rgb.green);
		case 'blue':
			return String(rgb.blue);
		case 'hue':
			if (oklch) return oklch.hue.toFixed(1);
			return String(Math.round(format === 'hsl' ? hsl.hue : color.hue));
		case 'saturation':
			return String(
				Math.round(format === 'hsl' ? hsl.saturation : color.saturation),
			);
		case 'lightness':
			return oklch
				? oklch.lightness.toFixed(1)
				: String(Math.round(hsl.lightness));
		case 'chroma':
			return (oklch ?? hsvaToOklch(color)).chroma.toFixed(3);
		case 'value':
			return String(Math.round(color.value));
		case 'alpha':
			return String(Math.round(color.alpha * 100));
		default:
			return '';
	}
}

export function getChannelBounds(channel: string): [number, number] {
	if (channel === 'red' || channel === 'green' || channel === 'blue')
		return [0, 255];
	if (channel === 'hue') return [0, 360];
	if (channel === 'chroma') return [0, 0.4];
	return [0, 100];
}

export function channelValue(
	color: ColorPickerValue,
	channel: string,
	input: number,
	format: ColorPickerFormat = 'hsv',
): ColorPickerValue {
	if (
		format === 'hsl' &&
		(channel === 'hue' || channel === 'saturation' || channel === 'lightness')
	) {
		const hsl = hsvaToHsl(color);
		if (channel === 'hue') hsl.hue = input;
		if (channel === 'saturation') hsl.saturation = input;
		if (channel === 'lightness') hsl.lightness = input;
		return rgbToHsva(hslToRgb(hsl), color.alpha, hsl.hue);
	}

	if (
		format === 'oklch' &&
		(channel === 'hue' || channel === 'lightness' || channel === 'chroma')
	) {
		const oklch = hsvaToOklch(color);
		if (channel === 'hue') oklch.hue = input;
		if (channel === 'lightness') oklch.lightness = input;
		if (channel === 'chroma') oklch.chroma = input;
		return oklchToHsva(oklch, color.alpha, oklch.hue);
	}

	const next = { ...color };
	if (channel === 'hue') next.hue = input;
	if (channel === 'saturation') next.saturation = input;
	if (channel === 'value') next.value = input;
	if (channel === 'alpha') next.alpha = input / 100;
	if (channel === 'red' || channel === 'green' || channel === 'blue') {
		const rgb = hsvaToRgb(color);
		rgb[channel] = input;
		return rgbToHsva(rgb, color.alpha, color.hue);
	}
	return normalizeColor(next);
}

export function equalColor(a: ColorPickerValue, b: ColorPickerValue) {
	return (
		a.hue === b.hue &&
		a.saturation === b.saturation &&
		a.value === b.value &&
		a.alpha === b.alpha
	);
}

const cssAlphaPart = (alpha: number) =>
	alpha >= 1 ? '' : ` / ${Math.round(alpha * 1000) / 1000}`;

export function serializeColor(
	color: ColorPickerValue,
	format: ColorPickerFormat,
) {
	const rgb = hsvaToRgb(color);
	const hsl = hsvaToHsl(color);
	if (format === 'hex')
		return `#${formatHex(color)}${color.alpha < 1 ? toHex(color.alpha * 255) : ''}`;
	if (format === 'rgb')
		return `rgb(${rgb.red} ${rgb.green} ${rgb.blue}${cssAlphaPart(color.alpha)})`;
	if (format === 'hsl')
		return `hsl(${Math.round(hsl.hue)} ${Math.round(hsl.saturation)}% ${Math.round(hsl.lightness)}%${cssAlphaPart(color.alpha)})`;
	if (format === 'oklch') {
		const oklch = hsvaToOklch(color);
		return `oklch(${oklch.lightness.toFixed(1)}% ${oklch.chroma.toFixed(3)} ${oklch.hue.toFixed(1)}${cssAlphaPart(color.alpha)})`;
	}
	return `hsv(${Math.round(color.hue)} ${Math.round(color.saturation)}% ${Math.round(color.value)}%${cssAlphaPart(color.alpha)})`;
}

type ColorToken = { value: number; percent: boolean };

function parseToken(raw: string): ColorToken | null {
	const match = /^(-?(?:\d+\.?\d*|\.\d+))(%|deg|\u00b0)?$/.exec(raw.trim());
	if (!match) return null;
	return { value: Number(match[1]), percent: match[2] === '%' };
}

function parseComponents(body: string) {
	const [components, alphaPart] = body.split('/');
	const parts = components
		.trim()
		.split(/[\s,]+/)
		.filter(Boolean)
		.map(parseToken);
	if (parts.some((part) => part === null)) return null;
	const alpha = alphaPart === undefined ? null : parseToken(alphaPart.trim());
	if (alphaPart !== undefined && alpha === null) return null;
	return { parts: parts as ColorToken[], alpha };
}

const alphaToken = (token: ColorToken | null, fallback: number) =>
	token === null
		? fallback
		: clamp(token.percent ? token.value / 100 : token.value, 0, 1);
const rgbToken = (token: ColorToken) =>
	clamp(token.percent ? (token.value / 100) * 255 : token.value, 0, 255);
const percentToken = (token: ColorToken) => clamp(token.value, 0, 100);
const hueToken = (token: ColorToken) => clamp(token.value, 0, 360);
const oklchLightnessToken = (token: ColorToken) =>
	clamp(token.percent ? token.value : token.value * 100, 0, 100);
const oklchChromaToken = (token: ColorToken) =>
	clamp(token.percent ? (token.value / 100) * 0.4 : token.value, 0, 0.5);

export function parseColorString(
	input: string,
	format: ColorPickerFormat,
	alphaFallback: number,
): ColorPickerValue | null {
	const raw = input.trim();
	if (!raw) return null;
	const functional = /^([a-z]+)\((.*)\)$/i.exec(raw);
	const model = functional ? functional[1].toLowerCase() : null;
	if (!model && /^#?[0-9a-f]+$/i.test(raw) && raw.replace('#', '').length <= 8)
		return parseHex(raw, alphaFallback);
	if (
		model &&
		!['rgb', 'rgba', 'hsl', 'hsla', 'hsv', 'hsva', 'oklch'].includes(model)
	)
		return null;
	const parsed = parseComponents(functional ? functional[2] : raw);
	if (!parsed || parsed.parts.length !== 3) return null;
	const { parts, alpha } = parsed;
	const nextAlpha = alphaToken(alpha, alphaFallback);
	const kind = model ?? (format === 'hex' ? 'rgb' : format);
	if (kind === 'rgb' || kind === 'rgba')
		return rgbToHsva(
			{
				red: rgbToken(parts[0]),
				green: rgbToken(parts[1]),
				blue: rgbToken(parts[2]),
			},
			nextAlpha,
		);
	if (kind === 'hsl' || kind === 'hsla')
		return rgbToHsva(
			hslToRgb({
				hue: hueToken(parts[0]),
				saturation: percentToken(parts[1]),
				lightness: percentToken(parts[2]),
			}),
			nextAlpha,
			hueToken(parts[0]),
		);
	if (kind === 'oklch')
		return oklchToHsva(
			{
				lightness: oklchLightnessToken(parts[0]),
				chroma: oklchChromaToken(parts[1]),
				hue: hueToken(parts[2]),
			},
			nextAlpha,
			hueToken(parts[2]),
		);
	return normalizeColor({
		hue: hueToken(parts[0]),
		saturation: percentToken(parts[1]),
		value: percentToken(parts[2]),
		alpha: nextAlpha,
	});
}

export function formatDisplayValue(
	color: ColorPickerValue,
	format: ColorPickerFormat,
) {
	return serializeColor(color, format);
}
