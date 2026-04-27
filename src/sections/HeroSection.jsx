import { useState, useEffect, lazy, Suspense, Component } from 'react';
import { META } from '../data/meta';
import useTheme from '../hooks/useTheme';

const HeroScene = lazy(() => import('../three/HeroScene'));
const MobileHeroScene = lazy(() => import('../three/MobileHeroScene'));

class ThreeErrorBoundary extends Component {
  constructor(props) { super(props); this.state = { hasError: false }; }
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(err) { console.warn('Three.js scene failed:', err.message); }
  render() {
    if (this.state.hasError) {
      return <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 40%, rgba(0,240,255,0.08) 0%, transparent 70%)' }} />;
    }
    return this.props.children;
  }
}

export default function HeroSection({ scrollProgress }) {
  const [screenSize, setScreenSize] = useState('loading');
  const themeCtx = useTheme();
  const isDark = themeCtx ? themeCtx.isDark : true;

  useEffect(() => {
    const check = () => {
      const w = window.innerWidth;
      setScreenSize(w > 768 ? 'desktop' : w > 0 ? 'mobile' : 'loading');
    };
    check();
    window.addEventListener('resize', check, { passive: true });
    return () => window.removeEventListener('resize', check);
  }, []);

  const fallback = (
    <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 40%, rgba(0,240,255,0.06) 0%, transparent 70%)' }} />
  );

  return (
    <section
      data-section="0"
      className="hero-height"
      aria-label="Hero — Jarvis Mid-Term Review"
      style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}
    >
      <ThreeErrorBoundary>
        <Suspense fallback={fallback}>
          {screenSize === 'desktop' && <HeroScene scrollProgress={scrollProgress} />}
          {screenSize === 'mobile' && <MobileHeroScene isDark={isDark} />}
        </Suspense>
      </ThreeErrorBoundary>

      {screenSize === 'loading' && fallback}

      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%', background: 'linear-gradient(to top, var(--bg-primary), transparent)', zIndex: 1, pointerEvents: 'none' }} />

      <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '0 24px', marginTop: screenSize === 'desktop' ? 140 : 0 }}>
        <div className="section-label" style={{ marginBottom: 16, opacity: 0.7 }}>{META.id}</div>

        {screenSize !== 'desktop' && (
          <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(42px, 12vw, 72px)', fontWeight: 800, lineHeight: 1.0, letterSpacing: '-2px', marginBottom: 16 }}>
            <span className="glow-text">JARVIS</span>
          </h1>
        )}

        <p style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(14px, 2.5vw, 24px)', fontWeight: 400, color: 'var(--text-secondary)', maxWidth: 600, margin: '0 auto 24px', lineHeight: 1.5 }}>
          Definitive Mid-Term Review — {META.period.days} Days of Intelligence
        </p>
        <div style={{ display: 'inline-flex', gap: screenSize === 'mobile' ? 12 : 24, flexWrap: 'wrap', justifyContent: 'center', fontFamily: "'JetBrains Mono', monospace", fontSize: screenSize === 'mobile' ? 10 : 12, color: 'var(--cyan-400)', opacity: 0.5 }}>
          <span>Feb 10 → Apr 26, 2026</span>
          <span style={{ opacity: 0.4 }}>|</span>
          <span>{META.location}</span>
          <span style={{ opacity: 0.4 }}>|</span>
          <span>4,103 interactions</span>
        </div>
        <div style={{ marginTop: screenSize === 'mobile' ? 40 : 60, animation: 'float 3s ease-in-out infinite' }}>
          <div style={{ width: 24, height: 40, borderRadius: 12, border: '1px solid var(--border-strong)', display: 'flex', justifyContent: 'center', paddingTop: 8, margin: '0 auto' }}>
            <div style={{ width: 3, height: 8, borderRadius: 2, background: 'var(--cyan-400)', opacity: 0.6 }} />
          </div>
        </div>
      </div>
    </section>
  );
}
