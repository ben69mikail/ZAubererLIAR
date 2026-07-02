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
- **Deploy-Latenz** (2026-06-21…07-02). Single-Commit ~50–110s bis live; am 2026-07-02: erster `?cb=`-Edge-Read noch alt, zweiter Read nach ~95s neu. Verifikation im 30–40-s-Takt 2–3× wiederholen, bevor „nicht live" gefolgert wird. Tipp: `?cb=`-Edge-Reads können kurz alt bleiben — mehrere Reads/frische cb-Werte prüfen.
- **Stadtseiten-Doorway-Differenzierung mit `seo-content`** (2026-06-23). 14 Stadtseiten teilen Format/Reviews/Region/CTA/FAQ-Gerüst fast wortgleich → Overlap >75 %. Differenzierung: (1) echte recherchierte Stadt-Fakten, (2) eigene „Anlässe in <Stadt>"-Sektion, (3) 4. stadtspezifische FAQ sichtbar + im FAQPage, (4) Gladbeck in Region-Links. Hebt Stadttext über 500–600-Wörter-Floor und Score messbar.
- **Doorway-Auswahl per 5-Gramm-Jaccard-Overlap objektivieren** (2026-06-24). Sichtbaren Text strippen, 5-Wort-Shingles, paarweise Jaccard; höchster Overlap = nächster Kandidat. Erledigt: marl (~37 %), herten (~37 %), wesel (<46 %, 2026-06-25), herne (61,5 %→48,2 %, 2026-06-27), oberhausen (60,6 %→47,5 %, 2026-06-28), **gladbeck (Heimatstadt, 34,3 %→28,1 %, 2026-06-29)**, **dorsten (58,8 %→46,3 %, 2026-07-01)**, **recklinghausen (Doorway-Diff., 2026-07-02)**; offen dinslaken, duisburg, bottrop, haltern.
- **FAQPage-Schema auf Einzelobjekt-Seiten als ZWEITEN Block einfügen** (2026-06-26). Wenn der `<head>` ein einzelnes JSON-LD-Objekt nutzt (kein `@graph`, z. B. index.html LocalBusiness), das FAQPage NICHT einhängen, sondern als zweiten separaten `<script type="application/ld+json">`-Block direkt nach dem bestehenden `</script>` vor `</head>`. Zwei Blöcke sind valide. Texte 1:1 aus den sichtbaren FAQ-Antworten spiegeln (keine neuen Inhalte).
- **FAQPage NUR bei sichtbarem FAQ-Block — Service-Seiten haben keinen** (2026-06-26). Alle 6 Service-Seiten (close-up, tisch, walk-act, buehnenshow, zaubershow-erwachsene, kinderzauberer) haben KEINEN sichtbaren FAQ-Block → FAQPage dort nicht inhaltsneutral möglich. Alle 14 Stadtseiten haben FAQ+FAQPage. **FAQPage-Ausroll abgeschlossen — nicht erneut auf Service-Seiten versuchen.**
- **Schema-Konsistenz Service-Seiten** (2026-06-26). Alle 6 Service-Seiten haben `Service`+`BreadcrumbList` im `@graph` (`kinderzauberer.html` ergänzt, `0c6c512`).
- **Stadtseiten-FAQ-Anzahl als Konsistenz-Check** (2026-06-29). Differenzierte Stadtseiten haben 4 FAQs (inkl. Stadtteil-FAQ); zurückgebliebene ggf. nur 3. Vor jeder Stadtseiten-Bearbeitung `grep -c faq-item` und Wortzahl der Live-Seite gegen die differenzierten Nachbarn (~870 W) abgleichen.

## Offene Aufgaben / Backlog (in jedem Lauf prüfen, bis erledigt)

> **▶ NÄCHSTER LAUF (ab 2026-07-03):** **recklinghausen ERLEDIGT 2026-07-02** (`99011d7`; war dünnste offene Stadtseite, 17.084 B / ~684 W / 3 FAQ). Differenzierung nach `seo-content`-Maßstab: neue „Anlässe & Locations in Recklinghausen“ (Kreisstadt/Namensgeberin Vest Recklinghausen, Ruhrfestspiele am Ruhrfestspielhaus/Grüner Hügel, Altstadt „Gute Stube“ mit Palais Vest + Zwei-Tore-Viertel, Ikonen-Museum, Kunsthalle Recklinghausen, reale Stadtteile Innenstadt/Süd/Hochlarmark/Suderwich/König Ludwig/Hillerheide) + 4. Stadtteile-FAQ sichtbar + im FAQPage-`@graph` (4 Fragen) + Gladbeck in Region-Links. Wortzahl ~684→~750 Content (891 inkl. Nav/Footer); Content-Overlap ggü. Template-Geschwistern deutlich unter 0,75. Live verifiziert: HTTP 200, 19.712 B, faq-item=4, 0 U+FFFD, Umlaute intakt, Self-Canonical unverändert, JSON-LD valide. **NÄCHSTES:** Doorway-Differenzierung fortsetzen — nächster Kandidat **duisburg** (16.765 B / ~687 W / 3 FAQ, Template-nah) bzw. dinslaken. Offen danach: bottrop, haltern (ggf. essen/gelsenkirchen prüfen). FAQPage-Ausroll abgeschlossen; BreadcrumbList auf allen 6 Service-Seiten konsistent. Offen GSC: Indexierung für `zauberer-recklinghausen.html` (neu), `zauberer-dorsten.html`, `zauberer-gladbeck.html`, `zauberer-oberhausen.html`, `zauberer-herne.html`, `zauberer-wesel.html` + `/` (manuell durch Inhaber, Deep-Link liefert 404). Nach jeder Änderung Standard-Verifikation.
- [x] **GSC-Sitemap-Recrawl ERLEDIGT (2026-06-23).** `sitemap.xml` „Erfolgreich", 25 Seiten, 0 Fehler. Nur noch beiläufig prüfen.
- [ ] **Neue/aktualisierte Stadtseiten indexieren.** OFFEN: recklinghausen (2026-07-02), dorsten (2026-07-01), gladbeck, oberhausen, herne, wesel UND `/` in GSC einreichen — Deep-Link zur URL-Prüfung liefert 404, daher manuell durch Inhaber. Rest: duisburg, bottrop, dinslaken, haltern. GSC-„keine verweisende Sitemap" = Crawl-Lag, kein Defekt.
- [ ] **⭐ Polterabend-/Junggesellenabschied-Seite (freigabepflichtig, HÖCHSTE Priorität).** „zauberer polterabend" = **153 Impr / 0 Klicks** (2026-07-02; Pos 9,8). Alte URL `/galerie/junggesellenabschied/` → 301 auf `fotogalerie.html` (kein Polterabend-Text). KEINE Anlass-Seite vorhanden. Empfehlung: neue `polterabend-zauberer.html` ODER wahrer Polterabend-Abschnitt auf bestehender Seite (KEINE neuen Preise). Freigabepflichtig → auf Inhaber warten.
- [x] **FAQPage-Schema auf index.html — ERLEDIGT 2026-06-26 (Commit `309f38a`).**
- [x] **FAQPage-Ausroll Service-Seiten — ABGESCHLOSSEN/NICHT ANWENDBAR (2026-06-26).**
- [x] **Schema-Konsistenz Service-Seiten — ERLEDIGT 2026-06-26 (Commit `0c6c512`).**
- [ ] **Alt-WP-URLs in GSC nur BEOBACHTEN — Redirects sind OK** (2026-06-18). 301-Redirects live + korrekt, keine Equity-Verluste (Crawl-Lag). NICHT eingreifen, .htaccess nicht anfassen.
- [x] **Wesel als reguläre Stadtseite — ERLEDIGT 2026-06-25 (Commit `dda4aff`).**

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

## Verlauf / umgesetzte Änderungen (Append-Log)
- **2026-06-18 bis 2026-06-29** siehe Historie (Twitter-Cards, 301-Verifikation, index FAQPage `309f38a`, kinderzauberer BreadcrumbList `0c6c512`, Doorway-Differenzierung marl/herten/wesel/herne/oberhausen/gladbeck).
- **2026-07-01** `zauberer-dorsten.html`: Doorway-Differenzierung (`seo-content`). WebSearch-geprüfte Dorsten-Fakten (Hansestadt an der Lippe, Stadtrechte 1251, Altes Rathaus, Jüdisches Museum Westfalen, Wasserschloss Lembeck, Zeche Fürst Leopold, Stadtteile). Neue „Anlässe & Locations“-Sektion + 4. FAQ + FAQPage(4). Commit `32266bd`. Wortzahl 687→898, Overlap 0,588→0,463. Live verifiziert. Bericht `zl-2026-07-01.md`.
- **2026-07-02** `zauberer-recklinghausen.html`: Doorway-Differenzierung (`seo-content`). Objektiv gewählt = dünnste offene Stadtseite (17.084 B / ~684 W / 3 FAQ). WebSearch-geprüfte Recklinghausen-Fakten (Kreisstadt & Namensgeberin des historischen Vest Recklinghausen; Ruhrfestspiele, Eröffnung 1. Mai am Ruhrfestspielhaus/Grüner Hügel; Altstadt „Gute Stube“ mit Vierteln Palais Vest & Zwei-Tore-Viertel; Ikonen-Museum = bedeutendste Sammlung orthodoxer Kunst außerhalb der orthodoxen Länder; Kunsthalle Recklinghausen; reale Stadtteile Innenstadt/Süd/Hochlarmark/Suderwich/König Ludwig/Hillerheide/Stuckenbusch). Neue „Anlässe & Locations in Recklinghausen“-Sektion (~230 W), 4. stadtspezifische FAQ (Stadtteile) sichtbar + im FAQPage-`@graph` (4 Fragen), Gladbeck in Region-Links. Keine neuen Preise/Leistungen/Bilder. Commit `99011d7` (Datei-SHA `c003fb5`, 17.084→19.712 B). Live verifiziert (~95 s Latenz, 2. `?cb=`-Read): HTTP 200, „Anlässe & Locations“/Ruhrfestspiele/Vest/Ikonen-Museum/Kunsthalle/Gute Stube/Palais Vest vorhanden, faq-item=4, FAQPage 4 Fragen, JSON-LD valide (Service+BreadcrumbList+FAQPage), 0 U+FFFD, Umlaute intakt, Self-Canonical unverändert. Wortzahl ~684→~750 Content (891 inkl. Nav/Footer), Content-Overlap ggü. Template-Geschwistern deutlich unter 0,75. GSC 28T: 18 Klicks / 3.110 Impr / CTR 0,6 % / Pos 21; „zauberer polterabend“ 153 Impr/0 Klicks/Pos 9,8 (weiter freigabepflichtig). OFFEN GSC: Indexierung recklinghausen/dorsten/gladbeck/oberhausen/herne/wesel/`/` (manuell). Bericht `zl-2026-07-02.md`.
