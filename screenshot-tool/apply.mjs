// Copy a reviewed run's new screenshots into images/.
//   npm run apply -- <run>                    all successful captures from that run
//   npm run apply -- <run> --only id1,id2     just these
//   npm run apply -- <run> --skip id3         all except these
//   npm run apply -- <run> --all              include ones with no visible change
import fs from 'node:fs';
import path from 'node:path';
import { OUTPUT_DIR, REPO_DIR, runName } from './lib.mjs';

const args = process.argv.slice(2);
const run = args[0];
const opt = (n) => { const i = args.indexOf(`--${n}`); return i >= 0 ? args[i + 1]?.split(',') : undefined; };
const only = opt('only');
const skip = opt('skip') || [];
const all = args.includes('--all');

if (!run) {
  const runs = fs.existsSync(OUTPUT_DIR) ? fs.readdirSync(OUTPUT_DIR).sort() : [];
  console.log('Usage: npm run apply -- <run>\nRuns:', runs.join(', ') || '(none)');
  process.exit(1);
}
const runDir = path.join(OUTPUT_DIR, run);
const results = JSON.parse(fs.readFileSync(path.join(runDir, 'results.json'), 'utf8'));

let copied = 0;
for (const r of results) {
  if (!r.ok || skip.includes(r.id) || (only && !only.includes(r.id))) continue;
  if (r.changed === false && !all && !only) continue; // no visible change
  const src = path.join(runDir, 'new', runName(r.image));
  const dest = path.join(REPO_DIR, r.image);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
  console.log('  updated', r.image);
  copied++;
}
console.log(`${copied} image(s) copied into the docs. Review the changes in git before committing.`);
