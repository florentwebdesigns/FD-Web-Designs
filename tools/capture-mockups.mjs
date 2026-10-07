// Captures the placeholder project mockups in tools/mockups/ as full-page PNGs.
// Usage: node tools/capture-mockups.mjs   (then: python3 tools/optimize-images.py)
// Replace these with real screenshots of client sites when available.
import { createRequire } from 'node:module';
import { readdirSync, mkdirSync } from 'node:fs';
import { join, basename } from 'node:path';
import { pathToFileURL } from 'node:url';

const require = createRequire(import.meta.url);
let chromium;
try { ({ chromium } = require('playwright')); }
catch { ({ chromium } = require('/opt/node22/lib/node_modules/playwright')); }

const SRC = 'tools/mockups';
const OUT = 'tools/.cache/captures';
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();
for (const file of readdirSync(SRC).filter((f) => f.endsWith('.html'))) {
  const slug = basename(file, '.html');
  const url = pathToFileURL(join(process.cwd(), SRC, file)).href;
  for (const [variant, opts] of [
    ['desktop', { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1.25 }],
    ['mobile', { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 }],
  ]) {
    const page = await browser.newPage(opts);
    await page.goto(url, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: join(OUT, `${slug}-${variant}.png`), fullPage: true });
    await page.close();
    console.log('captured', slug, variant);
  }
}
await browser.close();
