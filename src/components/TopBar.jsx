import { useState } from 'react';

export default function TopBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const sections = [
    { label: 'KPIs', index: 1 },
    { label: 'Velocity', index: 3 },
    { label: 'Sentiment', index: 4 },
    { label: 'Timeline', index: 8 },
    { label: 'Pipeline', index: 11 },
    { label: 'SuperJarvis', index: 17 },
    { label: 'Links', index: 18 },
  ];

  const scrollTo = (idx) => {
    const container = document.querySelector('[style*="overflow-y: auto"]') ||
                      document.querySelector('main')?.parentElement;
    if (!container) return;
    const secs = container.querySelectorAll('[data-section]');
    if (secs[idx]) secs[idx].scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <>
      {/* Top bar */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, height: 48, zIndex: 90,
        background: 'var(--bg-glass)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--border-subtle)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 20px',
      }}>
        {/* Hamburger */}
        <button onClick={() => setMenuOpen(!menuOpen)} style={{
          background: 'none', border: 'none', cursor: 'pointer', padding: 8,
          display: 'flex', flexDirection: 'column', gap: 4,
        }} aria-label="Menu">
          <span style={{ width: 20, height: 2, background: 'var(--text-primary)', borderRadius: 1, transition: 'all 0.3s', transform: menuOpen ? 'rotate(45deg) translateY(6px)' : 'none' }} />
          <span style={{ width: 20, height: 2, background: 'var(--text-primary)', borderRadius: 1, transition: 'all 0.3s', opacity: menuOpen ? 0 : 1 }} />
          <span style={{ width: 20, height: 2, background: 'var(--text-primary)', borderRadius: 1, transition: 'all 0.3s', transform: menuOpen ? 'rotate(-45deg) translateY(-6px)' : 'none' }} />
        </button>

        {/* Title */}
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: 3, color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>
          JARVIS · PDBM
        </span>

        {/* Desktop shortcut pills — hide on mobile */}
        <div className="hide-mobile" style={{ display: 'flex', gap: 6 }}>
          {sections.slice(0, 5).map((s, i) => (
            <button key={i} onClick={() => scrollTo(s.index)} style={{
              padding: '4px 10px', borderRadius: 12, fontSize: 10,
              fontFamily: "'JetBrains Mono', monospace", letterSpacing: 1,
              background: 'transparent', border: '1px solid var(--border-subtle)',
              color: 'var(--text-tertiary)', cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.target.style.borderColor = 'var(--border-strong)'; e.target.style.color = 'var(--cyan-400)'; }}
            onMouseLeave={e => { e.target.style.borderColor = 'var(--border-subtle)'; e.target.style.color = 'var(--text-tertiary)'; }}
            >{s.label}</button>
          ))}
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div style={{
          position: 'fixed', top: 48, left: 0, right: 0, zIndex: 89,
          background: 'var(--bg-glass)', backdropFilter: 'blur(16px)',
          borderBottom: '1px solid var(--border-subtle)',
          padding: '12px 20px',
          display: 'flex', flexDirection: 'column', gap: 4,
        }}>
          {sections.map((s, i) => (
            <button key={i} onClick={() => scrollTo(s.index)} style={{
              padding: '10px 14px', borderRadius: 10, fontSize: 13,
              fontFamily: "'DM Sans', sans-serif",
              background: 'transparent', border: 'none',
              color: 'var(--text-primary)', cursor: 'pointer',
              textAlign: 'left', transition: 'background 0.2s',
            }}
            onMouseEnter={e => e.target.style.background = 'var(--border-subtle)'}
            onMouseLeave={e => e.target.style.background = 'transparent'}
            >{s.label}</button>
          ))}
          <a href="/command-center" style={{
            padding: '10px 14px', borderRadius: 10, fontSize: 13,
            color: 'var(--cyan-400)', textDecoration: 'none',
            borderTop: '1px solid var(--border-subtle)', marginTop: 4, paddingTop: 14,
          }}>→ Command Center</a>
        </div>
      )}
    </>
  );
}
