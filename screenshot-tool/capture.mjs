// Recapture help-site screenshots listed in manifest.yaml.
//
//   npm run capture -- --area vaults            one area
//   npm run capture -- --id vault-dashboard,danger-zone
//   npm run capture -- --area vaults --dry-run  check the manifest without opening a browser
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
import {
  OUTPUT_DIR, REPO_DIR, describe, fill, isUnsafeLabel, loadConfig, loadManifest, locate, runName,
} from './lib.mjs';

// ---------- arguments ----------
const args = process.argv.slice(2);
const opt = (name) => { const i = args.indexOf(`--${name}`); return i >= 0 ? args[i + 1] : undefined; };
const flag = (name) => args.includes(`--${name}`);
const areas = opt('area')?.split(',');
const ids = opt('id')?.split(',');
const methods = (opt('method') || 'auto,interactive,needs-test-data,ai-reply').split(',');
const dryRun = flag('dry-run');

const cfg = loadConfig();
const vars = cfg.vars || {};
const manifest = loadManifest();

let entries = manifest.filter((e) => e.status === 'capture');
if (areas) entries = entries.filter((e) => areas.includes(e.area));
if (ids) entries = entries.filter((e) => ids.includes(e.id));
if (!ids) entries = entries.filter((e) => methods.includes(e.method));

const ready = entries.filter((e) => e.start_url);
const notReady = entries.filter((e) => !e.start_url);

console.log(`${entries.length} matching entries: ${ready.length} have steps, ${notReady.length} don't yet.`);
if (notReady.length) console.log('  No steps yet (skipped):', notReady.map((e) => e.id).join(', '));

// ---------- validate steps ----------
const STEP_KEYS = ['goto', 'click', 'hover', 'fill', 'press', 'wait', 'wait_for', 'scroll_to', 'wait_for_hidden'];
const problems = [];
for (const e of ready) {
  for (const [i, s] of (e.steps || []).entries()) {
    const keys = Object.keys(s).filter((k) => !['allow_unsafe', 'note', 'optional'].includes(k));
    if (keys.length !== 1 || !STEP_KEYS.includes(keys[0])) problems.push(`${e.id} step ${i + 1}: expected one of ${STEP_KEYS.join(', ')}`);
    if (s.press === 'Enter' && e.method !== 'ai-reply') problems.push(`${e.id} step ${i + 1}: Enter is only allowed for ai-reply entries`);
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
    await locate(page, s.wait_for, vars).waitFor({ state: 'visible', timeout: e.method === 'ai-reply' ? 180000 : 20000 });
  } else if (s.wait_for_hidden !== undefined) {
    await locate(page, s.wait_for_hidden, vars).waitFor({ state: 'hidden', timeout: e.method === 'ai-reply' ? 180000 : 20000 });
  } else if (s.scroll_to !== undefined) {
    await locate(page, s.scroll_to, vars).scrollIntoViewIfNeeded();
    await settle();
  }
}

async function shoot(e, file) {
  const mask = (e.mask || []).map((t) => locate(page, t, vars));
  const opts = { path: file, animations: 'disabled', caret: 'hide', mask };
  if (e.capture === 'element') {
    const loc = locate(page, e.selector, vars);
    await loc.waitFor({ state: 'visible', timeout: 15000 });
    await loc.scrollIntoViewIfNeeded();
    const pad = e.padding ?? 8;
    const box = await loc.boundingBox();
    if (!box) throw new Error(`Element not on screen: ${describe(e.selector)}`);
    const vp = page.viewportSize();
    const x = Math.max(0, box.x - pad), y = Math.max(0, box.y - pad);
    await page.screenshot({ ...opts, clip: { x, y, width: Math.min(vp.width - x, box.width + pad * 2), height: Math.min(vp.height - y, box.height + pad * 2) } });
  } else if (e.capture === 'clip') {
    await page.screenshot({ ...opts, clip: e.clip });
  } else {
    await page.screenshot({ ...opts, fullPage: e.capture === 'full_page' });
  }
}

const results = [];
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
    results.push({ e, ok: true });
    console.log('ok');
  } catch (err) {
    const msg = String(err.message || err).split('\n')[0];
    results.push({ e, ok: false, error: msg });
    console.log('FAILED — ' + msg);
    await page.screenshot({ path: path.join(runDir, `failed-${e.id}.png`) }).catch(() => {});
    if (msg.startsWith('STOP') || msg.startsWith('Signed out')) break;
  }
  // Leave any open dialog or menu without saving.
  await page.keyboard.press('Escape').catch(() => {});
}
await browser.close();

// ---------- results + preview page ----------
fs.writeFileSync(path.join(runDir, 'results.json'), JSON.stringify(results.map(({ e, ok, error }) => ({ id: e.id, image: e.image, ok, error })), null, 1));
const previewFile = buildPreview(runDir);

const failed = results.filter((r) => !r.ok).length;
console.log(`\n${results.length - failed} captured, ${failed} failed.`);
console.log(`Review: ${path.relative(process.cwd(), previewFile)} (opening it now)`);
if (process.platform === 'darwin') execFile('open', [previewFile]);
console.log(`Then:   npm run apply -- ${run}`);
