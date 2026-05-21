# MarketEdge AI

> Private reseller copilot for high-ticket flipping. PASS / WATCH / TEST / BUY.
> Local-first. SQLite. Claude-powered. No hype.

A chat-based business mentor for sourcing on **1688, Alibaba, eBay, Facebook Marketplace, junkyards, and local sellers**. Drop an opportunity into the chat — get a strict decision, full profit math, missing-info checklist, supplier questions in English AND Chinese, mechanic questions, marketplace listing copy, and a saved record in a local dashboard.

The AI is configured as a **strict mentor** — it does not hype, it does not sell hope, and it will kill an opportunity you are emotionally attached to if the numbers don't work.

## Tech

- **Next.js 15** (App Router) + **TypeScript**
- **Tailwind CSS** — dark cinematic UI, mobile friendly
- **SQLite** via `better-sqlite3` — local-first, zero infra
- **Claude API** (`claude-sonnet-4-6`) via official `@anthropic-ai/sdk`
  - Streaming chat (`messages.stream()`)
  - **Tool use** (`record_opportunity`) for structured extraction → DB
  - **Prompt caching** on the long system prompt + tool definition (≥90% read on repeat turns)

## Run it

```bash
cd marketedge-ai
cp .env.example .env.local
# edit .env.local → set ANTHROPIC_API_KEY=sk-ant-...
npm install
npm run dev
```

Open http://localhost:3000.

The SQLite DB is created automatically at `./marketedge.db` on first run. Override with `DATABASE_PATH=/some/other/path.db` in `.env.local`.

## What you get

| Module | Where |
|---|---|
| Chat (streaming + tool use) | `app/page.tsx`, `components/ChatPanel.tsx`, `app/api/chat/route.ts` |
| Opportunity extraction (tool) | `lib/tool-schema.ts` |
| Decision engine + risk rules | `lib/prompts.ts` (system prompt — the actual rules) |
| Profit math | `lib/prompts.ts` + `lib/tool-schema.ts` (model computes, fills the tool) |
| SQLite persistence | `lib/db.ts` |
| Dashboard | `app/dashboard/page.tsx` |
| Opportunity detail | `app/opportunity/[id]/page.tsx` |
| CSV export | `app/api/export/route.ts` (or click "Export CSV" in the nav) |

## Decision rules (enforced in the system prompt)

- **PASS** if profit < $200, fitment unclear, shipping unknown, no supplier trust, safety-critical, or demand unclear.
- **WATCH** if interesting but key info missing.
- **TEST** if profit ≥ $300, ROI ≥ 70%, fitment clear, demand evidence, supplier trust.
- **BUY** only if profit ≥ $500, ROI strong, fitment + shipping confirmed, supplier trustworthy, risk low/medium, demand proven.

Never BUY if fitment or shipping is unclear. Never.

## Risk classifier

- **Low**: grilles, spoilers, mirror caps, trims, tonneau covers, cosmetic accessories.
- **Medium**: wheels, headlights, taillights, electronic accessories, body kits.
- **High**: airbags, brakes, seatbelts, safety sensors, emissions parts, counterfeit/OEM-without-proof. → Lead with the warning; default to PASS.

## Folder structure

```
marketedge-ai/
├── app/
│   ├── api/
│   │   ├── chat/route.ts              # streaming chat + tool use + persistence
│   │   ├── opportunities/route.ts     # GET list
│   │   ├── opportunities/[id]/route.ts
│   │   └── export/route.ts            # CSV download
│   ├── dashboard/page.tsx
│   ├── opportunity/[id]/page.tsx
│   ├── layout.tsx
│   ├── globals.css
│   └── page.tsx                       # chat (main)
├── components/
│   ├── ChatPanel.tsx                  # streaming chat UI + tool echoes
│   ├── DecisionBadge.tsx              # PASS/WATCH/TEST/BUY, risk, score bar
│   └── Nav.tsx
├── lib/
│   ├── anthropic.ts                   # SDK client + model constant
│   ├── db.ts                          # better-sqlite3 schema + queries
│   ├── prompts.ts                     # strict-mentor system prompt
│   ├── tool-schema.ts                 # record_opportunity tool
│   └── types.ts
├── .env.example
├── package.json
├── next.config.mjs
├── postcss.config.js
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

## Notes on the AI

The strictness is in `lib/prompts.ts`. If the assistant ever feels too lenient or too soft, tighten the **Decision Engine** and **Hard Rules** sections there — it's all in plain English in one file.

The `record_opportunity` tool is what bridges chat → dashboard. Claude calls it at the end of every meaningful analysis; the route handler in `app/api/chat/route.ts` reads the tool input and persists. Streaming text deltas go to the user in parallel; the structured save happens at the end of the turn.

Prompt caching is configured on both the system prompt and the tool definition (`cache_control: { type: 'ephemeral' }`) — after the first turn, subsequent turns hit the cache and cost ~10% of input price.

## Out of scope (v1)

- No scraping. Paste content manually.
- No real auth. Local single-user.
- No real-time marketplace prices. Math uses the comps you provide.
- No image uploads. Describe screenshots in words.
- No payments / Stripe / billing.

This is intentionally a v1 — fast to ship, easy to extend.
