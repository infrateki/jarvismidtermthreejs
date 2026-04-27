import Reveal from '../components/Reveal';
import { MILESTONES } from '../data/milestones';
import { PHASE_COLORS } from '../data/meta';

export default function TimelineSection() {
  return (
    <section data-section="6" style={{ padding: '80px 0 120px' }}>
      <div className="container">
        <Reveal>
          <div className="section-label">Chapter II</div>
          <h2 className="section-heading" style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
            The <span className="glow-text">Journey</span>
          </h2>
        </Reveal>
        <div style={{ position: 'relative', paddingLeft: 32 }}>
          <div style={{ position: 'absolute', left: 11, top: 0, bottom: 0, width: 1, background: 'linear-gradient(to bottom, rgba(0,240,255,0.3), rgba(0,240,255,0.05))' }} />
          {MILESTONES.map((m, i) => (
            <Reveal key={i} delay={i * 100}>
              <div style={{ marginBottom: 24, position: 'relative' }}>
                <div style={{ position: 'absolute', left: -27, top: 8, width: 12, height: 12, borderRadius: '50%', border: `2px solid ${PHASE_COLORS[m.phase]}`, background: '#060A18', zIndex: 2 }} />
                <div className="milestone-card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
                    <div>
                      <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: 16, marginBottom: 4 }}>{m.label}</div>
                      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: 'var(--text-tertiary)' }}>{m.date}, 2026</div>
                    </div>
                    <div className="phase-badge" style={{ background: `${PHASE_COLORS[m.phase]}15`, border: `1px solid ${PHASE_COLORS[m.phase]}30`, color: PHASE_COLORS[m.phase] }}>
                      PHASE {m.phase}
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
