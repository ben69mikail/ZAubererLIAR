# Cowork-Briefing — zauberer-liar.de

Self-contained Übergabe. Stand: 2026-06-17, HEAD `3f7aae4`. Damit kann Cowork ohne Rückfragen weitermachen.

## 1. Was ist das
Statische Website (HTML/CSS/JS, kein Framework) für **Zauberer LIAR / Michaël Prescler** (Zauberer, Kinderzauberer, Gladbeck NRW).
- **Live:** https://zauberer-liar.de
- **Repo:** https://github.com/ben69mikail/ZAubererLIAR (Branch `main`)
- **Lokaler Pfad:** `C:\Users\ben_m\Claude\projects\Homepage Zauberer LIAR\Homepage ZAuberer LIAR`

## 2. Struktur (nur `site/` geht live)
```
site/
  *.html              # 15 Seiten (index, close-up-zauberer, buehnenshow, kinderzauberer,
                      #   tisch-zauberer, walk-act-zauberer, zaubershow-erwachsene,
                      #   fotogalerie, videogalerie, referenzen, kontakt, danke,
                      #   impressum, datenschutz, agb)
  assets/style.css    # gesamtes Design (Theme „Nuit Magique": dunkel #0a0c14 + Gold #c9a14e)
  assets/app.js       # Sterne, Lightbox, Galerie-Filter, Cookie-Consent, Counter
  assets/img/         # 80 WebP (Fotos + Logo + yt-Thumbnails); manifest.json = name→Kategorie
  .htaccess           # HTTPS+www→non-www, 301-Redirects alt→neu, Caching, GZIP, Security-Header
GSC-SEO-PLAN-60-TAGE.md   # 60-Tage-SEO-Plan (vom Scheduled-Task genutzt)
seo-reports/              # Tagesberichte des SEO-Tasks
README.md
.github/workflows/deploy.yml
```
Alles außerhalb `site/` (Docs, Workflow) ist **nicht** auf der Live-Site.

## 3. Deploy (WICHTIG)
- Jeder **Push auf `main`** triggert `.github/workflows/deploy.yml` → lädt `site/*` + `site/.htaccess` per SFTP auf IONOS-Ordner **`zaubererNEU`** (= Zielverzeichnis von zauberer-liar.de).
- Dauer ~40–60 s nach Push. Verifizieren: Live-URL mit Cache-Buster `?cb=<random>` abrufen.
- GitHub-Secrets (Werte nicht im Repo): `IONOS_SFTP_HOST`, `IONOS_SFTP_USER`, `IONOS_SFTP_PASS`. Sind gesetzt.
- Deploy löscht KEINE Remote-Dateien (nur Upload/Überschreiben).

## 4. Commit/Push-Konventionen (verbindlich)
- Commit-Identität: `git -c user.name="Michael (LIAR)" -c user.email="benmikail69@googlemail.com"`.
- **Push immer im Vordergrund** und danach prüfen `git rev-parse HEAD == git rev-parse origin/main`. (Hintergrund-Pushes sind hier schon mehrfach still fehlgeschlagen.) PowerShell-Exit 255 bei `git push` ist nur stderr-Rauschen, kein Fehler, wenn remote aktualisiert.
- **Cache-Busting:** Bei JEDER Änderung an `style.css` oder `app.js` die Version `?v=N` in ALLEN 15 HTML hochzählen (aktuell **`?v=11`**). HTML selbst ist `no-cache` (per .htaccess), zeigt Änderungen sofort.
- Strg+F5 nötig nur bei CSS/JS-Versionssprung.

## 5. Inhaltliche Regeln (verbindlich)
- **Nur echte Inhalte** (Karpathy): nichts erfinden. Reale Fakten/Orte/Leistungen.
- **KEINE neuen Preise / keine neuen Leistungen** hinzufügen.
- Texte dürfen erweitert/verbessert werden (SEO), Quelle zum Abgleich: liar-entertainer.com.
- Sprache: Deutsch (außer Code).
- **Preise (fix, Kindergeburtstag):** Zaubershow 150 € (40 Min) · +Ballons 170 € (55 Min) · Komplett-Paket 210 € (90 Min, „Beliebteste"). zzgl. 0,40 €/km ab Gladbeck. Erwachsenen-/Bühnenshows nur auf Anfrage (kein Preis).
- **Echte Daten:** Michaël Prescler, Beethovenstr. 15, 45966 Gladbeck · Tel 0172-1517578 · info@liar-entertainer.com · Finanzamt Marl · KEINE USt-Nummer.
- **Social/Bewertungen:** facebook.com/clownzaubererliar · instagram clown_zauberer_liar · youtube.com/user/benmikail/videos · 5★ Google/Facebook/Yelp.

## 6. Konfiguration / Integrationen
- **GA4:** `G-ERW1J6LF5D` (consent-gated über Cookie-Banner, lädt erst nach Zustimmung).
- **Kontaktformular:** Web3Forms (Key liegt in `site/kontakt.html`), Erfolgsseite `danke.html`.
- **Videos:** click-to-load über youtube-nocookie (DSGVO, kein Request vor Klick). Lokale Vorschau `yt-*.webp`. IDs: Imagefilm `Bu0SE4lqAlo`, Musical `7IBST16fHc4`, Stand-up `L6V-rBow5hg`, Kinder `Cop0SqRIX4Y`.
- **SEO:** GSC-Property + sitemap.xml (.html-URLs) eingereicht. Hauptkeywords: **Zauberer, Kinderzauberer, Zaubershow**; sekundär Close-up, Stand-up, Tischzauberei.

## 7. Bereits erledigt (Highlights)
- Komplett-Relaunch (WordPress→statisch), Design „Nuit Magique", 80 kuratierte Fotos.
- Menüstruktur, Liquid-Glass-Karten, animierter Sternenhimmel + bewegte Farb-Aurora (Header + global, mit Farb-Fade) gegen „zu dunkel".
- Galerie symmetrisch (4:3 grid), Lightbox, Kategorie-Filter; Startseite-Vorschau Reihe 2 = Zaubershow · Musical · Private Feier.
- Kinderzauberer: 3 Preispakete sichtbar, Flyer-Bild voll lesbar.
- Footer Impressum·Datenschutz·AGB nebeneinander; Rechtsseiten mit echten Daten gefüllt (USt entfernt).
- **SEO-Pass:** 124 unikale Alt-Texte, Keyword-Titel/Meta, Schema (LocalBusiness+EntertainmentBusiness, sameAs, Person, Service+BreadcrumbList auf Service-Seiten), Content vertieft.
- **Repo aufgeräumt:** obsoleter fetch-fotos-Workflow + Orphan flyer-bg.webp + veraltete Planungs-Docs entfernt.

## 8. Laufender Automatik-Task
- Scheduled Task **`gsc-seo-60-tage`** (lokal, `~/.claude/scheduled-tasks/`): täglich 07:32 bis **2026-08-16**, macht GSC-gestützte SEO-Verbesserung nach `GSC-SEO-PLAN-60-TAGE.md`, committet/pusht, schreibt `seo-reports/gsc-YYYY-MM-DD.md`. Läuft bereits (Lauf 1 = commit `3f7aae4`). Cowork sollte sich damit nicht überschneiden — wenn parallel gearbeitet wird, vorher `git pull`.

## 9. Footguns / Vorsicht
- **Build-Skripte** im ELTERN-Ordner (`C:\Users\ben_m\Claude\projects\Homepage Zauberer LIAR\*.py`, `dl-fotos.ps1`): `bau_*.py`/`patch_*.py` generieren/überschreiben HTML komplett. **NICHT laufen lassen** — sie clobbern die manuellen SEO/Design-Edits. Site wird jetzt von Hand gepflegt.
- **git-History ~262 MiB** (Foto-Originale in History). Klonen ist schwer; bei Bedarf `git clone --depth 1`. History-Shrink (filter-repo + force-push) wurde bewusst NICHT gemacht.
- Vor Edits an `style.css`/`app.js`: Versionsnummer in allen HTML mitziehen (Punkt 4).

## 10. Schnellstart für Cowork
1. `git clone --depth 1 https://github.com/ben69mikail/ZAubererLIAR.git`
2. Änderungen NUR in `site/` (bzw. Docs im Root).
3. Lokal testen: `python -m http.server 8000 --directory site` → http://localhost:8000
4. Commit mit der Identität aus Punkt 4, Push auf `main` (Vordergrund, sync prüfen) → Auto-Deploy.
5. Live verifizieren mit `?cb=<random>`.
