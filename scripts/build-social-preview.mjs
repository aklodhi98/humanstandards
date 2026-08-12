import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const contoursPath = join(root, 'src/assets/acidic-olive-contours.png');
const outputPath = join(root, 'public/social-preview.png');

const contours = await sharp(contoursPath)
	.resize(960, 640)
	.png()
	.toBuffer();

const typography = Buffer.from(`
<svg width="1280" height="640" viewBox="0 0 1280 640" xmlns="http://www.w3.org/2000/svg">
  <rect x="0" y="0" width="1280" height="640" fill="none" stroke="#ddd8cc" stroke-width="2"/>
  <rect x="80" y="72" width="56" height="8" rx="4" fill="#687319"/>
  <text x="80" y="132" fill="#4b554f" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="22" font-weight="650" letter-spacing="2.8">OPEN-SOURCE HUMAN-FACTORS LIBRARY</text>
  <text x="76" y="266" fill="#171914" font-family="'Iowan Old Style', Baskerville, Georgia, serif" font-size="92" font-weight="500" letter-spacing="-3.5">Human</text>
  <text x="76" y="354" fill="#171914" font-family="'Iowan Old Style', Baskerville, Georgia, serif" font-size="92" font-weight="500" letter-spacing="-3.5">Standards</text>
  <text x="80" y="430" fill="#4b554f" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="27" font-weight="450">Practical guidance for product teams</text>
  <text x="80" y="468" fill="#4b554f" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="27" font-weight="450">and read-only context for AI agents.</text>
  <line x1="80" y1="530" x2="604" y2="530" stroke="#c7c4ba" stroke-width="2"/>
  <text x="80" y="578" fill="#687319" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="22" font-weight="700" letter-spacing="1.6">HUMANSTANDARDS.ORG</text>
</svg>`);

await sharp({
	create: {
		width: 1280,
		height: 640,
		channels: 4,
		background: '#f7f3ea',
	},
})
	.composite([
		{ input: contours, left: 320, top: 0 },
		{ input: typography, left: 0, top: 0 },
	])
	.png({ compressionLevel: 9, palette: true })
	.toFile(outputPath);

console.log(`Wrote ${outputPath}`);
