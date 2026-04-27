import Reveal from '../components/Reveal';
import Counter from '../components/Counter';
import { KPIS } from '../data/kpis';

export default function KpiSection() {
  return (
    <section data-section="1" style={{ padding: '120px 0' }}>
      <div className="container">
        <Reveal>
          <div className="section-label">Chapter I</div>
          <h2 className="section-heading" style={{ fontSize: 'clamp(32px, 5vw, 56px)' }}>
            By the <span className="glow-text">Numbers</span>
          </h2>
        </Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 16 }}>
          {KPIS.map((kpi, i) => (
            <Reveal key={i} delay={i * 80}>
              <div className="glass-card kpi-card" style={{ padding: '28px 24px', textAlign: 'center' }}>
                <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 800, color: 'var(--cyan-400)', lineHeight: 1.1, marginBottom: 8 }}>
                  <Counter end={kpi.value} delay={i * 120} suffix={kpi.suffix || ''} />
                </div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--text-tertiary)' }}>
                  {kpi.label}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={500}>
          <div style={{ marginTop: 64, padding: '32px 40px', borderLeft: '3px solid var(--cyan-400)', background: 'rgba(0,240,255,0.02)', borderRadius: '0 12px 12px 0' }}>
            <p style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(16px, 2vw, 20px)', fontWeight: 500, lineHeight: 1.7, color: 'rgba(200,214,229,0.8)', fontStyle: 'italic' }}>
              "Be Jorge's proactive right hand: find the right airport BIM opportunities, remember the context, and convert intelligence into action — before he has to ask."
            </p>
            <div style={{ marginTop: 16, fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: 'rgba(0,240,255,0.4)', letterSpacing: 2 }}>— NORTH STAR DIRECTIVE</div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
