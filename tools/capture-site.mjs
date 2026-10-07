// Captures a real client site (URL or local index.html) as full-page desktop
// and mobile screenshots for the portfolio, then run tools/optimize-images.py.
// Usage: node tools/capture-site.mjs <url-or-path> <image-name>
import { createRequire } from 'node:module';
import { mkdirSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const require = createRequire(import.meta.url);
let chromium;
try { ({ chromium } = require('playwright')); } catch { ({ chromium } = require('/opt/node22/lib/node_modules/playwright')); }

const [, , target, name] = process.argv;
if (!target || !name) { console.error('Usage: node tools/capture-site.mjs <url-or-path> <image-name>'); process.exit(1); }
const url = existsSync(target) ? pathToFileURL(resolve(target)).href : target;
const OUT = 'tools/.cache/captures';
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();
for (const [variant, opts] of [
  ['desktop', { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1.25 }],
  ['mobile', { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true }],
]) {
  const page = await browser.newPage({ ...opts, reducedMotion: 'reduce' });
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  // Scroll through so lazy images and scroll reveals load, then return to top.
  const h = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < h; y += 400) { await page.evaluate((y) => window.scrollTo(0, y), y); await page.waitForTimeout(80); }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(1200);
  await page.screenshot({ path: `${OUT}/${name}-${variant}.png`, fullPage: true });
  await page.close();
  console.log('captured', name, variant);
}
await browser.close();
