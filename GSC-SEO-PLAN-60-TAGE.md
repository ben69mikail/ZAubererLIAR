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
- **Encoding-Check nach jedem MCP-Commit mit deutschem Text** (2026-06-19). Hand-rekonstruierter `content` kann ein Sonderzeichen als U+FFFD korrumpieren. Merksatz: nach dem Push live mit `grep -c` prüfen (muss 0) + Umlaut-Stichprobe. Bei Befund per `python3 .replace(bad,good)` byte-genau reparieren. (Alternativ ohne Browser/curl: Quell-Verifikation über GitHub-API — dekodierter Content zeigt U+FFFD als �.) **Zusatz 07-08:** Noch besser VOR dem Push lokal prüfen (Datei in Outputs schreiben, `grep`/python-Check auf U+FFFD, faq-item-Zahl, Umlaute) — spart Reparatur-Commits.
- **⭐ Lokalen Mount als Edit-Basis nutzen, aber Aktualität prüfen** (2026-07-11, NEU). Der lokale Ordner enthält das Repo, ist aber pro Datei unterschiedlich frisch. Merksatz: VOR dem Editieren `wc -c` der lokalen Datei gegen die von der GitHub-API gemeldete `size` abgleichen. Identisch = lokal editierbar (dann python-Replacements + Checks lokal, kein Hand-Reconstruct nötig → kein Encoding-Risiko). Abweichend = Datei ist stale, Inhalt aus der API nehmen. Am 07-11: `zauberer-essen.html` lokal 16.753 B = remote → lokal editiert; `GSC-SEO-PLAN-60-TAGE.md` lokal 11.084 B ≠ remote 14.990 B → stale.
- **⭐ Byte-Differenz nach Push erklären, nicht ignorieren** (2026-07-11, NEU). Beim Push kann die zurückgemeldete `size` von der lokal geprüften Byte-Zahl abweichen, wenn im JSON-LD `\uXXXX`-Escapes durch echte Zeichen ersetzt werden (z. B. `–` 6 B → `–` 3 B). Merksatz: Differenz rechnerisch auflösen (Anzahl Escapes × Byte-Ersparnis). Passt sie exakt, ist der Inhalt identisch und JSON weiter valide. Am 07-11: 20.061 → 20.050 B = −11 B = 1× `–` (−3) + 2× `ü` (−8). ✓
- **Deploy-Latenz** (2026-06-21…07-11). Single-Commit ~50–130s bis live. Am 2026-07-11: erster `?cb=`-Read nach ~50 s noch ALT, zweiter Read nach ~2 min NEU. Verifikation im 30–40-s-Takt 2–3× mit **frischem** cb-Wert wiederholen, bevor „nicht live" gefolgert wird.
- **Browser-/Fetch-Verfügbarkeit variiert pro Lauf** (2026-07-03). Wenn `list_connected_browsers` leer ist UND `web_fetch` provenance-beschränkt ist, ist die Live-IONOS-Verifikation im Lauf nicht möglich; `curl`/Bash-Fetch ist laut Vorgaben unzulässig. Fallback: Quell-Verifikation via GitHub-API (`get_file_contents`) + Push-`size`-Abgleich. **Zusatz 07-08:** `web_fetch` kann provenance-beschränkt sein, während der Chrome-Browser verbunden ist — dann Live-Check über Chrome-Navigation + `get_page_text`. **Zusatz 07-11:** Browser war verfügbar, Live-Check per Chrome funktionierte einwandfrei.
- **GSC-Indexierung per UI-Suchfeld statt Deep-Link** (2026-07-07). Der Inspect-Deep-Link (`inspect?...&id=<URL>`) liefert weiterhin 404, ABER: GSC-Übersicht öffnen → URL ins obere Suchfeld „Jede URL in … prüfen" tippen → Enter → Button „INDEXIERUNG BEANTRAGEN" → Live-Test läuft 1–2 Min → Bestätigung „Indexierung wurde beantragt". Funktioniert zuverlässig im Autopilot. Quota beachten: max. 2–3 Anträge pro Lauf. **Zusatz 07-11:** Bereits indexierte, aber geänderte Seiten zeigen „URL ist auf Google" + Hinweis „Seite geändert?" neben dem Button — dann trotzdem beantragen, um den Neucrawl anzustoßen. Nach dem Antrag Dialog per „Schließen" beenden, bevor die nächste URL getippt wird. Am 07-11 2× fehlerfrei (essen, gelsenkirchen). Der GSC-Renderer friert beim Live-Test manchmal ein → Screenshot-Timeout einfach wiederholen, die Aktion lief trotzdem.
- **Stadtseiten-Doorway-Differenzierung mit `seo-content`** (2026-06-23). 14 Stadtseiten teilten Format/Reviews/Region/CTA/FAQ-Gerüst fast wortgleich → Overlap >75 %. Differenzierung: (1) echte recherchierte Stadt-Fakten, (2) eigene „Anlässe in <Stadt>"-Sektion, (3) 4. stadtspezifische FAQ sichtbar + im FAQPage, (4) Gladbeck in Region-Links. Hebt Stadttext über 500–600-Wörter-Floor und Score messbar.
- **Doorway-Auswahl per 5-Gramm-Jaccard-Overlap objektivieren** (2026-06-24). Sichtbaren Text strippen, 5-Wort-Shingles, paarweise Jaccard; höchster Overlap = nächster Kandidat. **ALLE 14 Stadtseiten erledigt:** marl (~37 %), herten (~37 %), wesel (<46 %), herne (61,5 %→48,2 %), oberhausen (60,6 %→47,5 %), gladbeck (Heimatstadt, 34,3 %→28,1 %), dorsten (58,8 %→46,3 %), recklinghausen, duisburg, bottrop, dinslaken, haltern, gelsenkirchen, **essen (57,7 %→41,1 %, 2026-07-11 — letzte Seite)**. ✅ **Doorway-Backlog vollständig abgeschlossen.**
- **FAQPage-Schema auf Einzelobjekt-Seiten als ZWEITEN Block einfügen** (2026-06-26). Wenn der `<head>` ein einzelnes JSON-LD-Objekt nutzt (kein `@graph`, z. B. index.html LocalBusiness), das FAQPage NICHT einhängen, sondern als zweiten separaten `<script type="application/ld+json">`-Block direkt nach dem bestehenden `</script>` vor `</head>`. Zwei Blöcke sind valide. Texte 1:1 aus den sichtbaren FAQ-Antworten spiegeln (keine neuen Inhalte).
- **FAQPage NUR bei sichtbarem FAQ-Block — Service-Seiten haben keinen** (2026-06-26). Alle 6 Service-Seiten (close-up, tisch, walk-act, buehnenshow, zaubershow-erwachsene, kinderzauberer) haben KEINEN sichtbaren FAQ-Block → FAQPage dort nicht inhaltsneutral möglich. Alle 14 Stadtseiten haben FAQ+FAQPage. **FAQPage-Ausroll abgeschlossen — nicht erneut auf Service-Seiten versuchen.** (Ein sichtbarer FAQ-Block auf `zaubershow-erwachsene.html` wäre eine größere Erweiterung → freigabepflichtig, siehe Backlog.)
- **Schema-Konsistenz Service-Seiten** (2026-06-26). Alle 6 Service-Seiten haben `Service`+`BreadcrumbList` im `@graph` (`kinderzauberer.html` ergänzt, `0c6c512`).
- **Stadtseiten-FAQ-Anzahl als Konsistenz-Check** (2026-06-29). Differenzierte Stadtseiten haben 4 FAQs (inkl. Stadtteil-FAQ). Alle 14 sind jetzt auf 4. Vor jeder Bearbeitung `grep -c faq-item` und Wortzahl gegen die Nachbarn (~870–1.000 W) abgleichen.

## Offene Aufgaben / Backlog (in jedem Lauf prüfen, bis erledigt)

> **▶ NÄCHSTER LAUF (ab 2026-07-12):** **essen ERLEDIGT 2026-07-11** (`ddec61c`; 16.753→20.050 B, ~680→~1.004 sichtbare W, FAQ 3→4, Score ~62→~83, Overlap 0,577→0,411). Damit ist die **Stadtseiten-Differenzierung KOMPLETT abgeschlossen (14/14)**. Live per Chrome verifiziert. Indexierung beantragt: **essen ✓, gelsenkirchen ✓**.
> **NÄCHSTES:** Kein Stadtseiten-Backlog mehr. Fokus verschieben auf:
> 1. **Woche 6/7-Themen** — Schema/GEO-Feinschliff (llms.txt, Person-Schema, Brand-Mentions), Bilder-Alt-Texte, Bildgrößen/lazy, Core Web Vitals (GSC → Nutzerfreundlichkeit → Core Web Vitals prüfen).
> 2. **Restliche Indexierungsanträge** (je Lauf 2–3): `haltern`, `wesel`, `/`.
> 3. **Freigabe-Themen abwarten** (Polterabend — siehe unten, weiterhin höchste Priorität).
> **GSC-Stand 2026-07-11 (09.04.–08.07., 90 T):** 17 Klicks · 3.480 Impr. · CTR 0,5 % · Pos. 20,7. Top-Queries: zauberer gladbeck 258 Impr./1 Klick · zauberer polterabend 225 · zaubershow nrw 220 · zauberer nrw 186 · zaubershows nrw 121 · clown zauberer liar 116 · zauberer gelsenkirchen 113 · close up zauberer 111. GSC-Empfehlungen: `/galerie/junggesellenabschied/` **−78 % Impr.**, Startseite `/` **+268 % Impr.**

- [x] **GSC-Sitemap-Recrawl ERLEDIGT (2026-06-23).** `sitemap.xml` „Erfolgreich", 25 Seiten, 0 Fehler. Nur noch beiläufig prüfen.
- [x] **Stadtseiten-Doorway-Differenzierung — ABGESCHLOSSEN 2026-07-11 (14/14).**
- [ ] **Stadtseiten indexieren — UI-Weg funktioniert (2026-07-07).** Beantragt: bottrop ✓, gladbeck ✓, recklinghausen ✓, dorsten ✓, dinslaken ✓, oberhausen ✓, herne ✓, **essen ✓ (07-11)**, **gelsenkirchen ✓ (07-11)**. Bereits indexiert: duisburg ✓. OFFEN (je Lauf 2–3 via GSC-UI-Suchfeld): **haltern**, **wesel**, **`/`**.
- [ ] **⭐ Polterabend-/Junggesellenabschied-Seite (freigabepflichtig, HÖCHSTE Priorität).** „zauberer polterabend" = **225 Impr. / 0 Klicks** (Stand 07-11); GSC meldet **−78 % Impressionen** für `/galerie/junggesellenabschied/` — Momentum geht ohne Zielseite verloren. Alte URL → 301 auf `fotogalerie.html` (kein Polterabend-Text). Empfehlung: neue `polterabend-zauberer.html` ODER wahrer Polterabend-Abschnitt auf bestehender Seite (KEINE neuen Preise). Freigabepflichtig → auf Inhaber warten.
- [ ] **Sichtbarer FAQ-Block auf `zaubershow-erwachsene.html` (freigabepflichtig, NEU 07-11).** „zaubershow nrw" + „zauberer nrw" + „zaubershows nrw" = **527 Impr. kombiniert**, Ø-Pos. ~20, 0 Klicks. Die 301-Zielseite `zaubershow-erwachsene.html` hat keinen FAQ-Block → kein FAQPage-Schema, schwache AI-Citation-Readiness. Ein echter FAQ-Block wäre der größte verbliebene Hebel für diese Query-Gruppe, ist aber eine größere inhaltliche Erweiterung → Freigabe einholen.
- [ ] **Alt-WP-URLs in GSC nur BEOBACHTEN — Redirects sind OK** (2026-06-18). 301-Redirects live + korrekt, keine Equity-Verluste (Crawl-Lag). NICHT eingreifen, .htaccess nicht anfassen.
- [x] **FAQPage-Schema auf index.html — ERLEDIGT 2026-06-26 (Commit `309f38a`).**
- [x] **FAQPage-Ausroll Service-Seiten — ABGESCHLOSSEN/NICHT ANWENDBAR (2026-06-26).**
- [x] **Schema-Konsistenz Service-Seiten — ERLEDIGT 2026-06-26 (Commit `0c6c512`).**
- [x] **Wesel als reguläre Stadtseite — ERLEDIGT 2026-06-25 (Commit `dda4aff`).**

## Wochenplan (Schwerpunkte)
- **Woche 1 (1–7) – Fundament & Crawl:** sitemap, robots, GSC einreichen, Indexierungsstatus, Canonicals, interne Verlinkung.
- **Woche 2 (8–14) – Titles/Descriptions:** je Tag 1–2 Seiten, Title ≤60 + Description ≤155 mit Keyword+Ort+CTA, gegen GSC-CTR.
- **Woche 3 (15–21) – Kinderzauberer-Cluster:** kinderzauberer.html + Kindergeburtstag-Begriffe, FAQ erweitern (ohne neue Preise).
- **Woche 4 (22–28) – Close-up/Tischzauberei:** close-up-zauberer, tisch-zauberer, walk-act-zauberer: Ortsbezug + Anlässe.
- **Woche 5 (29–35) – Stand-up/Zaubershow:** buehnenshow, zaubershow-erwachsene: Firmenfeier/Gala/Hochzeit.
- **Woche 6 (36–42) – Schema & GEO:** JSON-LD (Service, FAQPage, Person, BreadcrumbList), llms.txt, Brand-Mentions. ◀ **AKTUELLER FOKUS ab 07-12**
- **Woche 7 (43–49) – Bilder/CWV:** Alt-Texte, Bildgrößen/lazy, Core Web Vitals.
- **Woche 8 (50–56) – Lokale Signale:** NAP, GBP, Referenzen/Bewertungen, Ortsseiten-Begriffe.
- **Tag 57–60 – Feinschliff & Review:** GSC-Veränderung gegen Start, Restpunkte, Abschlussbericht.

## Erfolgskriterien (gegen Start messen)
- Mehr indexierte Seiten, 0 kritische Fehler.
- Durchschnittsposition Hauptkeywords verbessert; CTR der Top-Seiten gestiegen.
- Alle Seiten: unikale Title/Description/H1, valides Schema, beschreibende Alt-Texte.

## Verlauf / umgesetzte Änderungen (Append-Log)
- **2026-06-18 bis 2026-06-29** siehe Historie (Twitter-Cards, 301-Verifikation, index FAQPage `309f38a`, kinderzauberer BreadcrumbList `0c6c512`, Doorway-Differenzierung marl/herten/wesel/herne/oberhausen/gladbeck).
- **2026-07-01** `zauberer-dorsten.html`: Doorway-Differenzierung (`seo-content`). Commit `32266bd`. Wortzahl 687→898, Overlap 0,588→0,463. Live verifiziert. Bericht `zl-2026-07-01.md`.
- **2026-07-02** `zauberer-recklinghausen.html`: Doorway-Differenzierung. Commit `99011d7`. Live verifiziert. Bericht `zl-2026-07-02.md`.
- **2026-07-03** `zauberer-duisburg.html`: Doorway-Differenzierung. Commit `844478b` (16.651→19.179 B). Kein Browser → Quell-Verifikation via GitHub-API. Bericht `zl-2026-07-03.md`.
- **2026-07-07** `zauberer-bottrop.html`: Doorway-Differenzierung. Commit `ac90496` (16.699→19.133 B). Live verifiziert. GSC-UI-Indexierung entdeckt: bottrop/gladbeck beantragt, duisburg bereits indexiert. Bericht `zl-2026-07-07.md`.
- **2026-07-07 (2. Lauf)** Kein Seiten-Edit. GSC-UI-Indexierung: recklinghausen ✓, dorsten ✓.
- **2026-07-08** `zauberer-dinslaken.html`: Doorway-Differenzierung. Commit `8417afd` (16.691→19.350 B, ~680→927 W). Lokal + live verifiziert. GSC-UI-Indexierung: dinslaken/oberhausen/herne ✓. Bericht `zl-2026-07-08.md`.
- **2026-07-09** `zauberer-haltern.html`: Doorway-Differenzierung. Commit `92e3ee5` (16.798→19.277 B, ~680→934 W, FAQ 3→4). Bericht `zl-2026-07-09.md`.
- **2026-07-10** `zauberer-gelsenkirchen.html`: Doorway-Differenzierung. Commit `ccf26e8` (17.018→19.540 B, ~680→917 W, FAQ 3→4, Score ~62→~82). WebSearch-geprüfte Fakten (VELTINS-Arena, Wasserschloss Berge, Nordsternpark, ZOOM Erlebniswelt, MiR, Amphitheater; Stadtteile Buer/Horst/Erle/Ückendorf/Schalke/Bismarck/Scholven/Rotthausen). Kein Browser → Quell-Verifikation via Push-`size`. Bericht `zl-2026-07-10.md`.
- **2026-07-11** `zauberer-essen.html`: Doorway-Differenzierung (`seo-content`-Kriterien; Zielseite = **letzte** template-nahe, nie differenzierte Stadtseite, 16.753 B / ~680 W / 3 FAQ). WebSearch-geprüfte Essen-Fakten: Zeche Zollverein (Katernberg, seit 2001 UNESCO-Welterbe), Villa Hügel (Bredeney, ehem. Wohnhaus Familie Krupp), Messe Essen (Rüttenscheid), Aalto-Theater (Stadtgarten), Colosseum Theater, Baldeneysee, Grugapark, Werden, Kettwig; reale Stadtteile Rüttenscheid/Holsterhausen/Frohnhausen/Steele/Kray/Altenessen/Borbeck/Bredeney/Katernberg/Werden/Kettwig. Neue „Anlässe & Locations in Essen"-Sektion (~330 W, H2 + 3× H3, Format-Zuordnung je Anlass) + 4. Stadtteil-FAQ sichtbar + im FAQPage-`@graph` (4 Fragen) + Gladbeck in Region-Links (zuerst) + „Zauberer Gladbeck" im Footer. Keine neuen Preise/Leistungen/Bilder; Self-Canonical unverändert. Commit `ddec61c` (Datei-SHA `78ec7a3c`, 16.753→20.050 B, ~680→~1.004 sichtbare W, faq-item 3→4). **Lokal editiert** (Mount war byte-identisch mit remote) + VOR Push verifiziert (0 U+FFFD, 4 faq-item, 4 FAQPage-Fragen, 2 Gladbeck-Links, Umlaute OK). Byte-Differenz Push (−11 B) vollständig erklärt durch unescapte JSON-LD-Zeichen. **Live per Chrome verifiziert** (`?cb=`, 2. Read nach ~2 min): neue Sektion, 4. FAQ, Gladbeck-Links alle sichtbar. seo-content manuell ~62→~83; Overlap zu Template-Geschwistern 0,577→0,411 (marl 0,438→0,333; herten 0,451→0,343). GSC-UI-Indexierung: **essen ✓, gelsenkirchen ✓**. **▶ STADTSEITEN-DIFFERENZIERUNG KOMPLETT (14/14) — Fokus wechselt auf Woche 6/7 (Schema/GEO, Bilder/CWV).** Bericht `zl-2026-07-11.md`.
