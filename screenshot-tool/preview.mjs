// Build output/<run>/preview.html: current and new screenshots side by side.
// Images are embedded in the page, so it works when macOS only lets the browser open that one file.
//   npm run preview -- <run>      rebuild and open the preview for an earlier run
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFile } from 'node:child_process';
import { OUTPUT_DIR, loadManifest, runName } from './lib.mjs';

const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const img = (file) => (fs.existsSync(file)
  ? `<img src="data:image/png;base64,${fs.readFileSync(file).toString('base64')}">`
  : '<i>none</i>');

export function buildPreview(runDir) {
  const run = path.basename(runDir);
  const results = JSON.parse(fs.readFileSync(path.join(runDir, 'results.json'), 'utf8'));
  const byId = Object.fromEntries(loadManifest().map((e) => [e.id, e]));
  // Older runs have no "changed" field: treat them as changed.
  const changed = results.filter((r) => r.ok && r.changed !== false);
  const failed = results.filter((r) => !r.ok);
  const same = results.filter((r) => r.ok && r.changed === false);
  let n = 0;
  const row = (r) => {
    n += 1;
    const e = byId[r.id] || { used_in: [], method: '' };
    const name = runName(r.image);
    const oldFile = path.join(runDir, 'old', name);
    return `<tr class="${r.ok ? 'ok' : 'fail'}">
  <td><b>${n}. ${esc(r.id)}</b><br><code>${esc(r.image)}</code><br>${(e.used_in || []).map((u) => esc(u.article.replace('graphium/', ''))).join('<br>')}
  ${r.reason ? `<p class="why">${esc(r.reason)}</p>` : ''}${e.method === 'ai-reply' ? '<p class="warn">AI reply: check the wording</p>' : ''}${r.ok ? '' : `<p class="err">${esc(r.error)}</p>`}</td>
  <td>${fs.existsSync(oldFile) ? img(oldFile) : '<i>new image</i>'}</td>
  <td>${r.ok ? img(path.join(runDir, 'new', name)) : img(path.join(runDir, `failed-${r.id}.png`))}</td>
</tr>`;
  };
  const table = (rows) => `<table><tr><th>Screenshot</th><th>Current</th><th>New</th></tr>${rows.map(row).join('\n')}</table>`;
  const file = path.join(runDir, 'preview.html');
  fs.writeFileSync(file, `<!doctype html><meta charset="utf-8"><title>Screenshots ${run}</title>
<style>body{font:14px system-ui;margin:16px}table{border-collapse:collapse;width:100%}td{border-top:1px solid #ddd;padding:8px;vertical-align:top}
td:first-child{width:22%}td:not(:first-child){width:39%}img{max-width:100%;border:1px solid #ccc}.fail td:first-child{background:#fee}.err{color:#b00}.warn{color:#a60}.why{color:#555}th{text-align:left}
h2{margin-top:28px}summary{cursor:pointer;font-weight:600;margin-top:28px}</style>
<h1>Screenshot run ${run}</h1>
<p>${changed.length} changed, ${failed.length} failed, ${same.length} with no visible change.
To copy the changed images into the docs: <code>npm run apply -- ${run}</code> (add <code>--only id1,id2</code> to pick).</p>
${changed.length ? `<h2>Changed (${changed.length})</h2>${table(changed)}` : '<p><b>No screenshots changed.</b></p>'}
${failed.length ? `<h2>Failed (${failed.length})</h2>${table(failed)}` : ''}
${same.length ? `<details><summary>No visible change (${same.length}) — skipped by apply</summary>${table(same)}</details>` : ''}`);
  return file;
}

// Command line: rebuild for a given run (or the latest) and open it.
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const runs = fs.existsSync(OUTPUT_DIR) ? fs.readdirSync(OUTPUT_DIR).sort() : [];
  const run = process.argv[2] || runs.at(-1);
  if (!run) { console.error('No runs yet.'); process.exit(1); }
  const file = buildPreview(path.join(OUTPUT_DIR, run));
  console.log('Preview:', path.relative(process.cwd(), file));
  if (process.platform === 'darwin') execFile('open', [file]);
}
