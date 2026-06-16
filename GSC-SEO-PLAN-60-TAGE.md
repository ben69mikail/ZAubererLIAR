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
