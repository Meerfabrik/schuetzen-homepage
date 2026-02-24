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
   - (optional) `INSTAGRAM_ACCESS_TOKEN`, `INSTAGRAM_USER_ID`, `NEXT_PUBLIC_INSTAGRAM_PROFILE_URL` für den Instagram-Feed
5. Deploy klicken 🎉

### Sanity CORS für Produktion freischalten
→ https://sanity.io/manage → Euer Projekt → API → CORS Origins
→ Eure Vercel-Domain hinzufügen: `https://eure-domain.vercel.app`

---

## 📷 Instagram-Feed (optional)

Auf der Startseite wird ein Bildergitter mit Fotos von eurem Instagram-Account angezeigt. Dafür braucht ihr die **Instagram Graph API** (Meta/Facebook).

### Voraussetzungen
- Instagram-**Business-** oder **Creator-Konto**
- Konto mit einer **Facebook-Seite** verknüpft
- **Meta Developer App** (https://developers.facebook.com) mit „Instagram Graph API“ aktiviert

### Env-Variablen in `.env.local`
| Variable | Beschreibung |
|----------|--------------|
| `INSTAGRAM_ACCESS_TOKEN` | Long-lived User Access Token (von Meta Graph API Explorer oder über Token-Tool) |
| `INSTAGRAM_USER_ID` | Instagram-Nutzer-ID (numerisch), nicht der Benutzername – z. B. über Graph API: `me/accounts` → Seite wählen → `instagram_business_account` → `id` |
| `NEXT_PUBLIC_INSTAGRAM_PROFILE_URL` | (optional) Link zu eurem Profil, z. B. `https://www.instagram.com/eure_seite/` – wird im Fallback-Button genutzt |

Ohne diese Variablen erscheint ein Platzhalter mit Link „Zu Instagram“. Mit gültigen Werten werden die letzten 12 Bilder angezeigt (Cache: 1 Stunde).

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
