// Recapture help-site screenshots listed in manifest.yaml.
//
//   npm run capture                              every screenshot that's set up (all areas)
//   npm run capture -- --area vaults,assistant   just these areas
//   npm run capture -- --id vault-dashboard      just these screenshots
//   npm run capture -- --include-kept            also recapture ones marked keep-current
//   npm run capture -- --with-ai                 also run ones that send chat messages (uses credits)
//   npm run capture -- --dry-run                 check the manifest without opening a browser
//
// The preview lists screenshots that look different first; ones with no visible change are
// folded away at the bottom, and `npm run apply` skips them.
//
// A browser window opens on the sign-in page. Sign in yourself and switch to the
// workspace in config.yaml; the captures then run in that window. Nothing about your
// sign-in is saved: the session is discarded when the window closes.
//
// New images go to output/<run>/new/, never straight into images/.
// Open output/<run>/preview.html to compare old and new, then `npm run apply -- <run>`.
import fs from 'node:fs';
import path from 'node:path';
import { execFile } from 'node:child_process';
import { chromium } from 'playwright';
import { buildPreview } from './preview.mjs';
import { compareImages } from './compare.mjs';
import {
  OUTPUT_DIR, REPO_DIR, describe, fill, isUnsafeLabel, loadConfig, loadManifest, locate, runName,
} from './lib.mjs';

// ---------- arguments ----------
const args = process.argv.slice(2);
const opt = (name) => { const i = args.indexOf(`--${name}`); return i >= 0 ? args[i + 1] : undefined; };
const flag = (name) => args.includes(`--${name}`);
const areas = opt('area')?.split(',');
const ids = opt('id')?.split(',');
const withAi = flag('with-ai') || !!ids;
const methods = (opt('method') || ['auto', 'interactive', 'needs-test-data', ...(withAi ? ['ai-reply'] : [])].join(',')).split(',');
const dryRun = flag('dry-run');
const includeKept = flag('include-kept');

const cfg = loadConfig();
const vars = cfg.vars || {};
const manifest = loadManifest();

let entries = manifest.filter((e) => e.status === 'capture'
  || (e.status === 'keep-current' && e.start_url && (includeKept || ids?.includes(e.id))));
if (areas) entries = entries.filter((e) => areas.includes(e.area));
if (ids) entries = entries.filter((e) => ids.includes(e.id));
if (!ids) entries = entries.filter((e) => methods.includes(e.method));

const ready = entries.filter((e) => e.start_url);
const notReady = entries.filter((e) => !e.start_url);

console.log(`${entries.length} matching entries: ${ready.length} have steps, ${notReady.length} don't yet.`);
if (notReady.length) {
  const byArea = {};
  for (const e of notReady) byArea[e.area] = (byArea[e.area] || 0) + 1;
  console.log('  No steps yet (skipped):', notReady.length <= 12
    ? notReady.map((e) => e.id).join(', ')
    : Object.entries(byArea).map(([a, n]) => `${a} ${n}`).join(', '));
}

// ---------- validate steps ----------
const STEP_KEYS = ['goto', 'click', 'hover', 'fill', 'press', 'wait', 'wait_for', 'scroll_to', 'scroll_to_top', 'wait_for_hidden'];
const problems = [];
for (const e of ready) {
  for (const [i, s] of (e.steps || []).entries()) {
    const keys = Object.keys(s).filter((k) => !['allow_unsafe', 'allow_enter', 'note', 'optional', 'timeout'].includes(k));
    if (keys.length !== 1 || !STEP_KEYS.includes(keys[0])) problems.push(`${e.id} step ${i + 1}: expected one of ${STEP_KEYS.join(', ')}`);
    if (s.press === 'Enter' && e.method !== 'ai-reply' && !s.allow_enter) problems.push(`${e.id} step ${i + 1}: Enter needs allow_enter: true (or an ai-reply entry)`);
  }
  if (!['element', 'viewport', 'full_page', 'clip'].includes(e.capture)) problems.push(`${e.id}: capture must be element, viewport, full_page or clip`);
  if (e.capture === 'element' && !e.selector) problems.push(`${e.id}: capture is element but there is no selector`);
  if (e.method === 'manual') problems.push(`${e.id}: manual entries are not captured by the script`);
}
if (problems.length) { console.error('\nManifest problems:\n  ' + problems.join('\n  ')); process.exit(1); }
if (dryRun) { console.log('Dry run: manifest looks valid.'); process.exit(0); }
if (!ready.length) { console.log('Nothing to capture.'); process.exit(0); }

// ---------- run ----------
const run = new Date().toISOString().replace(/[:T]/g, '-').slice(0, 19);
const runDir = path.join(OUTPUT_DIR, run);
fs.mkdirSync(path.join(runDir, 'new'), { recursive: true });
fs.mkdirSync(path.join(runDir, 'old'), { recursive: true });

// Fresh, temporary browser profile: nothing is read from or written to disk about your sign-in.
const browser = await chromium.launch({ headless: false });
const context = await browser.newContext({ viewport: cfg.viewport, deviceScaleFactor: cfg.device_scale_factor || 1 });
const signedInPage = await context.newPage();

// ---------- you sign in ----------
await signedInPage.goto(new URL('/sign-in', cfg.base_url).toString());
console.log('\nSign in to dev in the browser window that just opened,');
console.log(`then switch to "${cfg.workspace_name}" with the header workspace switcher.`);
console.log('Captures start automatically once that workspace shows in the header (waits up to 10 minutes).\n');
{
  const deadline = Date.now() + 10 * 60 * 1000;
  let ready = false;
  while (!ready && Date.now() < deadline) {
    await signedInPage.waitForTimeout(2000);
    if (signedInPage.isClosed()) { console.error('Window was closed before sign-in finished.'); process.exit(1); }
    if (/sign-in|sign-up|forgot|reset/.test(signedInPage.url())) continue;
    const ws = await signedInPage.getByTestId('workspace-selector-menu').first().innerText({ timeout: 1000 }).catch(() => '');
    ready = ws.includes(cfg.workspace_name);
  }
  if (!ready) { console.error('Timed out waiting for sign-in.'); await browser.close(); process.exit(1); }
  console.log('Signed in. Capturing — leave the window alone until it closes.\n');
}
let signedOutPage = null; // created only if an entry needs it
let page = signedInPage;
let signedOut = false;
const settle = () => page.waitForTimeout(cfg.settle_ms ?? 1200);

async function guardWorkspace() {
  if (signedOut) return; // sign-in, sign-up and similar pages

  if (/sign-in/.test(page.url())) throw new Error('Signed out during the run. Run the capture command again.');
  const top = (await page.locator('body').innerText().catch(() => '')).slice(0, 800);
  // The workspace switcher in the header has a stable test id; fall back to the top of the page.
  const switcher = await page.getByTestId('workspace-selector-menu').first().innerText({ timeout: 5000 }).catch(() => top);
  for (const bad of [...(cfg.forbidden_workspaces || []), ...(cfg.forbidden_vaults || [])]) {
    if (top.includes(bad) || switcher.includes(bad)) throw new Error(`STOP: page shows "${bad}". Switch to ${cfg.workspace_name} and run again.`);
  }
  if (!switcher.includes(cfg.workspace_name)) throw new Error(`STOP: header doesn't show "${cfg.workspace_name}".`);
}

async function safeLabel(loc) {
  return (await loc.getAttribute('aria-label').catch(() => null)) || (await loc.innerText().catch(() => '')) || '';
}

async function runStep(e, s) {
  if (s.goto !== undefined) {
    await page.goto(new URL(fill(s.goto, vars), cfg.base_url).toString(), { waitUntil: 'domcontentloaded' });
    await settle();
    await guardWorkspace();
  } else if (s.click !== undefined) {
    const loc = locate(page, s.click, vars);
    await loc.waitFor({ state: 'visible', timeout: 15000 });
    const label = await safeLabel(loc);
    if (isUnsafeLabel(label) && !s.allow_unsafe) throw new Error(`Refused to click "${label.trim()}" — it could save or change data`);
    await loc.click();
    await settle();
  } else if (s.hover !== undefined) {
    await locate(page, s.hover, vars).hover();
    await settle();
  } else if (s.fill !== undefined) {
    await locate(page, s.fill.target, vars).fill(fill(s.fill.value, vars));
    await settle();
  } else if (s.press !== undefined) {
    await page.keyboard.press(s.press);
    await settle();
  } else if (s.wait !== undefined) {
    await page.waitForTimeout(Number(s.wait));
  } else if (s.wait_for !== undefined) {
    await locate(page, s.wait_for, vars).waitFor({ state: 'visible', timeout: s.timeout ?? (e.method === 'ai-reply' ? 180000 : 20000) });
  } else if (s.wait_for_hidden !== undefined) {
    await locate(page, s.wait_for_hidden, vars).waitFor({ state: 'hidden', timeout: s.timeout ?? (e.method === 'ai-reply' ? 180000 : 20000) });
  } else if (s.scroll_to !== undefined) {
    await locate(page, s.scroll_to, vars).scrollIntoViewIfNeeded();
    await settle();
  } else if (s.scroll_to_top !== undefined) {
    // Scroll so the element sits at the top of its scrolling area.
    await locate(page, s.scroll_to_top, vars).evaluate((el) => el.scrollIntoView({ block: 'start' }));
    await settle();
  }
}

async function shoot(e, file) {
  const mask = (e.mask || []).map((t) => locate(page, t, vars));
  const opts = { path: file, animations: 'disabled', caret: 'hide', mask };
  if (e.capture === 'element') {
    // selector can be one target or a list; a list captures the area covering all of them.
    const targets = Array.isArray(e.selector) ? e.selector : [e.selector];
    const boxes = [];
    for (const [i, t] of targets.entries()) {
      const loc = locate(page, t, vars);
      await loc.waitFor({ state: 'visible', timeout: 15000 });
      if (i === 0 && !e.no_scroll) await loc.scrollIntoViewIfNeeded();
      const b = await loc.boundingBox();
      if (!b) throw new Error(`Element not on screen: ${describe(t)}`);
      boxes.push(b);
    }
    // padding: a number, or { top, right, bottom, left } in pixels.
    const P = typeof e.padding === 'object' && e.padding
      ? { top: 8, right: 8, bottom: 8, left: 8, ...e.padding }
      : { top: e.padding ?? 8, right: e.padding ?? 8, bottom: e.padding ?? 8, left: e.padding ?? 8 };
    const vp = page.viewportSize();
    // x_from: take the left and right edges from one target only (by position in the list).
    const xb = typeof e.x_from === 'number' ? [boxes[e.x_from]] : boxes;
    const left = Math.min(...xb.map((b) => b.x)), top = Math.min(...boxes.map((b) => b.y));
    const right = Math.max(...xb.map((b) => b.x + b.width)), bottom = Math.max(...boxes.map((b) => b.y + b.height));
    const x = Math.max(0, left - P.left), y = Math.max(0, top - P.top);
    const w = Math.min(vp.width - x, right + P.right - x), h = Math.min(vp.height - y, bottom + P.bottom - y);
    await page.screenshot({ ...opts, clip: { x, y, width: w, height: h } });
  } else if (e.capture === 'clip') {
    await page.screenshot({ ...opts, clip: e.clip });
  } else {
    await page.screenshot({ ...opts, fullPage: e.capture === 'full_page' });
  }
}

// ---------- data watch: stop if a run changes real data ----------
// config.yaml `watch` lists values (like a table's field count) that must not change.
// Each is read before the run and again after every screenshot whose start_url begins with applies_to.
const watches = (cfg.watch || [])
  .map((w) => ({ ...w, url: fill(w.url, vars), applies_to: fill(w.applies_to, vars) }))
  .filter((w) => ready.some((e) => fill(e.start_url, vars).startsWith(w.applies_to)));
async function readWatch(w) {
  await signedInPage.goto(new URL(w.url, cfg.base_url).toString(), { waitUntil: 'domcontentloaded' });
  await signedInPage.waitForTimeout(cfg.settle_ms ?? 1200);
  const loc = locate(signedInPage, w.target, vars);
  await loc.waitFor({ state: 'visible', timeout: 20000 });
  return (await loc.innerText()).replace(/\s+/g, ' ').trim();
}
for (const w of [...watches]) {
  try {
    w.baseline = await readWatch(w);
    console.log(`Watching ${w.label}: "${w.baseline.slice(0, 80)}"`);
  } catch (err) {
    console.log(`Couldn't read ${w.label}, so it won't be checked this run (${String(err.message || err).split('\n')[0]}).`);
    watches.splice(watches.indexOf(w), 1);
  }
}

const results = [];
let stoppedByWatch = null;
for (const e of ready) {
  const name = runName(e.image);
  const newFile = path.join(runDir, 'new', name);
  const oldSrc = path.join(REPO_DIR, e.image);
  if (fs.existsSync(oldSrc)) fs.copyFileSync(oldSrc, path.join(runDir, 'old', name));
  process.stdout.write(`  ${e.id} … `);
  signedOut = !!e.signed_out;
  if (signedOut && !signedOutPage) {
    const ctx = await browser.newContext({ viewport: cfg.viewport, deviceScaleFactor: cfg.device_scale_factor || 1 });
    signedOutPage = await ctx.newPage();
  }
  page = signedOut ? signedOutPage : signedInPage;
  try {
    await runStep(e, { goto: e.start_url });
    for (const s of e.steps || []) {
      try { await runStep(e, s); } catch (err) { if (!s.optional) throw err; }
    }
    await guardWorkspace();
    await shoot(e, newFile);
    const cmp = compareImages(path.join(runDir, 'old', name), newFile);
    results.push({ e, ok: true, changed: cmp.changed, reason: cmp.reason });
    console.log(cmp.changed ? `changed (${cmp.reason})` : 'no visible change');
  } catch (err) {
    const msg = String(err.message || err).split('\n')[0];
    results.push({ e, ok: false, error: msg });
    console.log('FAILED — ' + msg);
    await page.screenshot({ path: path.join(runDir, `failed-${e.id}.png`) }).catch(() => {});
    if (msg.startsWith('STOP') || msg.startsWith('Signed out')) break;
  }
  // Leave any open dialog or menu without saving.
  await page.keyboard.press('Escape').catch(() => {});
  // Check that nothing was saved.
  for (const w of watches) {
    if (e.signed_out || !fill(e.start_url, vars).startsWith(w.applies_to)) continue;
    const now = await readWatch(w).catch((err) => `could not read (${String(err.message || err).split('\n')[0]})`);
    if (now !== w.baseline) {
      stoppedByWatch = `${w.label} changed from "${w.baseline}" to "${now}" after ${e.id}.`;
      break;
    }
  }
  if (stoppedByWatch) {
    console.log(`\nSTOPPED: ${stoppedByWatch} Check the app and tell Claude before running again.`);
    const last = results[results.length - 1];
    if (last) { last.ok = false; last.error = `STOPPED: ${stoppedByWatch}`; }
    break;
  }
}
await browser.close();

// ---------- results + preview page ----------
fs.writeFileSync(path.join(runDir, 'results.json'), JSON.stringify(results.map(({ e, ok, error, changed, reason }) => ({ id: e.id, image: e.image, ok, error, changed, reason })), null, 1));
const previewFile = buildPreview(runDir);

const failed = results.filter((r) => !r.ok).length;
const changedN = results.filter((r) => r.ok && r.changed).length;
console.log(`\n${changedN} changed, ${results.length - failed - changedN} with no visible change, ${failed} failed.`);
console.log(`Review: ${path.relative(process.cwd(), previewFile)} (opening it now)`);
if (process.platform === 'darwin') execFile('open', [previewFile]);
console.log(`Then:   npm run apply -- ${run}`);
