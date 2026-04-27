import Reveal from '../components/Reveal';
import { SUPERJARVIS_PILLARS, TIERS, ONBOARDING, ACTION_PLAN, TEAM, RISKS } from '../data/superjarvis';

const PILLAR_COLORS = { cyan: 'var(--cyan-400)', green: 'var(--green-400)', amber: 'var(--amber-400)', red: 'var(--red-400)' };
const PRIORITY_COLORS = { P0: 'var(--red-400)', P1: 'var(--amber-400)', P2: 'var(--green-400)' };
const TIER_COLORS = { 1: 'var(--cyan-400)', 2: 'var(--amber-400)', 3: 'var(--purple-400)' };

export default function SuperJarvisSection() {
  return (
    <section data-section="16" aria-label="SuperJarvis" style={{ padding: '80px 0 120px' }}>
      <div className="container">
        <Reveal>
          <div className="section-label">SuperJarvis</div>
          <h2 className="section-heading" style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
            What Jarvis Is <span className="glow-text">Becoming</span>
          </h2>
        </Reveal>

        {/* ═══ FOUR PILLARS ═══ */}
        <Reveal delay={100}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 14, marginBottom: 48 }}>
            {SUPERJARVIS_PILLARS.map((p, i) => {
              const c = PILLAR_COLORS[p.color];
              return (
                <div key={i} style={{ padding: '24px', background: `${c}08`, border: `1px solid ${c}20`, borderRadius: 16, position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, transparent, ${c}, transparent)` }} />
                  <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 18, color: 'var(--text-primary)', marginBottom: 10 }}>{p.title}</div>
                  <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{p.description}</div>
                </div>
              );
            })}
          </div>
        </Reveal>

        {/* ═══ BIM SEARCH TIERS ═══ */}
        <Reveal delay={150}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: 3, color: 'rgba(0,240,255,0.5)', marginBottom: 16 }}>BIM Search Tier System</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 48 }}>
            {TIERS.map((t, i) => {
              const c = TIER_COLORS[t.tier];
              return (
                <Reveal key={i} delay={i * 80}>
                  <div className="glass-card" style={{ padding: '22px 26px' }}>
                    <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start', flexWrap: 'wrap' }}>
                      {/* Tier badge */}
                      <div style={{ minWidth: 80 }}>
                        <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 36, color: c, lineHeight: 1 }}>T{t.tier}</div>
                        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: 'var(--text-tertiary)', marginTop: 4 }}>{t.title}</div>
                      </div>
                      {/* Targets */}
                      <div style={{ flex: 1, minWidth: 160 }}>
                        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: 2, color: 'var(--text-muted)', marginBottom: 6 }}>TARGETS</div>
                        {t.targets.map((tgt, j) => (
                          <div key={j} style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.6 }}>• {tgt}</div>
                        ))}
                      </div>
                      {/* Budget + Ranking */}
                      <div style={{ flex: 1, minWidth: 140 }}>
                        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: 2, color: 'var(--text-muted)', marginBottom: 6 }}>BUDGET THRESHOLD</div>
                        <div style={{ fontSize: 14, fontWeight: 600, color: c, marginBottom: 8 }}>{t.budget}</div>
                        <div style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>
                          <span style={{ color: '#34D399' }}>High:</span> {t.ranking.high} · <span style={{ color: 'var(--amber-400)' }}>Med:</span> {t.ranking.medium} · <span style={{ color: 'var(--text-muted)' }}>Low:</span> {t.ranking.low}
                        </div>
                      </div>
                      {/* Portals */}
                      <div style={{ flex: 1, minWidth: 160 }}>
                        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: 2, color: 'var(--text-muted)', marginBottom: 6 }}>PORTALS</div>
                        <div style={{ fontSize: 11, color: 'var(--text-tertiary)', lineHeight: 1.5 }}>{t.portals}</div>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Reveal>

        {/* ═══ ACTION PLAN ═══ */}
        <Reveal delay={200}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: 3, color: 'rgba(0,240,255,0.5)', marginBottom: 16 }}>Action Plan</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 48 }}>
            {ACTION_PLAN.map((a, i) => (
              <Reveal key={i} delay={i * 50}>
                <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start', padding: '14px 18px', borderRadius: 12, background: 'rgba(0,240,255,0.02)', border: '1px solid rgba(0,240,255,0.05)', transition: 'all 0.3s', }} onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(0,240,255,0.15)'} onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(0,240,255,0.05)'}>
                  <span style={{ padding: '3px 8px', borderRadius: 8, fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 600, background: `${PRIORITY_COLORS[a.priority]}15`, color: PRIORITY_COLORS[a.priority], whiteSpace: 'nowrap' }}>{a.priority}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 3 }}>{a.action}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>{a.why}</div>
                  </div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>{a.owner}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </Reveal>

        {/* ═══ TEAM + RISKS (side by side) ═══ */}
        <Reveal delay={250}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 48 }}>
            {/* Team */}
            <div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: 3, color: 'rgba(0,240,255,0.5)', marginBottom: 12 }}>People & Roles</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {TEAM.map((p, i) => (
                  <div key={i} style={{ padding: '12px 16px', borderRadius: 10, background: 'rgba(0,240,255,0.02)', border: '1px solid rgba(0,240,255,0.05)' }}>
                    <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 14, color: 'var(--text-primary)', marginBottom: 3 }}>{p.name}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-tertiary)', lineHeight: 1.4 }}>{p.role}</div>
                  </div>
                ))}
              </div>
            </div>
            {/* Risks */}
            <div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: 3, color: 'rgba(255,77,106,0.5)', marginBottom: 12 }}>Risk Register</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {RISKS.map((r, i) => (
                  <div key={i} style={{ padding: '12px 16px', borderRadius: 10, background: 'rgba(255,77,106,0.02)', border: '1px solid rgba(255,77,106,0.06)' }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 3 }}>{r.risk}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-tertiary)', lineHeight: 1.4 }}>{r.mitigation}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        {/* ═══ DATA ONBOARDING ═══ */}
        <Reveal delay={300}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: 3, color: 'rgba(0,240,255,0.5)', marginBottom: 16 }}>Data Onboarding — 24 Items</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
            {[
              { data: ONBOARDING.critical, color: 'var(--red-400)' },
              { data: ONBOARDING.important, color: 'var(--amber-400)' },
              { data: ONBOARDING.nice, color: 'var(--green-400)' },
            ].map((group, gi) => (
              <div key={gi} className="glass-card" style={{ padding: '20px', borderTop: `3px solid ${group.color}` }}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: 1, color: group.color, marginBottom: 12 }}>{group.data.label}</div>
                {group.data.items.map((item, ii) => (
                  <div key={ii} style={{ fontSize: 12, color: 'var(--text-secondary)', padding: '4px 0', borderBottom: '1px solid var(--border-subtle)' }}>
                    <span style={{ color: 'var(--text-muted)', marginRight: 8 }}>☐</span>{item}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
