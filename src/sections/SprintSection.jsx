import Reveal from '../components/Reveal';
import { SPRINT } from '../data/sprint';

const sprint = SPRINT || [];

const DAY_COLORS = [
  'var(--cyan-400)',
  '#00D4AA',
  'var(--cyan-500)',
  'var(--amber-400)',
  '#FF8C00',
  'var(--red-400)',
  'var(--purple-400)',
];

export default function SprintSection() {
  return (
    <section data-section="11" style={{ padding: '80px 0 120px' }}>
      <div className="container">
        <Reveal>
          <div className="section-label">Chapter XIV</div>
          <h2 className="section-heading" style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
            7-Day <span className="glow-text">Sprint</span>
          </h2>
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 16 }}>
          {sprint.map((item, i) => {
            const color = DAY_COLORS[i] || 'var(--cyan-400)';
            return (
              <Reveal key={i} delay={i * 80}>
                <div className="glass-card" style={{
                  padding: '24px 20px',
                  borderTop: `2px solid ${color}`,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 8,
                  height: '100%',
                }}>
                  <div style={{
                    fontFamily: "'Syne', sans-serif",
                    fontSize: 48,
                    fontWeight: 800,
                    color,
                    lineHeight: 1,
                    marginBottom: 4,
                  }}>
                    {item.day}
                  </div>
                  <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: 15, color: 'var(--text-primary)' }}>
                    {item.title}
                  </div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                    {item.description}
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
