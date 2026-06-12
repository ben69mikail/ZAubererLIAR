# Masterplan: Relaunch zauberer-liar.de

**Ziel:** Die bestehende WordPress-Seite klonen, technisch + optisch + inhaltlich verbessern, als schnelle statische Seite neu bauen, auf IONOS deployen und dauerhaft für die Keywords **„Zauberer"** und **„Kinderzauberer"** (Fokus NRW/Ruhrgebiet) nach oben bringen — analog zur bereits gut platzierten Seite layer-entertainer.com.

**Erstellt:** 11.06.2026
**Entscheidungen (vom Nutzer bestätigt):**
- Tech-Stack: **Statisches HTML/CSS/JS** (kein WordPress, keine Datenbank)
- Pflege: **Claude/Cowork pflegt Inhalte** (du sagst, was geändert werden soll → Push → live)
- Deployment: **GitHub Actions → Auto-Deploy auf IONOS** (per SFTP)
- GitHub-Repo: **https://github.com/ben69mikail/ZAubererLIAR**
- layer-entertainer.com = dein bereits gut rankendes Vorbild für Struktur/SEO/Analytics

---

## 1. Ausgangslage (Ist-Analyse der aktuellen Seite)

**Technik:** WordPress + Theme „EmpowerWP", Google Site Kit, klassisches Cookie-Plugin (Opt-out statt DSGVO-konformem Opt-in).

**Inhaltliche Stärken (bleiben erhalten):**
- Klare Positionierung: französischer Zauberer, NRW/Ruhrgebiet, seit 2010, 500+ Auftritte
- Drei Kernangebote: Close-up, Stand-up/Bühne, Kinderzauberer
- Echte 5-Sterne-Bewertungen (Google, Facebook, Yelp)
- FAQ mit Preisen, Kontaktdaten, Social Links

**Schwächen (werden behoben):**
- **Text-Fehler/Lücken:** mehrere abgeschnittene Sätze und fehlende Wörter (z. B. „Als französischer verbinde ich…", „– – Ich bewege mich…", doppelte Bewertungstexte). Wirkt unprofessionell und schadet SEO.
- **SEO:** Keyword „Kinderzauberer" nur schwach platziert; Titel/H1 auf „französischer Zauberer" optimiert statt auf die volumenstarken Begriffe „Zauberer NRW" / „Kinderzauberer NRW".
- **Performance:** WordPress + Theme + Plugins = langsame Ladezeit, viele unoptimierte Bilder (`/wp-content/uploads/`), Render-blocking.
- **Cookie-Banner:** nicht DSGVO-konform (nur „durch weitere Nutzung stimmen Sie zu" = unzulässig). Braucht echtes Opt-in.
- **Struktur:** tiefe Verschachtelung, teils Karteileichen-URLs („…-before-import").
- **Kein strukturiertes Markup** (Schema.org) für lokale Geschäfts-/Event-Rankings.

---

## 2. Zielbild der neuen Seite

**Eine schnelle, statische Single-/Multi-Page-Site** mit:
- Sauberer Seitenstruktur (siehe §3)
- Modernem, eleganten Design (französischer Charme: dunkel/edel + Akzentfarbe, große Bühnenfotos, klare CTAs „Jetzt anfragen")
- Vollständiger On-Page-SEO (Titles, Meta, H-Struktur, Alt-Texte, interne Links, Schema.org `LocalBusiness` + `Person` + `FAQPage` + `Review`)
- DSGVO-konformem Cookie-Consent (Opt-in, Analytics erst nach Zustimmung)
- Google Analytics 4 + Google Search Console + Google Tag Manager (consent-gesteuert)
- Mobil-optimiert, Core Web Vitals „grün"
- Kontaktformular (das ohne eigenen Server funktioniert, z. B. über Formspree/Web3Forms oder IONOS-Mailskript)

---

## 3. Neue Seitenstruktur (SEO-optimiert)

```
/                          → Startseite (Haupt-Keyword: "Zauberer NRW / Ruhrgebiet")
/kinderzauberer/           → eigene starke Landingpage (Keyword: "Kinderzauberer NRW")
/close-up-zauberer/        → Tischzauberei & Walk Act
/buehnenshow/              → Stand-up Zaubershow für Erwachsene
/firmenevents/             → Firmenfeiern, Galas, Messen
/hochzeit/                 → Zauberer für Hochzeit
/galerie/                  → Foto- + Videogalerie (zusammengeführt)
/referenzen/               → Bewertungen, Zeitungsartikel, Vita
/kontakt/                  → Formular + Telefon + Anfahrt
/impressum/  /datenschutz/ /agb/   → Rechtliches
```

Jede Stadt-Landingpage (Gladbeck, Essen, Bochum, Bottrop, Recklinghausen, Düsseldorf …) wird optional als eigene SEO-Seite ergänzt (Phase 2), um lokal zu ranken — genau wie es bei layer-entertainer.com funktioniert.

---

## 4. Aufgabenteilung: Cowork ↔ Claude Code

> **Grundprinzip:** **Cowork denkt & plant** (Analyse, Inhalte, SEO-Strategie, Texte, Bild-Konzept, Qualitätskontrolle). **Claude Code baut & deployt** (Code schreiben, Repo, GitHub, IONOS, Automatisierung).

### Cowork (dieses Tool hier) übernimmt:
| Aufgabe | Ergebnis |
|---|---|
| Vollständige Analyse der alten Seite (alle Unterseiten crawlen) | Inhalts-Inventar |
| Konkurrenz-/Keyword-Analyse für „Zauberer", „Kinderzauberer" + Städte | Keyword-Map |
| Alle Texte neu schreiben (fehlerfrei, SEO-optimiert, mit Keywords) | Fertige Seitentexte |
| Meta-Titles & -Descriptions je Seite | SEO-Tabelle |
| Bild-Inventar + Alt-Texte + Optimierungsliste | Bild-Plan |
| Design-Briefing (Farben, Typo, Layout, Referenz layer-entertainer) | Design-Spec |
| Schema.org-Daten zusammenstellen (Adresse, Öffnungszeiten, Preise, FAQ) | Strukturierte Daten |
| Qualitätskontrolle der gebauten Seite (Korrekturlesen, Check) | Review-Report |

### Claude Code übernimmt (technische Umsetzung):
| Aufgabe | Ergebnis |
|---|---|
| Statische Seite bauen (HTML/CSS/JS aus Coworks Texten + Design-Spec) | Quellcode |
| Bilder herunterladen, komprimieren (WebP), responsive einbinden | Optimierte Assets |
| Cookie-Consent + GA4 + GTM + GSC einbauen (consent-gesteuert) | Tracking-Setup |
| Kontaktformular einrichten | Funktionierendes Formular |
| Neues GitHub-Repository anlegen + Code pushen | Repo |
| GitHub Actions Workflow für Auto-Deploy auf IONOS (SFTP) einrichten | CI/CD-Pipeline |
| Erstes Deployment auf IONOS Webspace | Live-Seite |
| 301-Weiterleitungen alte→neue URLs (`.htaccess`) | Kein Ranking-Verlust |
| `sitemap.xml` + `robots.txt` generieren | Crawl-Steuerung |

> **Hinweis zur Realität:** Cowork und Claude Code teilen sich denselben Projektordner und dasselbe GitHub. Praktisch heißt das: Cowork (hier) kann viele dieser „Claude-Code"-Schritte ebenfalls direkt ausführen (Code schreiben, GitHub pushen, Dateien anlegen). Die Trennung ist v. a. eine **Rollen-Trennung**: Strategie/Inhalt vs. Build/Deploy. Du kannst alles in Cowork machen lassen oder die Build-Schritte bewusst in Claude Code ausführen.

---

## 5. Phasenplan (Schritt für Schritt)

### Phase 0 — Vorbereitung & Zugänge (du + Cowork)
**Was du bereitstellen musst:**
- [ ] GitHub-Account (Repo legt Claude an)
- [ ] IONOS-Zugang: **SFTP-Hostname, Benutzername, Passwort** + Zielverzeichnis des Webspace
- [ ] Soll die neue Seite auf **dieselbe Domain** (zauberer-liar.de) oder zuerst auf eine Test-Subdomain (z. B. neu.zauberer-liar.de)? → **Empfehlung: erst Test-Subdomain, dann Umschalten.**
- [ ] Google-Account für Analytics + Search Console (hast du via layer-entertainer schon)
- [ ] Logo + ggf. Original-Bilder in hoher Auflösung (sonst werden die von der Live-Seite gezogen)

### Phase 1 — Analyse & Inhalte (Cowork)
1. Alle Unterseiten von zauberer-liar.de crawlen und Inhalte sichern
2. Keyword-Recherche „Zauberer NRW", „Kinderzauberer NRW" + Städte
3. Alle Texte neu & fehlerfrei schreiben, SEO-optimiert
4. Meta-Tabelle (Title/Description/H1 je Seite)
5. Design-Spec erstellen (Vorbild: layer-entertainer.com)
→ **Ergebnis:** Komplettes Content- & SEO-Paket als Dateien im Projektordner

### Phase 2 — Bau der Seite (Claude Code / Cowork)
6. Projektgerüst anlegen (Ordnerstruktur, Build-Setup)
7. Alle Seiten als statisches HTML bauen
8. Design umsetzen (responsive, modern, schnell)
9. Bilder optimieren (WebP, lazy-load)
10. Schema.org-Markup einbauen
11. DSGVO-Cookie-Consent + GA4 + GTM einbauen
12. Kontaktformular
13. sitemap.xml, robots.txt, .htaccess (301-Redirects)
→ **Ergebnis:** Fertige Seite lokal/in Vorschau testbar

### Phase 3 — Qualitätskontrolle (Cowork)
14. Korrekturlesen aller Texte
15. Mobile-/Desktop-Check, Ladezeit-Check (PageSpeed)
16. SEO-Check (Titles, Alt-Texte, Links, Markup validieren)
17. Cookie-/Datenschutz-Check
→ **Ergebnis:** Freigabe oder Korrekturliste

### Phase 4 — GitHub & Deployment (Claude Code)
18. Neues GitHub-Repo anlegen, Code pushen
19. GitHub Actions Workflow (Auto-Deploy auf IONOS per SFTP) einrichten
20. IONOS-Secrets in GitHub hinterlegen
21. Erstes Deployment → Seite live (zuerst Test-Subdomain)
22. Funktionstest live
→ **Ergebnis:** Seite ist online, jeder künftige Push deployt automatisch

### Phase 5 — Domain-Umstellung & SEO-Aktivierung
23. Nach Freigabe: Domain zauberer-liar.de auf neue Seite umstellen
24. 301-Redirects scharf schalten (alte URLs → neue)
25. Google Search Console: neue Sitemap einreichen, Indexierung anstoßen
26. Google Analytics 4 verifizieren (Daten laufen ein)
27. Google Business Profil prüfen/verknüpfen (lokales Ranking)
→ **Ergebnis:** Seite live unter Hauptdomain, Tracking aktiv

### Phase 6 — Laufende SEO-Optimierung (wiederkehrend)
28. **Wöchentlich/monatlich:** Search Console auswerten (welche Keywords ranken, wo Position 5–15 = Quick-Wins)
29. Texte gezielt nachschärfen für „Zauberer" + „Kinderzauberer"
30. Stadt-Landingpages ergänzen (lokales Ranking ausbauen)
31. Neue Bewertungen, Bilder, Referenzen einpflegen (Cowork pflegt)
32. Backlinks/Branchenverzeichnisse (analog layer-entertainer)
→ **Kann als wiederkehrende geplante Aufgabe in Cowork eingerichtet werden** (z. B. monatlicher Search-Console-Report).

---

## 6. SEO-Fokus: „Zauberer" & „Kinderzauberer"

- **Startseite** optimiert auf „Zauberer NRW / Ruhrgebiet" (H1, Title, erste 100 Wörter, interne Links)
- **Eigene Kinderzauberer-Landingpage** mit klarem Keyword-Fokus, FAQ, Preisen, lokalen Bezügen — das fehlt aktuell und ist die größte Chance
- **Schema.org** `LocalBusiness`/`Person` mit Adresse Gladbeck → Google versteht lokalen Bezug
- **FAQPage-Markup** → Chance auf Rich Snippets in der Suche
- **Interne Verlinkung** zwischen Themenseiten + ggf. zu layer-entertainer.com (gegenseitige Stärkung)
- **Schnelle Ladezeit** (statisch) → direkter Google-Rankingfaktor (Core Web Vitals)
- **Saubere, fehlerfreie Texte** mit natürlicher Keyword-Dichte

---

## 7. Risiken & Absicherung

| Risiko | Absicherung |
|---|---|
| Ranking-Verlust beim Umzug | Identische/ähnliche URLs + 301-Redirects + Sitemap sofort einreichen |
| Falsche IONOS-Zugangsdaten | Erst Test-Subdomain, Live-Domain erst nach Freigabe |
| Kontaktformular ohne Server | Externer Dienst (Web3Forms/Formspree) oder IONOS-PHP-Mailer |
| DSGVO/Abmahnung | Korrektes Opt-in-Consent, Analytics erst nach Zustimmung, sauberes Impressum/Datenschutz |
| Bildrechte | Nur deine eigenen Bilder verwenden |

---

## 8. Nächster Schritt (sofort startbar)

**Empfohlener Start:** Phase 1 — ich (Cowork) crawle jetzt alle Unterseiten der alten Seite und erstelle das komplette Content- & SEO-Paket. Parallel brauche ich von dir nur die **IONOS-SFTP-Zugangsdaten** und die Antwort auf die **Test-Subdomain-Frage**, bevor wir deployen (Phase 4).

Sag einfach **„Start Phase 1"** — dann lege ich los.
