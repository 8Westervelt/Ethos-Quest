// Builds the hand-off copy of the site for the EthosQuest web team: static files served from the domain root.
// Usage: npm run export:release   (output in release/site/; see docs/HANDOFF.md for how it deploys)
// The inquiry form posts to /api/inquiries, the endpoint already running on ethosquest.com.
import { execSync } from 'node:child_process';
import { rmSync } from 'node:fs';

// A preview build leaves dist/client/<base>/ behind; start clean so it is not copied into the release.
rmSync('dist', { recursive: true, force: true });
execSync('node scripts/export-pages.mjs', { stdio: 'inherit', env: { ...process.env, PAGES_BASE_PATH: '', PAGES_OUT: 'release/site' } });
// GitHub Pages needs .nojekyll; a Cloudflare deployment does not.
rmSync('release/site/.nojekyll', { force: true });
