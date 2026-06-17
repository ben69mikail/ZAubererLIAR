# GSC-SEO-Plan – 60 Tage (zauberer-liar.de)

**Start:** 2026-06-16 · **Ende:** 2026-08-16 · **Domain:** https://zauberer-liar.de
**Hauptkeywords:** Zauberer · Kinderzauberer · Zaubershow
**Sekundär:** Close-up · Stand-up · Tischzauberei · Walk-Act · Zauberkünstler NRW/Ruhrgebiet
**Repo:** ben69mikail/ZAubererLIAR (Push auf `main` → Auto-Deploy IONOS)

## Regeln (verbindlich)
- KEINE erfundenen Inhalte (Karpathy): nur reale Fakten, Orte, Leistungen.
- KEINE neuen Preise oder Leistungen hinzufügen. Bestehende Pakete: Kindergeburtstag 150/170/210 €.
- Nur Beschreibungen erweitern, Meta/Alt/Schema/interne Links/Indexierung verbessern.
- Jede Änderung committen (`-c user.name="Michael (LIAR)"`) + pushen → Deploy. HTML ist no-cache.
- Pro Lauf max. 1–2 Seiten tief bearbeiten (Qualität vor Masse), Rest analysieren/loggen.
- Bericht je Lauf nach `seo-reports/gsc-YYYY-MM-DD.md` (im Repo).

## Täglicher Ablauf (jeder Lauf)
1. **GSC-Daten holen** (Search Console, Property zauberer-liar.de): letzte 28 Tage – Top-Queries, Top-Pages, Impressionen/Klicks/CTR/Position. Falls kein API-Zugriff im Lauf: GSC im Browser öffnen (Chrome-MCP) ODER überspringen und mit On-Page-Heuristik weiterarbeiten (im Bericht vermerken).
2. **Chancen identifizieren:**
   - Queries Position 5–20 mit Impressionen aber niedriger CTR → Title/Description/H-Struktur der Zielseite schärfen.
   - Seiten mit Impressionen aber ohne passende Landingpage → bestehende Seite stärken.
   - Indexierungsprobleme (Abdeckung) → beheben, Indexierung beantragen.
3. **Eine konkrete Verbesserung umsetzen** (siehe Wochenplan), committen, pushen.
4. **Indexierung beantragen** für geänderte URLs (GSC URL-Prüfung → Indexierung anfordern), sofern Zugriff.
5. **Bericht schreiben** (Was analysiert, was geändert, nächster Schritt).
6. Nach dem **2026-08-16**: nichts mehr ändern, nur „Plan abgeschlossen" loggen (Task danach deaktivieren).

## Offene Aufgaben / Backlog (in jedem Lauf prüfen, bis erledigt)
- [ ] **GSC-Sitemap-Recrawl prüfen** (angelegt 2026-06-17). In GSC → Sitemaps wird `sitemap.xml` noch mit **242 „erkannte Seiten"** (alter WordPress-Stand, zuletzt gelesen 15.06.2026) geführt, obwohl die **live ausgelieferte `site/sitemap.xml` nur 24 URLs** enthält (11 Service-Seiten + 13 neue Stadtseiten, Stand 2026-06-18). Aufgabe: bei jedem Lauf in GSC → Sitemaps den Status/„zuletzt gelesen"-Datum und die „erkannte Seiten"-Zahl prüfen. Sobald Google die Sitemap neu eingelesen hat, sollte die Zahl auf ~24 fallen. Falls nach ~7–10 Tagen weiterhin 242: Sitemap in GSC entfernen und `https://zauberer-liar.de/sitemap.xml` neu einreichen (Eingabefeld erwartet nur den Pfad `sitemap.xml`, NICHT die volle URL). Außerdem klären, ob noch ein altes `sitemap_index.xml` (ebenfalls in GSC eingereicht, 242 Seiten) auf nicht mehr existierende WordPress-URLs verweist — ggf. entfernen. **Erledigt-Kriterium:** GSC zeigt für die aktive Sitemap ~24 erkannte Seiten, 0 Fehler.
- [ ] **Neue Stadtseiten indexieren** (angelegt 2026-06-17). 13 neue `zauberer-STADT.html` sind live; nur `zauberer-essen.html` wurde direkt zur Indexierung beantragt. In Folgeläufen je 1–2 weitere Stadtseiten via GSC URL-Prüfung → „Indexierung beantragen" anstoßen (Reihenfolge nach Impressionspotenzial: gelsenkirchen, oberhausen, recklinghausen, duisburg, herne, herten, marl, dorsten, bottrop, dinslaken, haltern, wesel). Danach Position/CTR der neuen URLs beobachten.
- [ ] **Wesel-Framing vom Inhaber freigeben lassen.** `zauberer-wesel.html` ist als „erweitertes Einsatzgebiet / auf Anfrage" formuliert (Wesel ist auf liar-entertainer.com NICHT als Auftrittsort belegt). Falls der Inhaber dort regelmäßig auftritt: in reguläres Gebiet umformulieren.

## Wochenplan (Schwerpunkte)
- **Woche 1 (Tag 1–7) – Fundament & Crawl:** sitemap.xml prüfen/aktualisieren, robots.txt, alle Seiten in GSC einreichen, Indexierungsstatus je URL prüfen, Canonicals checken. interne Verlinkung Hauptkeywords.
- **Woche 2 (8–14) – Titles/Descriptions:** je Tag 1–2 Seiten: Title ≤60 Zeichen + Description ≤155 mit Keyword + Ort + CTA. Gegen GSC-CTR priorisieren.
- **Woche 3 (15–21) – Content-Tiefe Kinderzauberer-Cluster:** kinderzauberer.html + Kindergeburtstag-Begriffe (Kita, Schulfest, Stadtfest) natürlich vertiefen, FAQ-Antworten erweitern (ohne neue Preise).
- **Woche 4 (22–28) – Close-up/Tischzauberei-Cluster:** close-up-zauberer.html, tisch-zauberer.html, walk-act-zauberer.html: Ortsbezug (Düsseldorf, Dortmund, Essen, Mülheim) + Anlässe vertiefen.
- **Woche 5 (29–35) – Stand-up/Zaubershow-Cluster:** buehnenshow.html, zaubershow-erwachsene.html: Firmenfeier/Gala/Hochzeit + Zaubershow-Begriffe.
- **Woche 6 (36–42) – Schema & GEO:** JSON-LD prüfen/erweitern (Service, FAQPage nur für LLM-Zitierbarkeit, Person, BreadcrumbList), llms.txt anlegen, Brand-Mentions.
- **Woche 7 (43–49) – Bilder/CWV:** Alt-Texte feinjustieren, Bildgrößen/`width`/`height`/lazy prüfen, Core Web Vitals (LCP/INP/CLS) gegen PageSpeed checken.
- **Woche 8 (50–56) – Lokale Signale:** NAP-Konsistenz, GBP-Bezug, Referenzen/Bewertungen-Seite stärken, Ortsseiten-Begriffe.
- **Tag 57–60 – Feinschliff & Review:** GSC-Veränderung (Position/CTR) gegen Start vergleichen, Restpunkte abarbeiten, Abschlussbericht.

## Erfolgskriterien (gegen Start messen)
- Mehr indexierte Seiten (GSC-Abdeckung), 0 kritische Fehler.
- Durchschnittsposition Hauptkeywords verbessert; CTR der Top-Seiten gestiegen.
- Alle Seiten: unikale Title/Description/H1, valides Schema, beschreibende Alt-Texte.

## Zustand bei Plan-Start (Baseline 2026-06-16)
- Alt-Texte: 124 unikal aus Dateinamen.
- Schema: index (LocalBusiness+EntertainmentBusiness, sameAs, Person), Service+Breadcrumb auf 5 Service-Seiten, Service auf kinderzauberer, ItemList Video/Foto.
- Titles/Descriptions: alle Seiten gesetzt, index auf Hauptkeywords optimiert.
