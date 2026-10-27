# Kyoto Weekend Planner

A Next.js (App Router) + TypeScript + Tailwind CSS chat page that builds a two-night Kyoto plan
from the prototype content pack (`Kyoto_Weekend_Prototype_Content_Pack.xlsx`).

## Run

```bash
npm install
npm run dev     # http://localhost:3000
npm run typecheck
npm run build
```

## Layout

- `lib/kyoto-data.ts` - stays, experiences and food from the workbook, plus notes about the data.
- `lib/planner.ts` - parses budget and interests from a message and searches every valid
  stay / experience / food combination under budget. It skips sold-out experiences and any
  pair of experiences that clash in time.
- `components/TripChat.tsx` - the chat UI: suggestion chips, plan cards and a data-notes panel.
- `app/page.tsx` - renders the chat page.

No API keys are needed. The planner runs in the browser.

## Known data issues

- Stay totals in the sheet don't equal nights x price (e.g. S1: 2 x $168 = $336, sheet says $366).
  The planner uses the sheet totals.
- The pack is dated April 2025 and has no photo URLs (image rights not cleared).
