import HeroScene from '../three/HeroScene';
import { META } from '../data/meta';

export default function HeroSection({ scrollProgress }) {
  return (
    <section data-section="0" style={{ position: 'relative', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
      <HeroScene scrollProgress={scrollProgress} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%', background: 'linear-gradient(to top, #060A18, transparent)', zIndex: 1, pointerEvents: 'none' }} />
      <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '0 24px' }}>
        <div className="section-label" style={{ marginBottom: 24, opacity: 0.7 }}>{META.id}</div>
        <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(42px, 8vw, 96px)', fontWeight: 800, lineHeight: 1.0, letterSpacing: '-2px', marginBottom: 16 }}>
          <span className="glow-text">Jarvis</span>
          <span style={{ color: 'rgba(255,255,255,0.15)', margin: '0 12px' }}>×</span>
          <span>PDBM</span>
        </h1>
        <p style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(16px, 2.5vw, 24px)', fontWeight: 400, color: 'var(--text-secondary)', maxWidth: 600, margin: '0 auto 32px', lineHeight: 1.5 }}>
          Mid-Term Review — {META.period.days} Days of Intelligence
        </p>
        <div style={{ display: 'inline-flex', gap: 24, flexWrap: 'wrap', justifyContent: 'center', fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: 'rgba(0,240,255,0.5)' }}>
          <span>Feb 10 → Apr 26, 2026</span>
          <span style={{ color: 'rgba(255,255,255,0.1)' }}>|</span>
          <span>{META.location}</span>
          <span style={{ color: 'rgba(255,255,255,0.1)' }}>|</span>
          <span>4,103 interactions</span>
        </div>
        <div style={{ marginTop: 80, animation: 'float 3s ease-in-out infinite' }}>
          <div style={{ width: 24, height: 40, borderRadius: 12, border: '1px solid rgba(0,240,255,0.3)', display: 'flex', justifyContent: 'center', paddingTop: 8, margin: '0 auto' }}>
            <div style={{ width: 3, height: 8, borderRadius: 2, background: '#00F0FF', opacity: 0.6 }} />
          </div>
        </div>
      </div>
    </section>
  );
}
