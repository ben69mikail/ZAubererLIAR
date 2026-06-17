# Projekt-Bericht: 13 Stadt-Landingpages — 2026-06-17

**Auftrag (Inhaber):** Lokale SEO-Seiten für 13 Städte erstellen, Inhalte aus liar-entertainer.com (reale Auftrittsorte). Tool: /seo-content.
**Status:** ✅ Abgeschlossen, alle 13 Seiten live & verifiziert.

---

## 1. Recherche (Quelle: liar-entertainer.com)

Reale Fakten als E-E-A-T-Basis übernommen (keine erfundenen Inhalte):
- **Bestätigte Haupteinsatzgebiete** (Quellseite „Einsatzgebiet"): Oberhausen, Gelsenkirchen, Essen, Duisburg, Dorsten, Herten, Herne, Marl, Gladbeck, Mülheim, Dinslaken, Dortmund, Bochum, Bottrop, Recklinghausen.
- **Eigene Stadtseiten existieren bereits** auf der Quellseite (z.B. clown-in-essen, -bochum, -haltern) → Stadtseiten sind durch das reale Geschäft gedeckt.
- Fakten: seit 2009/15+ J. Erfahrung, über 4.000 Auftritte gesamt / ~400 Shows/Jahr, über 400 Google-Bewertungen, pädagogische Ausbildung, versichert + Führungszeugnis, DE/FR, Kinder 3–12, nur 2×2 m Platz, ~40 Min. Show. Adresse Beethovenstr. 15, 45966 Gladbeck.

### Wichtiger Hinweis zu zwei Städten
- **Haltern am See:** auf der Quellseite mit eigener Stadtseite belegt → als reguläres Einsatzgebiet umgesetzt.
- **Wesel:** taucht auf liar-entertainer.com NICHT als Auftrittsort auf. Da der Inhaber Wesel ausdrücklich angefragt hat und es geografisch im Radius liegt (Kreis Wesel, Nachbar von Dinslaken), wurde die Seite **wahrheitsgemäß als „erweitertes Einsatzgebiet / auf Anfrage"** formuliert — kein erfundener lokaler Track-Record. Bitte gegenprüfen.

---

## 2. Umgesetzt: 13 Stadtseiten

Je Seite (Template = bestehende Service-Seiten, gleiches Design/CSS):
- Lokalisierter Title (≤60 Z.) + Description (≤160 Z.) + H1 „Zauberer [Stadt]"
- Eigener, **unikaler** Intro-Text (reale Stadtteile, Anfahrt ab Gladbeck, lokale Anlässe) — keine Duplicate-Content-Gefahr
- 4 Formate (Kinderzauberer/Close-up/Bühnenshow/Walk-Act) mit internen Links
- 3 echte Bewertungen, „Auch in der Region"-Cross-Links, 3 stadtbezogene FAQ
- **Schema (JSON-LD):** Service + LocalBusiness + BreadcrumbList + FAQPage, `areaServed` = Stadt
- Twitter-Card-Meta, OG-Tags, Canonical
- ~810 Wörter/Seite (über Location-Page-Floor 500–600)

**URLs (alle live, HTTP 200 verifiziert):**
zauberer-essen · -gelsenkirchen · -oberhausen · -duisburg · -dorsten · -marl · -wesel · -dinslaken · -haltern · -bottrop · -herne · -herten · -recklinghausen .html

**Bilder:** nur reale, vorhandene Assets aus dem Repo verwendet (stadtspezifisch wo vorhanden: Essen, Gelsenkirchen, Oberhausen; sonst generische NRW-Motive).

## 3. Weitere Änderungen
- **sitemap.xml:** 13 neue URLs ergänzt (jetzt 24 URLs, live verifiziert).
- **Startseite:** neue „Regionen"-Sektion (vor CTA) + Footer-Spalte „Regionen" mit internen Links zu allen 13 Stadtseiten → kein Orphan, stärkt lokale Verlinkung. Parallele Änderungen anderer Tasks (Topbar Tel/WhatsApp, Hero-Badge, antigravity-Effekt) blieben erhalten.

## 4. Verifikation
- ✅ Alle 13 Seiten HTTP 200, valides JSON-LD (Service+Breadcrumb+FAQ), Twitter-Cards vorhanden.
- ✅ Visuelle Stichprobe (Essen, Recklinghausen): rendern fehlerfrei mit vollem Design.
- ✅ Keine erfundenen Orte/Preise; bestehende Preise (150 €) unverändert.
- ✅ sitemap.xml live mit 24 URLs.
- ✅ Startseite: Regionen-Sektion + Footer-Links live.
- ✅ **GSC:** Indexierung für zauberer-essen.html direkt beantragt. Restliche 12 Seiten via Sitemap zur Entdeckung gemeldet.

## 5. Vorschläge / offene Punkte an den Inhaber
1. **Wesel-Framing prüfen** (siehe oben): aktuell „auf Anfrage". Falls dort doch regelmäßig Auftritte stattfinden, kann es als reguläres Gebiet formuliert werden.
2. **GSC-Sitemap zeigt noch „242 Seiten"** (alter WordPress-Stand vom 15.06.). Die neue 24-URL-sitemap.xml ist live; Google liest sie beim nächsten Crawl neu ein. Beobachten.
3. **Optional:** Stadtspezifische Fotos (z.B. echte Auftrittsbilder aus Dorsten/Marl/Herten) würden die Seiten weiter aufwerten — aktuell teils generische NRW-Motive.
4. **Nächster Schritt (Folgeläufe):** restliche Stadtseiten einzeln zur Indexierung anstoßen; CTR/Position der neuen URLs in GSC beobachten.

## 6. Commits
13× „Neue Stadtseite: …" + „sitemap.xml: 13 neue Stadt-Landingpages" + „Startseite: Regionen-Sektion + Footer-Spalte". Alle auf main → Auto-Deploy IONOS.
