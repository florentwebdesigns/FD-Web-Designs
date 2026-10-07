// Static build: renders the components to HTML, bundles + minifies CSS/JS
// with esbuild, and copies public/ assets.
//
//   npm run build    -> dist/      (deploy this folder anywhere static)
//   npm run preview  -> preview/   (single-file preview with inlined CSS/JS)
//   npm run dev      -> rebuild on change + serve dist/ at http://localhost:4173
import * as esbuild from 'esbuild';
import { cpSync, mkdirSync, rmSync, writeFileSync, readFileSync, watch } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join } from 'node:path';
import { execFile } from 'node:child_process';

const args = new Set(process.argv.slice(2));
const PREVIEW = args.has('--preview');
const DEV = args.has('--dev');

async function bundle() {
  const js = await esbuild.build({
    entryPoints: ['src/scripts/main.js'],
    bundle: true, minify: true, format: 'iife', target: ['es2020'], write: false,
  });
  const css = await esbuild.build({
    entryPoints: ['src/styles/main.css'],
    bundle: true, minify: true, write: false, loader: { '.svg': 'dataurl' },
  });
  return { js: js.outputFiles[0].text, css: css.outputFiles[0].text };
}

async function render() {
  return import('./src/pages/index.js');
}

async function buildDist() {
  const { js, css } = await bundle();
  const page = await render();
  rmSync('dist', { recursive: true, force: true });
  mkdirSync('dist/assets', { recursive: true });
  cpSync('public', 'dist', { recursive: true, filter: (src) => !src.endsWith('manifest.json') });
  writeFileSync('dist/assets/app.css', css);
  writeFileSync('dist/assets/app.js', js);
  for (const [name, file] of [['home', 'index.html'], ['portfolio', 'portfolio.html']]) {
    writeFileSync(`dist/${file}`, `<!doctype html>
<html lang="en" class="no-js">
<head>${page.renderHead({ css: '/assets/app.css', page: name })}
<script>document.documentElement.classList.replace('no-js','js');setTimeout(function(){if(!window.__fdReady)document.documentElement.classList.remove('js')},3000)</script>
</head>
<body>${page.renderBody({ page: name })}
<script src="/assets/app.js" defer></script>
</body>
</html>
`);
  }
  console.log(`dist/ built  css ${(css.length / 1024).toFixed(1)}kB  js ${(js.length / 1024).toFixed(1)}kB`);
}

// Preview variant: one HTML fragment with inline CSS/JS (for hosts that wrap
// the page in their own <html>/<head>), images copied alongside.
async function buildPreview() {
  const { js, css } = await bundle();
  const page = await render();
  rmSync('preview', { recursive: true, force: true });
  mkdirSync('preview', { recursive: true });
  cpSync('public/images', 'preview/images', { recursive: true, filter: (src) => !src.endsWith('manifest.json') });
  const head = page.renderHead({ inlineCss: css })
    .replace(/<meta charset[^>]*>\s*/, '')
    .replace(/<meta name="viewport"[^>]*>\s*/, '')
    .replace(/<link rel="(icon|apple-touch-icon|manifest|canonical)"[^>]*>\s*/g, '');
  const script = `<script>${js.replace(/<\/script/g, '<\\/script')}</script>`;
  const jsFlag = `<script>document.documentElement.classList.add('js');setTimeout(function(){if(!window.__fdReady)document.documentElement.classList.remove('js')},3000)</script>`;
  writeFileSync('preview/index.html', `${head}
${jsFlag}
${page.renderBody({ portfolioHref: 'portfolio.html' })}
${script}
`);
  // Extra pages are served as-is (not wrapped), so they need a full document.
  writeFileSync('preview/portfolio.html', `<!doctype html>
<html lang="en">
<head>${page.renderHead({ inlineCss: css, page: 'portfolio' }).replace(/<link rel="(icon|apple-touch-icon|manifest|canonical)"[^>]*>\s*/g, '')}
${jsFlag}
</head>
<body>${page.renderBody({ page: 'portfolio', portfolioHref: 'portfolio.html' })}
${script}
</body>
</html>
`);
  console.log('preview/ built');
}

if (PREVIEW) await buildPreview();
else await buildDist();

if (DEV) {
  const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.avif': 'image/avif', '.png': 'image/png', '.json': 'application/json', '.webmanifest': 'application/manifest+json', '.txt': 'text/plain', '.xml': 'application/xml' };
  createServer((req, res) => {
    let path = decodeURIComponent(req.url.split('?')[0]);
    if (path.endsWith('/')) path += 'index.html';
    else if (!extname(path)) path += '.html';
    try {
      const body = readFileSync(join('dist', path));
      res.writeHead(200, { 'content-type': types[extname(path)] || 'application/octet-stream' });
      res.end(body);
    } catch { res.writeHead(404); res.end('Not found'); }
  }).listen(4173, () => console.log('Serving dist/ at http://localhost:4173'));
  let t;
  for (const dir of ['src', 'public']) {
    watch(dir, { recursive: true }, () => {
      clearTimeout(t);
      t = setTimeout(() => execFile(process.execPath, ['build.mjs'], (err, out, errOut) => console.log(err ? errOut : out.trim())), 120);
    });
  }
}
