# Nächste Schritte vor Live-Gang (Stand 12.06.2026)

Code liegt auf GitHub: https://github.com/ben69mikail/ZAubererLIAR
Der Auto-Deploy-Workflow läuft bei jedem Push — **schlägt aber fehl, bis die 4 Secrets gesetzt sind** (Punkt 1).

## 1. IONOS-Secrets in GitHub setzen (Pflicht für Deploy)
Repo → **Settings → Secrets and variables → Actions → New repository secret**:

| Secret | Wert |
|---|---|
| `IONOS_FTP_SERVER` | FTP/SFTP-Hostname aus dem IONOS-Kundenkonto |
| `IONOS_FTP_USER` | FTP-Benutzername |
| `IONOS_FTP_PASSWORD` | FTP-Passwort |
| `IONOS_SERVER_DIR` | Zielverzeichnis, z. B. `/` oder `/zauberer/` |

Empfehlung aus dem Masterplan: zuerst auf Test-Subdomain (z. B. `neu.zauberer-liar.de`) deployen, erst nach Freigabe auf Hauptdomain umstellen.

## 2. Google Analytics 4 (Pflicht für Tracking)
- analytics.google.com → neue Property „zauberer-liar.de" anlegen (gleiches Konto wie liar-entertainer.com)
- Measurement-ID (`G-…`) kopieren
- In `site/assets/app.js` Zeile 30 eintragen (oder mir die ID geben — ich trage sie ein und pushe)

## 3. Web3Forms-Key (Pflicht für Kontaktformular)
- web3forms.com → kostenlosen Access-Key für info@liar-entertainer.com holen
- In `site/kontakt.html` (`access_key`) eintragen (oder mir den Key geben)

## 4. Nach Live-Gang
- Google Search Console: Property `zauberer-liar.de` anlegen, Sitemap `https://zauberer-liar.de/sitemap.xml` einreichen
- 301-Redirects in `.htaccess` sind vorbereitet — greifen beim Umstellen der Hauptdomain
- Monatlicher SEO-Loop (Search Console auswerten, Texte „Zauberer"/„Kinderzauberer" nachschärfen) — kann als geplante Aufgabe eingerichtet werden, analog liar-daily-seo-autopilot

## 5. Optional (rechtlich empfohlen)
- Impressum/Datenschutz/AGB sind Vorlagen — rechtlich prüfen lassen, USt-Angabe ergänzen
