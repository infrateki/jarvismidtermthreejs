import Reveal from '../components/Reveal';
import { STRENGTHS } from '../data/strengths';
import { GAPS } from '../data/gaps';

const strengths = STRENGTHS || [];
const gaps = GAPS || [];

function ItemList({ items, accent }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {items.map((item, i) => (
        <Reveal key={i} delay={i * 80}>
          <div style={{ paddingBottom: 16, borderBottom: '1px solid rgba(0,240,255,0.05)' }}>
            <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: 15, color: 'var(--text-primary)', marginBottom: 4 }}>
              {item.title}
            </div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: 'var(--text-secondary)', marginBottom: 4 }}>
              {item.description}
            </div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: accent, letterSpacing: '1px', textTransform: 'uppercase' }}>
              {item.evidence}
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

export default function StrengthsGapsSection() {
  return (
    <section data-section="7" style={{ padding: '80px 0 120px' }}>
      <div className="container">
        <Reveal>
          <div className="section-label">Chapters VI &amp; VII</div>
          <h2 className="section-heading" style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
            What <span className="glow-text">Works</span> &amp;{' '}
            <span style={{ color: 'var(--red-400)' }}>What Hurts</span>
          </h2>
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
          {/* Strengths */}
          <div className="glass-card" style={{ padding: '28px 28px 24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#34D399', boxShadow: '0 0 10px #34D399' }} />
              <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 16, color: '#34D399' }}>
                What's Working
              </span>
            </div>
            <ItemList items={strengths} accent="rgba(52,211,153,0.6)" />
          </div>

          {/* Gaps */}
          <div className="glass-card" style={{ padding: '28px 28px 24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--red-400)', boxShadow: '0 0 10px rgba(255,77,106,0.6)' }} />
              <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 16, color: 'var(--red-400)' }}>
                What Hurts
              </span>
            </div>
            <ItemList items={gaps} accent="rgba(255,77,106,0.6)" />
          </div>
        </div>
      </div>
    </section>
  );
}
