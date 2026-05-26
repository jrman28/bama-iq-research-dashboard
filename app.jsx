/* ───────────────────────────────────────────────────────────────
   App shell — sidebar nav + page router
   ────────────────────────────────────────────────────────────── */

function App() {
  const initialPage = (window.location.hash || '#overview').replace('#', '');
  const [page, setPage] = useState(initialPage);

  // Theme: persist to localStorage, default to system preference, default dark
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem('aliq-theme');
      if (saved === 'light' || saved === 'dark') return saved;
    } catch (e) {}
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) return 'light';
    return 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try { localStorage.setItem('aliq-theme', theme); } catch (e) {}
  }, [theme]);

  const toggleTheme = () => setTheme(t => t === 'light' ? 'dark' : 'light');

  // Hash routing + scroll-to-top on nav
  useEffect(() => {
    const onHash = () => {
      const p = (window.location.hash || '#overview').replace('#', '');
      setPage(p);
      const main = document.querySelector('.main');
      if (main) main.scrollTop = 0;
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const nav = (id) => { window.location.hash = id; };

  const items = [
    { id: 'overview',     num: '00', label: 'Overview',                meta: 'INDEX' },
    { id: 'onboarding',   num: '01', label: 'Onboarding Patterns',     meta: '103L' },
    { id: 'architecture', num: '02', label: 'Digg Architecture',       meta: '434L' },
    { id: 'frontend',     num: '03', label: 'Digg Frontend',           meta: '556L' },
    { id: 'detail',       num: '04', label: 'Digg Detail Page',        meta: '518L' },
  ];

  const current = items.find(i => i.id === page) || items[0];

  // Topbar breadcrumb
  const renderTopbar = () => (
    <div className="topbar">
      <div className="tb-crumb">
        <span>AL/IQ</span>
        <span className="slash">/</span>
        <span>RESEARCH</span>
        <span className="slash">/</span>
        <b>{current.num} · {current.label.toUpperCase()}</b>
      </div>
      <div className="tb-actions">
        <span className="tb-meta">COMPILED <b>2026-05-23</b></span>
        <span className="tb-divider"></span>
        <span className="tb-meta">PRIVATE</span>
        <span className="tb-divider"></span>
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {/* Sun — shown in light mode */}
          <svg className="icon-sun" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <circle cx="8" cy="8" r="3" />
            <path d="M8 1.5v1.5M8 13v1.5M1.5 8h1.5M13 8h1.5M3.05 3.05l1.06 1.06M11.89 11.89l1.06 1.06M3.05 12.95l1.06-1.06M11.89 4.11l1.06-1.06" />
          </svg>
          {/* Moon — shown in dark mode */}
          <svg className="icon-moon" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M13.5 9.5a5.5 5.5 0 0 1-7-7 5.5 5.5 0 1 0 7 7z" />
          </svg>
        </button>
      </div>
    </div>
  );

  // Page router
  let pageEl;
  switch (page) {
    case 'onboarding':   pageEl = <PageOnboarding onNav={nav} />; break;
    case 'architecture': pageEl = <PageArchitecture onNav={nav} />; break;
    case 'frontend':     pageEl = <PageFrontend onNav={nav} />; break;
    case 'detail':       pageEl = <PageDetail onNav={nav} />; break;
    default:             pageEl = <PageOverview onNav={nav} />;
  }

  return (
    <div className="app">
      {/* ─── Sidebar ───────────────────────────────── */}
      <aside className="sidebar">
        <div className="sb-brand">
          <div className="sb-tag">RESEARCH DASHBOARD</div>
          <div className="sb-brand-row">
            <span className="sb-al">AL</span>
            <span className="sb-iq">IQ</span>
          </div>
          <div className="sb-live">LIVE · COMPILED LOCALLY</div>
        </div>

        <div>
          <div className="sb-section-title">Documents</div>
          <nav className="sb-nav">
            {items.map(it => (
              <button
                key={it.id}
                className={`sb-item ${page === it.id ? 'active' : ''}`}
                onClick={() => nav(it.id)}
              >
                <span className="sb-item-num">{it.num}</span>
                <span>{it.label}</span>
                <span className="sb-item-meta">{it.meta}</span>
              </button>
            ))}
          </nav>
        </div>

        <div>
          <div className="sb-section-title">Status</div>
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: 10,
            color: 'var(--ink-60)', letterSpacing: '0.08em',
            lineHeight: 1.8, textTransform: 'uppercase'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>PHASE 1</span>
              <span style={{ color: 'var(--green)' }}>● DONE</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>PHASE 2</span>
              <span style={{ color: 'var(--green)' }}>● DONE</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>BUILD</span>
              <span style={{ color: 'var(--amber)' }}>● NEXT</span>
            </div>
          </div>
        </div>

        <div className="sb-foot">
          AL/IQ<br />
          ALABAMA INTELLIGENCE<br />
          v1.0 · 2026
        </div>
      </aside>

      {/* ─── Main ──────────────────────────────────── */}
      <main className="main">
        {renderTopbar()}
        <div key={page}>{pageEl}</div>
      </main>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
