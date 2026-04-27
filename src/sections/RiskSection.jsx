import Reveal from '../components/Reveal';
import { RISKS } from '../data/risks';

const risks = RISKS || [];

export default function RiskSection() {
  return (
    <section data-section="10" style={{ padding: '80px 0 120px' }}>
      <div className="container">
        <Reveal>
          <div className="section-label">Chapter XIII</div>
          <h2 className="section-heading" style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
            Risk <span className="glow-text">Register</span>
          </h2>
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 16 }}>
          {risks.map((item, i) => {
            const isHigh = item.severity === 'high';
            const severityColor = isHigh ? 'var(--red-400)' : 'var(--amber-400)';
            return (
              <Reveal key={i} delay={i * 70}>
                <div className="glass-card" style={{ padding: '22px 24px' }}>
                  <div style={{ marginBottom: 10 }}>
                    <span style={{
                      display: 'inline-block',
                      padding: '3px 10px',
                      borderRadius: 20,
                      background: `${severityColor}15`,
                      border: `1px solid ${severityColor}35`,
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 9,
                      letterSpacing: '2px',
                      color: severityColor,
                      textTransform: 'uppercase',
                    }}>
                      {item.severity}
                    </span>
                  </div>
                  <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: 16, color: 'var(--text-primary)', marginBottom: 10 }}>
                    {item.risk}
                  </div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    {item.mitigation}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
