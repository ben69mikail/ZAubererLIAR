# DEPLOY & PUSH — Handover für zauberer-liar.de

> **Zweck:** Alles, was eine neue Session/ein neuer Chat braucht, um Änderungen an der
> Live-Site **zauberer-liar.de** sicher zu committen, zu deployen und zu verifizieren —
> inkl. der in früheren Sessions schmerzhaft gelernten Fehler (nicht erneut versuchen).
> **Stand:** 2026-06-25 · Repo `ben69mikail/ZAubererLIAR` (Branch `main`).

---

## 1. Repo & Live (Grundlagen)

- **Repo:** `ben69mikail/ZAubererLIAR`, Branch **`main`**
- **Live-URL:** https://zauberer-liar.de
- **Lokaler Pfad (Windows):** `C:\Users\ben_m\Claude\projects\Homepage Zauberer LIAR\Homepage ZAuberer LIAR`
- **Nur der Ordner `site/` geht live.** Alles außerhalb `site/` (Docs, `.github/`, `seo-reports/`) ist NICHT auf der Live-Site.

---

## 2. Wie deployed wird (automatisch)

- **Jeder Push auf `main`** triggert `.github/workflows/deploy.yml` → lädt `site/*` + `site/.htaccess`
  per **SFTP auf IONOS** (Zielordner **`zaubererNEU`** = Domain-Wurzel von zauberer-liar.de).
- **Dauer:** ~40–60 s nach Push. In der Praxis nach Commit **~60–90 s warten**, dann verifizieren.
- GitHub-Secrets (gesetzt, nicht im Repo): `IONOS_SFTP_HOST`, `IONOS_SFTP_USER`, `IONOS_SFTP_PASS`.
- Deploy **löscht keine** Remote-Dateien (nur Upload/Überschreiben).

---

## 3. WIE COMMITTEN — verbindliche Methode (WICHTIG)

**IMMER über die GitHub-MCP-Tools committen, NICHT über lokales `git push`:**

- **Einzeldatei:** `mcp__plugin_everything-claude-code_github__create_or_update_file`
  - Parameter: `owner=ben69mikail`, `repo=ZAubererLIAR`, `path=site/<datei>`, `branch=main`,
    `sha`=**aktueller sha der Datei** (vorher via `get_file_contents` holen!), `content`, `message`
- **Mehrere Dateien in EINEM Commit/Deploy:** `mcp__plugin_everything-claude-code_github__push_files`
- **Vor jedem Update den frischen `sha` holen** (`get_file_contents`), sonst Konflikt.
- Tools ggf. erst laden via `ToolSearch`:
  `select:mcp__plugin_everything-claude-code_github__get_file_contents,mcp__plugin_everything-claude-code_github__create_or_update_file,mcp__plugin_everything-claude-code_github__push_files`

**Warum NICHT lokal `git push`:**
- Der gemountete Repo-Ordner hat **keine Git-Credentials** → `git push` scheitert
  ("could not read Username for https://github.com").
- Der Mount erlaubt **kein `git unlink`** → `git checkout` / `stash` / `rebase` schlagen fehl
  ("unable to unlink, Operation not permitted").

Commit-Identität (Referenz): `user.name="Michael (LIAR)"`, `user.email="benmikail69@googlemail.com"`.

---

## 4. Cache-Busting (NUR bei CSS/JS-Änderungen)

- HTML ist per `.htaccess` **`no-cache`** → HTML-/Meta-/Schema-Änderungen sind **sofort** sichtbar,
  KEINE Versionsanhebung nötig.
- **Nur** wenn `site/assets/style.css` oder `site/assets/app.js` geändert wird:
  `?v=N` in ALLEN HTML hochzählen (aktueller Stand: **`?v=13`**; Stadtseiten zusätzlich `antigravity.js?v=5`).

---

## 5. Verifizieren nach Deploy (immer!)

- ~60–90 s warten, dann mit Cache-Buster prüfen:
  - Status: `curl -s -o /dev/null -w "%{http_code}" "https://zauberer-liar.de/<pfad>?cb=$RANDOM"`
  - Redirect: `curl -s -o /dev/null -w "%{http_code} -> %{redirect_url}" "https://zauberer-liar.de/<altpfad>"`
- **Sandbox-Hinweis:** `sleep` max ~45 s pro Bash-Call (sonst Timeout) → in 2 Schritten warten.

---

## 6. `.htaccess` — KRITISCH, nicht kaputt machen

Aktueller, getesteter Zustand:
- `Options -MultiViews` aktiv (sonst 404 bei Verzeichnis-URLs vor den Regeln).
- **Alle Redirects nutzen `RewriteRule` (mod_rewrite) mit `^...$`-Ankern**, NICHT `Redirect`/`RedirectMatch`
  (mod_alias hängt Restpfade an / greift auf IONOS zu spät → Trailing-Slash-404).
- **Extensionless-Routing funktioniert auf IONOS NICHT** (weder `%{DOCUMENT_ROOT}/$1.html -f` noch
  `%{REQUEST_FILENAME}.html -f`). Getestet, wieder entfernt — NICHT erneut versuchen (alle internen Links
  + Sitemap nutzen ohnehin `.html`).
- **Catch-all-Fallback** am Ende: unbekannte Pfade (`!-f !-d`, kein Asset, keine bekannte Endung) →
  301 `/index.html` statt 404.
- **Bei jeder .htaccess-Änderung danach JEDE alte URL live als 301 testen.**

### Alte URL -> neue Zielseite (alle live als 301 verifiziert)
| Alte URL | Ziel |
|---|---|
| `/kontakt/` | `/kontakt.html` |
| `/close-up-aus-frankreich/` (+ Unterpfade) | `/close-up-zauberer.html` (tisch/walk-act auf eigene Seiten) |
| `/stand-up-aus-frankreich/` | `/buehnenshow.html` |
| `/stand-up-aus-frankreich/kinderzauberer/...` | `/kinderzauberer.html` |
| `/stand-up-aus-frankreich/zaubershow-nrw/` | `/zaubershow-erwachsene.html` |
| `/galerie/*` | `/fotogalerie.html` |
| `/videogalerie/*` | `/videogalerie.html` |
| `/referenzen-zauberer-zauberkunstler-nrw/*` | `/referenzen.html` |
| `/datenschutzerklaerung/` | `/datenschutz.html` |
| `/kontakt/impressum/` | `/impressum.html` |
| `/kontakt/agbs/` | `/agb.html` |
| `?p=NNNN` | `/index.html` |
| `/zauberer-gladbeck/` | `/zauberer-gladbeck.html` |
| `/zauberer-nrw-2/zauberer-in-gelsenkirchen/` | `/zauberer-gelsenkirchen.html` |
| `/zauberer-nrw-2/zauberer-fur-essen-und-umgebung/` | `/zauberer-essen.html` |
| `/zauberer-nrw-2(/.*)?` (Rest) | `/index.html` |

---

## 7. Struktur von `site/`

**15 Kern-HTML:** index, close-up-zauberer, buehnenshow, kinderzauberer, tisch-zauberer,
walk-act-zauberer, zaubershow-erwachsene, fotogalerie, videogalerie, referenzen, kontakt,
danke, impressum, datenschutz, agb.

**14 Stadtseiten** (`zauberer-<stadt>.html`): gladbeck (Heimatstadt, Top-Prio), essen,
gelsenkirchen, bottrop, duisburg, marl, oberhausen, herne, herten, recklinghausen, wesel,
haltern, dinslaken, dorsten.

**Assets:** `assets/style.css`, `assets/app.js`, `assets/antigravity.js`, `assets/three.min.js`,
`assets/img/` (WebP + `manifest.json`), `.htaccess`, `robots.txt`, `sitemap.xml`.

---

## 8. Inhaltliche Regeln (verbindlich — vom Inhaber)

- **NUR echte Inhalte** — nichts erfinden. Abgleichquelle: liar-entertainer.com.
- **KEINE neuen Preise / keine neuen Leistungen.** Kindergeburtstag-Pakete fix: **150 € / 170 € / 210 €**.
  Erwachsenen-/Bühnenshows ohne Preis ("auf Anfrage").
- **Bei NEUEN Unterseiten (auch stadtbezogen), größeren Content-Erweiterungen oder neuen Bildern:
  ERST Inhaber (Michael) informieren/freigeben.** Kleine Meta-/Schema-/Alt-/Title-Anpassungen +
  Pflege bestehender Seiten direkt erlaubt.
- **Stammdaten:** Michaël Prescler, Beethovenstr. 15, 45966 Gladbeck · Tel 0172-1517578 ·
  info@liar-entertainer.com · Finanzamt Marl · KEINE USt-Nummer.
- **Social:** facebook.com/clownzaubererliar · instagram clown_zauberer_liar ·
  youtube.com/user/benmikail/videos · 5★ Google/Facebook/Yelp.
- **Fokus-Keywords:** Zauberer · Kinderzauberer · Zaubershow (sekundär Close-up, Stand-up, Tischzauberei,
  Walk-Act, Zauberer Gladbeck/Gelsenkirchen/NRW).

---

## 9. Integrationen / Konfiguration

- **GA4:** `G-ERW1J6LF5D` (consent-gated). GA4-Property-ID: `343380769`.
- **Google Search Console:** Property `sc-domain:zauberer-liar.de` (per Claude-in-Chrome, eingeloggt).
- **Kontaktformular:** Web3Forms (Key in `site/kontakt.html`), Erfolgsseite `danke.html`.
- **Kein kostenloser GSC/GA-MCP-Connector** — Statistik über Claude-in-Chrome (Browser) auslesen.

---

## 10. Laufender SEO-Task

- **`zauberer-liar-seo-daily`** (täglich 08:18, bis 2026-08-16): GSC-datenbasiert; nutzt den
  **`seo-content`-Skill** bei Stadtseiten-Verbesserung (E-E-A-T, Location-Page-Tiefe 500–600 Wörter,
  Doorway-Check >75% Wortüberlappung, AI-Citation). Max. 2 Commits/Tag, Bericht → `seo-reports/zl-YYYY-MM-DD.md`.
  → Einmal "Scheduled → Jetzt ausführen" klicken für Browser-/Skill-Freigaben.
- Plan-Dokument: `GSC-SEO-PLAN-60-TAGE.md` (Repo-Root, Start 2026-06-16, Ende 2026-08-16).
- **Andere Tasks NICHT stören** (betreffen liar-entertainer.com / pantomime-la-france.eu):
  `liar-seo-wellen-autopilot` (06:33), `pantomime-la-france-seo-daily` (07:04).

---

## 11. Was NICHT funktioniert hat (nicht erneut versuchen)

- **Lokales `git push`** im Mount — keine Credentials. → immer GitHub-MCP.
- **`git checkout` / `stash` / `rebase`** im Mount — "unable to unlink".
- **Extensionless-Routing in .htaccess auf IONOS** — beide Varianten greifen nicht. Entfernt.
- **`Redirect`/`RedirectMatch` (mod_alias)** für alte URLs — Restpfad-Anhängung / Trailing-Slash-404.
- **`zauberer-liar.eu`** existiert nicht (NXDOMAIN) — nicht dorthin umleiten.
- **`sleep 75` in einem Bash-Call** — Timeout bei 45 s. → mehrstufig warten.

---

## 12. Exact Next Step bei Fortsetzung

1. Frische SHAs holen: `get_file_contents` (owner `ben69mikail`, repo `ZAubererLIAR`, z.B. `site/`).
2. Änderung vorbereiten/validieren (z.B. JSON-LD-Check), dann via `create_or_update_file` / `push_files`
   auf `main` committen (mit frischem `sha`).
3. ~60–90 s warten, dann mit `curl ...?cb=$RANDOM` HTTP 200 + Änderung live verifizieren.
4. Bei `.htaccess`-Änderungen: ALLE alten URLs erneut als 301 durchtesten.
5. Bei Bedarf in GSC (Claude-in-Chrome) Indexierung der geänderten/neuen URLs anfordern.
