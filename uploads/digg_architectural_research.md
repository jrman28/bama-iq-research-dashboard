# Digg.com Architectural Research

**Research date:** 2026-05-22
**Researcher:** Claude Opus 4.7 via Claude in Chrome MCP
**Target:** https://digg.com (operating company: Basic Intelligence Inc.)
**Purpose:** Identify emulation opportunities for Alabama IQ

---

## Executive Summary

1. **Digg is no longer a general news aggregator** — it has been reborn as a vertical AI-Twitter signal board ("AI news, before it trends"). The corporate entity is **Basic Intelligence**, and Digg is the consumer-facing product. Domain `digg.com` auto-redirects to `/ai`.

2. **They use the word "gravity"** for their scoring system — identical to Alabama IQ's Gravity Score. Top influencer Andrej Karpathy carries "Following gravity: 10.000"; Jeff Dean carries "9.522". The product validates Alabama IQ's central metaphor at the brand level.

3. **The core algorithm is recursive PageRank** on a ~9M-edge X follow graph across ~2,000 tracked accounts ("The AI 2K"), with **voice-diversity weighting** so a single person repeating themselves can't dominate. This is a sharper, more defensible algorithm than Alabama IQ's current 3-axis Gravity Score.

4. **The stack is opinionated and tight:** Next.js (Turbopack) on Vercel, Clerk for X-only OAuth, Jotai for state, Sentry for errors, **PostHog for everything else** (analytics, session recording, surveys, feature flags, web vitals, error autocapture) — proxied through `db.basic.in` to bypass ad blockers. No GA, no GTM, no Segment, no Mixpanel.

5. **They run zero distribution channels other than X and SEO.** No newsletter, no about page, no pricing page (all 404). X is the sole identity provider and the sole distribution channel. This is the inverse of Alabama IQ's newsletter-first strategy — both can be right for different audiences.

---

## 1. Tech Stack

### Frontend
- **Next.js 15+ with Turbopack** — `_next/static/chunks/turbopack-*.js`, `NEXT_DEPLOYMENT_ID`, `__next_f`, `next-size-adjust` meta tag, React Server Components streaming markers (`$RB`, `$RC`, `$RV`)
- **React Server Components / App Router** — confirmed by streaming markers and chunk URL patterns
- **Tailwind CSS** — utility classes (`mt-12 flex flex-wrap items-center gap-x-2 font-mono text-[11px] text-muted-foreground` in footer), `dark` mode class on `<html>`
- **Jotai** for client state — `__JOTAI_DEFAULT_STORE__` global

### Fonts
Four custom font variables loaded on `<html>`:
- **Roobert** (display)
- **Roobert Mono** (utility/numbers)
- **IBM Plex Sans** (body, secondary)
- **VT323** (terminal/glitch aesthetic, used selectively)

### Hosting & CDN
- **Vercel** — deployment ID format `dpl_5ScQ888XpCQgnSYLQ31f3Qb4F9Qq` is Vercel's signature
- **Vercel Blob Storage** for media — author avatars at `cnl5taoq5on9lswk.public.blob.vercel-storage.com/authors/{twitter_id}/avatar-{hash}.jpg`; generated share cards at `cnl5taoq5on9lswk.public.blob.vercel-storage.com/cluster-share-cards/{cluster_uuid}/{ts}.png`

### Auth
- **Clerk** — `clerk.digg.com` subdomain (CNAME), `webpackChunk_clerk_clerk_js`, `__clerk_publishable_key`, version 6.12.0
- **X / Twitter is the only auth provider** — no email, no Google, no Apple. The sign-in page reads literally: *"Continue with X to finish signing in."*

### Observability
- **Sentry** — `__SENTRY__`, sentry-trace + baggage meta tags on every page; `sentry-environment=production, sentry-release=a3b04a13eba15aec6bc6d35928173f69c00da063`
- **PostHog** — everything else (see Analytics section)

---

## 2. Content Architecture

### Core entities

| Entity | Internal name | URL pattern |
|---|---|---|
| Story | "cluster" | `/ai/{uuid}` canonical to `/ai/{8-char-slug}` |
| User profile | "user" | `/u/x/{twitter_handle}` |
| Influencer rank page | "rankings" | `/rankings/{twitter_handle}` |
| Category index | — | `/ai/x/rankings/{category}` |

### The ranking algorithm (from llms.txt, verbatim source)

> *"Recursive PageRank over an ~9M-edge follow graph. A follow from a top-ranked account contributes more weight than a follow from an unranked account. Politicians are scored on a decoupled list (not PageRank) counting only how many AI 2K members follow them."*

Key properties:
- **PageRank** over a follow graph (not engagement, not recency-decayed votes)
- **Eigenvector-weighted** — top-ranked accounts' follows count more
- **Voice-diversity weighting** prevents a single person from dominating any cluster
- **Decoupled scoring per category** — politicians scored differently than researchers
- **Rolling rebase** — recomputed continuously; "last rebase" timestamp shown on every ranked page

### Story cluster model

A story is not a single article — it is a **cluster of related X posts about the same event/topic**, with:
- A long descriptive headline (not click-bait — e.g. "*OpenAI reports its internal general-purpose reasoning model found new point configurations for the Erdős planar unit distance problem that outperform prior square-grid optima*")
- A single-sentence human-detail subtitle (e.g. "*Lijie Chen, recently from UC Berkeley, contributed during exploratory testing.*")
- The original post and its author
- A "Reposted by" list of all amplifiers, each with their global Digg rank and Twitter handle
- Engagement metrics from X (impressions, likes, retweets, replies)
- A generated 1200×630 share card

---

## 3. Homepage and Feed UX

### Layout (desktop)
- Top bar: hamburger (mobile) / nav, Digg wordmark home link, account menu, search icon
- Three-tab segmented control: **Top Stories** / **GitHub** / **Rankings**
- Time toggle below tabs: **Today** / **7-days**
- Feed of `<article>` cards (~28 visible on initial render)

### Story card anatomy
1. **Rank position** (`#1`, `#2`, `#3` … in current view)
2. **State badge** — `LIKED` (or similar status keyword)
3. **Engagement total** — big number (e.g. `13.6K`)
4. **Headline** — full descriptive sentence
5. **Top 5 contributor avatars** — each with rank (e.g. `#43`) and handle (`@CHRSZEGEDY`)
6. **"View all N contributors"** link

### Navigation philosophy
The entire site has exactly three top-level routes: **Stories / GitHub / Rankings**. There is no About, no Pricing, no Newsletter, no Blog, no Team. Every cut from the nav is a deliberate signal: *"This is what we do; nothing else."*

---

## 4. Content Detail Pages

### URL structure
- Initial UUID URL: `/ai/f627cdfc-5fc4-45d3-8b05-d10a6428a671`
- Canonical short URL: `/ai/723s10lf`
- Both resolve; `<link rel="canonical">` points to the short.

### JSON-LD structured data
Every detail page emits two `<script type="application/ld+json">` blocks:

**Block 1 — NewsArticle:**
```json
{
  "@context": "https://schema.org",
  "@type": "NewsArticle",
  "headline": "...",
  "description": "...",
  "url": "https://digg.com/ai/{slug}",
  "mainEntityOfPage": { "@type": "WebPage", "@id": "..." },
  "datePublished": "ISO-8601",
  "dateModified": "ISO-8601",
  "author": [
    { "@type": "Person", "name": "Jakub Pachocki", "url": "https://digg.com/u/x/merettm", "sameAs": ["https://x.com/merettm"] },
    ...
  ]
}
```

**Block 2 — Organization + WebSite graph** (on every page):
```json
{
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Organization", "@id": "https://digg.com#organization", "name": "Basic Intelligence", "url": "https://digg.com", "slogan": "AI news, before it trends", "sameAs": ["https://x.com/basic_in_"] },
    { "@type": "WebSite", "@id": "https://digg.com#website", "name": "Digg", "alternateName": "DI.GG", ... }
  ]
}
```

### Open Graph + Twitter Cards
- `og:image` — generated share card (1200×630) per cluster
- `og:type` — `article`
- `article:published_time` / `article:modified_time`
- `twitter:card` — `summary_large_image`
- `twitter:site` / `twitter:creator` — `@basic_in_`

### Detail page sections (H2 headings)
1. **(headline)** — H1
2. **Sentiment** — sentiment summary of the cluster's posts
3. **Digg Depth** — editorial deep-dive (their signature section)
4. **Sentiment** (appears again, likely per-faction breakdown)

### Per-story AI chatbot
Every detail page has a textbox: *"Ask a question about the story"*. Submitting calls `GET /api/story-ai-responses?clusterId={uuid}` — an LLM answers questions scoped to the cluster's source material.

---

## 5. The Rankings Page (the heart of the product)

URL: `/rankings`

### Header copy
> *"Influencer Rankings"*
> *"Who the smartest people on X are paying attention to"*
> *"Open any ranked user to see their full profile and which influential accounts follow them."*
> *"Last updated: 5d ago · 1989 influencers tracked · 3000 ranked users"*

### Filterable categories
13 buttons: **All Categories / Politician / Founder / Researcher / Engineer / Executive / Investor / Creator / Policy / Company / AI Safety / Res. Engineer / Open Source / Academic**

### Per-influencer card
- Rank number (1, 2, 3…)
- Avatar (or initials when no avatar)
- Display name + handle
- Category badge ("Res. Engineer")
- Bio (truncated)
- **"Followed by 1318"** — count of AI 2K members who follow them
- **"Following gravity: 10.000"** — their gravity score (PageRank value)
- Raw X follower count

### The metric name
"**Following gravity**" — Digg uses the literal word "gravity" for their PageRank value. Alabama IQ's "Gravity Score" naming is directly aligned with a working product in the same conceptual space.

---

## 6. GitHub Stars Page (multi-axis scoring)

URL: `/ai/github/stars`

Sub-navigation: **STARS** / **NEW** / **ACTIVITY** / **FEED** / **RECENT**

### Header stats
- `TRACKING: 1,962` — repos under observation
- `STARS TODAY: 11` — repos starred by AI 2K members today
- `STAR CONTRIBUTORS: 5` — AI 2K members who starred today

### Per-repo card — and the killer detail for Alabama IQ
Each repo card shows **three scores** stacked:
- **AI SCORE: 10**
- **BREAKOUT POTENTIAL: 4**
- **NOVELTY: 6**

Plus repo description, star count, time delta, and which AI 2K member starred (with their rank and handle).

This is a **3-axis editorial score per item** — exactly the structural pattern Alabama IQ's Gravity Score uses (Source Credibility + Local Economic Impact + Recency), but with different axes. Adding axes like "Breakout Potential" and "Novelty" to local signals is a defensible extension.

---

## 7. Newsletter System

**There is no newsletter.** `/newsletter` returns 404. `/about` returns 404. `/pricing` returns 404.

Their entire distribution model is:
1. **X / Twitter** — they ARE the X meta-layer, so X is both source and destination
2. **SEO** — robots.txt allows all crawlers; sitemap.xml + news-sitemap.xml exposed; comprehensive JSON-LD on every page
3. **llms.txt** — explicit instructions to AI agents (Claude, Perplexity, etc.) about how to cite Digg

The radical absence of a newsletter is itself the finding. **Digg's audience lives on X**, so they meet them there. **Alabama IQ's audience lives in email** (B2B Huntsville professionals reading at 7am), so the right answer is the opposite. Both products are right for their audience.

---

## 8. Analytics and Event Tracking

### The full observability stack — ALL on PostHog
Self-hosted/proxied through `db.basic.in` (CNAME for app.posthog.com or similar):

| Capability | Script | Endpoint |
|---|---|---|
| Core analytics events | array config + `/e/` POST | `db.basic.in/array/phc_pmZvub6axyruHPGPs7CQb3ajyAHKRPt7h7zErRwahM9P/config.js` |
| Web Vitals | `web-vitals.js` | `db.basic.in/static/web-vitals.js` |
| Error autocapture | `exception-autocapture.js` | `db.basic.in/static/exception-autocapture.js` |
| Dead-click autocapture | `dead-clicks-autocapture.js` | `db.basic.in/static/dead-clicks-autocapture.js` |
| Session recording | `posthog-recorder.js` | `db.basic.in/static/posthog-recorder.js` |
| Surveys | `surveys.js` | `db.basic.in/static/surveys.js` |
| Conversations | `conversations.js` | `db.basic.in/static/conversations.js` |
| Feature flags | `/flags/` POST | `db.basic.in/flags/?v=2&compression=base64` |
| Event ingest | `/e/` and `/i/v0/e/` POST | gzip-js compression |

### What's NOT here
- ❌ Google Analytics / GA4
- ❌ Google Tag Manager
- ❌ Segment
- ❌ Mixpanel
- ❌ Amplitude
- ❌ Hotjar
- ❌ FullStory

**PostHog absorbs the entire analytics + session replay + survey + feature-flag layer.** This is a strong consolidation play.

### Error monitoring
- **Sentry** — `o4511323215167488.ingest.us.sentry.io` — runs alongside PostHog for proper stack-trace capture in production

---

## 9. Monetization

**None visible.** All commercial routes (`/pricing`, `/about`) return 404. No ads, no paywall, no sponsored content labels, no subscription gate. The product is currently free.

This points to a VC-backed runway model: build the index, establish citation authority (the llms.txt is unambiguously a play for AI-agent citation), then monetize later — probably via API access or premium analytics for AI-adjacent businesses.

---

## 10. Performance Signals

- **Vercel Edge Network** for asset delivery
- **Per-author avatar preload links** — every initial render includes `<link rel="preload">` for visible author avatars (huge for LCP on a card-heavy feed)
- **Static chunks** for Next.js — deployment-ID-suffixed for cache busting (`?dpl=dpl_5ScQ888...`)
- **Turbopack** for the build — generally faster builds and smaller chunks vs Webpack
- **Streaming SSR** via React Server Components — first byte includes layout shell before data hydrates

---

## 11. SEO and AI Discoverability

### robots.txt
```
User-Agent: *
Allow: /
Disallow: /digg-admin/
Disallow: /api/

Host: https://digg.com
Sitemap: https://digg.com/sitemap.xml
Sitemap: https://digg.com/news-sitemap.xml
```
Permissive by default, including for AI crawlers. Two sitemaps (regular + news-specific).

### sitemap.xml — URL hierarchy
```
/ai                                    hourly      priority 1.0
/ai/x/rankings                         daily       priority 0.8
/ai/github/stars                       daily       priority 0.7
/ai/github/new                         daily       priority 0.6
/ai/x/rankings/companies               daily       priority 0.6
/ai/x/rankings/politicians             daily       priority 0.4
... per-cluster URLs ...
```

### llms.txt — explicitly written for AI agents
The file is a polished, brand-aligned set of instructions to AI search agents:
- One-line summary at the top
- Sectioned: "What Digg publishes" / "Canonical URLs" / "Data freshness" / "How the ranking works" / "Organization" / "Citation"
- Explicit citation instructions: *"When referencing rankings or trends from Digg, cite the canonical URL, the rebase timestamp shown in the page header, and the ranking method (PageRank for the AI 2K; direct follow counts for politicians/companies)."*

This is best-in-class llms.txt execution. Alabama IQ has an llms.txt as of 2026-04-19 but should benchmark against this.

---

## 12. Alabama IQ Emulation Opportunities

This is the synthesis. Below are 8 concrete, prioritized items.

### TOP 5 TO ADOPT

#### A. Adopt multi-axis scoring on every signal card (P0)
Digg shows **three scores per item** on GitHub cards: `AI SCORE / BREAKOUT POTENTIAL / NOVELTY`. Alabama IQ should make the three axes that *compose* the Gravity Score (Source Credibility + Local Economic Impact + Recency) **visible per signal**, not just the rolled-up G score. This:
- Makes the score legible (the reader can see why a signal is hot)
- Creates more search and filter dimensions
- Lets us add new axes over time (e.g. "Capital at Stake" for CRE signals, "Headcount Impact" for defense contractor signals)

#### B. Adopt voice-diversity weighting in the Gravity algorithm (P0)
Digg's voice-diversity weighting *"so a single person repeating themselves doesn't dominate"* is exactly the failure mode Alabama IQ will hit when one source (e.g. al.com, or one BD director) repeats a story. Build this into the scoring algorithm before launch:
- A signal needs N independent sources to cross a Gravity threshold
- Repeated mentions from the same source decay
- Lateral confirmation from different source types (gov filing + news article + LinkedIn post) boosts more than three news articles

#### C. Adopt the per-signal AI chatbot ("Ask a question about this signal") (P1)
Every Digg detail page has a built-in chatbot scoped to that cluster: `GET /api/story-ai-responses?clusterId={uuid}`. For Alabama IQ B2B readers, this is a 10x feature:
- "What's the BD angle here?"
- "Has L3Harris hired in Madison County before?"
- "What's the timeline on this contract?"
The chatbot is scoped to the signal's source documents (council minutes, press releases, contract awards), making it grounded and citation-able. This is a defensible product moat for B2B.

#### D. Adopt the llms.txt format and citation policy (P1)
Digg's llms.txt is the template. Rewrite Alabama IQ's llms.txt to match the structure:
1. One-line summary
2. What Alabama IQ publishes (signal categories)
3. Canonical URLs
4. Data freshness statement (refresh cadence)
5. How the Gravity Score works (publishable methodology)
6. Citation instructions

For B2B credibility, the methodology section especially matters — it positions Alabama IQ as a research product, not a content site.

#### E. Adopt the editorial voice and headline pattern (P1)
Digg headlines are **long, complete sentences** with technical specificity — the *opposite* of clickbait. Example: *"OpenAI reports its internal general-purpose reasoning model found new point configurations for the Erdős planar unit distance problem that outperform prior square-grid optima."* And the subtitle is always one specific human detail.

For Alabama IQ B2B audience, this is the right voice. Not *"Huntsville's hottest defense deal!"* — instead *"L3Harris awarded $128M Aegis system upgrade contract for FY27 with delivery target of Q2 2027 to Redstone Test Center."* The audience rewards specificity.

### TOP 3 TO REJECT (Digg patterns that are wrong for Alabama IQ)

#### F. Do NOT make the newsletter optional or absent (CRITICAL)
Digg has no newsletter. Alabama IQ's audience is the opposite of Digg's audience — Alabama IQ readers live in their inbox at 7am with coffee, not on X. The newsletter must remain the primary distribution channel and the homepage should support newsletter signup as the dominant CTA. Loops + Convex is the right pairing.

#### G. Do NOT use X-only auth
Digg uses X-only Clerk OAuth because their entire identity model is "you are your X handle." Alabama IQ's audience may not have an X account at all. Auth should be email-first (magic link). If we want social proof of B2B identity later, layer LinkedIn OAuth on top — never X.

#### H. Do NOT hide pricing
Digg has no pricing page because they're pre-monetization. Alabama IQ is a B2B subscription product. The pricing page is a trust signal for the buyer — leaving it 404 would read as unfinished. Even a single-tier pricing page ("Founding Member, $X/mo") at launch is correct.

### STACK NOTES (not directly emulation, but informative)

- **Consolidate analytics on PostHog.** Digg runs everything (analytics, session replay, surveys, feature flags, web vitals, error autocapture, dead-click autocapture) through PostHog with a CNAME-proxy to bypass ad blockers. For Alabama IQ this is a fraction of the cost and cognitive load of running GA4 + Hotjar + Statsig + Sentry separately. Keep Sentry for stack-trace fidelity; everything else → PostHog.
- **Vercel Blob Storage for generated share cards.** Per-signal OG image cards generated at write-time and stored in blob storage. This dramatically improves social-share appearance on LinkedIn. Convex file storage can serve the same role.
- **Tailwind + custom serif/mono font pair** matches Alabama IQ's brand direction.
- **Next.js with App Router and RSC streaming SSR** is worth re-evaluating vs the current Vite SPA — RSC is meaningfully better for SEO on a content product with crawlable per-signal pages, which is critical for the pSEO strategy.

---

## 13. Key Numbers from this Research

| Metric | Value |
|---|---|
| Ranked influencers | 1,989 (header) / 3,000 (full list) |
| Follow graph edges | ~9,000,000 |
| Algorithm | Recursive PageRank + voice-diversity weighting |
| Story refresh cadence | Hourly or faster |
| Rankings rebase cadence | Rolling (5d ago last seen) |
| Categories | 13 (incl. All) |
| GitHub repos tracked | 1,962 |
| Top contributor gravity | 10.000 (Karpathy) |
| #2 gravity | 9.522 (Jeff Dean) |

---

## 14. Open Questions for Further Research

1. **What's in the "Digg Depth" section?** — Editorial deep dive per cluster; couldn't fully extract due to renderer lock on the test page. Likely worth a manual read of 3-5 examples to understand voice and length.
2. **How are clusters detected?** — Likely embedding-based clustering of post text; would benefit from a focused investigation if Alabama IQ pursues a similar "signal cluster" approach to dedupe local press coverage of the same event.
3. **What does the X auth onboarding flow ask for?** — Specifically what scopes Clerk requests from X. Could inform whether Alabama IQ ever offers an optional LinkedIn connect for richer profile signals.
4. **Search behavior** — There's a search icon but search wasn't tested; how does query → cluster matching work?
5. **Rate limits and crawling** — API at `/api/` is disallowed in robots.txt but `/api/trending/status` and `/api/story-ai-responses` are publicly callable. Any rate limits?

---

## Appendix: Raw URL Inventory

| Surface | URL |
|---|---|
| Home / AI stream | https://digg.com/ai |
| AI rankings | https://digg.com/rankings (and /ai/x/rankings) |
| Companies rankings | https://digg.com/ai/x/rankings/companies |
| Politicians rankings | https://digg.com/ai/x/rankings/politicians |
| GitHub stars feed | https://digg.com/ai/github/stars |
| GitHub new feed | https://digg.com/ai/github/new |
| Story cluster (UUID) | https://digg.com/ai/{uuid} |
| Story cluster (short) | https://digg.com/ai/{8-char-slug} |
| User profile | https://digg.com/u/x/{handle} |
| Sign in | https://digg.com/login |
| Privacy | https://digg.com/privacy |
| Terms | https://digg.com/tos |
| robots.txt | https://digg.com/robots.txt |
| llms.txt | https://digg.com/llms.txt |
| sitemap.xml | https://digg.com/sitemap.xml |
| news-sitemap.xml | https://digg.com/news-sitemap.xml |
| Auth (Clerk) | https://clerk.digg.com |
| Analytics proxy | https://db.basic.in |
| Asset storage | https://cnl5taoq5on9lswk.public.blob.vercel-storage.com |
| Sentry | https://o4511323215167488.ingest.us.sentry.io |
| Mascot SVG | https://digg.com/diggler/little-dude.svg |
| Story AI chat API | https://digg.com/api/story-ai-responses?clusterId={uuid} |
| Trending status API | https://digg.com/api/trending/status |

---

**End of report.**
