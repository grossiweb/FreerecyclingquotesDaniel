# Recycling Quotes — Next.js Frontend

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy to Vercel

1. Push this repo to GitHub
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import the GitHub repo
4. Click Deploy — no config needed

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS 3.4 |
| Icons | Material Symbols Outlined |
| Font | Plus Jakarta Sans (next/font) |
| Hosting | Vercel |

## Project Structure

```
recyclingquotes/
├── app/
│   ├── globals.css          # Tailwind + component utilities
│   ├── layout.tsx           # Root layout (Header + Footer)
│   └── page.tsx             # Homepage (fully built)
├── components/
│   ├── layout/
│   │   ├── Header.tsx       # Mega menu + mobile drawer
│   │   └── Footer.tsx       # 4-column footer
│   └── ui/
│       └── index.tsx        # SectionHeader, CTABlock, FAQAccordion, ScrollReveal
├── lib/
│   └── data.ts              # NAV_ITEMS, SERVICES, MATERIALS, INDUSTRIES, CONTACT
├── public/
│   └── images/
│       ├── logo.png
│       └── hero-underline.png
├── tailwind.config.js       # Design system tokens
├── package.json
├── tsconfig.json
└── next.config.js
```

## What's Built

- ✅ **Homepage** — All 11 sections, fully responsive
- ✅ **Header** — Desktop mega dropdowns (dark theme, 4-col services, 2-col industries/materials) + mobile slide-out drawer with accordion
- ✅ **Footer** — 4-column grid with contact, services, materials, company links
- ✅ **Reusable UI** — SectionHeader, CTABlock, FAQAccordion, ScrollReveal
- ✅ **Data layer** — All nav items, 15 services, 14 materials, 8 industries centralized in lib/data.ts

## What's Next (tell me what to build)

- Hub pages: /services, /materials, /industries, /challenges, /about, /contact
- Inner pages: single service, single material, single industry, single challenge
- FAQ pages
- Programmatic templates (Service × Location, etc.)

## Design System

See `RecyclingQuotes-DesignSystem.docx` for full specs. Key tokens:

- **Primary:** #1B7A3D
- **Buttons:** 2 styles only (primary + outline)
- **Font:** Plus Jakarta Sans, 800 for headings, 400-500 for body
- **Breakpoints:** 1024px (tablet), 768px, 480px (mobile)
- **Icons:** Material Symbols Outlined only
