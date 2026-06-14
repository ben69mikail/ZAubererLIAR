#!/usr/bin/env python3
"""Laedt die Original-Fotos von zauberer-liar.de aus dem Wayback-Archiv.
Laeuft auf dem GitHub-Runner (hat Zugriff auf web.archive.org, anders als lokale CLI).
Scrapt die Galerie- und Hauptseiten, laedt alle Fotos nach site/assets/img/,
schreibt manifest.json (Dateiname -> Kategorie) fuer den spaeteren Galerie-Aufbau.
"""
import os, re, json, time, unicodedata
import requests

ARC = "https://web.archive.org/web/2025id_/https://zauberer-liar.de/"
OUT = os.path.join("site", "assets", "img")
os.makedirs(OUT, exist_ok=True)

PAGES = {
    "firmenfeier":   "galerie/firmenfeier/",
    "musical":       "galerie/musical/",
    "galadinner":    "galerie/galadinner/",
    "junggesellen":  "galerie/junggesellenabschied/",
    "geburtstag":    "galerie/private-geburtstagsfeier/",
    "kinder":        "galerie/fotogalerie-kinderzauberei/",
    "hero":          "",
    "closeup":       "close-up-aus-frankreich/",
    "standup":       "stand-up-aus-frankreich/",
    "show":          "stand-up-aus-frankreich/zaubershow-nrw/",
    "vita":          "referenzen-zauberer-zauberkunstler-nrw/uber-mich/",
}

HEADERS = {"User-Agent": "Mozilla/5.0 (foto-fetch bot)"}
IMG_RE = re.compile(
    r"https?://zauberer-liar\.de/wp-content/uploads/[^\s\"'\\)]+?\.(?:jpg|jpeg|png)",
    re.IGNORECASE)
SKIP = re.compile(r"logo|icon|favicon|-\d+x\d+\.", re.IGNORECASE)

def slug(url: str, cat: str) -> str:
    base = url.split("/")[-1]
    base = re.sub(r"\.(jpe?g|png)$", "", base, flags=re.I)
    ext = "png" if url.lower().endswith(".png") else "jpg"
    base = unicodedata.normalize("NFKD", base).encode("ascii", "ignore").decode()
    base = base.lower()
    base = re.sub(r"[^a-z0-9]+", "-", base).strip("-")
    base = re.sub(r"-?(scaled|web|e\d{6,})$", "", base)
    return f"{cat}-{base}.{ext}"

def get(url, **kw):
    for attempt in range(4):
        try:
            return requests.get(url, headers=HEADERS, timeout=60, **kw)
        except Exception as e:
            print(f"  retry {attempt+1} {url} ({e})")
            time.sleep(3 * (attempt + 1))
    return None

manifest = {}
seen = set()
for cat, path in PAGES.items():
    r = get(ARC + path)
    if not r or r.status_code != 200:
        print(f"SEITE FEHLER {cat}: {r.status_code if r else 'no response'}")
        continue
    urls = sorted({m.group(0) for m in IMG_RE.finditer(r.text) if not SKIP.search(m.group(0))})
    print(f"{cat}: {len(urls)} Bild-URLs")
    for iu in urls:
        name = slug(iu, cat)
        if name in seen:
            continue
        seen.add(name)
        dest = os.path.join(OUT, name)
        ir = get(ARC.replace("https://zauberer-liar.de/", "") + iu) \
             if iu.startswith("http") else None
        # archive download URL = ARC prefix + original image URL
        dl = "https://web.archive.org/web/2025id_/" + iu
        ir = get(dl)
        if not ir or ir.status_code != 200 or len(ir.content) < 2500:
            print(f"  FEHLER {name}: {ir.status_code if ir else 'none'} "
                  f"({len(ir.content) if ir else 0} B)")
            continue
        with open(dest, "wb") as f:
            f.write(ir.content)
        manifest[name] = cat
        print(f"  OK {name}  {len(ir.content)//1024} KB")
        time.sleep(0.3)

with open(os.path.join(OUT, "manifest.json"), "w", encoding="utf-8") as f:
    json.dump(manifest, f, ensure_ascii=False, indent=1)
print(f"\nGESAMT: {len(manifest)} Fotos -> {OUT}")
