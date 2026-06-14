#!/usr/bin/env python3
"""Laedt Original-Fotos von zauberer-liar.de aus dem Wayback-Archiv (GitHub-Runner).
Wenig Parallelitaet (3) + Backoff-Retry gegen archive.org-Drosselung (429/503).
Schreibt manifest.json + _debug.txt (Log zum lokalen Nachlesen)."""
import os, re, json, time, unicodedata
import requests
from concurrent.futures import ThreadPoolExecutor

ARC = "https://web.archive.org/web/2025id_/https://zauberer-liar.de/"
OUT = os.path.join("site", "assets", "img")
os.makedirs(OUT, exist_ok=True)
LOG = []
def log(m):
    print(m); LOG.append(str(m))

PAGES = {
    "firmenfeier":"galerie/firmenfeier/","musical":"galerie/musical/",
    "galadinner":"galerie/galadinner/","junggesellen":"galerie/junggesellenabschied/",
    "geburtstag":"galerie/private-geburtstagsfeier/","kinder":"galerie/fotogalerie-kinderzauberei/",
    "hero":"","closeup":"close-up-aus-frankreich/","standup":"stand-up-aus-frankreich/",
    "show":"stand-up-aus-frankreich/zaubershow-nrw/","vita":"referenzen-zauberer-zauberkunstler-nrw/uber-mich/",
}
HEADERS = {"User-Agent":"Mozilla/5.0 (compatible; foto-fetch)"}
IMG_RE = re.compile(r"https?://zauberer-liar\.de/wp-content/uploads/[^\s\"'\\)]+?\.(?:jpg|jpeg|png)", re.I)
SKIP = re.compile(r"logo|icon|favicon|-\d+x\d+\.", re.I)

def slug(url, cat):
    base = re.sub(r"\.(jpe?g|png)$","",url.split("/")[-1],flags=re.I)
    ext = "png" if url.lower().endswith(".png") else "jpg"
    base = unicodedata.normalize("NFKD",base).encode("ascii","ignore").decode().lower()
    base = re.sub(r"[^a-z0-9]+","-",base).strip("-")
    base = re.sub(r"-?(scaled|web|e\d{6,})$","",base)
    return f"{cat}-{base}.{ext}"

def get(url, timeout=18):
    delay = 1.5
    for attempt in range(5):
        try:
            r = requests.get(url, headers=HEADERS, timeout=timeout)
            if r.status_code == 200:
                return r
            if r.status_code in (429, 503, 520, 522):
                time.sleep(delay); delay *= 1.8; continue
            return r  # anderer Fehler -> aufgeben
        except Exception:
            time.sleep(delay); delay *= 1.8
    return None

# 1) SEITEN seriell scannen (schonend)
jobs, seen = [], set()
for cat, path in PAGES.items():
    r = get(ARC + path, timeout=25)
    if not r or r.status_code != 200:
        log(f"SCAN-FEHLER {cat}: {r.status_code if r else 'none'}"); continue
    urls = sorted({m.group(0) for m in IMG_RE.finditer(r.text) if not SKIP.search(m.group(0))})
    log(f"{cat}: {len(urls)} URLs")
    for iu in urls:
        n = slug(iu, cat)
        if n in seen: continue
        seen.add(n)
        jobs.append((n, cat, "https://web.archive.org/web/2025id_/" + iu))
    time.sleep(0.5)

log(f"\n{len(jobs)} Bilder zu laden ...\n")

# 2) Bilder mit geringer Parallelitaet (3) laden
manifest = {}
def dl(job):
    name, cat, url = job
    r = get(url, timeout=20)
    if not r or r.status_code != 200 or len(r.content) < 2500:
        return name, None, (r.status_code if r else 0)
    with open(os.path.join(OUT, name), "wb") as f:
        f.write(r.content)
    return name, cat, len(r.content)

with ThreadPoolExecutor(max_workers=3) as ex:
    for name, cat, info in ex.map(dl, jobs):
        if cat:
            manifest[name] = cat; log(f"OK  {name}  {info//1024} KB")
        else:
            log(f"FEHLER {name} (status/size {info})")

with open(os.path.join(OUT, "manifest.json"), "w", encoding="utf-8") as f:
    json.dump(manifest, f, ensure_ascii=False, indent=1)
log(f"\nGESAMT: {len(manifest)} / {len(jobs)} Fotos")
with open(os.path.join(OUT, "_debug.txt"), "w", encoding="utf-8") as f:
    f.write("\n".join(LOG))
