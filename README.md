# AL/IQ Research Dashboard

A static research dashboard for the Alabama IQ product build. It turns four source research documents into a navigable, visual brief covering onboarding UX, Digg's product architecture, Digg's frontend patterns, and detail-page interaction patterns that can inform the AL/IQ dashboard MVP.

## Live Project

This project is designed to run as a static site. Open `index.html` directly or serve the folder with any static file server.

## What It Contains

- `index.html` - single-page shell, design tokens, responsive CSS, and CDN script imports.
- `app.jsx` - React app shell, sidebar navigation, theme persistence, and hash-based routing.
- `components.jsx` - shared visual components such as KPI tiles, segmented meters, charts, section headers, and document chrome.
- `pages.jsx` - the five dashboard routes: overview plus four research sections.
- `uploads/` - original research source files and exported HTML.

## Dashboard Sections

1. **Overview** - consolidates the four documents into the core AL/IQ product implications.
2. **Onboarding Patterns** - synthesizes Mercury, Masterclass, Anthropic, and broader onboarding research into a five-step AL/IQ onboarding recommendation.
3. **Digg Architecture** - documents Digg's modern AI signal-board architecture, stack, content model, scoring system, and distribution choices.
4. **Digg Frontend** - breaks down visual language, token choices, typography, score visualization, story card anatomy, and feed chrome.
5. **Detail Page Inspection** - captures detail-page patterns such as source embeds, sentiment presentation, persistent Q&A depth, and restrained CTA usage.

## Key Product Findings

- The term **Gravity Score** is validated by Digg's use of "gravity" as an influence metric.
- AL/IQ should decompose Gravity into multiple visible axes instead of hiding everything behind one rolled-up score.
- Onboarding should be a five-step, role-first assessment: role, signal priorities, cadence, email capture, and personalized reveal.
- AL/IQ should invert Digg's distribution model: email-first and newsletter-first instead of X-only auth and X-only distribution.
- Detail pages should compound value through source-scoped Q&A that persists publicly over time.

## Run Locally

Because the app uses JSX in the browser through Babel Standalone, no build step is required.

```bash
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

You can also open `index.html` directly in a browser, though a local server better matches hosted behavior.

## Technical Notes

- React 18, ReactDOM, and Babel Standalone are loaded from `unpkg.com`.
- Routing is handled with URL hashes, for example `#overview` and `#frontend`.
- Theme preference is saved to `localStorage` under `aliq-theme`.
- The site is static and can be hosted on here.now, GitHub Pages, Netlify, Vercel static output, or any file server.

## Source Research

The source research files live in `uploads/`:

- `onboarding_patterns.md`
- `digg_architectural_research.md`
- `digg_frontend_research.md`
- `digg_detail_page_inspection.md`

## Deployment

Publish the folder root so `index.html` is at the hosted root:

```bash
/Users/justinragland/.agents/skills/here-now/scripts/publish.sh . --client codex
```

Do not commit `.herenow/state.json`; it may contain anonymous claim metadata.
