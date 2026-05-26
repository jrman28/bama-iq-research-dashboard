/* ───────────────────────────────────────────────────────────────
   Pages — review-ready surfacing of each research doc
   Each page presents the actual findings + data with visual charts
   ────────────────────────────────────────────────────────────── */

// ═══════════════════════════════════════════════════════════════
// OVERVIEW — landing page
// ═══════════════════════════════════════════════════════════════
function PageOverview({ onNav }) {
  const docs = [
    {
      id: 'onboarding', num: '01', tag: 'PHASE 1 · UX',
      title: 'Onboarding Patterns',
      sub: 'Mercury · Masterclass · Anthropic · broader UX corpus. Step count, gates, persona mapping.',
      date: '2026-05', size: '103 LINES'
    },
    {
      id: 'architecture', num: '02', tag: 'PHASE 2 · TECH',
      title: 'Digg Architectural Research',
      sub: 'Stack, content model, ranking algorithm, observability. 14 sections.',
      date: '2026-05-22', size: '434 LINES'
    },
    {
      id: 'frontend', num: '03', tag: 'PHASE 2 · VISUAL',
      title: 'Digg Frontend Research',
      sub: 'Flexoki tokens, Roobert/mono pairing, 3-axis score viz, leaderboard pattern.',
      date: '2026-05-22', size: '556 LINES'
    },
    {
      id: 'detail', num: '04', tag: 'PHASE 2 · DETAIL',
      title: 'Digg Detail Page Inspection',
      sub: 'Fieldset+legend pattern, Q&A wiki, chatbot hero CTA, restraint principles.',
      date: '2026-05-22', size: '518 LINES'
    },
  ];

  return (
    <div className="page">
      {/* Hero */}
      <div className="ov-hero">
        <div className="ov-hero-grid">
          <div>
            <div className="doc-eyebrow" style={{ marginBottom: 32 }}>
              <span className="dot">●</span>
              <span><b>RESEARCH DASHBOARD</b></span>
              <span className="slash">/</span>
              <span>PRIVATE</span>
              <span className="slash">/</span>
              <span>v1.0 · 2026-05-23</span>
            </div>
            <h1 className="ov-hero-title">
              Four documents.<br />
              One <span className="accent">brief</span>.
            </h1>
            <p className="ov-hero-sub">
              Personal research compiled while building Alabama IQ. Onboarding UX patterns
              and a three-part deep-dive on Digg.com — the closest-adjacent product validating
              the Gravity Score metaphor at the brand level.
            </p>
          </div>
          <div>
            <div className="ov-bignumber">4</div>
            <div className="doc-bignum-label">DOCS COMPILED</div>
          </div>
        </div>
      </div>

      {/* Top stats */}
      <div className="kpi-grid" style={{ marginBottom: 56 }}>
        <Kpi label="DOCS" value="4" kind="dot" meta="MARKDOWN + HTML" />
        <Kpi label="TOTAL LINES" value="1,611" kind="mono" meta="ACROSS ALL DOCS" />
        <Kpi label="TARGET PRODUCT" value="AL/IQ" meta="ALABAMA INTELLIGENCE" />
        <Kpi label="REF PRODUCT" value="DIGG.COM" meta="BASIC INTELLIGENCE INC." />
      </div>

      {/* Doc jump cards */}
      <SectionHead id="00 · INDEX" title="Documents" count={4} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {docs.map(d => (
          <button key={d.id} className="doc-jump" onClick={() => onNav(d.id)}>
            <div className="doc-jump-num">{d.num}</div>
            <div className="doc-jump-body">
              <div className="doc-jump-tag">{d.tag}</div>
              <div className="doc-jump-title">{d.title}</div>
              <div className="doc-jump-sub">{d.sub}</div>
            </div>
            <div className="doc-jump-meta">
              <b>{d.date}</b>
              {d.size}
              <div className="doc-jump-arrow">→</div>
            </div>
          </button>
        ))}
      </div>

      {/* Key cross-doc themes */}
      <div style={{ marginTop: 72 }}>
        <SectionHead id="00.1 · CROSS-DOC THEMES" title="Recurring threads" />
        <div className="grid-3">
          <div className="card">
            <div className="card-label">Theme A</div>
            <div className="card-title">"Gravity" as a metric name is validated</div>
            <div className="card-body">
              Digg uses the literal word "gravity" for their PageRank value
              (Karpathy: 10.000, Jeff Dean: 9.522). AL/IQ's Gravity Score
              naming is directly aligned with a working product.
            </div>
          </div>
          <div className="card">
            <div className="card-label">Theme B</div>
            <div className="card-title">Multi-axis scoring beats single rolled-up</div>
            <div className="card-body">
              Digg's GitHub cards show 3 scores stacked (AI / Breakout / Novelty).
              AL/IQ should decompose Gravity into Source Credibility · Local Impact · Recency.
            </div>
          </div>
          <div className="card">
            <div className="card-label">Theme C</div>
            <div className="card-title">Audience inversions matter</div>
            <div className="card-body">
              Digg audience lives on X → X-only auth, no newsletter. AL/IQ audience
              lives in email at 7am → newsletter-first, email-first auth. Both right.
            </div>
          </div>
        </div>
      </div>

      <PageFoot next={{ id: 'onboarding', label: 'ONBOARDING' }} onNav={onNav} />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// 01 · ONBOARDING
// ═══════════════════════════════════════════════════════════════
function PageOnboarding({ onNav }) {
  const steps = [
    { n: '01', name: 'Role / Identity', desc: 'Big visual tile selection. Captures who they are before what they want. Mercury & HubSpot pattern.', fill: 100 },
    { n: '02', name: 'Signal Priorities', desc: 'Which signals matter most. Pre-selected from Step 1 role, user adjusts (Mercury conditional logic).', fill: 86 },
    { n: '03', name: 'Cadence / Format', desc: 'Lightweight binary or 3-choice. Daily digest? Real-time alerts? Weekly summary?', fill: 72 },
    { n: '04', name: 'Email Capture', desc: 'AFTER investment, before reveal. Duolingo-validated. Never gate at entry.', fill: 64 },
    { n: '05', name: 'Personalized Reveal', desc: '"Your AL/IQ Profile: Defense BD Director — G 8.4 this week." Lead with the number.', fill: 100 },
  ];

  const personas = [
    { role: 'Defense BD Director', emphasis: 'Contract awards · Hiring signals · Facility expansions', color: 'var(--teal)' },
    { role: 'Economic Development', emphasis: 'Business formation · Investment announcements · Site selection', color: 'var(--amber)' },
    { role: 'CRE / Legal', emphasis: 'Permits · Zoning · Business filings · Real estate transactions', color: 'var(--blue)' },
    { role: 'Commercial Banking', emphasis: 'Employer expansions · Contract awards · Economic conditions', color: 'var(--green)' },
    { role: 'Government / Institutional', emphasis: 'Regulatory changes · City/county economic indicators', color: 'var(--violet)' },
  ];

  const stepCountData = [
    { label: '3', value: 38, color: 'var(--ink-30)' },
    { label: '4', value: 72, color: 'var(--ink-45)' },
    { label: '5', value: 100, color: 'var(--teal)' },
    { label: '6', value: 64, color: 'var(--ink-45)' },
    { label: '7', value: 32, color: 'var(--ink-30)' },
    { label: '8+', value: 18, color: 'var(--ink-30)' },
  ];

  return (
    <div className="page">
      <DocHead
        phase="01 · ONBOARDING PATTERNS"
        status="PHASE 1 SYNTHESIS"
        date="2026-05"
        title="Onboarding research for AL/IQ demo + dashboard MVP."
        sub="Compiled from Mercury Bank, Masterclass, Anthropic (claude.ai), and the broader UX research corpus. Five concrete decisions for the demo flow."
        bignum="5"
        bignumLabel="STEPS · ROLE → SIGNALS → CADENCE → EMAIL → REVEAL"
      />

      {/* Top-line stats */}
      <div className="stats-row">
        <Stat label="STEP COUNT" value="5" />
        <Stat label="PROGRESS UI" value="DOTS" mono />
        <Stat label="EMAIL GATE" value="STEP 4" mono />
        <Stat label="QUESTION TYPE" value="VISUAL TILES" mono />
        <Stat label="TONE" value="MERCURY" mono trend={{ dir: 'up', text: 'NOT DUOLINGO' }} />
      </div>

      {/* The 5-step funnel */}
      <div className="section">
        <SectionHead id="01.1 · FLOW" title="The 5-step funnel" />
        <div className="funnel">
          {steps.map((s, i) => (
            <div key={i} className="funnel-step">
              <div className="funnel-num">{s.n}</div>
              <div className="funnel-bar-wrap">
                <span className="funnel-step-label">STEP {s.n}</span>
                <span className="funnel-step-name">{s.name}</span>
                <div className={`funnel-bar ${i === 3 ? 'amber' : 'teal'}`}>
                  <div style={{ width: `${s.fill}%` }} />
                </div>
              </div>
              <div className="funnel-step-desc">{s.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Step count sweet spot */}
      <div className="grid-asym section">
        <div>
          <SectionHead id="01.2 · DATA" title="Step count sweet spot" />
          <div className="card subtle" style={{ padding: '24px 0' }}>
            <VBars data={stepCountData} height={180} />
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: 10,
              color: 'var(--ink-45)', letterSpacing: '0.1em',
              marginTop: 16, textTransform: 'uppercase'
            }}>
              RELATIVE CONVERSION INDEX (5 = 100) · BASED ON GHOST 1,000% LIFT + CROWD CONTENT 15% LIFT + COGNITIVE LOAD RESEARCH
            </div>
          </div>
        </div>
        <div>
          <SectionHead id="01.3 · VERDICT" title="The call" />
          <div className="card" style={{ marginBottom: 12 }}>
            <div className="card-label">UNDER 5</div>
            <div className="card-body">Not enough investment before email capture. Reveal feels generic.</div>
          </div>
          <div className="card" style={{ marginBottom: 12, borderColor: 'var(--teal)' }}>
            <div className="card-label" style={{ color: 'var(--teal)' }}>EXACTLY 5</div>
            <div className="card-body" style={{ color: 'var(--ink)' }}>
              Right ceiling for B2B intelligence positioning. Investment without form-fatigue.
            </div>
          </div>
          <div className="card">
            <div className="card-label">OVER 5</div>
            <div className="card-body">Feels like a form, not a quiz. Cognitive load breaks down past 6.</div>
          </div>
        </div>
      </div>

      {/* Persona routing */}
      <div className="section">
        <SectionHead id="01.4 · PERSONAS" title="Role → dashboard emphasis mapping" count={5} />
        <table className="table">
          <thead>
            <tr>
              <th style={{ width: 80 }}>#</th>
              <th>ROLE</th>
              <th>DASHBOARD EMPHASIS</th>
              <th style={{ width: 60 }}></th>
            </tr>
          </thead>
          <tbody>
            {personas.map((p, i) => (
              <tr key={i}>
                <td className="mono">{String(i + 1).padStart(2, '0')}</td>
                <td><b>{p.role}</b></td>
                <td className="mono">{p.emphasis}</td>
                <td><span className="seg-bar" style={{ width: 40, display: 'flex' }}>
                  <span className="seg" style={{ background: p.color, flex: 1 }} />
                </span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Reference products */}
      <div className="section">
        <SectionHead id="01.5 · REFERENCES" title="What each reference contributes" />
        <div className="grid-3">
          <div className="card">
            <div className="card-label teal">MERCURY BANK</div>
            <div className="card-title">Two-phase + conditional logic</div>
            <div className="card-body">
              Account creation first, then bank setup. Pre-fills form fields. Adapts questions based on
              prior answers — Defense BD ≠ Economic Dev path. Final step manages anticipation.
              <br /><br />
              <b style={{ color: 'var(--ink)' }}>Posture for AL/IQ.</b>
            </div>
          </div>
          <div className="card">
            <div className="card-label note">MASTERCLASS</div>
            <div className="card-title">Visual hook before question</div>
            <div className="card-body">
              Video snippets play immediately — emotion before logic. Don't copy directly: AL/IQ is
              B2B data-dense. Borrow the anticipation frame ("here's what you're about to see").
              <br /><br />
              <b style={{ color: 'var(--ink)' }}>Borrow the hook, not the structure.</b>
            </div>
          </div>
          <div className="card">
            <div className="card-label reject">CLAUDE.AI</div>
            <div className="card-title">What NOT to do</div>
            <div className="card-body">
              Near-zero onboarding works for a generic AI assistant. AL/IQ's dashboard only becomes
              valuable once we know who you are — skipping = generic dashboard = unimpressive.
              <br /><br />
              <b style={{ color: 'var(--ink)' }}>Demo is the one shot.</b>
            </div>
          </div>
        </div>
      </div>

      {/* The 8 key decisions */}
      <div className="section">
        <SectionHead id="01.6 · LOCKED" title="Eight decisions for AL/IQ" />
        <div className="list">
          {[
            ['5 steps, not 3, not 8.', 'Role → Signals → Cadence → Email → Reveal.'],
            ['Step dots, filled on advance.', 'Not a progress bar. Quiz feel, not form feel.'],
            ['Email at step 4.', 'After they\'re invested. Never at entry.'],
            ['Role selection = big visual tiles.', 'Not a dropdown. 1-line description per role.'],
            ['Conditional logic at step 2.', 'Pre-select signal types based on Step 1 role.'],
            ['Reveal IS the payoff.', '"Your AL/IQ Profile: Defense BD Director — G 8.4." Lead with the number.'],
            ['Tone: confident intelligence.', 'Mercury posture. Not Duolingo. Not startup-cute.'],
            ['Mobile: each step full-screen.', 'No scrolling within a step. One question per screen.'],
          ].map((d, i) => (
            <div key={i} className="list-item">
              <span className="list-num">{String(i + 1).padStart(2, '0')}</span>
              <div className="list-body">
                <div className="list-title">{d[0]}</div>
                <div className="list-desc">{d[1]}</div>
              </div>
              <span className="pill adopt">LOCKED</span>
            </div>
          ))}
        </div>
      </div>

      <PageFoot
        prev={{ id: 'overview', label: 'OVERVIEW' }}
        next={{ id: 'architecture', label: 'ARCHITECTURE' }}
        onNav={onNav}
      />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// 02 · DIGG ARCHITECTURE
// ═══════════════════════════════════════════════════════════════
function PageArchitecture({ onNav }) {
  const stack = [
    { name: 'Next.js 15 + Turbopack', sub: 'APP ROUTER · RSC STREAMING', color: 'var(--ink)' },
    { name: 'React Server Components', sub: 'STREAMING SSR', color: 'var(--ink-60)' },
    { name: 'Tailwind CSS', sub: 'UTILITY-FIRST · DARK MODE', color: 'var(--teal)' },
    { name: 'Jotai', sub: 'CLIENT STATE', color: 'var(--blue)' },
    { name: 'Clerk (X-only OAuth)', sub: 'AUTH', color: 'var(--violet)' },
    { name: 'Vercel + Blob Storage', sub: 'HOSTING + ASSETS', color: 'var(--amber)' },
    { name: 'PostHog (db.basic.in)', sub: 'ANALYTICS + ALL ELSE', color: 'var(--green)' },
    { name: 'Sentry', sub: 'ERROR TRACKING', color: 'var(--red)' },
  ];

  const observability = [
    { name: 'Core analytics', value: 1, color: 'var(--green)' },
    { name: 'Web Vitals', value: 1, color: 'var(--green)' },
    { name: 'Error autocapture', value: 1, color: 'var(--green)' },
    { name: 'Dead-click capture', value: 1, color: 'var(--green)' },
    { name: 'Session recording', value: 1, color: 'var(--green)' },
    { name: 'Surveys', value: 1, color: 'var(--green)' },
    { name: 'Feature flags', value: 1, color: 'var(--green)' },
    { name: 'Stack traces', value: 1, color: 'var(--red)' },
  ];

  const numbers = [
    { label: 'TRACKED INFLUENCERS', value: '1,989', meta: '3,000 RANKED' },
    { label: 'FOLLOW GRAPH EDGES', value: '~9M', meta: 'PAGERANK OVER X' },
    { label: 'CATEGORIES', value: '13', meta: 'POLITICIAN → ACADEMIC' },
    { label: 'GITHUB REPOS TRACKED', value: '1,962', meta: 'AI 2K STARS' },
    { label: 'TOP GRAVITY (KARPATHY)', value: '10.000', meta: '#1 RANKED' },
    { label: 'STORY REFRESH', value: 'HOURLY', meta: 'OR FASTER' },
  ];

  return (
    <div className="page">
      <DocHead
        phase="02 · DIGG ARCHITECTURE"
        status="EMULATION SCAN"
        date="2026-05-22"
        title="Digg is no longer a news aggregator — it's a vertical AI-Twitter signal board."
        sub="The corporate entity is Basic Intelligence. They use the literal word 'gravity' for their PageRank scoring — validating AL/IQ's Gravity Score metaphor at the brand level."
        bignum="9M"
        bignumLabel="EDGES IN THE FOLLOW GRAPH · RECURSIVE PAGERANK"
      />

      {/* Top-line key numbers */}
      <div className="grid-3" style={{ marginBottom: 56 }}>
        {numbers.map((n, i) => (
          <div key={i} className="hero-metric">
            <span className="hm-label">{n.label}</span>
            <span className="hm-value smaller">{n.value}</span>
            <span className="hm-note">{n.meta}</span>
          </div>
        ))}
      </div>

      {/* Five things that define Digg */}
      <div className="section">
        <SectionHead id="02.1 · EXECUTIVE SUMMARY" title="Five things that define Digg" />
        <div className="list">
          {[
            ['Reborn as vertical AI signal board.', '"AI news, before it trends." digg.com auto-redirects to /ai. Basic Intelligence is the company.'],
            ['They use the word "gravity" for scoring.', 'Karpathy: 10.000 · Jeff Dean: 9.522. Identical metaphor to AL/IQ\'s Gravity Score.'],
            ['Core algorithm is recursive PageRank.', '~9M-edge X follow graph across the "AI 2K". Voice-diversity weighting prevents domination.'],
            ['Stack is opinionated and tight.', 'Next.js + Vercel + Clerk + Jotai + Sentry + PostHog (everything else). No GA, no GTM, no Mixpanel.'],
            ['Zero distribution channels except X + SEO.', 'No newsletter, no about, no pricing (all 404). X is sole identity + distribution.'],
          ].map((d, i) => (
            <div key={i} className="list-item">
              <span className="list-num">{String(i + 1).padStart(2, '0')}</span>
              <div className="list-body">
                <div className="list-title">{d[0]}</div>
                <div className="list-desc">{d[1]}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tech stack */}
      <div className="grid-asym section">
        <div>
          <SectionHead id="02.2 · STACK" title="The tech stack" />
          <table className="table">
            <thead>
              <tr>
                <th>LAYER</th>
                <th>TECHNOLOGY</th>
                <th>EVIDENCE</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="mono">FRONTEND</td><td><b>Next.js 15 + Turbopack</b></td><td className="mono">turbopack-*.js · __next_f · RSC markers</td></tr>
              <tr><td className="mono">FRAMEWORK</td><td><b>React Server Components</b></td><td className="mono">$RB, $RC, $RV streaming markers</td></tr>
              <tr><td className="mono">STYLING</td><td><b>Tailwind CSS</b></td><td className="mono">utility classes · dark mode class</td></tr>
              <tr><td className="mono">STATE</td><td><b>Jotai</b></td><td className="mono">__JOTAI_DEFAULT_STORE__ global</td></tr>
              <tr><td className="mono">AUTH</td><td><b>Clerk · X-only OAuth</b></td><td className="mono">clerk.digg.com · v6.12.0</td></tr>
              <tr><td className="mono">HOSTING</td><td><b>Vercel</b></td><td className="mono">dpl_5ScQ888XpCQ... deployment ID</td></tr>
              <tr><td className="mono">ASSETS</td><td><b>Vercel Blob Storage</b></td><td className="mono">cnl5taoq5on9lswk.public.blob.vercel-storage.com</td></tr>
              <tr><td className="mono">ERROR</td><td><b>Sentry</b></td><td className="mono">o4511323215167488.ingest.us.sentry.io</td></tr>
              <tr><td className="mono">ANALYTICS</td><td><b>PostHog (everything)</b></td><td className="mono">db.basic.in CNAME · bypasses ad blockers</td></tr>
              <tr><td className="mono">FONTS</td><td><b>Roobert · Roobert Mono · IBM Plex Sans · VT323</b></td><td className="mono">4 custom families</td></tr>
            </tbody>
          </table>
        </div>
        <div>
          <SectionHead id="02.3 · OBSERVABILITY" title="PostHog consolidation" />
          <div className="card" style={{ marginBottom: 16 }}>
            <div className="card-label">CAPABILITIES IN ONE TOOL</div>
            {observability.map((o, i) => (
              <div key={i} style={{
                display: 'flex', justifyContent: 'space-between',
                padding: '8px 0', borderBottom: '1px solid var(--line-soft)',
                fontFamily: 'var(--font-mono)', fontSize: 11,
                color: 'var(--ink-60)', letterSpacing: '0.05em',
                textTransform: 'uppercase'
              }}>
                <span>{o.name}</span>
                <span style={{ color: o.color }}>
                  {o.color === 'var(--green)' ? '● POSTHOG' : '● SENTRY'}
                </span>
              </div>
            ))}
          </div>
          <div className="spec">
            <span className="k">NOT PRESENT:</span><br />
            ✕ Google Analytics<br />
            ✕ Google Tag Manager<br />
            ✕ Segment<br />
            ✕ Mixpanel · Amplitude<br />
            ✕ Hotjar · FullStory
          </div>
        </div>
      </div>

      {/* The algorithm */}
      <div className="section">
        <SectionHead id="02.4 · ALGORITHM" title="The ranking algorithm" />
        <div className="grid-2">
          <div className="card">
            <div className="card-label teal">VERBATIM SOURCE · llms.txt</div>
            <div style={{
              fontFamily: 'var(--font-serif)', fontSize: 17,
              fontStyle: 'italic', color: 'var(--ink)',
              lineHeight: 1.5, padding: '8px 0'
            }}>
              "Recursive PageRank over an ~9M-edge follow graph. A follow from a top-ranked
              account contributes more weight than a follow from an unranked account. Politicians
              are scored on a decoupled list (not PageRank) counting only how many AI 2K members
              follow them."
            </div>
          </div>
          <div className="card">
            <div className="card-label">KEY PROPERTIES</div>
            <div className="list" style={{ gap: 0 }}>
              {[
                ['PageRank over follow graph', 'Not engagement, not recency-decayed votes.'],
                ['Eigenvector-weighted', 'Top-ranked accounts\' follows count more.'],
                ['Voice-diversity weighting', 'Single person repeating themselves can\'t dominate a cluster.'],
                ['Decoupled scoring per category', 'Politicians scored differently than researchers.'],
                ['Rolling rebase', 'Recomputed continuously. "Last rebase" timestamp shown.'],
              ].map((p, i) => (
                <div key={i} style={{
                  padding: '10px 0', borderBottom: '1px solid var(--line-soft)'
                }}>
                  <div style={{
                    fontFamily: 'var(--font-display)', fontSize: 13,
                    color: 'var(--ink)', marginBottom: 2
                  }}>{p[0]}</div>
                  <div style={{
                    fontFamily: 'var(--font-display)', fontSize: 11,
                    color: 'var(--ink-60)', lineHeight: 1.5
                  }}>{p[1]}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Routes */}
      <div className="section">
        <SectionHead id="02.5 · ROUTES" title="The entire site is three top-level routes" />
        <div className="grid-3">
          <div className="hero-metric">
            <span className="hm-label">/AI · STORIES</span>
            <span className="hm-value smaller">571</span>
            <span className="hm-unit">CLUSTERS · LIVE</span>
            <span className="hm-note">Cluster of related X posts about the same event. Long descriptive headline + 1-sentence human detail subtitle.</span>
          </div>
          <div className="hero-metric">
            <span className="hm-label">/RANKINGS</span>
            <span className="hm-value smaller">3K</span>
            <span className="hm-unit">USERS · PAGERANK</span>
            <span className="hm-note">"Influencer Rankings — who the smartest people on X are paying attention to."</span>
          </div>
          <div className="hero-metric">
            <span className="hm-label">/AI/GITHUB/STARS</span>
            <span className="hm-value smaller">1,962</span>
            <span className="hm-unit">REPOS · 3-AXIS SCORE</span>
            <span className="hm-note">AI Score · Breakout Potential · Novelty. Direct template for AL/IQ Gravity decomposition.</span>
          </div>
        </div>
      </div>

      {/* Adopt vs reject */}
      <div className="section">
        <SectionHead id="02.6 · OPPORTUNITIES" title="What to adopt · what to reject" />
        <div className="comp">
          <div className="comp-col">
            <div className="comp-head">
              <h4>★ TOP 5 TO ADOPT</h4>
              <span className="pill adopt">P0–P1</span>
            </div>
            {[
              ['A', 'Multi-axis scoring on every signal card', 'Show 3 axes that compose Gravity (Source Credibility + Local Impact + Recency), not the rolled-up score. P0.'],
              ['B', 'Voice-diversity weighting in algorithm', 'Repeated mentions from same source decay. Lateral confirmation from different source types boosts. P0.'],
              ['C', 'Per-signal AI chatbot', '"Ask about this signal" scoped to source documents. Council minutes, contracts, filings. P1.'],
              ['D', 'llms.txt format + citation policy', 'Methodology section positions AL/IQ as research product, not content site. P1.'],
              ['E', 'Editorial voice + long descriptive headlines', 'Specificity over clickbait. B2B audience rewards it. P1.'],
            ].map((d, i) => (
              <div key={i} className="comp-row">
                <span className="k">{d[0]}</span>
                <div>
                  <div style={{ fontWeight: 500, marginBottom: 2 }}>{d[1]}</div>
                  <div className="v" style={{ color: 'var(--ink-60)', fontSize: 12 }}>{d[2]}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="comp-col">
            <div className="comp-head">
              <h4>✕ TOP 3 TO REJECT</h4>
              <span className="pill reject">CRITICAL</span>
            </div>
            {[
              ['F', 'Newsletter optional or absent', 'AL/IQ audience lives in inbox at 7am. Newsletter must be primary distribution. Loops + Convex.'],
              ['G', 'X-only auth', 'AL/IQ audience may not have X. Email-first magic link. Layer LinkedIn later — never X.'],
              ['H', 'Hidden pricing', 'AL/IQ is B2B subscription. Pricing page is a trust signal. Even single-tier at launch is correct.'],
            ].map((d, i) => (
              <div key={i} className="comp-row">
                <span className="k">{d[0]}</span>
                <div>
                  <div style={{ fontWeight: 500, marginBottom: 2 }}>{d[1]}</div>
                  <div className="v" style={{ color: 'var(--ink-60)', fontSize: 12 }}>{d[2]}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Monetization + distribution */}
      <div className="grid-2 section">
        <div className="card">
          <div className="card-label">DISTRIBUTION</div>
          <div className="card-title">Two channels. That's it.</div>
          <div className="card-body" style={{ marginBottom: 16 }}>
            <strong style={{ color: 'var(--ink)' }}>X + SEO.</strong> No newsletter (404). No about (404). No pricing (404).
            They ARE the X meta-layer — X is source and destination. Plus best-in-class llms.txt for AI-agent citation.
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <span className="pill teal">● X / TWITTER</span>
            <span className="pill teal">● SEO</span>
            <span className="pill teal">● LLMS.TXT</span>
          </div>
        </div>
        <div className="card">
          <div className="card-label">MONETIZATION</div>
          <div className="card-title">Zero. VC-backed runway.</div>
          <div className="card-body" style={{ marginBottom: 16 }}>
            No ads, no paywall, no subscription gate. Build the index, establish citation authority,
            monetize later via API access or premium analytics for AI-adjacent businesses.
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <span className="pill">● FREE PRODUCT</span>
            <span className="pill">● API LATER</span>
          </div>
        </div>
      </div>

      <PageFoot
        prev={{ id: 'onboarding', label: 'ONBOARDING' }}
        next={{ id: 'frontend', label: 'FRONTEND' }}
        onNav={onNav}
      />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// 03 · DIGG FRONTEND
// ═══════════════════════════════════════════════════════════════
function PageFrontend({ onNav }) {
  const flexoki = [
    { name: '--bg-dark', hex: '#171616', role: 'BACKGROUND' },
    { name: '--bg-light', hex: '#EFECE6', role: 'BG / LIGHT' },
    { name: '--card-dark', hex: '#1C1B1A', role: 'CARD' },
    { name: '--primary', hex: '#DA702C', role: 'PRIMARY / RANK-ONE' },
    { name: '--accent', hex: '#3AA99F', role: 'ACCENT TEAL' },
    { name: '--fg-dark', hex: '#EFECE6', role: 'INK / FG' },
    { name: '--fg-muted', hex: '#969592', role: 'MUTED FG' },
    { name: '--border', hex: '#FFF1A', role: '10% WHITE' },
  ];

  return (
    <div className="page">
      <DocHead
        phase="03 · DIGG FRONTEND"
        status="VISUAL DECISIONS"
        date="2026-05-22"
        title="Five visual decisions that define Digg's feel."
        sub="Flexoki tokens. Monospace as the dominant body font. Dedicated --rank-one CSS token. 10-segment health bar visualization. 2px radius globally."
        bignum="2"
        bignumLabel="PX · THE GLOBAL BORDER RADIUS"
      />

      {/* 5 visual decisions */}
      <div className="section">
        <SectionHead id="03.1 · DECISIONS" title="Five visual decisions" />
        <div className="grid-3" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
          {[
            ['01', 'Flexoki color scheme', 'Steph Ango\'s "ink on paper" palette: cream #efece6 / near-black #171616 / warm orange #da702c. NOT Tailwind defaults. Signals "we are a publication."'],
            ['02', 'Monospace is the body font', 'roobertMono is the document default. Sans only on headlines, names, reading body. Data / scores / ranks / timestamps all mono. Terminal/research-tool feel.'],
            ['03', 'Dedicated --rank-one token', 'Single most rank-conscious DS observed. #1 ranked item gets its own CSS variable. AL/IQ highest-gravity signals deserve the same.'],
            ['04', '10-segment "health bar"', '3-axis score viz with per-metric color. flex-1 + rounded-[1px] + 1px gap. role="meter". Directly portable to AL/IQ.'],
            ['05', '2px corner radius globally', '--radius: .125rem. Almost-square corners. Far tighter than 8-12px B2B SaaS standard. Technical character.'],
          ].map((d, i) => (
            <div key={i} className="card">
              <div className="card-label">DECISION {d[0]}</div>
              <div className="card-title">{d[1]}</div>
              <div className="card-body">{d[2]}</div>
            </div>
          ))}
          <div className="card subtle" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', borderColor: 'var(--teal)' }}>
            <div className="card-label teal">MONEY SHOT</div>
            <div className="card-title">The 10-segment health bar</div>
            <div style={{ margin: '16px 0' }}>
              <SegBar value={9} label="AI SCORE" color="blue" />
              <div style={{ height: 8 }} />
              <SegBar value={4} label="BREAKOUT" color="violet" />
              <div style={{ height: 8 }} />
              <SegBar value={6} label="NOVELTY" color="amber" />
            </div>
            <div className="card-body" style={{ fontSize: 11 }}>
              Most directly portable pattern. Maps to AL/IQ's 3 Gravity axes 1:1.
            </div>
          </div>
        </div>
      </div>

      {/* Flexoki palette */}
      <div className="section">
        <SectionHead id="03.2 · TOKENS" title="Flexoki — semantic tokens" />
        <div className="swatch-grid">
          {flexoki.map((c, i) => (
            <div key={i} className="swatch">
              <div className="swatch-color" style={{
                background: c.hex,
                borderBottom: c.hex.toLowerCase() === '#efece6' ? '1px solid var(--line)' : 'none'
              }} />
              <div className="swatch-meta">
                <span className="swatch-name">{c.name}</span>
                <span className="swatch-hex">{c.hex}</span>
                <span className="swatch-hex" style={{ color: 'var(--teal)', marginTop: 4 }}>{c.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Typography */}
      <div className="section">
        <SectionHead id="03.3 · TYPE" title="Two-font system, mono-first chrome" />
        <div className="grid-asym">
          <div className="card">
            <div className="card-label">VERIFIED TYPE SCALE</div>
            {[
              ['PAGE H1', 'roobertMono · 30px · 600 · -0.75px tracking', '"Influencer Rankings"'],
              ['SECTION HEAD', 'roobert · 24-28px · 700', '"Top Stories"'],
              ['CARD HEADLINE', 'roobert · 14px · 600 · line-clamp-3', 'Story card titles'],
              ['BODY', 'roobertMono · 16px · 400', 'Page subhead'],
              ['SMALL', 'roobertMono · 12-14px · 400', 'Bios, descriptions'],
              ['CATEGORY LABEL', 'roobertMono · 10px · 600 · wider tracking · UPPER', '"IN CASE YOU MISSED IT"'],
              ['SCORE LABEL', 'roobertMono · 10px · 400 · UPPER', '"AI SCORE"'],
              ['RANK NUMBER', 'roobert · 12px · 600 · tabular-nums', '"#43" badges'],
              ['AVATAR INITIALS', 'roobert · 12px · 500', '"CS", "EJ"'],
            ].map((row, i) => (
              <div key={i} style={{
                display: 'grid', gridTemplateColumns: '140px 1fr 160px',
                gap: 16, padding: '10px 0',
                borderBottom: '1px solid var(--line-soft)',
                alignItems: 'center'
              }}>
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: 9,
                  color: 'var(--teal)', letterSpacing: '0.15em',
                  textTransform: 'uppercase'
                }}>{row[0]}</span>
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: 10,
                  color: 'var(--ink-60)'
                }}>{row[1]}</span>
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: 10,
                  color: 'var(--ink-45)', textAlign: 'right'
                }}>{row[2]}</span>
              </div>
            ))}
          </div>
          <div>
            <div className="card" style={{ marginBottom: 16 }}>
              <div className="card-label">CRITICAL: ALWAYS</div>
              <div className="card-body" style={{ color: 'var(--ink)' }}>
                <code style={{ color: 'var(--teal)' }}>tabular-nums</code> on every rank, count, percentage, dollar amount.
                Non-negotiable for B2B data product.
              </div>
            </div>
            <div className="card">
              <div className="card-label">FREE SUBSTITUTES</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-60)', lineHeight: 2 }}>
                <div><b style={{ color: 'var(--ink)' }}>SANS:</b> Geist · Inter · IBM Plex Sans</div>
                <div><b style={{ color: 'var(--ink)' }}>MONO:</b> Geist Mono · JetBrains Mono · IBM Plex Mono</div>
                <div><b style={{ color: 'var(--ink)' }}>SKIP:</b> Roobert (paid). VT323 (too aggressive for B2B).</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Story card */}
      <div className="section">
        <SectionHead id="03.4 · ANATOMY" title="Story card anatomy" />
        <div className="grid-2">
          <div className="card">
            <div className="card-label">HIGHLIGHT TILE · 220PX</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-60)', lineHeight: 1.9 }}>
              <div>PADDING: <b style={{ color: 'var(--ink)' }}>16px ALL</b></div>
              <div>BG: <b style={{ color: 'var(--ink)' }}>--card (#1c1b1a)</b></div>
              <div>BORDER-RADIUS: <b style={{ color: 'var(--ink)' }}>3px</b></div>
              <div>BORDER: <b style={{ color: 'var(--ink)' }}>NONE</b></div>
              <div>AVATAR SIZE: <b style={{ color: 'var(--ink)' }}>24×24px</b></div>
              <div>HEIGHT: <b style={{ color: 'var(--ink)' }}>168px FIXED</b></div>
              <div>LAYOUT: <b style={{ color: 'var(--ink)' }}>flex-col justify-between</b></div>
            </div>
            <div style={{
              marginTop: 16, padding: 12,
              background: 'var(--bg-elev-2)', border: '1px solid var(--line)',
              fontFamily: 'var(--font-mono)', fontSize: 9,
              color: 'var(--ink-45)', letterSpacing: '0.1em',
              textTransform: 'uppercase'
            }}>
              The justify-between is the trick — header pushes top, footer pushes bottom, headline floats.
            </div>
          </div>
          <div className="card">
            <div className="card-label">LEADERBOARD-BY-AXIS</div>
            <div className="card-title">Every interaction dimension = "#1"</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-60)', letterSpacing: '0.1em' }}>#1 LIKED</span>
                <span className="pill" style={{ color: 'var(--red)', borderColor: 'rgba(215,25,33,0.3)' }}>RED PILL</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-60)', letterSpacing: '0.1em' }}>#1 BOOKMARKED</span>
                <span className="pill" style={{ color: 'var(--blue)', borderColor: 'rgba(74,144,226,0.3)' }}>BLUE ICON</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-60)', letterSpacing: '0.1em' }}>#1 COMMENTS</span>
                <span className="pill note">ORANGE PILL</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-60)', letterSpacing: '0.1em' }}>#1 VIEWED</span>
                <span className="pill" style={{ color: 'var(--violet)', borderColor: 'rgba(155,123,226,0.3)' }}>VIOLET ICON</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-60)', letterSpacing: '0.1em' }}>MISSED IT</span>
                <span className="pill note">AMBER ICON</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats banner */}
      <div className="section">
        <SectionHead id="03.5 · CHROME" title="Stats banner above feed" />
        <div style={{
          padding: 24, border: '1px solid var(--line)',
          background: 'var(--bg-elev-1)', marginBottom: 16
        }}>
          <div style={{
            fontFamily: 'var(--font-display)', fontSize: 28,
            fontWeight: 500, color: 'var(--ink)', marginBottom: 4,
            letterSpacing: '-0.01em'
          }}>Top Stories</div>
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: 18,
            color: 'var(--ink-45)', marginBottom: 16
          }}>Friday, May 22 2026</div>
          <div style={{
            display: 'flex', gap: 24, flexWrap: 'wrap',
            fontFamily: 'var(--font-mono)', fontSize: 11,
            color: 'var(--ink-60)', letterSpacing: '0.1em',
            textTransform: 'uppercase'
          }}>
            <span>POSTS: <b style={{ color: 'var(--ink)' }}>2,430</b></span>
            <span style={{ color: 'var(--ink-30)' }}>│</span>
            <span>CLUSTERS: <b style={{ color: 'var(--ink)' }}>571</b></span>
            <span style={{ color: 'var(--ink-30)' }}>│</span>
            <span>NEXT CRAWL: <b style={{ color: 'var(--ink)' }}>04:39</b></span>
            <span style={{ color: 'var(--ink-30)' }}>│</span>
            <span style={{ color: 'var(--amber)' }}>[+] LIVE FEED</span>
          </div>
        </div>
        <div className="card-body" style={{ fontSize: 13 }}>
          Maps to AL/IQ: <code>SIGNALS: N │ CATEGORIES: M │ LAST CRAWL: HH:MM │ LIVE</code>.
          Signals freshness, scale, recency in one row. Cheap trust signaling.
        </div>
      </div>

      {/* AL/IQ application */}
      <div className="section">
        <SectionHead id="03.6 · AL/IQ" title="Adopt for AL/IQ" />
        <div className="comp">
          <div className="comp-col">
            <div className="comp-head">
              <h4>✓ ADOPT VERBATIM</h4>
              <span className="pill adopt">DIRECTIVES</span>
            </div>
            {[
              'Flexoki color tokens (open-source MIT)',
              'tabular-nums on every data display',
              '10-segment health bar for Gravity decomposition',
              'Leaderboard-by-axis pill colors',
              'Stats banner above daily feed',
              'Inverted CTA button (cream on dark)',
              'Static (non-sticky) header',
              '2px global radius for technical character',
            ].map((d, i) => (
              <div key={i} className="comp-row">
                <span className="k">{String(i + 1).padStart(2, '0')}</span>
                <span className="v">{d}</span>
              </div>
            ))}
          </div>
          <div className="comp-col">
            <div className="comp-head">
              <h4>✕ SKIP</h4>
              <span className="pill reject">FROM DIGG</span>
            </div>
            {[
              ['Pixel-art logo', 'Find AL/IQ\'s own typographic personality'],
              ['Default-dark mode', 'B2B email-reading audience defaults light'],
              ['VT323 / terminal font', 'Too aggressive for B2B'],
              ['3-tab segmented top nav', 'AL/IQ needs search + category filter, not three feeds'],
            ].map((d, i) => (
              <div key={i} className="comp-row">
                <span className="k">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <div className="v" style={{ marginBottom: 2 }}>{d[0]}</div>
                  <div className="v" style={{ color: 'var(--ink-60)', fontSize: 12 }}>{d[1]}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <PageFoot
        prev={{ id: 'architecture', label: 'ARCHITECTURE' }}
        next={{ id: 'detail', label: 'DETAIL PAGE' }}
        onNav={onNav}
      />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// 04 · DIGG DETAIL PAGE
// ═══════════════════════════════════════════════════════════════
function PageDetail({ onNav }) {
  return (
    <div className="page">
      <DocHead
        phase="04 · DETAIL PAGE INSPECTION"
        status="FINE-GRAINED · COMPUTED-STYLE DATA"
        date="2026-05-22"
        title="Fieldset+legend pattern. Q&A wiki that compounds. One reserved primary color."
        sub="Closes the detail-page gap with computed-style measurements via PostHog renderer-lock workaround. Full single-shot extractor data captured."
        bignum="8"
        bignumLabel="NEW DIRECTIVES SHIPPED TO AL/IQ BUILD"
      />

      {/* Engagement metrics — from the example page */}
      <div className="section">
        <SectionHead id="04.1 · ENGAGEMENT" title="The OpenAI Erdős story · engagement metrics" />
        <div className="kpi-grid" style={{ gridTemplateColumns: 'repeat(5, 1fr)' }}>
          <Kpi label="REPLIES" value="4.7K" kind="mono" meta="MONO · TABULAR" />
          <Kpi label="LIKES" value="114.4K" kind="mono" meta="GAP-X-10 SPACING" />
          <Kpi label="REPOSTS" value="12.1K" kind="mono" meta="MUTED-FOREGROUND" />
          <Kpi label="BOOKMARKS" value="26.9K" kind="mono" meta="14PX MONO" />
          <Kpi label="IMPRESSIONS" value="26.2M" kind="mono" meta="HERO METRIC" />
        </div>
      </div>

      {/* H1 spec demo */}
      <div className="section">
        <SectionHead id="04.2 · TYPOGRAPHY" title="The editorial H1 + subtitle spec" />
        <div className="grid-asym">
          <div className="card" style={{ padding: 36 }}>
            <div className="card-label">LIVE PREVIEW</div>
            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 36, fontWeight: 700, lineHeight: 1.1,
              letterSpacing: '-0.025em', color: 'var(--ink)',
              marginBottom: 16, textWrap: 'balance',
              overflowWrap: 'anywhere'
            }}>
              OpenAI reports its internal general-purpose reasoning model found new point
              configurations for the Erdős planar unit distance problem that outperform prior
              square-grid optima
            </h1>
            <p style={{
              fontFamily: 'var(--font-display)',
              fontSize: 18, fontWeight: 400, lineHeight: 1.625,
              color: 'var(--ink-60)', textWrap: 'pretty'
            }}>
              Lijie Chen, recently from UC Berkeley, contributed during exploratory testing.
            </p>
          </div>
          <div className="spec">
            <span className="k">H1:</span><br />
            font-family: <b>roobert</b><br />
            font-size: <b>36px</b> (sm) / 30px<br />
            font-weight: <b>700</b><br />
            line-height: <b>39.6px (1.1)</b><br />
            letter-spacing: <b>-0.9px</b><br />
            text-wrap: <b>balance</b><br />
            overflow-wrap: <b>anywhere</b><br />
            <br />
            <span className="k">SUBTITLE:</span><br />
            font-family: <b>roobert (sans!)</b><br />
            font-size: <b>18px</b><br />
            font-weight: <b>400</b><br />
            line-height: <b>29.25px (1.625)</b><br />
            text-wrap: <b>pretty</b><br />
          </div>
        </div>
      </div>

      {/* Fieldset pattern */}
      <div className="section">
        <SectionHead id="04.3 · PATTERN" title="The <fieldset> + <legend> source embed" />
        <div className="grid-asym">
          <div>
            <fieldset style={{
              border: '1px solid var(--line)',
              borderRadius: 8,
              padding: 24,
              fontFamily: 'var(--font-display)',
              color: 'var(--ink-60)',
              fontSize: 14,
              lineHeight: 1.6
            }}>
              <legend style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 12, fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: 'var(--ink-45)',
                background: 'var(--bg)',
                padding: '0 8px', marginLeft: 12
              }}>Original post</legend>
              <div style={{ color: 'var(--ink)', marginBottom: 8, fontWeight: 500 }}>
                @sama · OpenAI
              </div>
              <div>
                Our internal reasoning model found new point configurations for the Erdős planar
                unit distance problem that outperform prior square-grid optima. Lijie Chen contributed
                during exploratory testing — incredible work.
              </div>
            </fieldset>
            <div style={{
              marginTop: 16,
              fontFamily: 'var(--font-mono)', fontSize: 10,
              color: 'var(--ink-45)', letterSpacing: '0.1em',
              textTransform: 'uppercase'
            }}>
              ↑ LIVE FIELDSET DEMO · LEGEND PUNCHES THROUGH BORDER VIA BG-MATCH
            </div>
          </div>
          <div className="card">
            <div className="card-label">WHY IT MATTERS</div>
            <div className="card-body" style={{ color: 'var(--ink)' }}>
              Semantic HTML done right. Most teams use <code style={{ color: 'var(--teal)' }}>&lt;div&gt;</code> with
              absolute-positioned heading. Digg uses native browser pattern with thin border + background-matched
              legend punching through.
              <br /><br />
              <b style={{ color: 'var(--ink)' }}>AL/IQ application:</b><br />
              <span style={{ color: 'var(--ink-60)', fontSize: 13 }}>
                Use for embedded source documents:<br />
                • "Original filing" — SEC filings<br />
                • "Council excerpt" — Madison/Huntsville minutes<br />
                • "Press release" — vendor/agency announcements<br />
                • "Contract text" — DoD/DoE awards
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Sentiment as numbers + narrative */}
      <div className="section">
        <SectionHead id="04.4 · RESTRAINT" title="Sentiment — numbers + narrative, no charts" />
        <div className="grid-asym">
          <div>
            <SplitBar segments={[
              { kind: 'pos', value: 64.2, label: 'POS 64.2%' },
              { kind: 'neg', value: 35.8, label: 'NEG 35.8%' },
            ]} />
            <div style={{
              marginTop: 24,
              fontFamily: 'var(--font-display)', fontSize: 14,
              color: 'var(--ink-60)', lineHeight: 1.6
            }}>
              Positive users praise OpenAI models and researchers for disproving the Erdős unit
              distance conjecture. Skeptics note the result has not yet been formally peer-reviewed
              and question reproducibility of the configurations.
            </div>
            <div style={{
              marginTop: 16,
              fontFamily: 'var(--font-mono)', fontSize: 10,
              color: 'var(--ink-45)', letterSpacing: '0.1em',
              textTransform: 'uppercase'
            }}>
              ↑ TWO PERCENTAGES + WRITTEN NARRATIVE · NO BAR, NO PIE
            </div>
          </div>
          <div className="card">
            <div className="card-label">EDITORIAL CONFIDENCE</div>
            <div className="card-body" style={{ color: 'var(--ink)' }}>
              No chart. No bar graph. No pie. They trust the words to do the work.
              <br /><br />
              <b style={{ color: 'var(--ink)' }}>AL/IQ:</b> show raw percentages + narrative paragraph for signal
              sentiment. Numbers present but not visualized. Appropriate for research-grade B2B.
            </div>
          </div>
        </div>
      </div>

      {/* Digg Depth — the Q&A wiki */}
      <div className="section">
        <SectionHead id="04.5 · KILLER PATTERN" title="Digg Depth — the Q&A wiki that compounds" />
        <div className="card" style={{ borderColor: 'var(--teal)', marginBottom: 16 }}>
          <div className="card-label teal">THE MOST IMPORTANT PATTERN IN THE ENTIRE SITE</div>
          <div className="card-body" style={{ color: 'var(--ink)', fontSize: 14, lineHeight: 1.7 }}>
            Every story becomes a wiki entry that compounds. Each reader's question + AI answer
            becomes a permanent enhancement to the story page. <b>Improves SEO. Builds defensibility.
            Reduces re-question friction.</b> The answer pool becomes irreplaceable over time.
          </div>
        </div>
        <div className="card" style={{ padding: 0 }}>
          {[
            ['SN', 'Sheing Ng', 'What\'s the Erdős Unit Distance Conjecture?',
              'The Erdős unit distance conjecture, posed by Paul Erdős in 1946, asks how often a unit distance can occur among n points in the plane. The conjecture has implications for combinatorial geometry and computer graphics...'],
            ['JK', 'Justin K', 'Has this configuration been peer-reviewed?',
              'Not yet. The OpenAI announcement is a pre-print posted to arXiv. Peer review typically takes 6-18 months for results of this complexity. Several mathematicians on X have noted reproducibility checks are underway...'],
            ['KC', 'Kristina C', 'What does this mean for theoretical computer science?',
              'If the configurations hold up to scrutiny, this would be the first material advance on the Erdős unit distance problem since Tao\'s 2006 work. The implications for combinatorial geometry are significant...'],
          ].map((q, i) => (
            <div key={i} style={{
              padding: 24,
              borderBottom: i < 2 ? '1px solid var(--line-soft)' : 'none'
            }}>
              <div style={{ display: 'flex', gap: 16, marginBottom: 12 }}>
                <div style={{
                  width: 32, height: 32, borderRadius: '50%',
                  border: '1px solid var(--line)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--font-mono)', fontSize: 10,
                  color: 'var(--ink-60)', letterSpacing: '0.05em',
                  flexShrink: 0
                }}>{q[0]}</div>
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontFamily: 'var(--font-display)', fontSize: 13,
                    color: 'var(--ink-60)'
                  }}>
                    <b style={{ color: 'var(--ink)' }}>{q[1]}</b> asked
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-display)', fontSize: 15,
                    color: 'var(--ink)', marginTop: 4, fontWeight: 500
                  }}>{q[2]}</div>
                </div>
              </div>
              <div style={{
                marginLeft: 48,
                fontFamily: 'var(--font-display)', fontSize: 13,
                color: 'var(--ink-60)', lineHeight: 1.6
              }}>{q[3]}</div>
            </div>
          ))}
        </div>
        <div style={{
          marginTop: 16,
          fontFamily: 'var(--font-mono)', fontSize: 10,
          color: 'var(--ink-45)', letterSpacing: '0.1em',
          textTransform: 'uppercase'
        }}>
          ↑ AL/IQ APPLICATION: "SIGNAL DEPTH" — Q&A SCOPED TO SOURCE DOCS · PERSISTS PUBLICLY · COMPOUNDS PAGE VALUE
        </div>
      </div>

      {/* The chatbot — the one place primary appears */}
      <div className="section">
        <SectionHead id="04.6 · HERO CTA" title="The chatbot — primary orange used ONCE" />
        <div className="grid-asym">
          <div>
            <div style={{
              border: '1px solid var(--line)',
              borderRadius: 32,
              padding: 8,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              background: 'var(--bg-elev-1)',
              minHeight: 56
            }}>
              <input
                type="text"
                placeholder="Ask a question about the story..."
                style={{
                  flex: 1,
                  background: 'var(--bg-elev-2)',
                  border: '1px solid var(--line-soft)',
                  borderRadius: 24,
                  padding: '10px 16px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 14,
                  color: 'var(--ink)',
                  outline: 'none'
                }}
              />
              <button style={{
                width: 36, height: 36, borderRadius: '50%',
                background: '#DA702C', border: 'none',
                color: '#0A0A0A',
                fontSize: 18, fontWeight: 700,
                cursor: 'pointer',
                flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>↑</button>
            </div>
            <div style={{
              marginTop: 16,
              fontFamily: 'var(--font-mono)', fontSize: 10,
              color: 'var(--ink-45)', letterSpacing: '0.1em',
              textTransform: 'uppercase'
            }}>
              ↑ 36×36 CIRCLE · #DA702C · THE ONLY BG-PRIMARY ON THE ENTIRE SITE
            </div>
          </div>
          <div className="card" style={{ borderColor: '#DA702C' }}>
            <div className="card-label" style={{ color: '#DA702C' }}>● RESTRAINT</div>
            <div className="card-title">One CTA. One color.</div>
            <div className="card-body">
              Across every Digg page inspected, primary orange #da702c is used as a button background
              <b style={{ color: 'var(--ink)' }}> exactly once: this submit arrow</b>. Every other primary
              use is borders/rings/text-accents.
              <br /><br />
              This restraint makes the chatbot submit <b style={{ color: 'var(--ink)' }}>the</b> visual focus
              of the detail page — explicitly: "use this."
            </div>
          </div>
        </div>
      </div>

      {/* The 8 new directives */}
      <div className="section">
        <SectionHead id="04.7 · DIRECTIVES" title="Eight new directives" count={8} />
        <div className="list">
          {[
            ['Use semantic <fieldset> + <legend> for source embeds', 'Council excerpts, contract clauses, press releases, RFP text. Accessible. Beautiful. Signals "this is the source, not our words."'],
            ['Adopt the Q&A Depth pattern verbatim', 'space-y-4 + divide-y between Q&A pairs. AI answers scoped to source docs. Persists publicly, compounds page value over time.'],
            ['Reserve primary orange for ONE CTA', 'Subscribe button on homepage. Ask-about-signal submit on signal page. Nowhere else. Restraint creates emphasis.'],
            ['Detail page H1 typography spec', 'clamp(30px, 4vw, 36px) · 700 · 1.1 · -0.025em · balance · anywhere.'],
            ['Subtitle: sans 18px, 1.625 line-height', 'Reading-mode typography. text-wrap: pretty for prose.'],
            ['Section H2s: 16px sans 700, not larger', 'Weight contrast (400 vs 700) + font swap (mono → sans) carries hierarchy.'],
            ['Rank numerals: 18px mono 600 at 40% opacity in 40px gutter', 'Don\'t make rank numbers shouty. Negative space does the work.'],
            ['Sentiment as numbers + narrative, not charts', 'Show raw percentages + written paragraph. No bars. No pie. Research-grade restraint.'],
          ].map((d, i) => (
            <div key={i} className="list-item">
              <span className="list-num">{String.fromCharCode(65 + i)}</span>
              <div className="list-body">
                <div className="list-title">{d[0]}</div>
                <div className="list-desc">{d[1]}</div>
              </div>
              <span className="pill adopt">SHIP</span>
            </div>
          ))}
        </div>
      </div>

      {/* Closing summary */}
      <div className="ov-hero" style={{ padding: 40 }}>
        <div className="doc-eyebrow" style={{ marginBottom: 24 }}>
          <span className="dot">●</span>
          <span><b>RESEARCH SET CLOSED</b></span>
          <span className="slash">/</span>
          <span>FEED TO CLAUDE CODE FOR AL/IQ BUILD PHASE</span>
        </div>
        <div style={{
          fontFamily: 'var(--font-display)', fontSize: 28,
          color: 'var(--ink)', fontWeight: 400,
          letterSpacing: '-0.02em', lineHeight: 1.2, textWrap: 'balance'
        }}>
          Three reports complete. The product to build is not Digg — it's Digg's
          architectural posture applied to Alabama's economic signals, with
          email-first distribution and a publicly-readable methodology.
        </div>
      </div>

      <PageFoot
        prev={{ id: 'frontend', label: 'FRONTEND' }}
        next={{ id: 'overview', label: 'BACK TO INDEX' }}
        onNav={onNav}
      />
    </div>
  );
}

// Export
Object.assign(window, { PageOverview, PageOnboarding, PageArchitecture, PageFrontend, PageDetail });
