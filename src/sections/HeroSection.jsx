import { useState, useEffect } from 'react';
import HeroScene from '../three/HeroScene';
import { META } from '../data/meta';

export default function HeroSection({ scrollProgress }) {
  const [show3D, setShow3D] = useState(false);

  useEffect(() => {
    setShow3D(window.innerWidth > 768);
    const onResize = () => setShow3D(window.innerWidth > 768);
    window.addEventListener('resize', onResize, { passive: true });
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <section data-section="0" aria-label="Hero — Jarvis Mid-Term Review" style={{ position: 'relative', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
      {show3D
        ? <HeroScene scrollProgress={scrollProgress} />
        : <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 40%, rgba(0,240,255,0.08) 0%, transparent 70%), radial-gradient(ellipse at 80% 60%, rgba(255,181,71,0.05) 0%, transparent 60%)' }} />
      }
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%', background: 'linear-gradient(to top, var(--bg-primary), transparent)', zIndex: 1, pointerEvents: 'none' }} />

      {/* Text overlay — subtitle and metadata only. "JARVIS" is 3D text inside the Canvas. */}
      <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '0 24px', marginTop: 140 }}>
        <div className="section-label" style={{ marginBottom: 16, opacity: 0.7 }}>{META.id}</div>

        {/* Mobile fallback — flat text for screens without 3D */}
        {!show3D && (
          <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(42px, 8vw, 72px)', fontWeight: 800, lineHeight: 1.0, letterSpacing: '-2px', marginBottom: 16 }}>
            <span className="glow-text">JARVIS</span>
          </h1>
        )}

        <p style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(16px, 2.5vw, 24px)', fontWeight: 400, color: 'var(--text-secondary)', maxWidth: 600, margin: '0 auto 32px', lineHeight: 1.5 }}>
          Definitive Mid-Term Review — {META.period.days} Days of Intelligence
        </p>
        <div style={{ display: 'inline-flex', gap: 24, flexWrap: 'wrap', justifyContent: 'center', fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: 'var(--cyan-400)', opacity: 0.5 }}>
          <span>Feb 10 → Apr 26, 2026</span>
          <span style={{ opacity: 0.4 }}>|</span>
          <span>{META.location}</span>
          <span style={{ opacity: 0.4 }}>|</span>
          <span>4,103 interactions</span>
        </div>
        <div style={{ marginTop: 60, animation: 'float 3s ease-in-out infinite' }}>
          <div style={{ width: 24, height: 40, borderRadius: 12, border: '1px solid var(--border-strong)', display: 'flex', justifyContent: 'center', paddingTop: 8, margin: '0 auto' }}>
            <div style={{ width: 3, height: 8, borderRadius: 2, background: 'var(--cyan-400)', opacity: 0.6 }} />
          </div>
        </div>
      </div>
    </section>
  );
}
