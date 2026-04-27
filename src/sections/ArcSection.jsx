import Reveal from '../components/Reveal';

export default function ArcSection() {
  return (
    <section data-section="14" style={{ padding: '120px 0 160px' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center', padding: '0 24px' }}>
        <Reveal>
          <div className="section-label" style={{ marginBottom: 16 }}>The Arc</div>
          <h2 className="section-heading" style={{ fontSize: 'clamp(24px, 4vw, 40px)', lineHeight: 1.3 }}>
            From conversational assistant →{' '}
            <span className="glow-text">emergent BD intelligence layer</span>{' '}
            → multi-model operating system.
          </h2>
        </Reveal>
        <Reveal delay={200}>
          <div style={{ display: 'inline-flex', gap: 40, flexWrap: 'wrap', justifyContent: 'center', marginTop: 40 }}>
            {[{ n: '85', l: 'Jorge Messages' }, { n: '4', l: 'Phases Complete' }, { n: '17', l: 'Chapters' }].map((item, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 48, fontWeight: 800, color: 'var(--cyan-400)' }}>{item.n}</div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: 2, color: 'var(--text-tertiary)', marginTop: 4 }}>{item.l}</div>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal delay={400}>
          <div style={{ marginTop: 80, padding: '28px 36px', background: 'rgba(0,240,255,0.03)', border: '1px solid rgba(0,240,255,0.1)', borderRadius: 12 }}>
            <p style={{ fontSize: 15, lineHeight: 1.8, color: 'var(--text-secondary)' }}>
              Jarvis should not try to be magical on day one. It should be <strong style={{ color: 'var(--text-primary)' }}>boringly useful</strong>: find opportunities, remove noise, extract deadlines, summarize scope, assign owners, draft next actions, keep the team aligned. Once that works reliably, autonomy can increase.
            </p>
          </div>
        </Reveal>
        <Reveal delay={600}>
          <div style={{ marginTop: 80, fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: 'var(--text-muted)', letterSpacing: 2 }}>
            PDBM CONSULTING × INFRATEK AI — DORADO, PR — 2026
          </div>
        </Reveal>
      </div>
    </section>
  );
}
