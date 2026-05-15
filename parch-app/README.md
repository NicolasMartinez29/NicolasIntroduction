# Parch — High-fidelity mobile mockup

> **No te quedes solo hoy.** · Para que nadie sienta que no tiene con quién.

Visual, clickable MVP for **Parch**: a Latino/global social community app —
a living social planet where people find communities, join plans (parches),
and feel less alone.

This is a **mockup**, not a real product yet:
- No backend, no auth, no real database
- No real maps (the "living map" is animated CSS + mock pins)
- No payments, no third-party APIs
- All data in `src/data/mockData.ts`

Built with **React + Vite + TypeScript**, styled to look and feel like a native mobile app
(centered phone frame on desktop, full screen on mobile).

---

## Run it

```bash
cd parch-app
npm install
npm run dev
```

Then open <http://localhost:5173>.

For a production build:

```bash
npm run build
npm run preview
```

---

## What's in this prototype

Ten screens, all wired into a single state-based router (`App.tsx`):

| Screen | What it shows |
|---|---|
| **Welcome** | Logo, slogans, emotional copy, 3 entry CTAs |
| **Living Map** | Fake animated planet/city view — glowing zones, pulsing pins, floating avatars, particles, filter chips, side tools |
| **Communities** | Active community cards with vibe, members, next plan, verified/featured badges, premium banner |
| **Create Parche** | Plan picker, fields (name, city, time, max, privacy, community, budget, vibe) → fake invite link |
| **Join / Vote Parche** | Host info, vote bars, winning plan, chat preview, join/invite CTAs |
| **Feedback** | After-plan feelings, story field, anonymous share permission |
| **Stories** | Emotional testimonial cards (clearly labeled mock data) |
| **Profile** | Avatar, status chips, stats, bio, shortcuts |
| **Business** | Organizer pitch, categories, features, 3 pricing tiers (mock) |
| **Safety** | Verification, report, safe mode, share-plan-with-friend, moderation |

---

## Folder structure

```
parch-app/
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
├── public/
│   └── parch-icon.svg
└── src/
    ├── main.tsx              # Vite entry
    ├── App.tsx               # State-based router + phone frame
    ├── styles/
    │   └── globals.css       # Design system, animations, glass cards, living map
    ├── data/
    │   └── mockData.ts       # ALL mock data — users, communities, parches, zones, stories…
    ├── components/
    │   ├── Avatar.tsx
    │   ├── BottomNav.tsx
    │   ├── Icon.tsx          # Inline SVG icon set (no icon library dep)
    │   ├── LivingMap.tsx     # The animated planet view
    │   └── StatusBar.tsx
    └── screens/
        ├── WelcomeScreen.tsx
        ├── MapScreen.tsx
        ├── CommunitiesScreen.tsx
        ├── CreateParcheScreen.tsx
        ├── JoinParcheScreen.tsx
        ├── FeedbackScreen.tsx
        ├── StoriesScreen.tsx
        ├── ProfileScreen.tsx
        ├── BusinessScreen.tsx
        └── SafetyScreen.tsx
```

---

## Design system

CSS variables in `src/styles/globals.css`:

- **Backgrounds** — deep dark blues (`--bg-deep`, `--bg-base`) with radial gradients
- **Neon palette** — coral `#FF3D7F`, cyan `#00E5FF`, violet `#B14EFF`, warm `#FF8A3D`, mint `#4DFFB8`
- **Glass cards** — `--glass`, `--glass-border`, blur + saturate backdrop-filter
- **Typography** — Plus Jakarta Sans (display) + Inter (body) from Google Fonts
- **Live dot** — pulsing `box-shadow` animation, used everywhere to convey *alive*
- **Living map** — CSS radial gradients for activity zones, drifting particles, floating avatars, glassy pins

The mobile frame is a phone-shaped container (`.phone`) with a notch on desktop;
on screens narrower than 480px the frame disappears and it goes full-bleed.

---

## Where the data lives

Everything is in **`src/data/mockData.ts`** as plain TS exports:

- `currentUser`, `statuses`
- `filterChips`, `vibes`, `planTypes`
- `communities[]`, `parches[]`
- `mapZones[]`, `mapPins[]`, `mapAvatars[]`
- `stories[]`, `hotspots[]`
- `voteOptions[]`, `feelings[]`
- `businessCategories[]`, `pricingTiers[]`
- `safetyFeatures[]`

Swap any of these to change the entire prototype — no component edits needed.

---

## What's NOT here (yet)

- Real authentication / accounts
- Real maps integration (Google Maps, Mapbox, Snap-style)
- Real geolocation
- Backend (Supabase / Firebase / etc.)
- Push notifications
- Payments
- Chat (the chat is a 3-bubble preview, not a real socket)

The point of this build is to **show how it feels**, not what it does.
