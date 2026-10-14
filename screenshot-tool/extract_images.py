"""Inventory every screenshot referenced by the Graphium help site.

Usage: python3 extract_images.py <docs_repo> <out_json>
"""
import json, os, re, sys
from PIL import Image

repo, out = sys.argv[1], sys.argv[2]
docs = json.load(open(os.path.join(repo, "docs.json")))

# page -> nav group
nav = {}
def walk(node, group=None):
    if isinstance(node, dict):
        g = node.get("group", group)
        for p in node.get("pages", []):
            if isinstance(p, str):
                nav[p] = g
            else:
                walk(p, g)
        for k, v in node.items():
            if k not in ("pages",) and isinstance(v, (list, dict)):
                walk(v, g)
    elif isinstance(node, list):
        for n in node:
            walk(n, group)
walk(docs.get("navigation", {}))

IMG = re.compile(r'<img\s+[^>]*src="(/images/[^"]+)"[^>]*?(?:alt="([^"]*)")?[^>]*/?>')
ALT = re.compile(r'alt="([^"]*)"')
HEAD = re.compile(r'^(#{1,4})\s+(.*)')

rows = []
for root, _, files in os.walk(os.path.join(repo, "graphium")):
    for f in sorted(files):
        if not f.endswith(".mdx"):
            continue
        path = os.path.join(root, f)
        rel = os.path.relpath(path, repo)
        page = rel[:-4]
        lines = open(path, encoding="utf-8").read().splitlines()
        title = next((l.split(":", 1)[1].strip().strip('"') for l in lines[:10] if l.startswith("title:")), page)
        heads = {}
        context = []
        for i, line in enumerate(lines):
            m = HEAD.match(line)
            if m:
                lvl = len(m.group(1))
                heads = {k: v for k, v in heads.items() if k < lvl}
                heads[lvl] = m.group(2).strip()
            for im in IMG.finditer(line):
                src = im.group(1)
                a = ALT.search(im.group(0))
                # nearest meaningful prose before the image (skip Frame/Tab tags and blanks)
                ctx = []
                j = i - 1
                while j >= 0 and len(ctx) < 2:
                    t = lines[j].strip()
                    if t and not t.startswith("<") and not t.startswith("{/*") and not HEAD.match(t):
                        ctx.insert(0, t)
                    if HEAD.match(t):
                        break
                    j -= 1
                fs = os.path.join(repo, src.lstrip("/"))
                w = h = kb = None
                if os.path.exists(fs):
                    try:
                        with Image.open(fs) as im2:
                            w, h = im2.size
                    except Exception:
                        pass
                    kb = round(os.path.getsize(fs) / 1024)
                rows.append({
                    "image": src.lstrip("/"),
                    "article": rel,
                    "article_title": title,
                    "nav_group": nav.get(page, "(not in nav)"),
                    "line": i + 1,
                    "section": " > ".join(heads[k] for k in sorted(heads)),
                    "alt": a.group(1) if a else "",
                    "context": " ".join(ctx)[:300],
                    "exists": os.path.exists(fs),
                    "width": w, "height": h, "kb": kb,
                })

# image files on disk that nothing references
referenced = {r["image"] for r in rows}
on_disk = []
for root, _, files in os.walk(os.path.join(repo, "images")):
    for f in files:
        if f.lower().endswith((".png", ".jpg", ".jpeg", ".gif", ".webp")):
            on_disk.append(os.path.relpath(os.path.join(root, f), repo))
unused = sorted(set(on_disk) - referenced)

json.dump({"rows": rows, "unused": unused}, open(out, "w"), indent=1)
print(len(rows), "references;", len(referenced), "unique;", len(unused), "unused files;",
      sum(not r["exists"] for r in rows), "missing")
