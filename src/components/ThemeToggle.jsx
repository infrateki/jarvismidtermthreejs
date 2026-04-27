import useTheme from '../hooks/useTheme.jsx';

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      style={{
        position: 'fixed',
        top: 68,
        left: 20,
        zIndex: 100,
        width: 40,
        height: 40,
        borderRadius: '50%',
        background: 'var(--bg-glass)',
        border: '1px solid var(--border-medium)',
        backdropFilter: 'blur(8px)',
        cursor: 'pointer',
        fontSize: 18,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.3s ease',
        padding: 0,
      }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border-strong)'; e.currentTarget.style.transform = 'scale(1.1)'; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-medium)'; e.currentTarget.style.transform = 'scale(1)'; }}
    >
      {isDark ? '☾' : '☀'}
    </button>
  );
}
