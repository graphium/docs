// Shared helpers for capture.mjs and apply.mjs.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import YAML from 'yaml';

export const TOOL_DIR = path.dirname(fileURLToPath(import.meta.url));
export const REPO_DIR = path.resolve(TOOL_DIR, '..');
export const OUTPUT_DIR = path.join(TOOL_DIR, 'output');

export function loadConfig() {
  return YAML.parse(fs.readFileSync(path.join(TOOL_DIR, 'config.yaml'), 'utf8'));
}

export function loadManifest() {
  return YAML.parse(fs.readFileSync(path.join(TOOL_DIR, 'manifest.yaml'), 'utf8'));
}

// Replace {{name}} with config vars.
export function fill(str, vars) {
  if (typeof str !== 'string') return str;
  return str.replace(/\{\{(\w+)\}\}/g, (_, k) => {
    if (!(k in vars)) throw new Error(`Unknown variable {{${k}}} — add it under vars in config.yaml`);
    if (vars[k] === null || vars[k] === '') throw new Error(`Fill in {{${k}}} under vars in config.yaml`);
    return String(vars[k]);
  });
}

// Buttons the script must never press: they save, send or delete something.
// A step can override with `allow_unsafe: true`, but none should need to.
export const UNSAFE_LABELS = [
  'save', 'save changes', 'save draft', 'publish', 'delete', 'delete vault', 'delete permanently',
  'deactivate', 'deactivate vault', 'deactivate workspace', 'reactivate', 'reactivate vault',
  'submit', 'submit ticket', 'send', 'send invite', 'confirm', 'create vault', 'create', 'create table',
  'remove', 'archive', 'void', 'unvoid', 'approve', 'approve and continue', 'deny', 'add member',
  'disconnect', 'add', 'cancel run', 'run', 'test', 'yes', 'upgrade', 'change plan', 'buy credits', 'generate', 'generate playbook', 'create connection', 'reconnect', 'connect',
];

export function isUnsafeLabel(label) {
  const t = (label || '').replace(/\s+/g, ' ').trim().toLowerCase().replace(/^[+\s]+/, '');
  return UNSAFE_LABELS.includes(t);
}

// Turn a manifest target into a Playwright locator.
//   "css selector"                         -> page.locator(css)
//   { testid: "x" }                        -> getByTestId
//   { role: "button", name: "Create a Vault", exact: true }
//   { text: "Danger Zone", exact: false }
//   { label: "Vault Name" } / { placeholder: "Search…" }
//   { css: "...", has_text: "..." }
//   any of the above + { nth: 0 } or { within: <target> }
export function locate(page, target, vars) {
  if (!target) throw new Error('Missing target');
  if (typeof target === 'string') return page.locator(fill(target, vars)).first();
  let root = target.within ? locate(page, target.within, vars) : page;
  let loc;
  const exact = target.exact ?? false;
  if (target.testid) loc = root.getByTestId(fill(target.testid, vars));
  else if (target.role) loc = root.getByRole(target.role, target.name ? { name: fill(target.name, vars), exact } : {});
  else if (target.label) loc = root.getByLabel(fill(target.label, vars), { exact });
  else if (target.placeholder) loc = root.getByPlaceholder(fill(target.placeholder, vars), { exact });
  else if (target.text) loc = root.getByText(fill(target.text, vars), { exact });
  else if (target.css) loc = root.locator(fill(target.css, vars), target.has_text ? { hasText: fill(target.has_text, vars) } : {});
  else throw new Error(`Unrecognised target: ${JSON.stringify(target)}`);
  return typeof target.nth === 'number' ? loc.nth(target.nth) : loc.first();
}

export function describe(target) {
  return typeof target === 'string' ? target : JSON.stringify(target);
}

// File name used inside a run folder: keeps images from different folders apart.
export function runName(image) {
  return image.replace(/^images\/graphium\//, '').replace(/\//g, '--');
}
