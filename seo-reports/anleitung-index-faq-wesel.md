# Umsetzungs-Anleitung für die nächsten Läufe — index-FAQ-Schema & Wesel-Reframing

**Erstellt:** 2026-06-24 · **Freigabe-Status:** beide vom Inhaber freigegeben (FAQPage: einplanen; Wesel: regulär).
**Gilt für:** den täglichen SEO-Autopilot (zauberer-liar-seo-daily). Jeder Punkt ist self-contained und byte-genau ausführbar.
**Verbindlich:** vor jeder Bearbeitung frischen Remote-SHA der Datei über GitHub-MCP holen. Nach jedem Push live mit Cache-Buster + `grep -c "�"` (muss 0) prüfen. Reihenfolge der Strings exakt einhalten. KEINE neuen Preise/Leistungen.

---

## AUFGABE 1 — FAQPage-Schema auf `site/index.html` ergänzen (freigegeben, einplanen)

**Ziel:** Die Startseite hat einen sichtbaren FAQ-Block mit **5 echten Q&As**, aber KEIN FAQPage-JSON-LD. Aus exakt diesen 5 Bestandsinhalten ein valides FAQPage-Schema ergänzen → Rich-Results / LLM-Zitierbarkeit. KEINE neuen Inhalte, keine Textänderung am sichtbaren FAQ.

### WICHTIG — Struktur-Besonderheit der index.html
Anders als die Stadtseiten nutzt die index.html im `<head>` **ein einzelnes JSON-LD-Objekt** (LocalBusiness/EntertainmentBusiness), NICHT `@graph`. Daher das FAQPage NICHT in das bestehende Objekt einhängen, sondern als **zweiten, separaten `<script type="application/ld+json">`-Block** direkt nach dem schließenden `</script>` des bestehenden LocalBusiness-Blocks einfügen. Zwei getrennte JSON-LD-Blöcke auf einer Seite sind valide und Google-konform.

### Methode (Sandbox, byte-genau — NICHT aus dem Kontext hand-tippen)
1. Frischen SHA + Inhalt holen: `get_file_contents` für `site/index.html`.
2. In der Linux-Sandbox die Live-Datei laden:
   `curl -s "https://zauberer-liar.de/?cb=$RANDOM" -o /tmp/index_live.html`
3. Per Python den FAQ-Block-Endmarker als Anker nutzen und den neuen Schema-Block NACH dem bestehenden LocalBusiness-`</script>` einsetzen.

### Anker (exakt so im Quelltext vorhanden)
Der bestehende LocalBusiness-Block endet mit dieser Zeile (gefolgt von `</head>`):
```
  "aggregateRating": {"@type":"AggregateRating","ratingValue":"5","reviewCount":"50","bestRating":"5"}
}
</script>
```

### Einzufügen — direkt NACH dem obigen `</script>`, VOR `</head>`
(Texte sind 1:1 die 5 sichtbaren FAQ-Antworten der Startseite — answer-first, unverändert.)
```html
<script type="application/ld+json">
{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[
{"@type":"Question","name":"Was kostet eine Zaubershow?","acceptedAnswer":{"@type":"Answer","text":"Die Kinderzaubershow zum Kindergeburtstag gibt es zum Festpreis von 150 € (zzgl. Anfahrt). Für Bühnenshows, Galas, Hochzeiten und Firmenevents stelle ich Ihnen ein individuelles Angebot zusammen – jede Show wird auf Ihre Veranstaltung zugeschnitten."}},
{"@type":"Question","name":"Wo treten Sie auf?","acceptedAnswer":{"@type":"Answer","text":"Hauptgebiet ist das Ruhrgebiet (Gladbeck, Essen, Bochum, Gelsenkirchen, Oberhausen, Bottrop, Duisburg, Recklinghausen, Mülheim, Dortmund). NRW-weit sowie überregional und international auf Anfrage."}},
{"@type":"Question","name":"Welche Technik benötigen Sie?","acceptedAnswer":{"@type":"Answer","text":"Close-up: keine. Bühnenshow: ein Mikrofon ist ab ca. 70–80 Zuschauern hilfreich. Für große Events sind Bühne und Beleuchtung empfehlenswert – ich passe mich flexibel an."}},
{"@type":"Question","name":"Wie früh sollte ich buchen?","acceptedAnswer":{"@type":"Answer","text":"Für Wochenenden und Feiertage mindestens 8 Wochen im Voraus. Unter der Woche und für kurzfristige Termine einfach Verfügbarkeit anfragen."}},
{"@type":"Question","name":"Sprechen Sie auch Französisch?","acceptedAnswer":{"@type":"Answer","text":"Ja! Als französischstämmiger Künstler führe ich die Show komplett auf Französisch oder zweisprachig durch – auch Englisch und Spanisch sind möglich."}}
]}
</script>
```

### Python-Snippet (in der Sandbox; ersetzt das `</script>\n</head>` byte-genau)
```python
s=open("/tmp/index_live.html",encoding="utf-8").read()
anchor='  "aggregateRating": {"@type":"AggregateRating","ratingValue":"5","reviewCount":"50","bestRating":"5"}\n}\n</script>\n</head>'
assert anchor in s, "Anker nicht gefunden – Quelltext gegenprüfen!"
faq='''<script type="application/ld+json">
{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[
... (Block von oben 1:1) ...
]}
</script>'''
s=s.replace(anchor, anchor.replace("</head>", faq+"\n</head>"),1)
open("/tmp/index_new.html","w",encoding="utf-8").write(s)
```
(Hinweis: einfacher ist, `</script>\n</head>` → `</script>\n` + FAQ-Block + `\n</head>` zu ersetzen.)

### Verifikation nach Push (~50–60 s warten, dann)
- `curl -s "https://zauberer-liar.de/?cb=$RANDOM"` → HTTP 200, **0 × U+FFFD**, Umlaut-Stichprobe (Französisch, Zuschauern, Bühnenshow).
- Genau **2** JSON-LD-Blöcke vorhanden; FAQPage parst (`json.loads`) mit **5** mainEntity-Fragen.
- Google Rich-Results-Test gegen `https://zauberer-liar.de/` → FAQ ohne Fehler. (Hinweis: Google zeigt FAQ-Rich-Snippets seit 2023 nur noch eingeschränkt an; Schema bleibt dennoch wertvoll für LLM-Zitierbarkeit/GEO und ist Plan-Ziel Woche 6.)
- Erledigt-Kriterium: valides FAQPage live auf index.html, Rich-Results-Test fehlerfrei.

### Übertragbar
Dieselbe Methode gilt für weitere Seiten mit sichtbarem FAQ-Block ohne FAQPage-Schema (z. B. Service-Seiten) — Bestandsinhalte 1:1 ins Schema spiegeln.

---

## AUFGABE 2 — `site/zauberer-wesel.html` als reguläre Stadtseite umformulieren (freigegeben: Wesel ist reguläres Auftrittsgebiet)

**Ziel:** Wesel ist laut Inhaber reguläres Auftrittsgebiet. Die Seite ist aktuell durchgängig als „erweitertes Einsatzgebiet / auf Anfrage" formuliert. Auf das normale Stadtseiten-Niveau heben (wie Marl/Herten) — UND zugleich gegen Doorway-Risiko differenzieren (echte Wesel-Fakten, eigene „Anlässe"-Sektion, 4. FAQ, Gladbeck-Link).

### 2a) „Auf Anfrage"-Framing entfernen — exakte String-Ersetzungen
Frischen SHA holen, Live-Datei laden, dann diese Ersetzungen (alt → neu) byte-genau anwenden:

1. **JSON-LD `areaServed` (kommt 2× in derselben Zeile vor → replace_all):**
   - ALT: `"areaServed":"Wesel (auf Anfrage)"`
   - NEU: `"areaServed":"Wesel"`

2. **JSON-LD FAQ-Antwort „Tritt … wirklich auf":**
   - ALT: `Ja – Wesel liegt in meinem erweiterten Einsatzgebiet. Auf Anfrage komme ich gerne zu Ihrem Event; von Gladbeck aus sind es rund 35 Minuten.`
   - NEU: `Ja – Wesel am Niederrhein gehört zu meinem regelmäßigen Einsatzgebiet. Von Gladbeck aus bin ich in rund 35 Minuten bei Ihnen.`
   (Diese Antwort steht 2× identisch: einmal im JSON-LD, einmal im sichtbaren FAQ → beide ersetzen, replace_all.)

3. **Hero-Intro-Absatz:**
   - ALT: `Wesel am Niederrhein liegt in meinem erweiterten Einsatzgebiet: Auf Anfrage komme ich gerne mit Zaubershow, Close-up und Kinderzauberei zu Ihrem Event – von der Hochzeit bis zum Kindergeburtstag.`
   - NEU: `Wesel am Niederrhein gehört zu meinem regelmäßigen Einsatzgebiet – mit Zaubershow auf Festen, Close-up bei Feiern und Kinderzauberei auf Geburtstagen, von der Hochzeit bis zum Kindergeburtstag.`

4. **Eyebrow über der H2:**
   - ALT: `<span class="eyebrow">Auf Anfrage in Ihrer Region</span>`
   - NEU: `<span class="eyebrow">Ihr Zauberer vor Ort</span>`

5. **Intro-Fließtext Satz 1:**
   - ALT: `bringe ich seit über 15 Jahren elegante Zauberkunst mit französischem Charme nach Wesel.`
   - NEU: (unverändert lassen — ist bereits regulär formuliert)

6. **Bild-alt-Text:**
   - ALT: `alt="Tisch-Zauberer LIAR in NRW – auf Anfrage auch in Wesel"`
   - NEU: `alt="Tisch-Zauberer LIAR in NRW – auch in Wesel"`

### 2b) Differenzierung (echte Wesel-Fakten — ZUERST per WebSearch gegen Wikipedia/Stadt Wesel prüfen!)
**Pflicht:** Vor dem Schreiben WebSearch zu „Wesel Niederrhein Stadtteile Sehenswürdigkeiten Willibrordi-Dom Hanse Veranstaltungen" und nur BELEGTE Fakten verwenden. Bekannte, zu verifizierende Wesel-Anker (Stand Allgemeinwissen, MUSS geprüft werden):
- Kreisstadt des Kreises Wesel, am Niederrhein (nicht Ruhrgebiet i. e. S.), Hansestadt.
- Willibrordi-Dom, Berliner Tor, Zitadelle Wesel, LVR-Niederrheinmuseum.
- Stadtteile u. a. Feldmark, Lackhausen, Obrighoven, Büderich, Flüren, Blumenkamp, Ginderich (prüfen!).
- Anlässe: Hanse-/Stadtfeste, Schützenfeste am Niederrhein (prüfen).
- Auf der Live-Seite bereits genannt (ggf. korrigieren wenn unbelegt): „Altstadt, Feldmark, Lackhausen, Obrighoven".

Dann analog zu Marl/Herten:
- Neue Sektion **„Anlässe in Wesel"** (~150–180 W stadtspezifisch, nur Wahres) VOR der Reviews-Sektion (Anker: `<section><div class="wrap"><div class="sec-head center reveal"><span class="eyebrow">100 % Kundenzufriedenheit</span>`).
- **4. stadtspezifische FAQ** „In welchen Stadtteilen von Wesel trete ich auf?" sichtbar + im FAQPage-JSON-LD (analog Herten-Muster, FAQPage dann 4 Fragen).
- **Gladbeck** in die Region-Links ergänzen. Aktuell nur 2 Links (Dinslaken, Duisburg) → ALT: `<li><a href="zauberer-dinslaken.html" class="btn btn-ghost">Dinslaken</a></li><li><a href="zauberer-duisburg.html" class="btn btn-ghost">Duisburg</a></li>` → NEU davor Gladbeck + ggf. Bottrop ergänzen (nur existierende .html verlinken).

### 2c) Title/Description (optional schärfen, kein „auf Anfrage")
Title/Description enthalten KEIN „auf Anfrage" → unverändert lassen, passt.

### Verifikation nach Push
- HTTP 200, 0 × U+FFFD, Umlaute intakt.
- `grep -c "auf Anfrage" wesel_live.html` → sollte 0 sein (bzw. nur noch unkritische Vorkommen wie „unverbindliches Angebot").
- `grep -c "erweitertes Einsatzgebiet"` → 0.
- FAQPage parst, 4 Fragen. Doorway-Overlap gegen andere Stadtseiten messen (5-Gramm-Jaccard) → Ziel < 50 %.
- Self-Canonical unverändert auf eigene .html.
- Danach Indexierung für `zauberer-wesel.html` in GSC neu beantragen.

---

## Reihenfolge / Tagesrhythmus (Empfehlung)
- **Lauf A:** Aufgabe 2 (Wesel) — ist eine Stadtseite und passt in den laufenden Doorway-Differenzierungs-Rhythmus (max. 1 Seite/Lauf). Reframing + Differenzierung in EINEM Commit.
- **Lauf B:** Aufgabe 1 (index-FAQPage) — eigenständiger Schema-Schritt (Plan-Woche 6 „Schema & GEO"), 1 Commit. Danach ggf. dieselbe FAQPage-Methode auf weitere FAQ-Seiten ausrollen.
- Beide NICHT am selben Tag mit anderen großen Änderungen bündeln (max. 1–2 Seiten/Lauf laut Plan).

## Querverweise
- Methodik Doorway-Differenzierung: siehe Lessons-Learned im Plan (Einträge 2026-06-23 Marl, 2026-06-24 Herten + Jaccard-Methodik).
- Encoding-/Deploy-Lessons: siehe Plan-Lessons (U+FFFD-Check, ~50 s Deploy-Latenz, Verifikation 2–3× wiederholen).
