import { useState } from 'react';

const SECTIONS = [
  { label: 'Hero',        ds: 0  },
  { label: 'KPIs',        ds: 1  },
  { label: 'Velocity',    ds: 2  },
  { label: 'Sentiment',   ds: 3  },
  { label: 'Topics',      ds: 4  },
  { label: 'Timeline',    ds: 6  },
  { label: 'Pipeline',    ds: 8  },
  { label: 'BIM 3D',      ds: 9  },
  { label: 'Sprint',      ds: 11 },
  { label: 'People',      ds: 12 },
  { label: 'Roadmap',     ds: 13 },
  { label: 'SuperJarvis', ds: 16 },
  { label: 'Links',       ds: 15 },
];

// Desktop pills — KPIs through BIM 3D, plus Links at the end
const DESKTOP_PILLS = [...SECTIONS.slice(1, 8), SECTIONS.find(s => s.label === 'Links')];

export default function TopBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollTo = (dataSection) => {
    const el = document.querySelector(`[data-section="${dataSection}"]`);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <>
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, height: 48, zIndex: 90,
        background: 'var(--bg-glass)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--border-subtle)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 20px',
      }}>
        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Menu"
          aria-expanded={menuOpen}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8, display: 'flex', flexDirection: 'column', gap: 4 }}
        >
          <span style={{ width: 20, height: 2, background: 'var(--text-primary)', borderRadius: 1, transition: 'transform 0.3s', display: 'block', transform: menuOpen ? 'rotate(45deg) translateY(6px)' : 'none' }} />
          <span style={{ width: 20, height: 2, background: 'var(--text-primary)', borderRadius: 1, transition: 'opacity 0.3s', display: 'block', opacity: menuOpen ? 0 : 1 }} />
          <span style={{ width: 20, height: 2, background: 'var(--text-primary)', borderRadius: 1, transition: 'transform 0.3s', display: 'block', transform: menuOpen ? 'rotate(-45deg) translateY(-6px)' : 'none' }} />
        </button>

        {/* Brand — click to scroll to top */}
        <button
          onClick={() => scrollTo(0)}
          style={{
            background: 'none', border: 'none', cursor: 'pointer', padding: '4px 8px',
            fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: 3,
            color: 'var(--text-tertiary)', textTransform: 'uppercase', transition: 'color 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.color = 'var(--text-primary)'; }}
          onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-tertiary)'; }}
          aria-label="Scroll to top"
        >
          JARVIS · PDBM
        </button>

        {/* Desktop pills */}
        <div className="hide-mobile" style={{ display: 'flex', gap: 6 }}>
          {DESKTOP_PILLS.map(s => (
            <button
              key={s.ds}
              onClick={() => scrollTo(s.ds)}
              style={{
                padding: '4px 10px', borderRadius: 12, fontSize: 10,
                fontFamily: "'JetBrains Mono', monospace", letterSpacing: 1,
                background: 'transparent', border: '1px solid var(--border-subtle)',
                color: 'var(--text-tertiary)', cursor: 'pointer', transition: 'all 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border-strong)'; e.currentTarget.style.color = 'var(--cyan-400)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-subtle)'; e.currentTarget.style.color = 'var(--text-tertiary)'; }}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile full-screen dropdown */}
      {menuOpen && (
        <div style={{
          position: 'fixed', top: 48, left: 0, right: 0, zIndex: 89,
          background: 'var(--bg-glass)', backdropFilter: 'blur(16px)',
          borderBottom: '1px solid var(--border-subtle)',
          padding: '12px 20px',
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4,
        }}>
          {SECTIONS.map(s => (
            <button
              key={s.ds}
              onClick={() => scrollTo(s.ds)}
              style={{
                padding: '10px 14px', borderRadius: 10, fontSize: 13,
                fontFamily: "'DM Sans', sans-serif",
                background: 'transparent', border: 'none',
                color: 'var(--text-primary)', cursor: 'pointer',
                textAlign: 'left', transition: 'background 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--border-subtle)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
            >
              {s.label}
            </button>
          ))}
          <a
            href="/command-center"
            style={{
              gridColumn: '1 / -1',
              padding: '10px 14px', borderRadius: 10, fontSize: 13,
              color: 'var(--cyan-400)', textDecoration: 'none',
              borderTop: '1px solid var(--border-subtle)', marginTop: 4, paddingTop: 14,
            }}
          >→ Command Center</a>
        </div>
      )}
    </>
  );
}
