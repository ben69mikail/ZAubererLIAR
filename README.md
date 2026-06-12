# Zauberer LIAR – Website

Statische, schnelle Website (HTML/CSS/JS) für **zauberer-liar.de** – der Relaunch der WordPress-Seite.
Repo: https://github.com/ben69mikail/ZAubererLIAR

## Struktur

```
site/                     ← der eigentliche Website-Ordner (wird deployed)
  index.html              Startseite
  close-up-zauberer.html  Close-up / Tischzauberei / Walk-Act
  buehnenshow.html        Zaubershow für Erwachsene
  kinderzauberer.html     Kinderzauberer (wärmerer Look)
  kontakt.html            Kontaktformular (Web3Forms)
  impressum.html · datenschutz.html · agb.html
  assets/style.css        gemeinsames Design-System
  assets/app.js           Interaktion + Cookie-Consent + GA4
  robots.txt · sitemap.xml · .htaccess (301-Redirects, Caching, Security)
.github/workflows/deploy.yml  Auto-Deploy auf IONOS bei jedem Push
```

## Vor dem Live-Gang noch eintragen

1. **Google Analytics:** in `site/assets/app.js` die `GA_ID` (`G-XXXXXXXXXX`) durch die echte GA4-Measurement-ID ersetzen.
2. **Kontaktformular:** in `site/kontakt.html` den `access_key` (`DEIN-WEB3FORMS-KEY`) durch den kostenlosen Schlüssel von [web3forms.com](https://web3forms.com) ersetzen.
3. **Impressum/Datenschutz/AGB:** Vorlagen rechtlich prüfen lassen, USt-Angabe ergänzen.

## Deployment (GitHub Actions → IONOS)

Bei jedem Push auf `main` lädt der Workflow den Ordner `site/` per FTPS auf den IONOS-Webspace.
Dafür im GitHub-Repo unter **Settings → Secrets and variables → Actions** anlegen:

| Secret | Wert |
|---|---|
| `IONOS_FTP_SERVER` | FTP-Hostname von IONOS |
| `IONOS_FTP_USER` | FTP-Benutzername |
| `IONOS_FTP_PASSWORD` | FTP-Passwort |
| `IONOS_SERVER_DIR` | Zielverzeichnis (z. B. `/`) |

Die Zugangsdaten liegen im Projekt „Homepage LIAR".

## Lokal testen

Einfach `site/index.html` im Browser öffnen (bzw. über die Vorschau).

## SEO-Loop nach Live-Gang

- Sitemap in der Google Search Console einreichen (`https://zauberer-liar.de/sitemap.xml`)
- GA4 verifizieren
- monatlich Search Console auswerten, Texte für „Zauberer" / „Kinderzauberer" nachschärfen
- später: lokale Stadt-Landingpages ergänzen
