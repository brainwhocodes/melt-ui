import { mkdirSync, readdirSync, renameSync } from 'node:fs';
import { join } from 'node:path';

// Define your root directory
const rootDir = 'src/docs/previews';

// Walk through the root directory
function walk(dirPath: string): void {
	for (const entry of readdirSync(dirPath, { withFileTypes: true })) {
		if (entry.isDirectory()) {
			walk(join(dirPath, entry.name));
			continue;
		}
		// Check if the file is tailwind.svelte or css.svelte
		if (entry.name === 'tailwind.svelte' || entry.name === 'css.svelte') {
			// Create the new directory path
			const newDir = join(dirPath, entry.name.split('.')[0]);
			// Create the new directory
			mkdirSync(newDir, { recursive: true });
			// Create the new file path
			const newFilePath = join(newDir, 'index.svelte');
			// Create the old file path
			const oldFilePath = join(dirPath, entry.name);
			// Move and rename the file
			renameSync(oldFilePath, newFilePath);
		}
	}
}

walk(rootDir);
