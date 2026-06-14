#!/usr/bin/env python3
"""Laedt Original-Fotos von zauberer-liar.de aus dem Wayback-Archiv (GitHub-Runner).
Sammelt erst alle Bild-URLs, laedt sie dann PARALLEL (ThreadPool) mit kurzen Timeouts.
Teilmenge ist ok - lieber schnell die meisten als ewig auf alle warten.
Schreibt manifest.json (Dateiname -> Kategorie).
"""
import os, re, json, unicodedata
import requests
from concurrent.futures import ThreadPoolExecutor, as_completed

ARC = "https://web.archive.org/web/2025id_/https://zauberer-liar.de/"
OUT = os.path.join("site", "assets", "img")
os.makedirs(OUT, exist_ok=True)

PAGES = {
    "firmenfeier":  "galerie/firmenfeier/",
    "musical":      "galerie/musical/",
    "galadinner":   "galerie/galadinner/",
    "junggesellen": "galerie/junggesellenabschied/",
    "geburtstag":   "galerie/private-geburtstagsfeier/",
    "kinder":       "galerie/fotogalerie-kinderzauberei/",
    "hero":         "",
    "closeup":      "close-up-aus-frankreich/",
    "standup":      "stand-up-aus-frankreich/",
    "show":         "stand-up-aus-frankreich/zaubershow-nrw/",
    "vita":         "referenzen-zauberer-zauberkunstler-nrw/uber-mich/",
}
HEADERS = {"User-Agent": "Mozilla/5.0 (foto-fetch)"}
IMG_RE = re.compile(r"https?://zauberer-liar\.de/wp-content/uploads/[^\s\"'\\)]+?\.(?:jpg|jpeg|png)", re.I)
SKIP = re.compile(r"logo|icon|favicon|-\d+x\d+\.", re.I)
S = requests.Session(); S.headers.update(HEADERS)

def slug(url, cat):
    base = re.sub(r"\.(jpe?g|png)$", "", url.split("/")[-1], flags=re.I)
    ext = "png" if url.lower().endswith(".png") else "jpg"
    base = unicodedata.normalize("NFKD", base).encode("ascii", "ignore").decode().lower()
    base = re.sub(r"[^a-z0-9]+", "-", base).strip("-")
    base = re.sub(r"-?(scaled|web|e\d{6,})$", "", base)
    return f"{cat}-{base}.{ext}"

def fetch(url, timeout, tries=2):
    for _ in range(tries):
        try:
            r = S.get(url, timeout=timeout)
            if r.status_code == 200:
                return r
        except Exception:
            pass
    return None

# 1) URLs sammeln (parallel)
def scan(item):
    cat, path = item
    r = fetch(ARC + path, 25)
    if not r:
        return cat, []
    return cat, sorted({m.group(0) for m in IMG_RE.finditer(r.text) if not SKIP.search(m.group(0))})

jobs = []  # (name, cat, download_url)
seen = set()
with ThreadPoolExecutor(max_workers=8) as ex:
    for cat, urls in ex.map(scan, PAGES.items()):
        print(f"{cat}: {len(urls)} URLs")
        for iu in urls:
            n = slug(iu, cat)
            if n in seen:
                continue
            seen.add(n)
            jobs.append((n, cat, "https://web.archive.org/web/2025id_/" + iu))

print(f"\n{len(jobs)} Bilder zu laden ...\n")

# 2) Bilder parallel laden
manifest = {}
def dl(job):
    name, cat, url = job
    r = fetch(url, 30)
    if not r or len(r.content) < 2500:
        return name, None, (len(r.content) if r else 0)
    with open(os.path.join(OUT, name), "wb") as f:
        f.write(r.content)
    return name, cat, len(r.content)

with ThreadPoolExecutor(max_workers=8) as ex:
    for name, cat, size in ex.map(dl, jobs):
        if cat:
            manifest[name] = cat
            print(f"OK  {name}  {size//1024} KB")
        else:
            print(f"FEHLER {name} ({size} B)")

with open(os.path.join(OUT, "manifest.json"), "w", encoding="utf-8") as f:
    json.dump(manifest, f, ensure_ascii=False, indent=1)
print(f"\nGESAMT: {len(manifest)} / {len(jobs)} -> {OUT}")
