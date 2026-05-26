# Onboarding Patterns Research
Phase 1 synthesis for the Alabama IQ Demo Onboarding + Dashboard MVP.
Sources: Mercury Bank, Masterclass, Anthropic (claude.ai), + broader UX research corpus.

---

## Step Count Sweet Spot

**4–5 steps.** The research consensus is 3–5 screens. Ghost's 5-step progress bar increased conversions 1,000%. Cognitive load breaks down past 6. For Alabama IQ's B2B intelligence positioning, 5 steps is the right ceiling:
- Under 5 = not enough investment before email capture
- Over 5 = feels like a form, not a quiz

Alabama IQ target: **5 steps** (role → signals → cadence → email → reveal).

---

## Question Types

**Role before use-case, always.** Every strong B2B example (Mercury, HubSpot, Canva) captures identity first — who are you — before asking what you want.

Pattern hierarchy that works:
1. **Role/identity** — big visual tile selection, not a dropdown. Mercury asks for company + role immediately. HubSpot differentiates marketer vs. salesperson vs. service team from step 1.
2. **Use-case / intent** — "How do you plan to use this?" (Crowd Content's version of this question drove a 15% conversion lift). For Alabama IQ: which signals matter most.
3. **Delivery preference** — cadence/format. Lightweight, binary or 3-choice.
4. **Email capture** — after they're invested (see below).
5. **Reveal** — personalized result, not a generic dashboard.

Avoid open text at any step. Dropdowns are better than blanks. Visual tile selections (big, clickable cards) are best.

---

## Progress Mechanic: Step Dots vs. Progress Bar

**Dots win for quiz-feel; bars win for form-feel.** Since Alabama IQ's onboarding should feel like a quiz/assessment (not a compliance form), step dots are the right call.

Mercury uses checkbox-style progress that creates a "sense of accomplishment and momentum." Ghost's linear progress bar worked for a task checklist, not a quiz. The distinction: if the user is answering questions about themselves → dots. If the user is completing tasks → progress bar.

Alabama IQ: **Step dots with fill animation.** Each dot fills as the user advances. Never a % counter — that feels like a form.

---

## Email Gate Placement

**After investment, before reveal. Not at entry.**

The Duolingo pattern (delay email capture until after the user has experienced value) is the strongest validated approach. Crowd Content and Mercury both collect identity data before requesting commitment.

For Alabama IQ: capture email at Step 4 (after role, signals, and cadence are selected). The user has now told you who they are and what they care about — they're invested. The reveal ("Your Alabama IQ Profile is ready") is the value moment that justifies the email ask.

Never gate at entry — that's the pattern that kills conversion before it starts.

---

## Visual Pacing Notes

**Mercury Bank:**
- Two-phase structure: account creation first, then bank account setup. Prevents overwhelm by not front-loading compliance.
- Pre-fills form fields wherever possible — reduces friction mid-flow.
- Conditional logic: adapts questions based on prior answers (yes/no branches). Key for Alabama IQ — Defense BD director should not see the same step 2 as an Economic Dev professional.
- Final step: timeline/expectation-setting screen before the "waiting" state. Manages anticipation.
- Tone: clean, minimal, professional. Not playful, not startup-cute. Appropriate for money handling — Alabama IQ should take the same posture (this is B2B intelligence, not a consumer quiz).

**Masterclass:**
- Visual hook first: video snippets of famous instructors play immediately. Emotion before logic.
- Signup is fast (Google/Apple continue) — minimal friction to get inside.
- Interest selection happens inside the app, not during signup. The "selection" is browsing courses, not checking boxes.
- Lesson: for consumer content, show the product first and let exploration be the onboarding. For Alabama IQ (B2B, data-dense), the opposite is true — you need persona data before the dashboard can be personalized.
- Don't copy Masterclass's pattern directly. Borrow: the visual hook (leading with a striking headline or number before the first question), and the "here's what you're about to see" anticipation frame.

**Claude.ai (Anthropic):**
- Minimal onboarding — near-zero for the consumer web product. Sign up → inside immediately.
- The lesson here is what NOT to do for a B2B intelligence product. Claude.ai can skip onboarding because the AI assistant is generic by nature. Alabama IQ's dashboard only becomes valuable once we know who you are. Skipping onboarding = generic, unimpressive dashboard.
- Exception: claude.ai's Projects feature does capture use-case context, but only on first project creation — deferred personalization. Alabama IQ can't defer — the demo is the one shot.

---

## Persona Mapping: What Flows Where

Based on the research, Alabama IQ should route each role selection to a distinct dashboard preview state:

| Role Selected | Dashboard Emphasis |
|---|---|
| Defense BD Director | Contract awards, hiring signals, facility expansions |
| Economic Development | Business formation, investment announcements, site selection |
| CRE / Legal | Permits, zoning, business filings, real estate transactions |
| Commercial Banking | Employer expansions, contract awards, economic condition signals |
| Government / Institutional | Regulatory changes, city/county economic indicators |

Conditional logic at Step 2 (signal priority) should pre-select the relevant signal types based on Step 1 role — but let the user adjust. Mercury's pattern of pre-filling + letting the user confirm reduces friction while preserving personalization accuracy.

---

## Key Decisions for Alabama IQ

1. **5 steps, not 3, not 8.** Role → Signals → Cadence → Email → Reveal.
2. **Step dots, filled on advance.** Not a progress bar.
3. **Email at step 4.** After they're invested.
4. **Role selection = big visual tiles.** Not a dropdown. Each role has a 1-line description ("I track defense contracts and competitive BD opportunities").
5. **Conditional logic at step 2.** Pre-select signal types based on role from step 1.
6. **Reveal is the payoff.** "Your Alabama IQ Profile: Defense BD Director — G-score 8.4 this week." Lead with the Gravity Index number, not a list of features.
7. **Tone: confident intelligence, not startup-cute.** Mercury posture, not Duolingo posture.
8. **Mobile: each step is full-screen.** No scrolling within a step — every question gets its own screen.
