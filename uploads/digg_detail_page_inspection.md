# Digg.com Story Detail Page — Fine-Grained Inspection

**Research date:** 2026-05-22
**Researcher:** Claude Opus 4.7 via Claude in Chrome MCP (Dia browser)
**Target:** https://digg.com/ai/723s10lf (OpenAI Erdős conjecture story)
**Companion to:** `digg_architectural_research.md` and `digg_frontend_research.md`
**Purpose:** Close the detail-page gap with computed-style measurements (PostHog renderer-lock workaround applied)

---

## Methodology Note

The detail page renderer locked twice in prior runs because `posthog-recorder.js` grabs the CDP connection on page load. This run worked around it by:

1. Switching browser instance to **Dia** (clean MCP context, no tab pollution)
2. Injecting `window.posthog.opt_out_capturing()` and `window.posthog.stop_session_recording()` immediately after navigate, before any inspection
3. Running comprehensive single-shot extractors via `getComputedStyle()`

**Result:** Full computed-style data captured on the first attempt. No screenshots needed — inspection is more valuable than visual capture for design system replication.

---

## 1. Page Architecture

### Layout grid
The detail page uses a **12-column responsive grid**:
- Main content: `col-span-12 sm:col-span-7` (full width mobile, 7/12 on sm+)
- Right column: assumed `col-span-12 sm:col-span-5` (Sentiment, Digg Depth, chatbot live here)

Main content width on the test viewport: **615px**.
Right column width: **433px**.

---

## 2. Headline & Subtitle (Editorial Typography)

### H1 — Story headline
```
Class: mb-4 text-balance wrap-anywhere font-sans text-3xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-4xl
```

| Property | Value |
|---|---|
| Font family | **roobert (sans)** — breaks from mono body default |
| Font size | **36px** desktop (sm:text-4xl) / 30px mobile (text-3xl) |
| Font weight | **700** |
| Line height | **39.6px** (1.1) |
| Letter spacing | **-0.9px** (tight, tracking-tight) |
| Color | `--foreground` cream |
| Margin bottom | 16px (mb-4) |
| `text-wrap` | **balance** — better last-line distribution |
| `overflow-wrap` | **anywhere** — handles long words/URLs gracefully |

### Subtitle (P) — One-sentence human-detail lede
```
Class: mb-5 text-pretty wrap-anywhere font-sans text-base leading-relaxed text-muted-foreground sm:text-lg
```

| Property | Value |
|---|---|
| Font family | **roobert (sans)** — same as H1, not mono |
| Font size | **18px** desktop (sm:text-lg) / 16px mobile |
| Font weight | 400 |
| Line height | **29.25px** (1.625 — leading-relaxed) |
| Color | muted-foreground |
| Margin bottom | 20px (mb-5) |
| `text-wrap` | **pretty** — better line balancing for prose |

**Key insight:** Detail page editorial copy (H1 + subtitle) uses **roobert sans** at larger sizes, while feed cards use 14px sans. The 18px subtitle with 1.625 line-height is "reading mode" typography.

---

## 3. Engagement Metrics Row

```
Class: mb-9 flex flex-wrap items-center gap-x-10 gap-y-2 font-mono text-sm leading-5 text-muted-foreground
```

| Property | Value |
|---|---|
| Font family | roobertMono |
| Font size | **14px** |
| Font weight | 400 |
| Line height | 20px |
| Color | muted-foreground |
| Layout | flex flex-wrap |
| Gap | **8px row / 40px column** (gap-y-2 / gap-x-10) |
| Margin bottom | 36px (mb-9) |

Values seen: `4.7K | 114.4K | 12.1K | 26.9K | 26.2M` — likely Replies / Likes / Reposts / Bookmarks / Impressions.

---

## 4. Original Post — The `<fieldset>` Pattern (BEAUTIFUL)

Digg renders the source tweet inside a semantic `<fieldset>` with a `<legend>` that "punches through" the border. This is rare, accessible HTML done right.

### Fieldset container
```
Class: rounded-md border border-border p-4 sm:p-6
```

| Property | Value |
|---|---|
| Tag | `<fieldset>` |
| Border | **1px solid border** |
| Border radius | **8px** (rounded-md) |
| Padding | 16px mobile / 24px desktop |

### Legend ("Original post" label)
```
Class: ml-3 bg-background px-2 font-mono text-xs font-semibold uppercase leading-none tracking-[0.1em] text-muted-foreground
```

| Property | Value |
|---|---|
| Tag | `<legend>` |
| Font family | roobertMono |
| Font size | **12px** |
| Font weight | 600 |
| Letter spacing | **0.1em** (very wide tracking) |
| Text transform | uppercase |
| Background | `--background` (matches page bg — punches through the fieldset border) |
| Padding | 0 8px |
| Margin left | 12px |

**Why this matters:** `<fieldset>` + `<legend>` is the *correct* semantic HTML for grouped content with a heading. Most teams use a `<div>` with absolute-positioned heading. Digg uses the native browser pattern with a thin border + background-matched legend punching through. Accessible, beautiful, retro-feeling.

### Alabama IQ application
Use this exact pattern for **embedded source documents** on signal pages:
- "Original filing" — for SEC filings
- "Council excerpt" — for Madison/Huntsville city council minutes
- "Press release" — for vendor/agency announcements
- "Contract text" — for DoD/DoE awards

```html
<fieldset class="rounded-md border border-border p-4 sm:p-6">
  <legend class="ml-3 bg-background px-2 font-mono text-xs font-semibold uppercase 
                 leading-none tracking-[0.1em] text-muted-foreground">
    Original filing
  </legend>
  <!-- source content -->
</fieldset>
```

---

## 5. "Reposted by" — Amplifier List

### Container
```
Class: flex flex-wrap items-center gap-3 border-y border-foreground/10 py-3
```

| Property | Value |
|---|---|
| Layout | flex flex-wrap, centered |
| Gap | 12px |
| Border | **top + bottom**, 10% opacity foreground |
| Padding | 12px vertical, 0 horizontal |

### Label
12px mono uppercase, tracking-wide, muted-foreground.

### Amplifier chips
```
Class: relative inline-flex flex-wrap items-center gap-x-1.5 gap-y-1
```

Very tight gap (**4px row / 6px column**) — chips pack tightly. Each chip is an avatar + initials + `#rank` + handle, separated by `|` pipe characters at 30% opacity.

348px tall in the test page (many amplifiers).

### Alabama IQ application
For "Signal sources" or "Amplified by" sections on a Gravity Score detail page, use the same pattern: top-and-bottom border isolation, tight packing of source chips. Works perfectly for "Reported by: al.com, WHNT, Madison BJ, ..."

---

## 6. Sentiment Section

### Structure
- H2 heading in a `flex items-center justify-between` container (right side has data)
- Below: `flex flex-col gap-6` (vertical stack, **24px gaps**)

### Content layout (verbatim from test page)
```
Sentiment                              [right-side: %/numbers]
Pos  64.2%
Neg  35.8%
Positive users praise OpenAI models and researchers for disproving 
the Erdős unit distance conjecture...
```

| Property | Value |
|---|---|
| H2 | 16px roobert 700 |
| Sentiment numbers | mono, sized like body |
| Description paragraph | mono, muted-foreground |
| Gap between numbers and explanation | 24px |

**Critical observation:** No chart. No bar graph. No pie. Just **two percentages (Pos / Neg)** and a written narrative summary. This is editorial confidence — they trust the words to do the work.

### Alabama IQ application
For Alabama IQ signals, show numeric data + a narrative paragraph rather than charts:
- "Local impact: 64% economic, 36% civic" + narrative
- "Source distribution: 3 sources confirmed, 2 corroborating" + narrative

Numbers are present but not visualized. This is appropriate for a **research-grade B2B product**.

---

## 7. Digg Depth Section — The Community Q&A

### Container structure
```
H2 "Digg Depth"
└── div.space-y-4 (16px vertical gaps)
    └── div.divide-y.divide-border  (horizontal lines between items)
        ├── Q&A pair 1
        ├── Q&A pair 2
        └── ...
```

### What each Q&A pair contains (decoded from test page)
```
4               ← count badge / order
SN              ← asker's initials avatar
Sheing Ng       ← asker's name
asked            
What's Erdős Unit Distance Conjecture?     ← user question
The Erdős unit distance conjecture, posed   ← AI-generated answer
by Paul Erdős in 1946, asks how often a 
unit distance can occur among n points...
```

**The pattern:** Users ask questions about the story → AI answers using the story's source material → answers are *persisted publicly* on the page → the page grows in value over time.

### Why this is the most important pattern in the entire site

Every story becomes a **wiki entry that compounds**. Each reader's question + AI answer becomes a permanent enhancement to the story page. This:
- Improves SEO (more long-tail questions answered)
- Builds defensibility (over time, the answer pool becomes irreplaceable)
- Provides social proof (you can see what others asked)
- Reduces re-question friction (someone else may have already asked your question)

### Alabama IQ application — adopt this immediately

For each Alabama IQ signal (a contract award, a council vote, a property deal), expose:
```
Signal Depth

JK  Justin K asked
    Has this contractor worked on Redstone before?
    
    Yes. According to Award #W56HZV-19-D-0006, [Vendor] received
    a 5-year IDIQ contract from Redstone Test Center in 2019...

KC  Kristina C asked  
    What's the Aegis upgrade timeline?
    
    The contract specifies a Q2 2027 delivery target...
```

Each question + AI answer (scoped to the signal's source documents) persists. Use the same `space-y-4` + `divide-y divide-border` structure.

---

## 8. AI Chatbot Input — The Hero Interaction Element

This is the boldest UI element on the entire site — the only place primary orange (`--primary: #da702c`) is used as a button background.

### Outer card (the "input pill")
```
Class: overflow-hidden rounded-3xl border border-border bg-background shadow-sm
```

| Property | Value |
|---|---|
| Border radius | **32px** (rounded-3xl) — the ONLY place we see this radius |
| Border | 1px solid border |
| Background | matches page (`--background`) |
| Shadow | `shadow-sm` (subtle) |

### Inner form
```
Class: flex min-h-14 items-center gap-2 bg-background p-2
```

| Property | Value |
|---|---|
| Layout | flex centered, items aligned |
| Min height | **56px** (min-h-14) |
| Padding | 8px |
| Gap | 8px |

### Input field
```
Class: w-full rounded-lg border-input py-1 text-base ... placeholder:text-muted-foreground focus-visible:ring-ring/50
```

| Property | Value |
|---|---|
| Font family | roobertMono |
| Font size | **14px** (text-base in app context) |
| Padding | 4px / 12px |
| Border radius | 12px (rounded-lg) |
| Height | 36px |
| Background | ~3% white (very subtle) |
| Focus ring | `--ring` color (which IS `--primary` orange) |

### Submit button — THE HERO ELEMENT
```
Class: flex size-9 shrink-0 items-center justify-center rounded-full transition-colors 
       focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 
       bg-primary text-primary-foreground hover:bg-primary/90
```

| Property | Value |
|---|---|
| Size | **36×36px** (size-9) |
| Shape | **rounded-full (perfect circle)** |
| Background | **`--primary` (#da702c warm orange)** |
| Foreground | dark (primary-foreground) |
| Hover | bg-primary/90 (10% darker) |
| Focus | 3px ring at primary/50 opacity |

### Why this matters
Across every Digg page inspected, **primary orange `#da702c` is used as a button background exactly once: this submit arrow**. Every other primary use is borders/rings/text-accents. This restraint makes the chatbot submit *the* visual focus of the detail page — explicitly: "use this."

### Alabama IQ application
Mirror this exactly for "Ask about this signal":
- 32px-radius container card with subtle border + shadow-sm
- 36×36px circular submit button with **primary orange** background
- Reserve primary as a fill color **only** for this one CTA — preserving its semantic weight

---

## 9. H2 Section Headings — Uniform Treatment

All section H2s on the detail page use **identical styling**:
```
Class: font-sans text-base font-bold leading-6 text-foreground
```

| Property | Value |
|---|---|
| Font family | **roobert (sans)** |
| Font size | **16px** (text-base) |
| Font weight | **700** |
| Line height | 24px (leading-6) |
| Color | foreground |

This applies to: `Sentiment`, `Digg Depth`, and any other H2 on the page. No size variation. No tracking variation. Just bold sans at body size.

**Lesson:** Section headings don't need to be much larger than body text if the **weight contrast (400 vs 700) and font swap (mono → sans) carries the hierarchy**.

---

## 10. Homepage Rank Numerals (Gap-fill from prior run)

On the full story card list (homepage `/ai`), the big rank number on the left:
```
Class: w-full text-center font-mono text-lg font-semibold leading-7 tabular-nums text-foreground/40
```

| Property | Value |
|---|---|
| Font family | roobertMono |
| Font size | **18px** (text-lg) — NOT large! |
| Font weight | 600 |
| Line height | 28px (leading-7) |
| Color | **foreground at 40% opacity** |
| Width | 40px centered |
| Numerics | `tabular-nums` |

### The surprise
The rank "1" *looks* visually prominent in the screenshot, but it's only **18px in a 40px-wide centered gutter at 40% opacity**. The visual weight comes from:
- The wide, dedicated gutter column (40px reserved)
- The very tight letter form of mono numerals
- The empty white space around it
- The 40% opacity making it feel "watermark"-like rather than shouty

**Lesson for Alabama IQ:** Don't make rank numbers huge. Give them a **fixed gutter** and **lower opacity**. The negative space does the work.

---

## 11. Story Card Container (Highlight tile)

```
Class: flex h-[168px] flex-col justify-between rounded-[3px] bg-card p-4 text-left
```

| Property | Value |
|---|---|
| Height | **168px fixed** |
| Border radius | **3px** |
| Background | `--card` |
| Padding | 16px |
| Layout | flex column, justify-between (top + bottom anchor) |
| Width | 267px (in this viewport's 4-col grid) |
| Text align | left |

The `justify-between` is the key trick — header pushes to top, footer (avatars + rank) pushes to bottom. Headline middle floats independently.

---

## 12. Critical Color Resolution

From actual computed styles, here are the resolved lab() colors mapped to hex equivalents:

| Token | Computed | Hex equivalent |
|---|---|---|
| `--background` (dark) | `lab(7.31957 0.488162 0.174782)` | **#171616** |
| `--foreground` (dark) | `lab(93.5378 0.265419 3.27547)` | **#efece6** |
| `--muted-foreground` (dark) | `lab(61.7448 -0.0479221 1.71715)` | **#969592** |
| `--primary` (dark) | `lab(59.3626 39.2644 54.8438)` | **#da702c** |
| Foreground @ 40% | `oklab(0.943998 ... / 0.4)` | rgba(239,236,230,0.4) |

These match the CSS variables exactly — confirming the design tokens.

---

## 13. Additions to the Alabama IQ Design Directives

These supplement the directives in `digg_frontend_research.md` Section 14.

### NEW DIRECTIVE A: Use semantic `<fieldset>` + `<legend>` for source embeds
Whenever an Alabama IQ signal page embeds source material (council excerpt, contract clause, press release, RFP text), use the Digg pattern:
- `<fieldset class="rounded-md border border-border p-4 sm:p-6">`
- `<legend class="ml-3 bg-background px-2 font-mono text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground">`

This is accessible, beautiful, and signals "this is the source, not our words."

### NEW DIRECTIVE B: Adopt the Q&A "Depth" pattern verbatim
Every signal detail page must include a **"Signal Depth"** section using the Digg Depth Q&A pattern:
- Outer: `space-y-4`
- Inner: `divide-y divide-border` between Q&A pairs
- Each pair: asker initials avatar + asker name + "asked" + question + AI answer (scoped to source docs)
- Answers persist publicly and compound the page's value over time

This is the single highest-leverage pattern from this research. Build it.

### NEW DIRECTIVE C: Reserve primary orange for ONE CTA
The submit arrow on the chatbot is the only place `bg-primary` appears. Alabama IQ should reserve primary orange as a button fill **only for the most important CTA per page**:
- On the homepage/feed: "Subscribe" button
- On a signal page: "Ask about this signal" submit
- Nowhere else

Everything else uses borders, rings, or text accents in primary. Restraint creates emphasis.

### NEW DIRECTIVE D: Detail page H1 typography spec
For Alabama IQ signal detail page headlines, use this exact spec:
```css
font-family: <sans>;
font-size: clamp(30px, 4vw, 36px);
font-weight: 700;
line-height: 1.1;
letter-spacing: -0.025em;  /* equivalent to -0.9px at 36px */
text-wrap: balance;
overflow-wrap: anywhere;
```

### NEW DIRECTIVE E: Subtitle uses sans at 18px with 1.625 line-height
For the one-sentence "human detail" subtitle below the headline:
```css
font-family: <sans>;
font-size: 18px;
font-weight: 400;
line-height: 1.625;  /* leading-relaxed */
color: var(--muted-foreground);
text-wrap: pretty;
```

### NEW DIRECTIVE F: Section H2s use 16px sans 700, not larger
Across signal detail pages, all section H2s ("Signal Depth", "Source Confidence", "Local Impact") should be:
```css
font-family: <sans>;
font-size: 16px;
font-weight: 700;
line-height: 1.5;
```
Don't make them larger than body. The bold weight and font swap (mono body → sans heading) carries the hierarchy.

### NEW DIRECTIVE G: Rank numerals: 18px mono 600 at 40% opacity in a 40px gutter
Don't make rank numbers shouty. Reserve a fixed 40px-wide gutter, render the rank as `tabular-nums` at 18px / 600 weight at 40% opacity. Let the negative space do the work.

### NEW DIRECTIVE H: Sentiment as numbers + narrative, not charts
For Alabama IQ signal sentiment (when needed): show raw percentages + a written narrative paragraph. No bar charts, no pie. Treat the audience like adults who read.

---

## 14. Verification Checklist (from plan) — all complete

- [x] H1 on story detail (fontSize 36px, fontWeight 700, lineHeight 39.6px, letterSpacing -0.9px)
- [x] "Digg Depth" section contents (Q&A pairs with divide-y separators)
- [x] Sentiment display format (raw percentages + narrative, no charts)
- [x] AI chatbot input (32px radius card, 14px mono input, 36px circular orange submit)
- [x] Original tweet embed styling (`<fieldset>` + `<legend>` pattern, 8px radius, 1px border)
- [x] Rank "1" numeral size on homepage (18px mono 600 at 40% opacity in 40px gutter)
- [x] Feed card spacing (168px fixed height, 3px radius, 16px padding, `bg-card`)
- [x] H2 section heading spec (16px sans 700)

---

## 15. Research Status — All Three Reports Complete

| Report | Path | Status |
|---|---|---|
| Tech stack + product architecture | `digg_architectural_research.md` | ✅ complete |
| Frontend design system | `digg_frontend_research.md` | ✅ complete |
| Detail page fine-grained inspection | `digg_detail_page_inspection.md` | ✅ complete (this file) |

The research set is now closed. Feed all three into Claude Code for Alabama IQ's next build phase.

---

**End of report.**
