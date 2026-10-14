"""Turn inv.json into screenshot-tool/manifest.yaml + inventory.csv.

Usage: python3 build_manifest.py inv.json <out_dir>
"""
import csv, json, os, re, sys, collections
import yaml

inv = json.load(open(sys.argv[1]))
out_dir = sys.argv[2]
os.makedirs(out_dir, exist_ok=True)

# ---- explicit classifications (image stem -> (method, note)) -------------
MANUAL = {
    # third-party windows or other apps
    "pipedream-popup": "Pipedream sign-in window (third-party)",
    "configure-pipedream-sftp": "Pipedream window (third-party)",
    "configure-pipedream-sftp-password": "Pipedream window (third-party)",
    "confirm-pipedream": "Pipedream window (third-party)",
    "sftp-pipedream-successful": "Pipedream window (third-party)",
    "google-auth-popup": "Google sign-in window (third-party)",
    "create-api-key": "Graphium EMR admin screen (separate app)",
    "locate-api-key": "Graphium EMR admin screen (separate app)",
    "copy-api-key": "Graphium EMR admin screen (separate app)",
    "reset-password-email": "Email in an inbox",
    "workspace-invitation-email": "Email in an inbox",
    "reset-password-page": "Needs a one-time reset link from email",
    "assistant-connection-successful": "Only appears right after finishing a third-party sign-in",
    # live / timing-dependent states
    "chat-status-line": "Live state while a reply is running; timing varies",
    "stop-chat-button": "Live state while a reply is running",
    "stop-chat-response": "Needs Stop clicked mid-reply",
    "offline-chat-response": "Needs the network to drop mid-send",
    "playbook-run-running": "Live state while a run is running",
    "test-run-running": "Live state while a run is running",
    "test-run-pending": "Brief state before a run starts",
    "test-playbook": "Live state while a test run is running",
    "cancel-playbook-run": "Needs a run that is still running",
    "testing-connection": "Live state while a connection test runs",
    # would create real records in other systems
    "sales-ticket-response": "Submitting creates a real sales ticket in Zoho",
    "support-ticket-response": "Submitting creates a real support ticket in Zoho",
}
FIXTURE = {  # scriptable once the test workspace has this data set up
    "inactive-assistant-chat": "An archived assistant with an old chat",
    "playbook-review-notification": "A playbook run waiting in Pending Review",
    "resolve-playbook-review": "A playbook run waiting in Pending Review",
    "playbook-run-completed": "A completed playbook run",
    "playbook-run-detail": "A completed playbook run",
    "run-step-outputs": "A completed run with declared step outputs",
    "playbook-run-history": "Completed Manual and Test runs",
    "test-run-completed": "A completed test run",
    "artifact-playbook-step": "A completed run whose step made an artifact",
    "notification-icon": "An unread notification",
    "unread-notification": "An unread notification",
    "pending-workspace-invite": "A pending workspace invitation",
    "connection-activity-log": "A connection with recent activity",
    "connection-event-badges": "A connection with trigger/action/sync/log/error events",
    "sftp-healthy": "A healthy SFTP connection",
    "test-google-sheet": "A healthy Google Sheets connection",
    "test-graphium-emr": "A healthy Graphium EMR connection",
    "connection-limit-reached": "A workspace at its connection limit",
    "plan-upgrade-notice": "A workspace at a plan limit",
    "seat-limit-notice": "A workspace over its seat capacity",
    "reactivate-vault": "A deactivated vault",
    "reactivate-vault-warning": "A deactivated vault",
    "inactive-vaults-toggle": "A deactivated vault",
    "show-voided-records": "A table with voided records",
    "unvoid-record": "A table with voided records",
    "saved-record-filter": "A saved record filter",
    "vault-search-history": "Recent vault searches",
    "allow-column-changes-locked": "A vault with assistant column changes turned off",
    "credit-usage-this-cycle": "Credit usage in the current cycle",
    "total-credit-usage": "Credit usage in the current cycle",
}
AI_OUTPUT = {  # script sends a prompt and waits; reply wording varies, so review each one
    "artifact-from-vault", "artifact-side-panel", "artifact-versions", "assistant-reply-artifact-card",
    "assistant-authorize-connection", "assistant-connection-access", "assistant-enable-connection",
    "create-record-response", "update-record-response", "general-assistant-response",
    "read-only-response", "interact-with-results", "guided-assistant-greeting", "test-assistant-chat",
    "table-changes-proposal", "table-changes-proposal2", "table-changes-result", "table-changes-spreadsheet",
    "help-question-response", "help-source-links", "ai-generate-playbook",
}
LOGGED_OUT = {"sign-in-page", "sign-up-page", "forgot-password-page"}

INTERACTIVE_WORDS = re.compile(
    r"dialog|modal|dropdown|drop-down|menu|popup|pop-up|form|window|panel|step|toggle|"
    r"configuration|typed|warning|editor|open|expanded|selected|filter|sort|property|"
    r"search|rename|archive|create|add |add$|edit|delete|void|invite|change", re.I)

def classify(stem, alt, width):
    if stem in MANUAL:
        return "manual", MANUAL[stem]
    if stem in FIXTURE:
        return "needs-test-data", FIXTURE[stem]
    if stem in AI_OUTPUT:
        return "ai-reply", "Sends a prompt and waits for the reply; check the wording before keeping"
    if stem in LOGGED_OUT:
        return "auto", "Capture while signed out"
    text = f"{stem.replace('-', ' ')} {alt}"
    if INTERACTIVE_WORDS.search(text):
        return "interactive", "Needs clicks to open the right state; closes without saving"
    return "auto", "Open the page and capture"

rows = inv["rows"]
by_img = collections.OrderedDict()
for r in sorted(rows, key=lambda r: r["image"]):
    by_img.setdefault(r["image"], []).append(r)

manifest, csv_rows = [], []
for img, refs in by_img.items():
    first = refs[0]
    stem = os.path.splitext(os.path.basename(img))[0]
    in_nav = [r for r in refs if r["nav_group"] != "(not in nav)"]
    method, note = classify(stem, first["alt"], first["width"])
    status = "capture" if in_nav else "skip (only in articles not in the nav)"
    width = first["width"]
    capture = ("viewport" if (width or 0) >= 1200 else "element") if width else "unknown (new image)"
    entry = {
        "id": stem,
        "image": img,
        "area": img.split("/")[2] if img.count("/") >= 3 else "other",
        "status": status,
        "method": method,
        "method_note": note,
        "capture": capture,
        "current_size": f"{width}x{first['height']}" if width else None,
        "alt": first["alt"],
        "used_in": [{"article": r["article"], "section": r["section"], "line": r["line"]} for r in refs],
        "context": first["context"],
        # filled in when the redesign settles in dev:
        "start_url": None,
        "steps": [],
        "selector": None,
    }
    manifest.append(entry)
    csv_rows.append({
        "image": img, "area": entry["area"], "status": status, "method": method,
        "why / test data needed": note, "capture": capture, "current size": entry["current_size"] or "",
        "articles": "; ".join(sorted({r["article"].replace("graphium/", "") for r in refs})),
        "section": first["section"], "alt": first["alt"],
    })

header = """# Screenshot manifest for the Graphium AI help site.
# One entry per image file. Generated from the .mdx files; regenerate after adding or removing images.
#
# method:
#   auto             open a page and capture it
#   interactive      click into a state (dialog, menu, form), capture, then close without saving
#   needs-test-data  scriptable once the QA workspace has the listed data set up
#   ai-reply         send a prompt, wait for the reply, capture; reply wording varies, so review it
#   manual           third-party window, email, live/timing state, or would create real records
#
# capture: viewport = full window at a fixed size; element = crop to one element (selector)
# start_url / steps / selector are filled in once the redesigned UI is stable in dev.
"""
with open(os.path.join(out_dir, "manifest.yaml"), "w") as f:
    f.write(header)
    yaml.safe_dump(manifest, f, sort_keys=False, allow_unicode=True, width=120)

with open(os.path.join(out_dir, "inventory.csv"), "w", newline="") as f:
    w = csv.DictWriter(f, fieldnames=list(csv_rows[0].keys()))
    w.writeheader()
    w.writerows(csv_rows)

# summary
c = collections.Counter(m["method"] for m in manifest if m["status"] == "capture")
skip = [m["image"] for m in manifest if m["status"] != "capture"]
missing = sorted({r["image"] for r in rows if not r["exists"]})
print("unique:", len(manifest), "to capture:", sum(c.values()), dict(c))
print("skip:", len(skip), skip)
print("missing files:", missing)
print("unused files:", len(inv["unused"]))
print("by area:", dict(collections.Counter(m["area"] for m in manifest if m["status"] == "capture")))
by_area_method = collections.defaultdict(collections.Counter)
for m in manifest:
    if m["status"] == "capture":
        by_area_method[m["area"]][m["method"]] += 1
for a, cc in sorted(by_area_method.items()):
    print(" ", a, dict(cc))
