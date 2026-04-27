import Reveal from '../components/Reveal';
import { ENTITIES } from '../data/entities';

export default function EntitySection() {
  const maxVal = ENTITIES[0].mentions;
  return (
    <section data-section="5" style={{ padding: '80px 0 120px' }}>
      <div className="container">
        <Reveal>
          <div className="section-label">Chapter V</div>
          <h2 className="section-heading" style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
            Entity <span className="glow-text">Graph</span>
          </h2>
        </Reveal>
        <div className="glass-card" style={{ padding: '32px 32px 24px' }}>
          {ENTITIES.map((entity, i) => {
            const pct = (entity.mentions / maxVal) * 100;
            const isPerson = entity.type === 'person';
            return (
              <Reveal key={i} delay={i * 60}>
                <div style={{ marginBottom: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, alignItems: 'baseline' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 6, height: 6, borderRadius: isPerson ? '50%' : 1, background: isPerson ? 'var(--amber-400)' : 'var(--cyan-400)' }} />
                      <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: 15, color: isPerson ? 'var(--amber-400)' : 'var(--text-primary)' }}>{entity.name}</span>
                      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: 'var(--text-muted)', textTransform: 'uppercase' }}>{entity.type}</span>
                    </div>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: 'var(--text-tertiary)' }}>{entity.mentions.toLocaleString()}</span>
                  </div>
                  <div style={{ width: '100%', height: 6, borderRadius: 3, background: 'var(--border-subtle)', overflow: 'hidden' }}>
                    <div className="entity-bar-fill" style={{
                      width: `${pct}%`, height: '100%', borderRadius: 3,
                      background: isPerson ? 'linear-gradient(90deg, var(--amber-400), #FF8C00)' : 'linear-gradient(90deg, var(--cyan-600), var(--cyan-400))',
                    }} />
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
