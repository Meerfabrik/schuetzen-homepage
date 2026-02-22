# St. Sebastianus Schützenbruderschaft Büderich – Website

Next.js + TypeScript + Sanity CMS

---

## 🚀 Schnellstart

### 1. Abhängigkeiten installieren
```bash
npm install
```

### 2. Sanity Projekt einrichten (einmalig)

#### a) Konto & Projekt anlegen
→ https://sanity.io/manage → "New Project" → Name: "Schuetzen Büderich"

#### b) .env.local anlegen
```bash
cp .env.example .env.local
```
Dann in `.env.local` die Werte aus sanity.io/manage eintragen:
```
NEXT_PUBLIC_SANITY_PROJECT_ID=abc123xyz
NEXT_PUBLIC_SANITY_DATASET=production
```

#### c) Entwicklungsserver starten
```bash
npm run dev
```
→ Website:    http://localhost:3000
→ CMS Studio: http://localhost:3000/studio

---

## 🗂️ Projektstruktur

```
schuetzen-buederich/
├── app/
│   ├── layout.tsx                  ← Globales Layout
│   ├── page.tsx                    ← Startseite (Sanity-Daten)
│   ├── news/[slug]/page.tsx        ← News-Detailseite
│   ├── aktueller-hofstaat/         ← Hofstaat (Sanity-Daten)
│   ├── galerie/                    ← Galerie (Sanity-Daten)
│   ├── download/                   ← Downloads (Sanity-Daten)
│   ├── kontakt/                    ← Kontaktformular
│   ├── studio/[[...tool]]/         ← Sanity CMS Admin-Panel
│   └── api/contact/route.ts        ← Kontaktformular API
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── NewsCard.tsx
├── lib/
│   ├── sanity/
│   │   ├── client.ts               ← Sanity-Client & urlFor()
│   │   ├── queries.ts              ← Alle GROQ-Datenbankabfragen
│   │   └── types.ts                ← TypeScript-Typen für Sanity-Daten
│   ├── navigation.ts
│   └── types.ts
└── sanity/
    ├── sanity.config.ts            ← Studio-Konfiguration
    └── schemaTypes/
        ├── news.ts                 ← Schema: News & Beiträge
        ├── hofstaat.ts             ← Schema: Aktueller Hofstaat
        ├── galerie.ts              ← Schema: Galerie
        ├── download.ts             ← Schema: Downloads
        └── index.ts
```

---

## ✍️ Inhalte im CMS pflegen

Nach dem Start ist das CMS erreichbar unter:
- **Lokal:**   http://localhost:3000/studio
- **Live:**    https://eure-domain.de/studio

### Was kann gepflegt werden?
| Bereich | Pfad im Studio |
|---|---|
| News & Beiträge | 📰 News & Beiträge |
| Aktueller Hofstaat | 👑 Aktueller Hofstaat |
| Galerie-Bilder | 🖼️ Galerie |
| Downloads/PDFs | 📄 Downloads |

---

## 🌐 Deployment auf Vercel

```bash
# 1. Git-Repo anlegen
git init && git add . && git commit -m "Initial commit"

# 2. GitHub pushen
git remote add origin https://github.com/DEIN-NAME/schuetzen-buederich.git
git push -u origin main
```

3. https://vercel.com → "New Project" → GitHub-Repo wählen
4. Environment Variables eintragen:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET`
   - `RESEND_API_KEY`
   - `CONTACT_EMAIL`
5. Deploy klicken 🎉

### Sanity CORS für Produktion freischalten
→ https://sanity.io/manage → Euer Projekt → API → CORS Origins
→ Eure Vercel-Domain hinzufügen: `https://eure-domain.vercel.app`

---

## ✉️ Kontaktformular aktivieren
```bash
npm install resend
```
Dann in `app/api/contact/route.ts` den OPTION A Block einkommentieren.

---

## 🆘 Hilfe
- Next.js: https://nextjs.org/docs
- Sanity: https://www.sanity.io/docs
- Vercel: https://vercel.com/docs
