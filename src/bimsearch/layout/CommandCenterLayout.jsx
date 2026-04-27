import { NavLink, Link, Outlet } from 'react-router-dom';
import useTheme from '../../hooks/useTheme.jsx';

const NAV_ITEMS = [
  { icon: '▣', label: 'Dashboard', to: '/command-center', end: true },
  { icon: '⬡', label: 'Pipeline', to: '/command-center/pipeline' },
  { icon: '◈', label: 'Portals', to: '/command-center/portals' },
  { icon: '◉', label: 'Contacts', to: '/command-center/contacts' },
];

export default function CommandCenterLayout() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      {/* Sidebar */}
      <aside style={{
        width: 220,
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--bg-secondary)',
        borderRight: '1px solid var(--border-subtle)',
        overflow: 'hidden',
      }}>
        {/* Logo */}
        <div style={{ padding: '28px 20px 24px' }}>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 14,
            letterSpacing: 3,
            color: 'var(--cyan-400)',
            fontWeight: 600,
            textTransform: 'uppercase',
          }}>
            BIMSEARCH
          </div>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 10,
            color: 'var(--text-tertiary)',
            letterSpacing: 1,
            marginTop: 4,
          }}>
            Command Center
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '0 12px' }}>
          {NAV_ITEMS.map(({ icon, label, to, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '9px 12px',
                borderRadius: 6,
                marginBottom: 2,
                textDecoration: 'none',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 13,
                fontWeight: isActive ? 500 : 400,
                color: isActive ? 'var(--cyan-400)' : 'var(--text-secondary)',
                background: isActive ? 'var(--border-subtle)' : 'transparent',
                transition: 'background 0.15s, color 0.15s',
              })}
            >
              <span style={{ fontSize: 11, opacity: 0.8 }}>{icon}</span>
              {label}
            </NavLink>
          ))}

          {/* Documents — disabled */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: '9px 12px',
            borderRadius: 6,
            marginBottom: 2,
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 13,
            color: 'var(--text-muted)',
            cursor: 'default',
          }}>
            <span style={{ fontSize: 11, opacity: 0.5 }}>▤</span>
            Documents
            <span style={{
              marginLeft: 'auto',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 8,
              letterSpacing: 1,
              color: 'var(--text-muted)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 3,
              padding: '2px 4px',
            }}>
              SOON
            </span>
          </div>
        </nav>

        {/* Back to Review */}
        <div style={{ padding: '16px 20px', borderTop: '1px solid var(--border-subtle)' }}>
          <Link
            to="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              textDecoration: 'none',
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 12,
              color: 'var(--text-tertiary)',
              transition: 'color 0.15s',
            }}
          >
            ← Back to Review
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }}>
        {/* Inline theme toggle */}
        <button
          onClick={toggleTheme}
          title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          style={{
            position: 'absolute',
            top: 20,
            right: 20,
            zIndex: 10,
            width: 36,
            height: 36,
            borderRadius: '50%',
            border: '1px solid var(--border-subtle)',
            background: 'var(--glass-bg)',
            backdropFilter: 'blur(8px)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 15,
            color: 'var(--text-secondary)',
            transition: 'border-color 0.2s, background 0.2s',
          }}
        >
          {isDark ? '☀' : '☾'}
        </button>

        <div style={{ flex: 1, overflowY: 'auto', padding: 32, background: 'var(--bg-primary)' }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
