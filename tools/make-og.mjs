// Renders the Open Graph image (1200x630) and the apple-touch-icon from HTML.
// Usage: node tools/make-og.mjs
import { createRequire } from 'node:module';
import { readFileSync } from 'node:fs';
const require = createRequire(import.meta.url);
let chromium;
try { ({ chromium } = require('playwright')); } catch { ({ chromium } = require('/opt/node22/lib/node_modules/playwright')); }

const mark = readFileSync('public/favicon.svg', 'utf8');
const og = `<!doctype html><html><head><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@600;700&family=JetBrains+Mono&display=swap"><style>
*{margin:0}body{width:1200px;height:630px;background:#05060a;color:#eef1fb;font-family:'Space Grotesk';position:relative;overflow:hidden}
.g1{position:absolute;width:900px;height:900px;right:-300px;top:-420px;border-radius:50%;background:radial-gradient(closest-side,rgba(47,91,255,.55),transparent)}
.g2{position:absolute;width:700px;height:700px;right:-60px;top:80px;border-radius:50%;background:radial-gradient(closest-side,rgba(106,76,245,.4),transparent)}
.grid{position:absolute;inset:0;background-image:linear-gradient(to right,rgba(160,180,255,.08) 1px,transparent 1px),linear-gradient(to bottom,rgba(160,180,255,.08) 1px,transparent 1px);background-size:60px 60px;-webkit-mask-image:radial-gradient(ellipse at 75% 30%,#000,transparent 70%)}
.c{position:absolute;left:72px;right:72px;top:64px;bottom:64px;display:flex;flex-direction:column;justify-content:space-between}
.top{display:flex;align-items:center;gap:16px;font-family:'JetBrains Mono';font-size:18px;letter-spacing:.2em;color:#a3acc5}.top svg{width:56px;height:56px}
h1{font-size:104px;line-height:.88;letter-spacing:-.055em;text-transform:uppercase;font-weight:600}
h1 span{background:linear-gradient(100deg,#4fd8ff,#6b8dff 42%,#a77bff);-webkit-background-clip:text;color:transparent}
.b{font-family:'JetBrains Mono';font-size:18px;letter-spacing:.16em;color:#7c86a3;text-transform:uppercase;border-top:1px solid rgba(160,180,255,.2);padding-top:20px}
</style></head><body><div class="g1"></div><div class="g2"></div><div class="grid"></div><div class="c"><div class="top">${mark}FD WEB DESIGNS LLC</div><h1>We build websites<br>that <span>get noticed.</span></h1><div class="b">Premium Web Design &amp; Development</div></div></body></html>`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.setContent(og, { waitUntil: 'networkidle' });
await page.screenshot({ path: 'public/images/og-image.png' });
const icon = await browser.newPage({ viewport: { width: 180, height: 180 } });
await icon.setContent(`<style>*{margin:0}body{width:180px;height:180px}svg{width:180px;height:180px}</style>${mark}`);
await icon.screenshot({ path: 'public/apple-touch-icon.png' });
await browser.close();
console.log('og-image.png + apple-touch-icon.png written');
