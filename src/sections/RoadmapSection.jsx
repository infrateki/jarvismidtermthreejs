import Reveal from '../components/Reveal';
import { ROADMAP } from '../data/roadmap';
import { NEEDS } from '../data/needs';

const roadmap = ROADMAP || { thirtyDay: [], sixtyDay: [], ninetyDay: [] };
const needs = NEEDS || [];

const IMPORTANCE_COLORS = { high: 'var(--cyan-400)', medium: 'var(--amber-400)' };

const columns = [
  { label: '30 Days', key: 'thirtyDay', accent: 'var(--cyan-400)' },
  { label: '60 Days', key: 'sixtyDay', accent: 'var(--amber-400)' },
  { label: '90 Days', key: 'ninetyDay', accent: 'var(--purple-400)' },
];

export default function RoadmapSection() {
  return (
    <section data-section="12" style={{ padding: '80px 0 120px' }}>
      <div className="container">
        <Reveal>
          <div className="section-label">Chapter XV</div>
          <h2 className="section-heading" style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
            The Road <span className="glow-text">Ahead</span>
          </h2>
        </Reveal>

        {/* Three-column roadmap */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20, marginBottom: 56 }}>
          {columns.map((col, ci) => (
            <Reveal key={ci} delay={ci * 120}>
              <div className="glass-card" style={{ padding: '24px 22px', borderTop: `2px solid ${col.accent}` }}>
                <div style={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 800,
                  fontSize: 22,
                  color: col.accent,
                  marginBottom: 20,
                  letterSpacing: '-0.5px',
                }}>
                  {col.label}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {(roadmap[col.key] || []).map((item, ii) => {
                    const importanceColor = IMPORTANCE_COLORS[item.importance] || 'var(--text-tertiary)';
                    return (
                      <div key={ii} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                        <div style={{
                          marginTop: 5,
                          width: 6,
                          height: 6,
                          borderRadius: '50%',
                          background: importanceColor,
                          flexShrink: 0,
                        }} />
                        <div style={{ flex: 1 }}>
                          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: 'var(--text-primary)' }}>
                            {item.item}
                          </span>
                          <span style={{
                            marginLeft: 8,
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: 9,
                            color: importanceColor,
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                          }}>
                            {item.importance}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Unresolved Needs */}
        <Reveal delay={400}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(0,240,255,0.5)', marginBottom: 20 }}>
            Unresolved Needs
          </div>
        </Reveal>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {needs.map((need, i) => (
            <Reveal key={i} delay={i * 80 + 500}>
              <div className="glass-card" style={{ padding: '20px 24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 14 }}>
                  <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 15, color: 'var(--text-primary)', minWidth: 120 }}>
                    {need.area}
                  </div>
                  {/* Severity bar */}
                  <div style={{ flex: 1, maxWidth: 200, height: 4, borderRadius: 2, background: 'rgba(0,240,255,0.06)', overflow: 'hidden' }}>
                    <div style={{
                      width: `${(need.severity / 5) * 100}%`,
                      height: '100%',
                      borderRadius: 2,
                      background: need.severity === 5
                        ? 'linear-gradient(90deg, #FF4D6A, #FF8C00)'
                        : 'linear-gradient(90deg, var(--amber-400), #FFD47A)',
                    }} />
                  </div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: need.severity === 5 ? 'var(--red-400)' : 'var(--amber-400)' }}>
                    {need.severity}/5
                  </div>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 24px' }}>
                  {need.notes.map((note, ni) => (
                    <span key={ni} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: 'var(--text-tertiary)' }}>
                      · {note}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
