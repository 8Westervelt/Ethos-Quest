// Builds a static copy of the site.
// Preview:  npm run export:pages    served from https://<user>.github.io/<repo>/ (output in pages-out/, published to gh-pages)
// Release:  npm run export:release  served from the domain root, e.g. ethosquest.com (output in release/site/)
// PAGES_BASE_PATH sets the subfolder ('' for the domain root) and PAGES_OUT the output folder.
import { execSync } from 'node:child_process';
import { cpSync, existsSync, mkdirSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const root = process.cwd();
const base = process.env.PAGES_BASE_PATH ?? '/Ethos-Quest';
const out = path.join(root, process.env.PAGES_OUT || 'pages-out');

console.log(`Building with basePath ${base}...`);
execSync('npx vinext build', { stdio: 'inherit', env: { ...process.env, PAGES_BASE_PATH: base, WRANGLER_LOG_PATH: '.wrangler/wrangler.log' } });

// Every app/**/page.tsx becomes a route; preview-only folders are skipped.
function findRoutes(dir, route = '') {
 const routes = [];
 for (const name of readdirSync(dir)) {
  const full = path.join(dir, name);
  if (statSync(full).isDirectory()) { if (!name.startsWith('_') && name !== 'ethos') routes.push(...findRoutes(full, route + '/' + name)); }
  else if (name === 'page.tsx') routes.push(route || '/');
 }
 return routes;
}
const routes = findRoutes(path.join(root, 'app'));

rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });
// Compiled code is emitted under dist/client/<base>/; public files (media, icons) sit at dist/client/.
// At the domain root the two share dist/client/, and the _headers cache rules (Cloudflare) are kept.
const client = path.join(root, 'dist', 'client');
if (base) cpSync(path.join(client, base.slice(1)), out, { recursive: true });
for (const name of readdirSync(client)) {
 if ((base && (name === base.slice(1) || name === '_headers')) || name.endsWith('.json')) continue;
 cpSync(path.join(client, name), path.join(out, name), { recursive: true });
}

const { default: worker } = await import(pathToFileURL(path.join(root, 'dist', 'server', 'index.js')).href);
const env = { ASSETS: { fetch: async () => new Response('', { status: 404 }) } };
const ctx = { waitUntil() {}, passThroughOnException() {} };
const render = async route => (await worker.fetch(new Request('http://localhost' + base + (route === '/' ? '/' : route)), env, ctx)).text();

for (const route of routes) {
 const dir = path.join(out, route);
 mkdirSync(dir, { recursive: true });
 writeFileSync(path.join(dir, 'index.html'), await render(route));
 console.log('  ' + base + route);
}
writeFileSync(path.join(out, '404.html'), await render('/__not-found'));
// Without this, GitHub Pages runs Jekyll, which drops the _next folder.
writeFileSync(path.join(out, '.nojekyll'), '');
console.log(`Exported ${routes.length} pages to ${path.relative(root, out)}/ (${existsSync(path.join(out, '_next')) ? 'with' : 'MISSING'} _next assets).`);
