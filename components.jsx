/* ───────────────────────────────────────────────────────────────
   Shared visualization components — Nothing × AL/IQ
   ────────────────────────────────────────────────────────────── */

const { useState, useEffect, useRef } = React;

// ─── Segmented meter bar (Digg pattern, Nothing aesthetic) ────
function SegBar({ value, max = 10, color = 'on', label, showNumber = true }) {
  const segs = [];
  for (let i = 0; i < max; i++) {
    segs.push(<div key={i} className={`seg ${i < value ? color : ''}`} />);
  }
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      {label && (
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: 10,
          letterSpacing: '0.15em', color: 'var(--ink-45)',
          textTransform: 'uppercase', minWidth: 140
        }}>{label}</span>
      )}
      <div className="seg-bar" style={{ width: 100 }}>{segs}</div>
      {showNumber && (
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: 12,
          color: 'var(--ink)', minWidth: 24, textAlign: 'right',
          fontVariantNumeric: 'tabular-nums'
        }}>{value}</span>
      )}
    </div>
  );
}

// ─── Bar chart row ────────────────────────────────────────────
function BarRow({ label, value, max, format, color = '' }) {
  const pct = Math.min(100, (value / max) * 100);
  return (
    <div className="bar-row">
      <div className="bar-label">{label}</div>
      <div className="bar-track">
        <div className={`bar-fill ${color}`} style={{ width: `${pct}%` }} />
      </div>
      <div className="bar-value">{format ? format(value) : value}</div>
    </div>
  );
}

// ─── Donut chart (SVG) ────────────────────────────────────────
function Donut({ data, size = 200, thickness = 28 }) {
  const total = data.reduce((s, d) => s + d.value, 0);
  const radius = (size - thickness) / 2;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;
  const cx = size / 2, cy = size / 2;

  return (
    <div className="donut-wrap">
      <svg width={size} height={size} className="donut-svg" style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={cx} cy={cy} r={radius}
          fill="none" stroke="var(--ink-06)" strokeWidth={thickness} />
        {data.map((d, i) => {
          const len = (d.value / total) * circumference;
          const dash = `${len} ${circumference - len}`;
          const seg = (
            <circle key={i} cx={cx} cy={cy} r={radius}
              fill="none" stroke={d.color} strokeWidth={thickness}
              strokeDasharray={dash} strokeDashoffset={-offset} />
          );
          offset += len + 2; // small gap between segments
          return seg;
        })}
        <text x={cx} y={cy} textAnchor="middle"
          dominantBaseline="central"
          style={{
            fontFamily: 'var(--font-mono)', fontSize: 11,
            fill: 'var(--ink-45)', letterSpacing: '0.15em',
            textTransform: 'uppercase', transform: 'rotate(90deg)',
            transformOrigin: `${cx}px ${cy}px`
          }}>
          {total}
        </text>
      </svg>
      <div className="donut-legend">
        {data.map((d, i) => (
          <div key={i} className="donut-legend-row">
            <span className="donut-swatch" style={{ background: d.color }} />
            <span className="donut-name">
              {d.name}
              {d.sub && <small>{d.sub}</small>}
            </span>
            <span className="donut-pct">{Math.round((d.value / total) * 100)}%</span>
            <span className="donut-count">{d.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Sentiment split bar ──────────────────────────────────────
function SplitBar({ segments }) {
  return (
    <div className="split-bar">
      {segments.map((s, i) => (
        <div key={i} className={`split-seg ${s.kind}`} style={{ flex: s.value }}>
          {s.label || `${Math.round(s.value)}%`}
        </div>
      ))}
    </div>
  );
}

// ─── Stat tile ────────────────────────────────────────────────
function Stat({ label, value, mono, trend }) {
  return (
    <div className="stat">
      <span className="stat-label">{label}</span>
      <span className={`stat-value ${mono ? 'mono' : ''}`}>{value}</span>
      {trend && <span className={`stat-trend ${trend.dir}`}>{trend.text}</span>}
    </div>
  );
}

// ─── KPI ──────────────────────────────────────────────────────
function Kpi({ label, value, kind = '', meta }) {
  return (
    <div className="kpi">
      <span className="kpi-label">{label}</span>
      <span className={`kpi-value ${kind}`}>{value}</span>
      {meta && <span className="kpi-meta">{meta}</span>}
    </div>
  );
}

// ─── Hero metric ──────────────────────────────────────────────
function HeroMetric({ label, value, unit, note, smaller }) {
  return (
    <div className="hero-metric">
      <span className="hm-label">{label}</span>
      <span className={`hm-value ${smaller ? 'smaller' : ''}`}>{value}</span>
      {unit && <span className="hm-unit">{unit}</span>}
      {note && <span className="hm-note">{note}</span>}
    </div>
  );
}

// ─── Vertical bar chart (mini) ────────────────────────────────
function VBars({ data, max, height = 120, color = 'var(--ink)' }) {
  const m = max || Math.max(...data.map(d => d.value));
  return (
    <div style={{
      display: 'flex', alignItems: 'flex-end', gap: 6,
      height: height, padding: '8px 0',
      borderBottom: '1px solid var(--line-soft)'
    }}>
      {data.map((d, i) => {
        const h = (d.value / m) * (height - 24);
        return (
          <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: 9,
              color: 'var(--ink-45)', letterSpacing: '0.05em'
            }}>{d.value}</div>
            <div style={{
              width: '100%', height: h, background: d.color || color,
              borderTop: '1px solid var(--ink)'
            }} />
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: 9,
              color: 'var(--ink-45)', letterSpacing: '0.1em',
              textTransform: 'uppercase'
            }}>{d.label}</div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Stacked bar comparator ───────────────────────────────────
function StackedRow({ label, parts, total }) {
  const sum = total || parts.reduce((s, p) => s + p.value, 0);
  return (
    <div style={{
      display: 'grid', gridTemplateColumns: '160px 1fr 80px',
      gap: 16, alignItems: 'center', padding: '12px 0',
      borderBottom: '1px solid var(--line-soft)'
    }}>
      <div className="bar-label">{label}</div>
      <div style={{
        display: 'flex', height: 18, background: 'var(--ink-06)',
        gap: 1
      }}>
        {parts.map((p, i) => (
          <div key={i} title={`${p.label}: ${p.value}`} style={{
            flex: p.value,
            background: p.color,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'var(--font-mono)', fontSize: 9,
            color: 'var(--bg)', overflow: 'hidden'
          }}>
            {p.value / sum > 0.15 ? p.label : ''}
          </div>
        ))}
      </div>
      <div className="bar-value">{sum}</div>
    </div>
  );
}

// ─── Radar / polygon viz ──────────────────────────────────────
function Radar({ axes, values, size = 240, max = 10, color = 'var(--teal)' }) {
  const cx = size / 2, cy = size / 2;
  const r = size / 2 - 32;
  const n = axes.length;
  const points = values.map((v, i) => {
    const a = (Math.PI * 2 * i) / n - Math.PI / 2;
    const d = (v / max) * r;
    return [cx + Math.cos(a) * d, cy + Math.sin(a) * d];
  });
  const grids = [0.25, 0.5, 0.75, 1].map(k =>
    axes.map((_, i) => {
      const a = (Math.PI * 2 * i) / n - Math.PI / 2;
      return `${cx + Math.cos(a) * r * k},${cy + Math.sin(a) * r * k}`;
    }).join(' ')
  );

  return (
    <svg width={size} height={size}>
      {grids.map((g, i) => (
        <polygon key={i} points={g}
          fill="none" stroke="var(--ink-10)" strokeWidth="1" />
      ))}
      {axes.map((_, i) => {
        const a = (Math.PI * 2 * i) / n - Math.PI / 2;
        return (
          <line key={i}
            x1={cx} y1={cy}
            x2={cx + Math.cos(a) * r}
            y2={cy + Math.sin(a) * r}
            stroke="var(--ink-10)" strokeWidth="1" />
        );
      })}
      <polygon points={points.map(p => p.join(',')).join(' ')}
        fill={color} fillOpacity="0.15"
        stroke={color} strokeWidth="1.5" />
      {points.map((p, i) => (
        <circle key={i} cx={p[0]} cy={p[1]} r="3" fill={color} />
      ))}
      {axes.map((ax, i) => {
        const a = (Math.PI * 2 * i) / n - Math.PI / 2;
        const x = cx + Math.cos(a) * (r + 18);
        const y = cy + Math.sin(a) * (r + 18);
        return (
          <text key={i} x={x} y={y}
            textAnchor="middle" dominantBaseline="central"
            style={{
              fontFamily: 'var(--font-mono)', fontSize: 9,
              fill: 'var(--ink-60)', letterSpacing: '0.1em',
              textTransform: 'uppercase'
            }}>{ax}</text>
        );
      })}
    </svg>
  );
}

// ─── Sparkline ────────────────────────────────────────────────
function Sparkline({ data, width = 280, height = 60, color = 'var(--teal)' }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const span = max - min || 1;
  const stepX = width / (data.length - 1);
  const points = data.map((v, i) => {
    const x = i * stepX;
    const y = height - ((v - min) / span) * (height - 6) - 3;
    return [x, y];
  });
  const path = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p[0]} ${p[1]}`).join(' ');
  return (
    <svg width={width} height={height}>
      <path d={path} fill="none" stroke={color} strokeWidth="1.5" />
      <circle cx={points[points.length - 1][0]} cy={points[points.length - 1][1]} r="3" fill={color} />
    </svg>
  );
}

// ─── Section header ───────────────────────────────────────────
function SectionHead({ id, title, count }) {
  return (
    <div className="section-head">
      <h3 className="section-title">{title}</h3>
      <span className="section-id">{id}{count != null ? ` · ${count} items` : ''}</span>
    </div>
  );
}

// ─── DocHead with big numeral ────────────────────────────────
function DocHead({ phase, status, date, title, sub, bignum, bignumLabel }) {
  return (
    <div className="doc-head">
      <div className="doc-head-left">
        <div className="doc-eyebrow">
          <span className="dot">●</span>
          <span><b>{phase}</b></span>
          <span className="slash">/</span>
          <span>{status}</span>
          <span className="slash">/</span>
          <span>{date}</span>
        </div>
        <h1 className="doc-title">{title}</h1>
        <p className="doc-sub">{sub}</p>
      </div>
      <div>
        <div className="doc-bignum">{bignum}</div>
        <div className="doc-bignum-label">{bignumLabel}</div>
      </div>
    </div>
  );
}

// ─── Page footer w/ prev/next ─────────────────────────────────
function PageFoot({ prev, next, onNav }) {
  return (
    <div className="page-foot">
      <div>{prev && <button onClick={() => onNav(prev.id)}>← {prev.label}</button>}</div>
      <div>AL/IQ · RESEARCH DASHBOARD · 2026</div>
      <div>{next && <button onClick={() => onNav(next.id)}>{next.label} →</button>}</div>
    </div>
  );
}

// Export to window
Object.assign(window, {
  SegBar, BarRow, Donut, SplitBar, Stat, Kpi, HeroMetric,
  VBars, StackedRow, Radar, Sparkline, SectionHead, DocHead, PageFoot
});
