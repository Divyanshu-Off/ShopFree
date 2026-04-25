# 🌿 BestFit AI — Product Finder

> **An AI-powered personal shopping assistant** that recommends the single best product for a specific user by analyzing their age, location, climate, body context, and goals — then cross-referencing online reviews and ratings to produce a ranked, evidence-based recommendation.

---

## Table of Contents

1. [Project Purpose](#1-project-purpose)
2. [Live Demo Flow](#2-live-demo-flow)
3. [Tech Stack](#3-tech-stack)
4. [Project Structure](#4-project-structure)
5. [Component Breakdown](#5-component-breakdown)
6. [CSS Architecture](#6-css-architecture)
7. [Data Layer](#7-data-layer)
8. [App State Machine](#8-app-state-machine)
9. [Design System](#9-design-system)
10. [Running Locally](#10-running-locally)
11. [Planned Backend](#11-planned-backend-pending)
12. [Known Issues & Gaps](#12-known-issues--gaps)

---

## 1. Project Purpose

Most "best product" lists rank by popularity or affiliate commission. **BestFit AI** is built around a different idea: **contextual fit over generic popularity**.

The app collects a structured user profile:
- What product they need
- Who they are (age, location, climate, skin/scalp/foot type, etc.)
- Their budget and brand preferences

It then (eventually) cross-references that profile against live web review data and uses the **Gemini AI API** to rank only **actually-found products** — not invented ones — by "best fit" for that specific person.

### Example Use Case (Built-in Demo)
A **15-year-old boy in Chennai** with a **sensitive scalp** looking for a shampoo. The system should:
- Prioritize humid-climate-compatible formulas
- Avoid harsh sulfates due to sensitive scalp
- Prefer gentle, everyday-use products over medicated ones

---

## 2. Live Demo Flow

The app runs through **4 sequential states**:

```
home → inquiry → analyzing → results
```

| State | Screen | What Happens |
|---|---|---|
| `home` | Hero landing page | User sees the pitch and clicks "Discover Your Match" |
| `inquiry` | 3-step form | User fills category → personal context → specific requirements |
| `analyzing` | AI Analysis View | Animated progress tracking while the backend processes (currently mocked) |
| `results` | Results Dashboard | Winner card + 2 alternatives with scores, explanations, and buy links |

---

## 3. Tech Stack

### Frontend
| Technology | Version | Role |
|---|---|---|
| **React** | 19.2.4 | UI component framework |
| **Vite** | 8.0.4 | Build tool & dev server |
| **Framer Motion** | 12.38.0 | Animations (entry, float, progress bars) |
| **Lucide React** | 1.8.0 | Icon library |
| **Vanilla CSS** | — | All styling (no Tailwind, no CSS-in-JS) |
| **Google Fonts** | — | `Inter` (body) + `Outfit` (headings) |

### Backend (Planned — not yet built)
| Technology | Role |
|---|---|
| **Node.js + TypeScript + Express** | API server on port 3001 |
| **Cheerio** | HTML scraping & product evidence extraction |
| **Google Custom Search API** | Live web search for real products |
| **Gemini 1.5 Flash API** | Structured JSON ranking of scraped candidates |
| **LRU Cache** | In-memory caching with 1-hour TTL |

---

## 4. Project Structure

```
ShopFree/
│
├── index.html                    ← Vite entry HTML (Google Fonts loaded here)
├── vite.config.js                ← Vite config (proxy to backend /api/* planned)
├── package.json                  ← Frontend dependencies
├── eslint.config.js              ← ESLint rules
│
├── public/
│   └── favicon.svg
│
└── src/
    ├── main.jsx                  ← React DOM root mount
    ├── index.css                 ← GLOBAL design system (CSS variables, resets, utilities)
    │
    ├── App.jsx                   ← Root component + application state machine
    ├── App.css                   ← Root layout styles (.app-container, trust badges)
    │
    ├── data/
    │   └── mockData.js           ← Static recommendation data + category definitions
    │
    └── components/
        ├── Navbar.jsx            ← Sticky glass header with dark-mode toggle
        ├── Navbar.css
        │
        ├── Hero.jsx              ← Landing section with floating UI mockup cards
        ├── Hero.css
        │
        ├── ProductInquiryForm.jsx  ← 3-step animated form with dynamic fields
        ├── Form.css
        │
        ├── AIAnalysisView.jsx      ← Progress animation while backend processes
        ├── Analysis.css
        │
        ├── ResultsDashboard.jsx    ← Winner card + alternatives + review intel
        ├── Results.css
        │
        ├── Footer.jsx
        └── Footer.css
```

---

## 5. Component Breakdown

### `App.jsx` — State Machine Root
Controls the 4-state application flow (`home → inquiry → analyzing → results`). Owns all top-level state:
- `appState` — current screen
- `formData` — user inputs from the 3-step form
- `recommendation` — the result object (currently from `mockData.js`, future: from API)
- `darkMode` — applied as `data-theme="dark"` on `<html>` element

**Key logic:** `handleAnalysisComplete` is the integration point where the live API call will replace the mock data lookup.

---

### `Navbar.jsx`
- Sticky top bar with `backdrop-filter: blur(20px)` glassmorphism
- Brand logo with leaf icon and hover-rotate animation
- Navigation links with animated underline on hover
- Dark/light mode toggle button
- "Launch App" CTA button (triggers `handleStartInquiry` in parent)

**CSS:** `Navbar.css`

---

### `Hero.jsx`
The landing page split into two columns:

**Left column (content):**
- "Next-Gen Shopping AI" badge
- Large headline with `gradient-text` class
- CTA button and social-proof avatar stack
- Trust icons (Verified Reviews, Real-time Data)

**Right column (visual):**
- A glass-morphism showcase card with a mockup of the results UI (hero preview)
- Two **floating stat cards** with `framer-motion` `animate={{ y: [0, -15, 0] }}` infinite loops
- Radial gradient background ring for depth

**CSS:** `Hero.css` — contains `.hero-showcase-glass`, `.hero-floating-card`, floating card color variants (`.orange`, `.emerald`)

---

### `ProductInquiryForm.jsx`
A **3-step animated wizard** built with `AnimatePresence` for slide transitions.

| Step | Fields |
|---|---|
| **Step 1 — Category** | Card picker: Shampoo / Running Shoes / Laptop |
| **Step 2 — Personal Context** | Age, City, Climate (select), Budget |
| **Step 3 — Specific Requirements** | Dynamic fields from `mockData.categories[id].fields` + Brand Preference |

**Key features:**
- Progress tracker at top (3 bars, fill with CSS transition on step advancement)
- Category cards support selected state with emerald border + icon color change
- Form inputs use `:focus` state with `box-shadow: 0 0 0 4px rgba(16,185,129,0.1)`
- Submit fires `onSubmit(formData)` passed down from `App.jsx`
- Info footer card with Privacy First messaging

**Data dependency:** Reads `categories` array from `mockData.js` to render dynamic form fields.

**CSS:** `Form.css` — 300+ lines covering all step layouts, input states, progress bars, category cards

---

### `AIAnalysisView.jsx`
Displays while the system is "thinking." Currently **purely cosmetic** (mocked with `setInterval`).

**Visual elements:**
- Large Brain icon in an emerald gradient box with two rotating CSS rings (`spinDash` + `spinSolid` keyframes)
- Profile synthesis card (left) — shows the user's interpreted context
- Tracking system (right) — progress bar + step-by-step list that activates as `progress` increases

**Progress simulation:**
```js
setInterval(() => {
  setProgress(prev => prev + Math.random() * 6);
}, 180ms);
```
When `progress >= 100`, calls `onComplete()` after 1.2s delay.

**To-do for backend:** Replace the `setInterval` with a real `fetch` call and use `onComplete(result)` to pass data back up.

**CSS:** `Analysis.css` — covers rotating rings, synthesis card, tracking steps with active/inactive states

---

### `ResultsDashboard.jsx`
The final output screen, rendered when `appState === 'results'`. Receives a `recommendation` prop.

**Expected prop shape:**
```js
recommendation = {
  bestMatch: {
    name, brand, matchScore, price, image, aiExplanation,
    whyMatch: [],        // 3 bullet reasons
    pros: [],            // 3 bullet pros
    cautions: [],        // 2 bullet cautions
    reviewSummary: { sentiment, bestFor, praise, complaints },
    link                 // "Buy Now" redirect URL
  },
  alternatives: [
    { name, brand, matchScore, price, image, aiExplanation, link },
    { ... }
  ]
}
```

**UI sections:**
1. **Header** — "Neural Fit Optimization Complete" badge + title
2. **Winner Card** — Two-column grid: product image (with score badge + tags overlay) | product details (brand, name, AI quote, accuracy report, sentiment analysis, buy button)
3. **Intelligence Bar** — Market sentiment + Global Availability + Fit Category badges
4. **Alternatives Grid** — 2-column card layout with image thumbnail, score %, description, and arrow CTA

**CSS:** `Results.css` — the largest CSS file (~500 lines) covering the aura glow, winner card layout, intel bar, alt cards, and all dark mode overrides.

---

### `Footer.jsx`
Simple dark footer (`bg: slate-900`) with brand, two nav columns (Product, Company), and social links.

---

## 6. CSS Architecture

All styling is **pure Vanilla CSS** — no frameworks. Each component has a dedicated `.css` file imported directly in the JSX.

### Global Design System (`src/index.css`)

All tokens are defined as CSS Custom Properties:

```css
:root {
  /* Emerald Palette (11 shades) */
  --c-emerald-50 through --c-emerald-950

  /* Theme Mapping */
  --bg-main            → var(--c-slate-50)       [dark: var(--c-emerald-950)]
  --bg-surface         → var(--c-white)           [dark: var(--c-emerald-900)]
  --text-primary       → var(--c-emerald-950)     [dark: var(--c-emerald-50)]
  --text-secondary     → var(--c-slate-600)       [dark: var(--c-emerald-200)]
  --border-color       → var(--c-slate-200)       [dark: rgba(52,211,153,0.2)]

  /* Gradients */
  --grad-emerald       → linear-gradient(135deg, #10b981 → #059669)
  --grad-bg-glow       → radial-gradient at top-right

  /* Shadows (layered, emerald-tinted) */
  --shadow-sm / --shadow-md / --shadow-lg / --shadow-xl / --shadow-2xl
  --shadow-emerald-glow → 0 0 40px rgba(16,185,129,0.3)

  /* Typography */
  --font-main          → 'Inter', system-ui
  --font-heading       → 'Outfit', sans-serif

  /* Animations */
  --ease-spring        → cubic-bezier(0.175, 0.885, 0.32, 1.275)
  --ease-out-expo      → cubic-bezier(0.16, 1, 0.3, 1)
}
```

### Dark Mode
Applied by setting `data-theme="dark"` on `<html>`. All `[data-theme='dark']` overrides are co-located with their component CSS selectors for locality.

### Global Utility Classes
```css
.container        → max-width: 1280px, centered with padding
.section-padding  → padding-top/bottom: 6rem
.gradient-text    → Emerald gradient clipped to text
.glass-panel      → backdrop-blur(20px) + border + box-shadow
.btn-primary      → Gradient background CTA button with hover lift
```

---

## 7. Data Layer

### `src/data/mockData.js`

**1. `categories` array** — defines form fields per category:
```js
categories: [
  {
    id: 'shampoo',
    name: 'Shampoo',
    fields: [
      { id: 'scalpType', label: 'Scalp Type', type: 'select', options: [...] },
      { id: 'hairGoal',  label: 'Main Goal',  type: 'select', options: [...] }
    ]
  },
  // shoes (footType, usage)
  // laptop (performance, portability)
]
```

**2. `mockRecommendations` object** — static demo results keyed by category:
```js
mockRecommendations: {
  shampoo: {
    bestMatch: { name, brand, matchScore: 98, price, image, aiExplanation, whyMatch[], pros[], cautions[], reviewSummary, link },
    alternatives: [ { name, brand, matchScore, price, image, aiExplanation, link }, ... ]
  }
}
```

**Current state:** `App.jsx` calls `mockRecommendations[formData.category]` directly.  
**Future state:** `App.jsx` will `POST /api/recommend-product` and use the response instead.

---

## 8. App State Machine

```
┌──────────────────────────────────────────────────┐
│                    App.jsx                       │
│                                                  │
│  appState: 'home'                                │
│    ↓ onClick "Discover Your Match"               │
│  appState: 'inquiry'                             │
│    ↓ ProductInquiryForm.onSubmit(formData)       │
│  appState: 'analyzing'                           │
│    ↓ AIAnalysisView.onComplete()  ←──── TODO: real API call here
│  appState: 'results'                             │
│    ↓ ResultsDashboard.onReset()                  │
│  appState: 'home'                                │
└──────────────────────────────────────────────────┘
```

The `recommendation` state is set inside `handleAnalysisComplete`:
```js
// CURRENT (mock)
setRecommendation(mockRecommendations[formData.category] || mockRecommendations.shampoo);

// FUTURE (live API)
const res = await fetch('/api/recommend-product', { method: 'POST', body: JSON.stringify(formData) });
const data = await res.json();
setRecommendation(data.recommendation);
```

---

## 9. Design System

### Colors
The palette is a deep **Emerald Green** system:
- Primary action: `#10b981` (Emerald 500)
- Dark text: `#064e3b` (Emerald 950)
- Accent gradient: `135deg, #10b981 → #059669`
- Background glow: 5–8% opacity emerald radial gradient (fixed attachment)

### Typography
- **Headings:** Outfit — weight 800–900, letter-spacing `-0.03em`
- **Body:** Inter — weight 400–600, line-height 1.6

### Motion
- **Entry animations:** `framer-motion` `initial` → `animate` with `ease-out-expo` timing
- **Floating cards:** Infinite `y` keyframe loops (5s and 4s periods, offset by 1s delay)
- **CSS animations:** `spinDash` (10s) and `spinSolid` (15s, reverse) for analysis rings
- **Hover interactions:** `transform: translateY(-2px)` on primary buttons, `transform: translateY(-4px)` on category cards
- **Progress bars:** CSS `transition: width 1s ease-spring` on the form stepper

### Glassmorphism (`.glass-panel`)
```css
background: rgba(255, 255, 255, 0.7);
backdrop-filter: blur(20px);
-webkit-backdrop-filter: blur(20px);
border: 1px solid rgba(255, 255, 255, 0.5);
box-shadow: var(--shadow-xl);
```

---

## 10. Running Locally

### Prerequisites
- Node.js 18+
- npm 9+

### Steps

```bash
# Clone the repo
git clone https://github.com/Divyanshu-Off/ShopFree.git
cd ShopFree

# Install frontend dependencies
npm install

# Start Vite dev server
npm run dev
# → Opens at http://localhost:5173
```

> ⚠️ If you see a PowerShell execution policy error on Windows, run:
> ```powershell
> powershell -ExecutionPolicy Bypass -Command "npm run dev"
> ```
> Or permanently fix it with: `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser`

---

## 11. Planned Backend (Pending)

A full live recommendation backend has been designed but **not yet implemented**. The architecture is:

```
POST /api/recommend-product
       │
       ├── 1. queryBuilder.ts    → Generate 3–5 targeted search queries from user profile
       ├── 2. webSearch.ts       → Google Custom Search API (100 req/day free) → top URLs
       ├── 3. pageScraper.ts     → Fetch + Cheerio extract → ProductEvidence[]
       ├── 4. geminiRanker.ts    → Gemini 1.5 Flash with strict JSON response schema
       │                           (only ranks provided candidates, never invents products)
       └── 5. cache.ts           → LRU cache (1h TTL) keyed by hashed user profile
```

**Required environment variables (when backend is built):**
```
GEMINI_API_KEY=your_key_from_aistudio.google.com
GOOGLE_SEARCH_API_KEY=optional_for_live_search
GOOGLE_SEARCH_ENGINE_ID=optional_for_live_search
PORT=3001
```

**Gemini output schema (planned):**
```json
{
  "confident": true,
  "bestMatch": {
    "name": "...",
    "brand": "...",
    "fitScore": 94,
    "aiExplanation": "...",
    "reasons": ["...", "..."],
    "pros": ["...", "..."],
    "cautions": ["..."],
    "priceRange": "...",
    "redirectUrl": "...",
    "sourceEvidence": ["url1", "url2"]
  },
  "alternatives": [...]
}
```

---

## 12. Known Issues & Gaps

| Issue | Status | Notes |
|---|---|---|
| All results are hardcoded mock data | ⏳ Pending | Backend needed; `handleAnalysisComplete` in `App.jsx` is the integration point |
| `AIAnalysisView` fakes progress with a timer | ⏳ Pending | Must be replaced with a real `fetch` call to the backend |
| Only 3 product categories | ⏳ Pending | `mockData.js` categories array drives the form — easy to extend |
| No error state UI | ⏳ Pending | `App.jsx` needs an `error` state + error screen component |
| No loading state on Hero page | Minor | "15,000+ Smart Shoppers" is a static number |
| Product images are Unsplash placeholders | Minor | Real product images would come from scraped pages or a product API |
| `ResultsDashboard.jsx` line 129 uses `className="pt-6"` | Bug | This is a leftover non-functional Tailwind class — should be a real CSS class |

---

## License

MIT — see [LICENSE](./LICENSE)
