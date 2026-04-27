import Reveal from '../components/Reveal';
import { QUESTIONS } from '../data/questions';

const questions = QUESTIONS || [];

function groupByCategory(items) {
  const groups = {};
  items.forEach(q => {
    if (!groups[q.category]) groups[q.category] = [];
    groups[q.category].push(q);
  });
  return Object.entries(groups);
}

export default function QuestionsSection() {
  const grouped = groupByCategory(questions);

  return (
    <section data-section="13" style={{ padding: '80px 0 160px' }}>
      <div className="container">
        <Reveal>
          <div className="section-label">Chapter XVI</div>
          <h2 className="section-heading" style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
            25 <span className="glow-text">Crucial Questions</span>
          </h2>
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: 40 }}>
          {grouped.map(([category, qs], ci) => (
            <Reveal key={ci} delay={ci * 100}>
              <div>
                <div style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 10,
                  letterSpacing: '3px',
                  textTransform: 'uppercase',
                  color: 'var(--cyan-400)',
                  marginBottom: 20,
                  paddingBottom: 10,
                  borderBottom: '1px solid rgba(0,240,255,0.1)',
                }}>
                  {category}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                  {qs.map((q, qi) => (
                    <div key={qi} style={{
                      display: 'flex',
                      gap: 16,
                      padding: '12px 0',
                      borderBottom: '1px solid rgba(0,240,255,0.04)',
                      lineHeight: 1.7,
                    }}>
                      <span style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: 10,
                        color: 'var(--text-muted)',
                        letterSpacing: '1px',
                        paddingTop: 3,
                        minWidth: 28,
                        flexShrink: 0,
                      }}>
                        {q.id}
                      </span>
                      <span style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: 14,
                        color: 'var(--text-secondary)',
                        lineHeight: 1.65,
                      }}>
                        {q.question}
                      </span>
                    </div>
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
