#!/usr/bin/env python3
"""Laedt Original-Fotos von zauberer-liar.de aus dem Wayback-Archiv (GitHub-Runner).
Trick: gerenderte Wayback-Seiten (ohne id_) referenzieren Bilder als vollstaendige
Archiv-URLs MIT Timestamp (+im_). Die laden direkt ueber CDN, ohne Redirect-Drosselung.
Schreibt manifest.json + _debug.txt."""
import os, re, json, time, unicodedata
import requests
from concurrent.futures import ThreadPoolExecutor

RENDER = "https://web.archive.org/web/2025/https://zauberer-liar.de/"
OUT = os.path.join("site", "assets", "img")
os.makedirs(OUT, exist_ok=True)
LOG = []
def log(m): print(m); LOG.append(str(m))

PAGES = {
    "firmenfeier":"galerie/firmenfeier/","musical":"galerie/musical/",
    "galadinner":"galerie/galadinner/","junggesellen":"galerie/junggesellenabschied/",
    "geburtstag":"galerie/private-geburtstagsfeier/","kinder":"galerie/fotogalerie-kinderzauberei/",
    "hero":"","closeup":"close-up-aus-frankreich/","standup":"stand-up-aus-frankreich/",
    "show":"stand-up-aus-frankreich/zaubershow-nrw/","vita":"referenzen-zauberer-zauberkunstler-nrw/uber-mich/",
}
HEADERS = {"User-Agent":"Mozilla/5.0 (compatible; foto-fetch)"}
# vollstaendige ODER relative Archiv-URLs auf wp-content/uploads-Bilder
ARCIMG_RE = re.compile(
    r"(?:https://web\.archive\.org)?/web/\d+[a-z_]*/https?://zauberer-liar\.de/wp-content/uploads/[^\s\"'\\)]+?\.(?:jpg|jpeg|png)", re.I)
SKIP = re.compile(r"logo|icon|favicon|-\d+x\d+\.", re.I)

def slug(arc_url, cat):
    orig = arc_url.split("/wp-content/uploads/")[-1]
    base = re.sub(r"\.(jpe?g|png)$","",orig.split("/")[-1],flags=re.I)
    ext = "png" if orig.lower().endswith(".png") else "jpg"
    base = unicodedata.normalize("NFKD",base).encode("ascii","ignore").decode().lower()
    base = re.sub(r"[^a-z0-9]+","-",base).strip("-")
    base = re.sub(r"-?(scaled|web|e\d{6,})$","",base)
    return f"{cat}-{base}.{ext}"

def absol(u):
    return u if u.startswith("http") else "https://web.archive.org" + u

def get(url, timeout=20):
    delay = 1.2
    for _ in range(4):
        try:
            r = requests.get(url, headers=HEADERS, timeout=timeout)
            if r.status_code == 200: return r
            if r.status_code in (429,503,520,522): time.sleep(delay); delay*=1.7; continue
            return r
        except Exception:
            time.sleep(delay); delay*=1.7
    return None

# 1) Render-Seiten scannen -> fertige Archiv-Bild-URLs (mit Timestamp)
jobs, seen = [], set()
for cat, path in PAGES.items():
    r = get(RENDER + path, timeout=30)
    if not r or r.status_code != 200:
        log(f"SCAN-FEHLER {cat}: {r.status_code if r else 'none'}"); continue
    found = {}
    for m in ARCIMG_RE.finditer(r.text):
        u = m.group(0)
        if SKIP.search(u): continue
        # force image-Variante im_ fuer Direktauslieferung
        u = re.sub(r"(/web/\d+)[a-z_]*/", r"\1im_/", absol(u))
        key = u.split("/wp-content/uploads/")[-1]
        found[key] = u
    log(f"{cat}: {len(found)} Bild-URLs")
    for key, u in found.items():
        n = slug(u, cat)
        if n in seen: continue
        seen.add(n); jobs.append((n, cat, u))
    time.sleep(0.4)

log(f"\n{len(jobs)} Bilder zu laden ...\n")

# 2) Download (3 parallel)
manifest = {}
def dl(job):
    name, cat, url = job
    r = get(url, timeout=25)
    if not r or r.status_code != 200 or len(r.content) < 2500:
        return name, None, (r.status_code if r else 0)
    with open(os.path.join(OUT, name), "wb") as f: f.write(r.content)
    return name, cat, len(r.content)

with ThreadPoolExecutor(max_workers=3) as ex:
    for name, cat, info in ex.map(dl, jobs):
        if cat: manifest[name]=cat; log(f"OK  {name}  {info//1024} KB")
        else: log(f"FEHLER {name} ({info})")

with open(os.path.join(OUT,"manifest.json"),"w",encoding="utf-8") as f:
    json.dump(manifest,f,ensure_ascii=False,indent=1)
log(f"\nGESAMT: {len(manifest)} / {len(jobs)} Fotos")
with open(os.path.join(OUT,"_debug.txt"),"w",encoding="utf-8") as f:
    f.write("\n".join(LOG))
