# Screenshot tool

Tooling for recapturing the help site's screenshots from the dev app. Not part of the published site (listed in `.mintignore`).

## Running it (on your Mac, in Terminal)

One-time setup (needs Node.js 18 or newer; the folder's `.nvmrc` pins Node 24 for nvm):

```
cd ~/Documents/GitHub/docs/screenshot-tool
npm run setup
```

If you use nvm, run `nvm use` first in each new Terminal window.

Each session:

1. `npm run capture` — captures every screenshot that's set up, across all areas. A browser window opens on the dev sign-in page. Sign in yourself and switch to the workspace named in `config.yaml` (Demo Workspace). Captures then start in that window; leave it alone until it closes.
   - `--area vaults,assistant` for just some areas, `--id a,b` for specific screenshots.
   - `--include-kept` also recaptures screenshots marked keep-current (useful after a redesign).
   - `--with-ai` also runs screenshots that send chat messages (uses credits). They're left out of full runs otherwise; `--id` always includes them.
   - `--dry-run` checks the manifest without opening a browser.
2. The preview page opens automatically. Screenshots that look different from the current image are listed first; ones with no visible change (less than 0.5% of pixels differ) are folded away at the bottom. To reopen it later: `npm run preview` (latest run) or `npm run preview -- <run>`.
3. `npm run apply -- <run>` copies the changed images into `images/`, skipping ones with no visible change. Use `--only id1,id2` or `--skip id3` to pick, or `--all` to include unchanged ones. Then review and commit in git as usual.

Safety:

- Nothing about your sign-in is saved. Each run uses a fresh, temporary browser profile that is discarded when the window closes, so you sign in every time.
- The script stops if the header shows any workspace or vault listed under `forbidden_*` in `config.yaml`, or anything other than `workspace_name`.
- It refuses to click buttons that save, send or delete (Save, Publish, Delete, Deactivate, Send, Create Vault and similar). Every capture ends with Escape, without saving.
- New images go to `output/` first; nothing in `images/` changes until you run `apply`.
- Data watch: `watch` in `config.yaml` lists values that must not change (Providers 40's field count, Patient Records' table list). They're read at the start and after each related screenshot; if one changes, the run stops and says which screenshot did it.

## Files

- `manifest.yaml` — one entry per screenshot: which articles use it, how it can be captured (`method`), and, once filled in, where to go in the app (`start_url`, `steps`, `selector`). The capture script reads this.
- `inventory.csv` — the same list as a spreadsheet, for reviewing and tracking.
- `extract_images.py` and `build_manifest.py` — regenerate the two files above after adding or removing images in articles.

## Regenerating the inventory

From the repo root:

```
python3 screenshot-tool/extract_images.py . /tmp/inv.json
python3 screenshot-tool/build_manifest.py /tmp/inv.json screenshot-tool
```

This overwrites `manifest.yaml`, including any `start_url`, `steps` and `selector` values. Once those are filled in, merge new entries in by hand instead of regenerating.

## Capture methods

| Method | What it means |
|---|---|
| `auto` | Open a page and capture it |
| `interactive` | Click into a state (dialog, menu, form), capture, then close without saving |
| `needs-test-data` | Scriptable once the QA workspace has the listed data set up |
| `ai-reply` | Send a prompt, wait for the reply, capture; reply wording varies, so review it |
| `manual` | Third-party window, email, live/timing state, or would create real records |

The method for each image is a first pass based on its file name, alt text and article. Check it when filling in the steps.
