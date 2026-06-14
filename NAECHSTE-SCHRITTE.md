# Status zauberer-liar.de — LIVE 🎉 (Stand 12.06.2026)

## ✅ Fertig & live
- **Neue Seite live** unter https://www.zauberer-liar.de (Design v2 „Salon Parisien")
- **Deploy-Pipeline** läuft: jeder Push auf `main` → GitHub Actions → SFTP nach IONOS-Ordner `zaubererNEU`
- **Domain** zeigt auf Ordner `zaubererNEU`; altes WordPress liegt unangetastet im alten Ordner (jederzeit zurückschaltbar)
- **.htaccess aktiv**: HTTPS + non-www erzwungen, 301-Redirects alte→neue URLs, Caching, GZIP, Security-Header
- **GA4** `G-ERW1J6LF5D` eingebaut (lädt nur nach Cookie-Zustimmung)
- **GSC** Property zauberer-liar.de + Sitemap eingereicht
- **URL-Konsistenz** Canonical/Sitemap/Schema = echte `.html`-URLs (kein 404-Mismatch)
- 9 Seiten geprüft, 301-Redirect getestet (`/datenschutzerklaerung/` → `/datenschutz.html` ✅)

## 🔴 Noch offen — brauche ich von dir

### 1. Web3Forms-Key (Kontaktformular)
Ohne Key zeigt das Kontaktformular einen Fehler.
- Kostenlos auf web3forms.com mit info@liar-entertainer.com einen Access-Key holen
- Mir den Key geben → ich trage ihn in `site/kontakt.html` ein und deploye

### 2. 301-Redirect-Mapping prüfen (SEO-Ranking-Erhalt)
Die `.htaccess` leitet alte WordPress-URLs auf die neuen Seiten um. Die hinterlegten alten Pfade
(z. B. `/close-up-aus-frankreich/`) stammen aus einer früheren Annahme. Falls Google andere alte
URLs indexiert hat (in GSC unter „Seiten" sichtbar), gib mir die Liste → ich ergänze die Redirects,
damit kein Ranking verloren geht.

## Nächste SEO-Schritte (mache ich auf Zuruf)
- GSC: Indexierung der Kernseiten anstoßen, Sitemap-Status nach 1–2 Tagen prüfen
- Monatlicher SEO-Loop „Zauberer"/„Kinderzauberer" als geplante Aufgabe (analog liar-daily-seo-autopilot)
- Optional: Impressum/Datenschutz/AGB rechtlich prüfen lassen, USt-Angabe ergänzen
