#!/usr/bin/env python3
"""Holt Original-Fotos GEZIELT aus /zauberer-nrw/wp-content/uploads/ per SFTP.
Kein Server-Scan - nur dieser eine bekannte Pfad. Secrets als ENV.
Laedt alle jpg/png (keine WordPress-Thumbnails), benennt SEO-freundlich,
schreibt manifest.json (Dateiname -> Originalpfad-Hinweis) + _debug.txt."""
import os, re, posixpath, json
import paramiko

HOST = os.environ["IONOS_SFTP_HOST"]
USER = os.environ["IONOS_SFTP_USER"]
PASS = os.environ["IONOS_SFTP_PASS"]
SRC  = "/zauberer-nrw/wp-content/uploads"
OUT  = os.path.join("site", "assets", "img")
os.makedirs(OUT, exist_ok=True)
LOG = []
def log(m): print(m, flush=True); LOG.append(str(m))

# WordPress erzeugt Groessenvarianten wie -300x200 / -scaled -> nur Originale
SKIP = re.compile(r"-\d+x\d+\.|logo|favicon|icon|cropped-cropped", re.I)
IMG  = re.compile(r"\.(jpe?g|png)$", re.I)

t = paramiko.Transport((HOST, 22)); t.connect(username=USER, password=PASS)
sftp = paramiko.SFTPClient.from_transport(t)
log(f"verbunden {HOST}, Quelle {SRC}")

seen, manifest = set(), {}
def slug(fn):
    base = re.sub(r"\.(jpe?g|png)$", "", fn, flags=re.I).lower()
    base = base.replace("ä","ae").replace("ö","oe").replace("ü","ue").replace("ß","ss")
    base = re.sub(r"[^a-z0-9]+", "-", base).strip("-")
    base = re.sub(r"-?(scaled|e\d{6,})$", "", base)
    ext = "png" if fn.lower().endswith(".png") else "jpg"
    n = f"{base}.{ext}"; i = 2
    while n in seen: n = f"{base}-{i}.{ext}"; i += 1
    seen.add(n); return n

def pull(path, depth=0):
    if depth > 8: return
    try: entries = sftp.listdir_attr(path)
    except Exception as ex: log(f"listdir {path}: {ex}"); return
    for e in entries:
        full = posixpath.join(path, e.filename)
        if e.st_mode and (e.st_mode & 0o40000):
            pull(full, depth + 1)
        elif IMG.search(e.filename) and not SKIP.search(e.filename) and (e.st_size or 0) > 6000:
            name = slug(e.filename)
            try:
                sftp.get(full, os.path.join(OUT, name))
                manifest[name] = full.replace(SRC, "")
                log(f"OK  {name}  {e.st_size//1024} KB")
            except Exception as ex:
                log(f"FEHLER {e.filename}: {ex}")

pull(SRC)
sftp.close(); t.close()
with open(os.path.join(OUT, "manifest.json"), "w", encoding="utf-8") as f:
    json.dump(manifest, f, ensure_ascii=False, indent=1)
log(f"\nGESAMT: {len(manifest)} Fotos")
with open(os.path.join(OUT, "_debug.txt"), "w", encoding="utf-8") as f:
    f.write("\n".join(LOG))
