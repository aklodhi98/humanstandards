import { access, readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';

const outputDirectory = path.resolve(process.cwd(), 'dist');
const projectDirectory = process.cwd();
const localOrigin = 'https://humanstandards.local';
const internalOrigins = new Set([
	localOrigin,
	'https://humanstandards.org',
	'https://www.humanstandards.org',
]);

try {
	await access(outputDirectory);
} catch {
	console.error('The dist directory does not exist. Run `npm run build` first.');
	process.exit(1);
}

async function walk(directory) {
	const entries = await readdir(directory, { withFileTypes: true });
	const files = await Promise.all(
		entries.map((entry) => {
			const entryPath = path.join(directory, entry.name);
			return entry.isDirectory() ? walk(entryPath) : entryPath;
		}),
	);
	return files.flat();
}

function routeForFile(file) {
	const relativePath = path.relative(outputDirectory, file).split(path.sep).join('/');
	if (relativePath === 'index.html') return '/';
	if (relativePath.endsWith('/index.html')) {
		return `/${relativePath.slice(0, -'index.html'.length)}`;
	}
	return `/${relativePath}`;
}

async function isFile(file) {
	try {
		return (await stat(file)).isFile();
	} catch {
		return false;
	}
}

async function findTarget(pathname) {
	let decodedPath;
	try {
		decodedPath = decodeURIComponent(pathname);
	} catch {
		return undefined;
	}

	const relativePath = decodedPath.replace(/^\/+/, '');
	const basePath = path.join(outputDirectory, relativePath);
	const candidates = decodedPath.endsWith('/')
		? [path.join(basePath, 'index.html')]
		: [basePath, `${basePath}.html`, path.join(basePath, 'index.html')];

	for (const candidate of candidates) {
		if (await isFile(candidate)) return candidate;
	}
	return undefined;
}

const anchorCache = new Map();
async function anchorsFor(file) {
	if (!anchorCache.has(file)) {
		const html = await readFile(file, 'utf8');
		const anchors = new Set();
		for (const match of html.matchAll(/\b(?:id|name)=(['"])(.*?)\1/gi)) {
			anchors.add(match[2]);
		}
		anchorCache.set(file, anchors);
	}
	return anchorCache.get(file);
}

const htmlFiles = (await walk(outputDirectory)).filter(
	(file) => file.endsWith('.html') && path.relative(outputDirectory, file) !== '404.html',
);
const failures = [];
let checkedLinks = 0;
let checkedReferences = 0;

async function checkTarget(source, href) {
	let url;
	try {
		url = new URL(href, `${localOrigin}/`);
	} catch {
		return;
	}
	if (!internalOrigins.has(url.origin)) return;

	const targetFile = await findTarget(url.pathname);
	if (!targetFile) {
		failures.push({ source, href, reason: 'target does not exist' });
		return;
	}

	if (url.hash && targetFile.endsWith('.html')) {
		let fragment;
		try {
			fragment = decodeURIComponent(url.hash.slice(1));
		} catch {
			fragment = url.hash.slice(1);
		}
		if (fragment && !(await anchorsFor(targetFile)).has(fragment)) {
			failures.push({ source, href, reason: `fragment #${fragment} does not exist` });
		}
	}
}

for (const sourceFile of htmlFiles) {
	const sourceRoute = routeForFile(sourceFile);
	const sourceHtml = await readFile(sourceFile, 'utf8');

	for (const match of sourceHtml.matchAll(/\bhref=(['"])(.*?)\1/gi)) {
		const href = match[2];
		if (!href || href === '#') continue;

		let resolvedUrl;
		try {
			resolvedUrl = new URL(href, `${localOrigin}${sourceRoute}`);
		} catch {
			continue;
		}
		if (!internalOrigins.has(resolvedUrl.origin)) continue;

		checkedLinks += 1;
		await checkTarget(sourceRoute, resolvedUrl.href);
	}
}

const referenceSourceFiles = (
	await Promise.all([
		walk(path.join(projectDirectory, 'src/content/docs')),
		walk(path.join(projectDirectory, 'human-standards-mcp/src')),
	])
).flat().filter((file) => /\.(?:mdx?|ts)$/.test(file));

for (const sourceFile of referenceSourceFiles) {
	const source = path.relative(projectDirectory, sourceFile).split(path.sep).join('/');
	const content = await readFile(sourceFile, 'utf8');
	for (const match of content.matchAll(/\breference:\s*(['"])(\/.*?)\1/g)) {
		checkedReferences += 1;
		await checkTarget(source, match[2]);
	}
}

const indexPath = path.join(projectDirectory, 'human-standards-mcp/data/standards-index.json');
const standardsIndex = JSON.parse(await readFile(indexPath, 'utf8'));
const indexedReferences = [];
function collectIndexedReferences(value, key = '') {
	if (typeof value === 'string' && (key === 'path' || key === 'reference') && value.startsWith('/')) {
		indexedReferences.push(value);
		return;
	}
	if (Array.isArray(value)) {
		for (const child of value) collectIndexedReferences(child);
		return;
	}
	if (value && typeof value === 'object') {
		for (const [childKey, child] of Object.entries(value)) {
			collectIndexedReferences(child, childKey);
		}
	}
}
collectIndexedReferences(standardsIndex);
for (const href of indexedReferences) {
	checkedReferences += 1;
	await checkTarget('human-standards-mcp/data/standards-index.json', href);
}

const uniqueFailures = [
	...new Map(
		failures.map((failure) => [
			`${failure.source}\0${failure.href}\0${failure.reason}`,
			failure,
		]),
	).values(),
].sort((a, b) => a.source.localeCompare(b.source) || a.href.localeCompare(b.href));

if (uniqueFailures.length > 0) {
	console.error(`Found ${uniqueFailures.length} broken internal link${uniqueFailures.length === 1 ? '' : 's'}:`);
	for (const failure of uniqueFailures) {
		console.error(`- ${failure.source} -> ${failure.href} (${failure.reason})`);
	}
	process.exit(1);
}

console.log(
	`Checked ${checkedLinks} internal links across ${htmlFiles.length} pages and ${checkedReferences} machine-readable references; no broken targets or fragments.`,
);
