import Reveal from '../components/Reveal';
import { PEOPLE } from '../data/people';
import { AGENTS } from '../data/agents';

const people = PEOPLE || [];
const agents = AGENTS || [];

export default function PeopleSection() {
  return (
    <section data-section="11" style={{ padding: '80px 0 120px' }}>
      <div className="container">
        <Reveal>
          <div className="section-label">Chapter XII</div>
          <h2 className="section-heading" style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
            People &amp; <span className="glow-text">Agents</span>
          </h2>
        </Reveal>

        {/* The Team */}
        <div style={{ marginBottom: 56 }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(0,240,255,0.5)', marginBottom: 20 }}>
            The Team
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 }}>
            {people.map((p, i) => (
              <Reveal key={i} delay={i * 80}>
                <div className="glass-card" style={{ padding: '22px 22px 18px' }}>
                  <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: 16, color: 'var(--text-primary)', marginBottom: 4 }}>
                    {p.name}
                  </div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: 'var(--text-secondary)', marginBottom: 4 }}>
                    {p.role}
                  </div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: 'var(--amber-400)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 10 }}>
                    {p.org}
                  </div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: 'var(--text-tertiary)', lineHeight: 1.55, marginBottom: 10 }}>
                    {p.description}
                  </div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    {p.device}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* The Agents */}
        <div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(0,240,255,0.5)', marginBottom: 20 }}>
            The Agents
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 }}>
            {agents.map((a, i) => (
              <Reveal key={i} delay={i * 80}>
                <div className="glass-card" style={{
                  padding: '22px 22px 18px',
                  border: '1px solid rgba(0,240,255,0.12)',
                  background: 'rgba(0,240,255,0.02)',
                }}>
                  <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: 18, color: 'var(--cyan-400)', marginBottom: 6 }}>
                    {a.name}
                  </div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: 'var(--text-tertiary)', letterSpacing: '1px', marginBottom: 4 }}>
                    {a.model}
                  </div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: 'var(--text-muted)', letterSpacing: '1px', marginBottom: 12 }}>
                    {a.runtime}
                  </div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                    {a.description}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
