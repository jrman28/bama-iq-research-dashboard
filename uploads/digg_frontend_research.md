# Digg.com Frontend Architectural Research

**Research date:** 2026-05-22
**Researcher:** Claude Opus 4.7 via Claude in Chrome MCP
**Target:** https://digg.com/ai
**Companion to:** `digg_architectural_research.md` (tech stack + product architecture)
**Purpose:** Visual design reference for Alabama IQ's UI build

---

## Executive Summary — 5 Visual Decisions That Define Digg's Feel

1. **They use the Flexoki color scheme.** Steph Ango's "ink on paper" palette: cream `#efece6` light / near-black `#171616` dark, warm orange `#da702c` as primary. This is a deliberate, distinctive choice — not Tailwind defaults, not Material, not Linear's blue-on-gray. It signals "we are a publication, not a SaaS dashboard."

2. **Monospace is the dominant body font.** `roobertMono` is the document body default. Sans (`roobert`) appears only on headlines, names, and reading body copy. Everything that is *data* — scores, ranks, timestamps, counts, navigation, category labels — uses mono. This creates a distinctive terminal/research-tool feel that's appropriate for a ranking product.

3. **They have a dedicated `--rank-one` CSS token.** The single most rank-conscious design system I've seen — the #1 ranked item gets its own variable (`--rank-one: #da702c`, `--rank-one-muted: #da702c2e`). Alabama IQ's highest-gravity signals should get the same treatment.

4. **The 3-axis score visualization is a discrete 10-segment "health bar"** with per-metric color coding. Each segment is `flex-1 rounded-[1px]` with a 1px gap, accessible via `role="meter"`. This is the most directly portable design pattern in the entire site for Alabama IQ.

5. **2px corner radius globally.** `--radius: .125rem`. Almost-square corners give the whole site a precise, technical character. This is far tighter than the 8–12px radius common in B2B SaaS.

---

## 1. Design Tokens (Complete CSS Variable Dump)

### Semantic tokens (Flexoki-based)

**Light mode (`:root`):**
```css
--background: #efece6;          /* warm cream paper */
--foreground: #171616;          /* near-black ink */
--card: #f5f2ed;                /* slightly warmer cream */
--card-foreground: #171616;
--popover: #e6e4d9;
--muted: #e3e0d8;
--muted-foreground: #72716e;
--primary: #da702c;             /* warm orange */
--primary-foreground: #fffcf0;
--secondary: #dad8ce;
--secondary-foreground: #575653;
--accent: #3aa99f;              /* teal */
--accent-foreground: #fffcf0;
--destructive: var(--red-600);
--border: #0000001a;            /* 10% black */
--input: #0000001a;
--ring: #da702c;                /* focus ring = primary */
--radius: .125rem;              /* 2px */
--rank-one: #da702c;            /* CRITICAL — rank #1 has dedicated token */
--rank-one-muted: #da702c2e;    /* 18% opacity for backgrounds */

/* Sidebar tokens (separate semantic surface) */
--sidebar: #fffcf0;
--sidebar-accent: #e6e4d9;
--sidebar-border: #cecdc3;
--sidebar-primary: #4385be;
```

**Dark mode (`.dark`) — site default:**
```css
--background: #171616;
--foreground: #efece6;
--card: #1c1b1a;
--popover: #282726;
--muted: #212020;
--muted-foreground: #969592;
--primary: #da702c;             /* SAME as light — primary is mode-invariant */
--primary-foreground: #171616;
--accent: #3aa99f;              /* SAME as light */
--border: #ffffff1a;
--input: #ffffff1a;
--sidebar: #100f0f;
--sidebar-accent: #282726;
--sidebar-border: #343331;
--sidebar-primary: #4385be;
```

### Full color palette
Every named color has a complete 50–950 ramp:

`amber, blue, cyan, emerald, fuchsia, green, indigo, lime, orange, pink, purple, red, rose, sky, teal, violet, yellow` × 11 shades each.

Notable: these are not Tailwind's default colors. They're warmer, slightly desaturated, hand-tuned. Examples:
- `--orange-500: #d16a3b` (vs Tailwind's `#f97316`)
- `--blue-600: #1e76bd` (vs Tailwind's `#2563eb`)
- `--green-500: #6aa15a` (vs Tailwind's `#22c55e`)

This is the **Flexoki color system** by Steph Ango (Obsidian CEO). It's open-source: https://stephango.com/flexoki

### Border radius
- `--radius: .125rem` (2px) — the global radius
- Cards observed at 3px directly
- Avatars use `rounded-full` (effectively circular)
- Bar segments use `rounded-[1px]` (1px) — even tighter

### Color encoding in computed styles
The site uses **`lab()` and `oklab()` color functions** in computed styles for better perceptual uniformity. This means colors interpolate more naturally during transitions — a small but premium detail.

---

## 2. Typography Stack

### Font families (in load order)

| Family | Role | Loaded |
|---|---|---|
| **roobertMono** | Body default, all UI chrome, data labels, scores, timestamps | ✓ (100–900 weight range) |
| **roobert** | Display, headlines, names, reading body | ✓ (100–900 weight range) |
| **IBM Plex Sans** | Secondary sans (weight-specific: 400, 500, 600, 700) | declared, unloaded — likely fallback or for specific surfaces |
| **VT323** | Terminal/glitch aesthetic, possibly for logo or accents | declared, unloaded |

Fallback stack: `roobertMono, "roobertMono Fallback", ui-monospace, SFMono-Regular, Menlo, monospace`.

### Roobert family
Roobert is **DJ Stout's** typeface, sold by Displaay Type Foundry — used by Coinbase, Klarna, Notion among others. Geometric sans with a humanist softness. Roobert Mono is its monospace companion.

### Verified type scale (computed sizes from the live site)

| Style | Font | Size | Weight | Line-height | Letter-spacing | Color | Usage |
|---|---|---|---|---|---|---|---|
| Page H1 | roobertMono | 30px | 600 | 36px | -0.75px | foreground | "Influencer Rankings" |
| Section heading | roobert | 24–28px | 700 | tight | — | foreground | "Top Stories", "Recent Stars" |
| Card headline | roobert | 14px | 600 | 20px | — | foreground | Story card titles (line-clamp-3) |
| Body description | roobertMono | 16px | 400 | 24px | — | muted-foreground | Page subhead |
| Small body | roobertMono | 12–14px | 400 | — | — | muted-foreground | Bios, descriptions |
| Category label | roobertMono | 10px | 600 | 10px | wider | muted-foreground | "IN CASE YOU MISSED IT", uppercase |
| Score label | roobertMono | 10px | 400 | — | wider | muted-foreground | "AI Score", "Breakout Potential" — uppercase via CSS |
| Rank number (inline) | roobert | 12px | 600 | — | tabular-nums | blue-600 / blue-400 | "#43" badges |
| Avatar initials | roobert | 12px | 500 | — | — | muted-foreground | "CS", "EJ" fallback |
| Score number badge | roobertMono | 12px | 600 | — | — | foreground | "9", "10" in score pill |

### Critical typography decisions

- **`tabular-nums`** is applied to all rank numbers and counts. This is what makes columns of stacked numbers align visually. *Alabama IQ must do this everywhere a Gravity Score, signal count, or rank appears.*
- **`text-pretty`** is used on headlines for better last-line balancing (CSS `text-wrap: pretty`).
- **`line-clamp-3`** for card headline truncation.
- **`uppercase tracking-wider`** for all category/section labels — this is the visual signature of "this is a label, not content."

---

## 3. Dark Mode Implementation

- **Site default is dark mode.** `<html class="... dark">`.
- Light mode exists as a complete tokenset under `:root`. They've built bidirectional, but ship dark by default.
- `--primary` (`#da702c`) and `--accent` (`#3aa99f`) are **mode-invariant** — the orange and teal stay consistent across modes.
- `--sidebar` is **darker than `--background`** in dark mode (`#100f0f` vs `#171616`) — pushing nav surfaces deeper than the content surface.
- The full 50–950 color ramp is shared across modes; only semantic tokens flip.

**For Alabama IQ:** The default-dark choice is unusual for B2B. Morning Brew / Axios / Punchbowl News all default light. Recommendation: default light for the Alabama IQ B2B audience but ship a dark mode toggle. Use Flexoki — it's open-source and free.

---

## 4. Story Card Anatomy (Feed Item)

From the homepage "Today's Highlights" 4-up grid and the "Top Stories" stacked list.

### Highlight tile (4-up grid version) — ~220px wide
```
┌────────────────────────────────┐
│ ▲ IN CASE YOU MISSED IT        │ ← 10px mono uppercase + colored icon
│                                │
│ OpenAI reports its internal    │ ← 14px roobert 600 weight
│ general-purpose reasoning...   │   line-clamp-3
│                                │
│ (CS)(EJ)(NB)(ND)(GB) #19 +42 → │ ← 24px circular avatars, blue rank badge
└────────────────────────────────┘
```

- **Padding:** 16px all around
- **Background:** `--card` (`#1c1b1a` dark)
- **Border-radius:** 3px
- **No visible border** — distinguished by background contrast against `--background`
- **Avatar size:** 24×24px circles
- **Rank badge "#19":** `tabular-nums text-xs font-semibold text-blue-600`, blue color, 6px horizontal padding

### Full story card (stacked list version)
```
1   DeepSeek makes its 75% discount on the DeepSeek-V4-Pro API
    permanent, keeping rates at one-quarter of prior levels...
    — The 1.6-trillion-parameter model offers 1M-token context...
    
    ⏱ 7h | 📊 1.6M | ❤ #1 LIKED 14.3k | 🔖 2.7k | 💬 #1 COMMENTS 1.6k
    
    (avatars) #103
```

- **Big rank number ("1")** at left in the gutter, large mono font, dimmed
- **Headline:** roobert 600 — *very long* full-sentence headline
- **Subtitle after em-dash:** muted-foreground, continues the sentence
- **Stats row:** mono uppercase labels with `tabular-nums` numbers
- **"#1 LIKED" and "#1 COMMENTS"** get pill-styled badges (red for likes, orange for comments)
- **Avatar strip + rank badge** below

### Color-coded "first" badges
The visual hierarchy uses *category-leading status* as a visual hook:
- `#1 LIKED` → green icon on tile, **red pill** on full card
- `#1 BOOKMARKED` → blue icon
- `#1 COMMENTS` → orange pill
- `#1 VIEWED` → violet icon
- `IN CASE YOU MISSED IT` → amber icon

This is a **leaderboard-by-axis** treatment — every interaction dimension can be a "#1" — and the colors map to the metric.

---

## 5. The 3-Axis Score Visualization (THE MONEY SHOT FOR ALABAMA IQ)

This is the single most portable design pattern. Used on GitHub stars page; pattern reusable for Alabama IQ Gravity Score decomposition.

### Visual
```
AI SCORE   ■■■■■■■■■□  9   BREAKOUT POTENTIAL  ■■■■□□□□□□  4   NOVELTY  ■■■■■■□□□□  6
```

### Exact markup (copy-pasteable)
```html
<div class="flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
  <div class="flex items-center gap-2">
    <span class="shrink-0 whitespace-nowrap">AI Score</span>
    <div role="meter" aria-valuemin="1" aria-valuemax="10" aria-valuenow="9" aria-valuetext="9 of 10"
         class="flex h-1.5 gap-px w-[80px]">
      <!-- 9 filled segments -->
      <div class="flex-1 rounded-[1px] bg-blue-500 dark:bg-blue-400"></div>
      <div class="flex-1 rounded-[1px] bg-blue-500 dark:bg-blue-400"></div>
      <div class="flex-1 rounded-[1px] bg-blue-500 dark:bg-blue-400"></div>
      <div class="flex-1 rounded-[1px] bg-blue-500 dark:bg-blue-400"></div>
      <div class="flex-1 rounded-[1px] bg-blue-500 dark:bg-blue-400"></div>
      <div class="flex-1 rounded-[1px] bg-blue-500 dark:bg-blue-400"></div>
      <div class="flex-1 rounded-[1px] bg-blue-500 dark:bg-blue-400"></div>
      <div class="flex-1 rounded-[1px] bg-blue-500 dark:bg-blue-400"></div>
      <div class="flex-1 rounded-[1px] bg-blue-500 dark:bg-blue-400"></div>
      <!-- 1 unfilled segment -->
      <div class="flex-1 rounded-[1px] bg-muted"></div>
    </div>
    <!-- numeric badge -->
    <span class="rounded-[2px] bg-muted/40 px-1.5 text-[12px] font-semibold">9</span>
  </div>
  <!-- repeat for BREAKOUT POTENTIAL (purple), NOVELTY (violet) -->
</div>
```

### Properties
| Property | Value |
|---|---|
| Bar width | 80px |
| Bar height | 6px (`h-1.5`) |
| Segments | 10 (one per value point 1–10) |
| Segment gap | 1px (`gap-px`) |
| Segment radius | 1px (`rounded-[1px]`) |
| Filled color | Per-metric (blue / purple / violet) |
| Unfilled color | `bg-muted` |
| Label | 10px mono uppercase, muted-foreground |
| Numeric pill | 12px mono, muted background, foreground text |
| Accessibility | `role="meter"` + full `aria-*` props |

### Color-per-metric mapping (Digg's choice)
- AI SCORE → `blue-500` / `blue-400`
- BREAKOUT POTENTIAL → `purple-*` (visible pink/purple in screenshot)
- NOVELTY → `violet-*`

### Alabama IQ application
Map this directly to Gravity Score's three axes:
- **Source Credibility** → green (validated, trustworthy)
- **Local Economic Impact** → orange (heat / impact)
- **Recency** → teal/cyan (time-fresh)

Same 80px × 6px bar, same 10 segments, same `role="meter"` semantics, same numeric pill on the right.

---

## 6. The "Following Gravity" Display (validation for our metric name)

```
Andrej Karpathy
@karpathy 𝕏
[Res. Engineer]

Followed by 1318
Following gravity: 10.000
```

### Computed styles for "Following gravity: 10.000"
- Font: **roobertMono**, **12px**, **400 weight** (not bold!)
- Color: muted-foreground (not emphasized)

### Design lesson
**The number is not emphasized.** No big red display, no progress bar on this page, no badge. It's served as plain data alongside other plain data. The product trusts the reader to read.

This is the *opposite* of how most SaaS dashboards display a "key metric." Digg's choice signals: *"This is research-grade data. Treat it accordingly."*

For Alabama IQ B2B audience, this restraint is *right.* The Gravity Score should be a number, not a flashy score visualization on the main signal card. (Save the bar visualization for the *decomposition* drill-down — see Section 5.)

---

## 7. Navigation and Page Chrome

### Header
- **Height:** 76px
- **Position:** **static** (not sticky, not fixed) — they let it scroll away with the page
- **Background:** same as page background (`--background`) — no border, no shadow
- **Padding:** 12px top only

### Header contents (left → right)
1. Hamburger menu icon (24px, mono icon)
2. **DIGG wordmark** in a custom pixel-art / Press-Start-2P style — likely a custom SVG, very distinctive (would NOT recommend copying for Alabama IQ — find your own typographic personality)
3. Pill badge `/ AI` showing current vertical (this is a key UI pattern — they may add `/ FINANCE`, `/ POLITICS` later)
4. (right) avatar + chevron account menu

### Primary nav (3-tab segmented control)
- **TOP STORIES** / **GITHUB** / **RANKINGS**
- All caps mono, evenly distributed
- Active state: slightly lighter background, foreground color
- Inactive: muted-foreground
- Sits below header, full-width

### Sub-nav (on Github page)
- Pill-style tabs with small icons (⭐ STARS, ✦ NEW, ⚡ ACTIVITY, 📡 FEED)
- "RECENT" dropdown on the right (sort control)

### Footer
- **Brutally minimal:** "Privacy Policy | Terms of Service | © 2026 Digg Inc."
- 11px mono, muted-foreground, single row
- No company links, no social links (X handle is in metadata only), no newsletter signup, no sitemap

---

## 8. The Date + Stats Banner Pattern

Above the main feed:
```
Top Stories
Friday, May 22 2026

POSTS: 2,430 │ CLUSTERS: 571 │ NEXT CRAWL: 04:39 │ [+] LIVE FEED       [TODAY] [7-DAYS]
```

### Anatomy
- **"Top Stories"** large sans bold
- **Date** large mono, muted (looks like 28px+)
- **Stats row:** all uppercase mono, `tabular-nums` numbers, pipe separators
- **"[+] LIVE FEED"** — orange/amber, mono — indicates a live capability
- Right side: time toggle (TODAY/7-DAYS), pill-style segmented control

### Why this works
The stats line signals **freshness, scale, and recency** all in one row:
- POSTS = total volume tracked
- CLUSTERS = current story groupings
- NEXT CRAWL = countdown until next refresh (radical transparency)
- LIVE FEED = real-time button

For Alabama IQ this maps to: `SIGNALS: N | CATEGORIES: M | LAST CRAWL: HH:MM | LIVE`

---

## 9. Buttons, Inputs, and Form Patterns

### Search bar (on Rankings page)
- Pill-shaped (fully rounded ends)
- Subtle border (1px, low-opacity foreground)
- Magnifying glass icon (mono outline) on the left
- Mono placeholder text "@sama"
- Right-attached button "Open profile"

### Primary button "Open profile"
- **Cream background** (foreground color) — *inverted from page*
- **Dark text** (background color)
- Rounded pill shape
- Mono font
- Small horizontal padding

This **inverted button** pattern is rare and signals "this is the action surface." For Alabama IQ's CTAs (e.g., "Subscribe"), this inversion works well.

### Category dropdown
- Rectangular with `--radius` corners
- Subtle 1px border
- Chevron indicator
- Mono text

### CMD+K hint
- Top-right of feed: `🔍 CMD + K`
- Mono, muted
- Suggests a global command palette (worth exploring — every modern product should have one)

---

## 10. Iconography

- Mono outline icons (looks like **Lucide** or **Phosphor**) at small sizes (12–16px)
- Time icon, heart, bookmark, chart, comment, search, chevron — all simple line work
- Sizes match the surrounding mono text height

For Alabama IQ: **Lucide** is the right pick (open-source, ships with shadcn/ui).

---

## 11. Spacing and Layout

### Container
- `.topic-main` class with `max-width: 1120px`
- Centered, fills width on narrower screens
- No padding on the main element (children carry their own)

### Spacing observed (Tailwind scale visible in class names)
- `gap-x-4 gap-y-2` (16px / 8px) on score rows
- `gap-2` (8px) between score chunks
- `gap-px` (1px) between bar segments
- `mt-12` (48px) on footer
- `px-1.5` (6px) on rank badges

### Card spacing
- 16px padding inside
- 3px border-radius
- No external box-shadow

---

## 12. Animation and Interaction

Not explicitly tested but inferred:
- **No visible page-load animations** — content appears via RSC streaming, not animated entry
- **Hover states** on links (underline)
- **`select-none`** on divider characters (pipes between rank numbers) — they don't want users accidentally selecting decorative chars

This restraint is intentional. The product feels *fast* in part because nothing animates needlessly.

---

## 13. Captured Screenshots

Three screenshots were captured during this research:

1. **Homepage (`ss_07722av41` / `ss_07722av41`)** — full desktop view showing DIGG logo, 3-tab nav, "Today's Highlights" 4-up grid with category-coded badges, "Top Stories" header with stats banner, and stacked story cards with engagement metrics
2. **Rankings page (`ss_9066lcza8`)** — H1 in mono, descriptive subhead, search card with inverted primary button, "All Categories" dropdown, and the top 3 influencers (Karpathy / Jeff Dean / Ilya Sutskever) showing rank number + avatar + name + handle + category badge + bio + followed-by count + "Following gravity: 10.000" + raw follower count
3. **GitHub Stars page (`ss_76710i4yi`)** — sub-nav with icon pills, "Recent Stars" header, the 3-axis score visualization (AI SCORE / BREAKOUT POTENTIAL / NOVELTY) with the discrete 10-segment bars and numeric pills, per-repo description, and contributor + rank badge

Screenshots are saved to disk via the Chrome MCP screenshot capability. Locate them with `find / -name "ss_*" 2>/dev/null` if needed.

A 4th screenshot (story detail page) was attempted but the renderer locked — a known issue from the previous research run.

---

## 14. Alabama IQ Design Directives (Synthesis)

### Color system: Adopt Flexoki

Use the Flexoki palette from https://stephango.com/flexoki. It's open-source, free, and a complete 50–950 ramp across 16 hues with semantic tokens. Specifically:

```css
:root {
  --background: #fffcf0;        /* paper, lighter than Digg's dark default */
  --foreground: #100f0f;
  --card: #f2f0e5;
  --muted: #e6e4d9;
  --muted-foreground: #6f6e69;
  --primary: #da702c;           /* warm orange — gravity-high signal color */
  --accent: #3aa99f;            /* teal — secondary action */
  --border: #cecdc3;
  --radius: 0.125rem;           /* 2px global */

  /* Gravity-specific tokens */
  --gravity-high: #da702c;       /* G ≥ 8.0 (amber, "act now") */
  --gravity-watch: #3aa99f;      /* G 7.0–7.9 (teal, "watch") */
  --gravity-base: #b7b5ac;       /* G < 7.0 (muted) */
  --gravity-high-muted: #da702c2e;
}
```

Default light mode (B2B reader at 7am with coffee), but ship a `.dark` toggle.

### Typography: Two-font system, mono-first chrome

- **Primary mono:** JetBrains Mono or IBM Plex Mono (both open-source, free) — for ALL UI chrome, data labels, ranks, scores, timestamps, category labels
- **Primary sans:** Inter or IBM Plex Sans (both free) — for headlines, story bodies, names

This 2-font system is enough. Don't add a serif. Don't add a display font. Roobert is paid; substitute with **Geist** (Vercel's open-source font) or **Inter** for the sans, **Geist Mono** or **IBM Plex Mono** for the mono.

### Gravity Score visualization: Two-tier display

**Tier 1 — Signal feed card (restrained):**
Show only the gravity number as plain mono data, no bar:
```
G 8.4 │ Defense │ 2h ago
```

**Tier 2 — Signal detail page (decomposed bar visualization):**
Use the Digg meter pattern with three Alabama IQ axes:
```
SOURCE CREDIBILITY   ■■■■■■■■■□  9    LOCAL ECONOMIC IMPACT   ■■■■■■■■□□  8    RECENCY  ■■■■■■■■■■ 10
```

Implement the exact markup pattern from Section 5 (80px × 6px, 10 segments, `gap-px`, `role="meter"`, color-coded per axis).

### Card design: 16px padding, 2px radius, no visible border

Match Digg's restraint. Card distinguishes via background contrast, not borders or shadows.

### Numbers: tabular-nums everywhere

Every Gravity Score display, signal count, rank, percentage, dollar amount — `tabular-nums`. This is non-negotiable for a B2B data product.

### The "leaderboard-by-axis" badge pattern

Adopt category-leading badges in different colors for different dimensions. For Alabama IQ:
- `#1 GRAVITY` — amber pill
- `#1 BREAKING` — red pill  
- `#1 SHARED` — teal pill
- `#1 IN DEFENSE` — gray pill (category leader)

Use these sparingly on the "Today's Highlights" surface above the main feed.

### Inverted CTA button

For the primary Subscribe/Sign-Up CTA, use Digg's inverted button pattern: foreground background with background-color text. This makes the action surface visually distinct from everything else without using accent colors.

### Static, not sticky header

Let the header scroll away. Sticky headers cost vertical real estate. Alabama IQ readers will scan deep — give them all the vertical room.

### Stats banner above feed

Adopt the stats-row pattern with `tabular-nums`:
```
SIGNALS: 124  │  CATEGORIES: 6  │  LAST CRAWL: 06:42  │  [+] LIVE FEED
```
Place above the daily feed. This is *cheap* trust signaling — it shows the product is alive.

### Skip these from Digg
- ❌ **Pixel-art logo** — find Alabama IQ's own personality
- ❌ **Default-dark mode** — B2B email-reading audience defaults light
- ❌ **VT323 / terminal font** — too aggressive for B2B
- ❌ **3-tab segmented nav at top** — Alabama IQ needs a search and a category filter, not three feed views

---

## 15. Open Questions (For Follow-Up Research)

1. **What does the Digg Depth section look like visually?** Renderer locked twice trying to capture detail pages. Manually screenshotting a detail page later would close this gap.
2. **How does the per-story AI chatbot input present visually?** Same blocker.
3. **What does mobile (375px) look like?** The window resize didn't behave as expected during this session.
4. **Search and CMD+K palette** — observed but not interacted with.
5. **Account menu (Clerk) styling** — what fields, what design.

---

## Appendix: Source Reference

- **Flexoki color scheme:** https://stephango.com/flexoki (MIT license)
- **Roobert font (Digg's choice):** https://displaay.net/typeface/roobert (paid)
- **Recommended free Alabama IQ substitutes:**
  - Sans: **Geist** (https://vercel.com/font) or **Inter** (Google Fonts)
  - Mono: **Geist Mono** or **JetBrains Mono** or **IBM Plex Mono**

---

**End of report.**
