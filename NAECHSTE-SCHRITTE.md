# Status & letzter Schritt vor Live-Gang (Stand 12.06.2026, nachmittags)

## ✅ Erledigt
- **Design v2 „Salon Parisien"** live im Repo: helles französisches Editorial (Elfenbein/Tinte/Champagner-Gold), Playfair Display + Inter, dunkle Bühnen-Panels für Hero/Finale, warme kinderfreundliche Kinderzauberer-Seite (SVG-Icons statt Emojis)
- **GitHub**: https://github.com/ben69mikail/ZAubererLIAR — alle Commits gepusht
- **GA4**: neue Property „zauberer-liar.de" (Konto wie liar-entertainer.com), Web-Stream `https://www.zauberer-liar.de`, Stream-ID 15062943714, **Mess-ID `G-ERW1J6LF5D`** — bereits in `site/assets/app.js` eingetragen (lädt nur nach Cookie-Zustimmung)
- **GSC**: Domain-Property zauberer-liar.de existierte bereits (gleiches Konto). Neue Sitemap `https://zauberer-liar.de/sitemap.xml` eingereicht — Status wird „Erfolgreich", sobald die neue Seite deployed ist
- Hinweis: Auf der alten WordPress-Seite läuft noch ein Site-Kit-Tag (G-08W3WX75ST) — verschwindet automatisch mit dem Relaunch

## 🔴 Einziger Blocker: IONOS-FTP-Passwort
Das Passwort steht nirgendwo auf dem Rechner (Skripte fragen es immer interaktiv ab), und Claude darf Passwörter grundsätzlich nicht selbst in Felder eintragen.

**Bekannt:** Host `home362401740.1and1-data.host` · User `u62702423` (gleicher Webspace wie liar-entertainer)

**Du musst einmalig 4 Secrets setzen:**
https://github.com/ben69mikail/ZAubererLIAR/settings/secrets/actions → „New repository secret":

| Secret | Wert |
|---|---|
| `IONOS_FTP_SERVER` | `home362401740.1and1-data.host` |
| `IONOS_FTP_USER` | `u62702423` |
| `IONOS_FTP_PASSWORD` | dein FTP-Passwort |
| `IONOS_SERVER_DIR` | Zielordner, z. B. `/zauberer/` (Empfehlung: NEUEN Ordner nehmen, dann im IONOS-Panel die Domain zauberer-liar.de auf diesen Ordner zeigen lassen — so wird WordPress nicht überschrieben und du kannst sofort zurückschalten) |

Danach: Actions-Tab → „Deploy auf IONOS" → „Run workflow" (oder mir Bescheid sagen — ich stoße den Deploy an und verifiziere live).

## Nach Live-Gang (mache ich)
- Live-Check aller Seiten + 301-Redirects
- GSC: Sitemap-Status prüfen, Indexierung der Kernseiten anstoßen
- Monatlicher SEO-Loop „Zauberer"/„Kinderzauberer" als geplante Aufgabe

## Optional (rechtlich empfohlen)
- Impressum/Datenschutz/AGB prüfen lassen, USt-Angabe ergänzen
- Web3Forms-Key für Kontaktformular (kostenlos, web3forms.com) — bis dahin zeigt das Formular eine Fehlermeldung
