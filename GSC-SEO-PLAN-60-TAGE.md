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
- **Erkenntnisse immer als Ergänzungen festhalten** (angelegt 2026-06-18, Wunsch Inhaber): Neue Befunde/Lessons-Learned NICHT verwerfen, sondern in Tagesbericht UND hier im Backlog ergänzen, damit sie über self-contained Läufe hinweg erhalten bleiben.

## Lessons Learned / Methodik-Erkenntnisse (in jedem Lauf beachten)
- **Vor Query-Optimierung immer das 301-Ziel der alten Top-URL prüfen** (2026-06-18). „zaubershow nrw" kommt über die alte WP-URL `/stand-up-aus-frankreich/zaubershow-nrw/` → 301 auf `zaubershow-erwachsene.html`, NICHT auf `buehnenshow.html`. Merksatz: erst `curl -sI` der alten Top-URL → Redirect-Ziel → dann entscheiden, welche Seite optimiert wird.
- **Encoding-Check nach jedem MCP-Commit mit deutschem Text** (2026-06-19). Hand-rekonstruierter `content` kann ein Sonderzeichen als U+FFFD korrumpieren. Merksatz: nach dem Push live mit `grep -c` prüfen (muss 0) + Umlaut-Stichprobe. Bei Befund per `python3 .replace(bad,good)` byte-genau reparieren.
- **Deploy-Latenz** (2026-06-21/23/25). Single-Commit ~50–90s bis live (am 2026-06-25: Erst-Check nach 65s noch alte Version, nach +30s live). Verifikation im 30-s-Takt 2–3× wiederholen, bevor „nicht live" gefolgert wird. Mehrere Dateien optional in EINEM `push_files`-Commit bündeln.
- **Stadtseiten-Doorway-Differenzierung mit `seo-content`** (2026-06-23). 14 Stadtseiten teilen Format/Reviews/Region/CTA/FAQ-Gerüst fast wortgleich → Overlap >75 %. Differenzierung: (1) echte recherchierte Stadt-Fakten, (2) eigene „Anlässe in <Stadt>"-Sektion, (3) 4. stadtspezifische FAQ sichtbar + im FAQPage, (4) Gladbeck in Region-Links. Hebt Stadttext über 500–600-Wörter-Floor und Score messbar.
- **Doorway-Auswahl per 5-Gramm-Jaccard-Overlap objektivieren** (2026-06-24). Sichtbaren Text strippen, 5-Wort-Shingles, paarweise Jaccard; höchster Overlap = nächster Kandidat. Erledigt: marl (~37 %), herten (~37 %), **wesel (<46 % zu allen, 2026-06-25)**; offen recklinghausen, dinslaken, dorsten, duisburg, herne, oberhausen, bottrop, haltern.

## Offene Aufgaben / Backlog (in jedem Lauf prüfen, bis erledigt)

> **▶ NÄCHSTER LAUF (ab 2026-06-26):** **(A) Wesel ERLEDIGT 2026-06-25** (Commit `dda4aff`, regularisiert + differenziert, Overlap <50 %, FAQPage 4 Fragen). **(B) FAQPage-Schema auf `index.html` ist jetzt dran (Lauf B)** — Anleitung `seo-reports/anleitung-index-faq-wesel.md` (Aufgabe 1). Danach GSC-Indexierung für `zauberer-wesel.html` beantragen + Doorway-Differenzierung fortsetzen (recklinghausen, dinslaken, dorsten, duisburg, herne, oberhausen, bottrop, haltern). Nach jeder Änderung Standard-Verifikation.
- [x] **GSC-Sitemap-Recrawl ERLEDIGT (2026-06-23).** `sitemap.xml` „Erfolgreich", 25 Seiten, 0 Fehler. Nur noch beiläufig prüfen.
- [ ] **Neue Stadtseiten indexieren** (2026-06-17). Beantragt: essen, gelsenkirchen (23.06.), marl (23.06.), herten (24.06.). **OFFEN: `zauberer-wesel.html` (nach Update 2026-06-25) in GSC einreichen.** Rest: oberhausen, recklinghausen, duisburg, herne, dorsten, bottrop, dinslaken, haltern. GSC-„keine verweisende Sitemap" = Crawl-Lag, kein Defekt.
- [ ] **⭐ Polterabend-/Junggesellenabschied-Seite (freigabepflichtig, HÖCHSTE Priorität).** „zauberer polterabend" = **213 Impr / 0 Klicks** (2026-06-25). Alte URL `/galerie/junggesellenabschied/` → 301 auf `fotogalerie.html` (kein Polterabend-Text). KEINE Anlass-Seite vorhanden. Empfehlung: neue `polterabend-zauberer.html` ODER wahrer Polterabend-Abschnitt auf bestehender Seite (KEINE neuen Preise). Freigabepflichtig → auf Inhaber warten.
- [ ] **FAQPage-Schema auf index.html — ✅ FREIGEGEBEN (2026-06-24), JETZT (Lauf B).** 5 echte Q&As sichtbar, kein FAQPage-JSON-LD. index.html nutzt EIN Einzelobjekt (kein @graph) → FAQPage als ZWEITEN separaten `<script>`-Block vor `</head>`. Anleitung `seo-reports/anleitung-index-faq-wesel.md` → Aufgabe 1. Erledigt: valides FAQPage live (2 Blöcke, 5 Fragen).
- [ ] **Alt-WP-URLs in GSC nur BEOBACHTEN — Redirects sind OK** (2026-06-18). 301-Redirects live + korrekt, keine Equity-Verluste (Crawl-Lag). NICHT eingreifen, .htaccess nicht anfassen. Pro Lauf beobachten. `buehnenshow.html` on-page auf „Zaubershow NRW" geschärft (Commit `bf0ba73`).
- [x] **Wesel als reguläre Stadtseite — ERLEDIGT 2026-06-25 (Commit `dda4aff`).** „auf Anfrage"/„erweitertes Einsatzgebiet" entfernt (grep=0), echte Niederrhein-Fakten (Kreisstadt Kreis Wesel, Hansestadt/1407, Großer Markt + spätgotische Rathausfassade, Willibrordi-Dom, Berliner Tor, Zitadelle Wesel; 5 reale Stadtteile Innenstadt/Feldmark/Fusternberg/Blumenkamp, Obrighoven-Lackhausen/Wittenberg, Flüren/Diersfordt, Büderich/Ginderich, Bislich — WebSearch-geprüft), „Anlässe in Wesel"-Sektion (~170 W), 4. FAQ + FAQPage (`@graph`, 4 Fragen), `areaServed` →„Wesel" (2×), Gladbeck+Bottrop in Region-Links. Doorway-Overlap <50 % (Marl 36,8 %, Herten 37,5 %, Essen/Bottrop/Duisburg ~45 %). Live verifiziert (HTTP 200, 19.017 B, 0 U+FFFD). OFFEN: GSC-Indexierung für `zauberer-wesel.html` beantragen.

## Wochenplan (Schwerpunkte)
- **Woche 1 (1–7) – Fundament & Crawl:** sitemap, robots, GSC einreichen, Indexierungsstatus, Canonicals, interne Verlinkung.
- **Woche 2 (8–14) – Titles/Descriptions:** je Tag 1–2 Seiten, Title ≤60 + Description ≤155 mit Keyword+Ort+CTA, gegen GSC-CTR.
- **Woche 3 (15–21) – Kinderzauberer-Cluster:** kinderzauberer.html + Kindergeburtstag-Begriffe, FAQ erweitern (ohne neue Preise).
- **Woche 4 (22–28) – Close-up/Tischzauberei:** close-up-zauberer, tisch-zauberer, walk-act-zauberer: Ortsbezug + Anlässe.
- **Woche 5 (29–35) – Stand-up/Zaubershow:** buehnenshow, zaubershow-erwachsene: Firmenfeier/Gala/Hochzeit.
- **Woche 6 (36–42) – Schema & GEO:** JSON-LD (Service, FAQPage, Person, BreadcrumbList), llms.txt, Brand-Mentions.
- **Woche 7 (43–49) – Bilder/CWV:** Alt-Texte, Bildgrößen/lazy, Core Web Vitals.
- **Woche 8 (50–56) – Lokale Signale:** NAP, GBP, Referenzen/Bewertungen, Ortsseiten-Begriffe.
- **Tag 57–60 – Feinschliff & Review:** GSC-Veränderung gegen Start, Restpunkte, Abschlussbericht.

## Erfolgskriterien (gegen Start messen)
- Mehr indexierte Seiten, 0 kritische Fehler.
- Durchschnittsposition Hauptkeywords verbessert; CTR der Top-Seiten gestiegen.
- Alle Seiten: unikale Title/Description/H1, valides Schema, beschreibende Alt-Texte.

## Zustand bei Plan-Start (Baseline 2026-06-16)
- Alt-Texte: 124 unikal. Schema: index (LocalBusiness+EntertainmentBusiness, sameAs, Person), Service+Breadcrumb auf 5 Service-Seiten, ItemList Video/Foto. Titles/Descriptions gesetzt.

## Verlauf / umgesetzte Änderungen (Append-Log)
- **2026-06-18** `close-up-zauberer.html`: 4 Twitter-Cards (Commit `3fb4de8`).
- **2026-06-18** `buehnenshow.html`: Description „Zaubershow NRW" geschärft, 4 Twitter-Cards (Commit `bf0ba73`).
- **2026-06-18** 301-Redirects per curl verifiziert (Commit `f54a7c5`).
- **2026-06-19** `index.html`: 4 Twitter-Cards (`ee6d95e`); U+FFFD in keywords korrigiert (`1669b2c`).
- **2026-06-21** `kinderzauberer.html` + `zaubershow-erwachsene.html`: je 4 Twitter-Cards (`af0a483`, `a984b2b`). Alle 6 Service-Hauptseiten haben Twitter-Cards.
- **2026-06-23** `zauberer-marl.html`: Doorway-Differenzierung (Score ~68→~80). Marl-Bezug (Kreis Recklinghausen, Marler Stern, Chemiepark, Stadtteile), „Anlässe in Marl", 4. FAQ + FAQPage, Gladbeck-Links (`72ee4c26`). Live verifiziert. Indexierung marl+gelsenkirchen. Bericht `zl-2026-06-23.md`.
- **2026-06-24** `zauberer-herten.html`: Doorway-Differenzierung (Score ~68→~82; Overlap 57,6→44,5 %). Herten-Bezug (Schloss Herten, Altes Dorf Westerholt, Zeche Ewald, Stadtteile), „Anlässe in Herten", 4. FAQ + FAQPage, Gladbeck-Links (`229a264f`). Live verifiziert. Indexierung herten. Bericht `zl-2026-06-24.md`.
- **2026-06-24 (Planung)** Inhaber-Freigaben: FAQPage auf index.html; Wesel regulär. Anleitung committet (`anleitung-index-faq-wesel.md`, `e4a72bcf`).
- **2026-06-25** `zauberer-wesel.html`: „auf Anfrage"/„erweitertes Einsatzgebiet" → reguläre Stadtseite + Doorway-Differenzierung (Lauf A). WebSearch-geprüfte Fakten (Kreisstadt Kreis Wesel, Hansestadt 1407, Großer Markt + spätgotische Rathausfassade, Willibrordi-Dom, Berliner Tor, Zitadelle Wesel; 5 Stadtteile). „Anlässe in Wesel" (~170 W), 4. FAQ + FAQPage (`@graph`, 4 Fragen), `areaServed`→„Wesel" (2×), Gladbeck+Bottrop in Region-Links (Commit `dda4aff`). Live verifiziert: HTTP 200, 19.017 B, 0 U+FFFD, `grep "auf Anfrage"`=0. Overlap <50 % (Marl 36,8 %, Herten 37,5 %, Essen 45,4 %, Bottrop 45,7 %, Duisburg 45,8 %). GSC: 2.920 Impr / 20 Klicks / CTR 0,7 % / Pos 21,5; „zauberer polterabend" 213 Impr/0 Klicks. OFFEN: Indexierung wesel; Lauf B = FAQPage index.html. Bericht `zl-2026-06-25.md`.
