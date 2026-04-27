import { useState } from 'react';
import Reveal from '../components/Reveal';
import OpportunityModal from '../components/OpportunityModal';
import { PIPELINE_STAGES } from '../data/pipeline';
import { PORTALS } from '../data/portals';
import { BIMSEARCH_HEALTH, PRIMARY_TARGETS, OPPORTUNITIES, KPI_SNAPSHOT, OPERATING_RHYTHM, RECENT_ALERTS, SCORING_MODEL } from '../data/opportunities';

const TIER_COLORS = { 1: 'var(--cyan-400)', 2: 'var(--amber-400)', 3: 'var(--purple-400)' };

function scoreColor(s) {
  if (s >= 85) return '#34D399';
  if (s >= 70) return 'var(--cyan-400)';
  if (s >= 55) return 'var(--amber-400)';
  return 'var(--text-tertiary)';
}

function formatValue(v) {
  if (!v) return '—';
  if (v >= 1e9) return '$' + (v / 1e9).toFixed(1) + 'B';
  if (v >= 1e6) return '$' + (v / 1e6).toFixed(0) + 'M';
  return '$' + v.toLocaleString();
}

function daysUntil(d) {
  if (!d) return null;
  const diff = Math.ceil((new Date(d) - new Date()) / 86400000);
  return diff;
}

export default function PipelineSection() {
  const [selectedOpp, setSelectedOpp] = useState(null);
  const stages = PIPELINE_STAGES || [];
  const health = BIMSEARCH_HEALTH || {};
  const targets = PRIMARY_TARGETS || [];
  const opportunities = OPPORTUNITIES || [];
  const kpi = KPI_SNAPSHOT || {};
  const rhythm = OPERATING_RHYTHM || [];
  const alerts = RECENT_ALERTS || [];
  const portals = PORTALS || [];

  const kanban = {};
  stages.forEach(s => { kanban[s] = []; });
  opportunities.forEach(opp => {
    if (kanban[opp.stage]) kanban[opp.stage].push(opp);
    else if (kanban['Radar']) kanban['Radar'].push(opp);
  });
  // Sort each column by score descending
  Object.values(kanban).forEach(col => col.sort((a, b) => (b.score || 0) - (a.score || 0)));

  const hotOpps = [...opportunities].filter(o => o.score >= 80).sort((a, b) => b.score - a.score);

  return (
    <section data-section="8" aria-label="BIMSEARCH Pipeline" style={{ padding: '80px 0 120px' }}>
      <div className="container">
        <Reveal>
          <div className="section-label">BIMSEARCH Command Center</div>
          <h2 className="section-heading" style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
            Opportunity <span className="glow-text">Pipeline</span>
          </h2>
        </Reveal>

        {/* ═══ KPI CARDS ═══ */}
        <Reveal delay={100}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))', gap: 10, marginBottom: 40 }}>
            {[
              { v: kpi.totalOpportunities, l: 'TRACKED' },
              { v: kpi.activeResearch, l: 'ACTIVE' },
              { v: kpi.qualified, l: 'QUALIFIED' },
              { v: kpi.contact, l: 'CONTACT' },
              { v: kpi.tier1Count, l: 'TIER 1' },
              { v: kpi.deadlinesSoon, l: 'DEADLINES' },
              { v: kpi.contactsFound, l: 'CONTACTS' },
              { v: formatValue(kpi.pipelineValue), l: 'PIPELINE', big: true },
            ].map((k, i) => (
              <div key={i} className="glass-card" style={{ padding: '14px 10px', textAlign: 'center' }}>
                <div style={{ fontFamily: "'Syne', sans-serif", fontSize: k.big ? 18 : 26, fontWeight: 800, color: 'var(--cyan-400)', lineHeight: 1.1 }}>{k.v}</div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 8, letterSpacing: 2, color: 'var(--text-tertiary)', marginTop: 4 }}>{k.l}</div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* ═══ PRIMARY TARGETS ═══ */}
        <Reveal delay={120}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: 3, color: 'rgba(255,181,71,0.6)', marginBottom: 12 }}>Primary Targets</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 12, marginBottom: 40 }}>
            {targets.map((t, i) => (
              <div key={i} style={{ padding: '16px 18px', background: 'rgba(255,181,71,0.04)', border: '1px solid rgba(255,181,71,0.12)', borderRadius: 12, position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, transparent, rgba(255,181,71,0.3), transparent)' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 14, color: 'var(--text-primary)' }}>{t.name}</span>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, padding: '2px 8px', borderRadius: 8, background: 'rgba(255,181,71,0.1)', color: 'var(--amber-400)' }}>{t.status}</span>
                </div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: 'var(--amber-400)', marginBottom: 4 }}>{t.region} {t.value ? '· ' + formatValue(t.value) : ''}</div>
                <div style={{ fontSize: 11, color: 'var(--text-tertiary)', lineHeight: 1.4 }}>{t.description}</div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* ═══ HOT OPPORTUNITIES TABLE ═══ */}
        <Reveal delay={150}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: 3, color: 'rgba(0,240,255,0.5)', marginBottom: 12 }}>Hot Opportunities — Score ≥ 80</div>
          <div style={{ overflowX: 'auto', marginBottom: 40 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
              <thead>
                <tr style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: 2, color: 'var(--text-muted)', textTransform: 'uppercase', textAlign: 'left' }}>
                  <th style={{ padding: '8px 12px', width: 40 }}>#</th>
                  <th style={{ padding: '8px 6px', width: 44 }}>Score</th>
                  <th style={{ padding: '8px 12px' }}>Opportunity</th>
                  <th style={{ padding: '8px 12px' }}>Agency</th>
                  <th style={{ padding: '8px 6px' }}>Value</th>
                  <th style={{ padding: '8px 12px' }}>Deadline</th>
                  <th style={{ padding: '8px 12px' }}>PDBM Angle / Contact</th>
                </tr>
              </thead>
              <tbody>
                {hotOpps.map((opp, i) => {
                  const dl = daysUntil(opp.deadline);
                  return (
                    <tr key={opp.id} onClick={() => setSelectedOpp(opp.id)} style={{ borderBottom: '1px solid var(--border-subtle)', transition: 'background 0.2s', cursor: 'pointer' }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,240,255,0.03)'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                      <td style={{ padding: '10px 12px', color: 'var(--text-muted)', fontFamily: "'JetBrains Mono', monospace", fontSize: 10 }}>{i + 1}</td>
                      <td style={{ padding: '10px 6px' }}>
                        <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 18, color: scoreColor(opp.score) }}>{opp.score}</span>
                      </td>
                      <td style={{ padding: '10px 12px' }}>
                        <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: 2 }}>{opp.title}</div>
                        <div style={{ fontSize: 10, color: 'var(--text-tertiary)' }}>{opp.description?.slice(0, 80)}</div>
                      </td>
                      <td style={{ padding: '10px 12px', color: 'var(--text-secondary)', fontSize: 11 }}>{opp.source}</td>
                      <td style={{ padding: '10px 6px', fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: opp.value ? 'var(--cyan-400)' : 'var(--text-muted)', fontWeight: opp.value ? 700 : 400 }}>{formatValue(opp.value)}</td>
                      <td style={{ padding: '10px 12px', fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: dl !== null ? (dl <= 7 ? 'var(--red-400)' : dl <= 30 ? 'var(--amber-400)' : 'var(--text-secondary)') : 'var(--text-muted)' }}>
                        {opp.deadline || '—'}
                        {dl !== null && <span style={{ display: 'block', fontSize: 9, opacity: 0.7 }}>{dl}d left</span>}
                      </td>
                      <td style={{ padding: '10px 12px', fontSize: 11, color: 'var(--text-secondary)', maxWidth: 280 }}>
                        <div style={{ lineHeight: 1.4, marginBottom: 2 }}>{opp.pdbmAngle}</div>
                        {opp.nextAction && <div style={{ fontSize: 10, color: 'var(--cyan-400)', fontFamily: "'JetBrains Mono', monospace" }}>→ {opp.nextAction}</div>}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Reveal>

        {/* ═══ KANBAN BOARD ═══ */}
        <Reveal delay={200}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: 3, color: 'rgba(0,240,255,0.5)', marginBottom: 12 }}>Pipeline Kanban — {opportunities.length} Opportunities</div>
          <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 12, marginBottom: 40, WebkitOverflowScrolling: 'touch' }}>
            {stages.map((stage, si) => {
              const cards = kanban[stage] || [];
              const isActive = cards.length > 0;
              return (
                <div key={si} style={{ minWidth: 220, flex: '0 0 220px', background: isActive ? 'rgba(0,240,255,0.02)' : 'transparent', border: `1px solid ${isActive ? 'rgba(0,240,255,0.08)' : 'rgba(0,240,255,0.03)'}`, borderRadius: 12, padding: 12 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 600, color: isActive ? 'var(--text-primary)' : 'var(--text-muted)' }}>{stage}</span>
                    <span style={{ width: 20, height: 20, borderRadius: '50%', background: isActive ? 'rgba(0,240,255,0.1)' : 'rgba(0,240,255,0.03)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: isActive ? 'var(--cyan-400)' : 'var(--text-muted)' }}>{cards.length}</span>
                  </div>
                  {cards.length === 0 ? (
                    <div style={{ fontSize: 10, color: 'var(--text-muted)', fontStyle: 'italic', padding: '16px 0', textAlign: 'center' }}>Empty</div>
                  ) : (
                    <div className="kanban-col" style={{ display: 'flex', flexDirection: 'column', gap: 8, maxHeight: 500, overflowY: 'auto' }}>
                      {cards.map(opp => {
                        const dl = daysUntil(opp.deadline);
                        return (
                          <div key={opp.id} className="glass-card" onClick={() => setSelectedOpp(opp.id)} style={{ padding: '12px 14px', cursor: 'pointer' }}>
                            <div style={{ display: 'flex', gap: 6, marginBottom: 6, alignItems: 'center' }}>
                              <span style={{ padding: '1px 6px', borderRadius: 6, fontSize: 8, fontFamily: "'JetBrains Mono', monospace", background: `${TIER_COLORS[opp.tier]}15`, border: `1px solid ${TIER_COLORS[opp.tier]}30`, color: TIER_COLORS[opp.tier] }}>T{opp.tier}</span>
                              <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 14, color: scoreColor(opp.score) }}>{opp.score}</span>
                              {dl !== null && <span style={{ marginLeft: 'auto', fontSize: 9, fontFamily: "'JetBrains Mono', monospace", color: dl <= 7 ? 'var(--red-400)' : 'var(--amber-400)' }}>{dl}d</span>}
                            </div>
                            <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: 12, color: 'var(--text-primary)', marginBottom: 4, lineHeight: 1.3 }}>{opp.title}</div>
                            {opp.value && <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, fontWeight: 700, color: 'var(--cyan-400)', marginBottom: 4 }}>{formatValue(opp.value)}</div>}
                            {opp.pdbmAngle && <div style={{ fontSize: 10, color: 'var(--text-tertiary)', lineHeight: 1.3, marginBottom: 4, maxHeight: 32, overflow: 'hidden' }}>{opp.pdbmAngle}</div>}
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 9, fontFamily: "'JetBrains Mono', monospace", color: 'var(--text-muted)' }}>
                              <span>👤 {opp.owner}</span>
                              <span>{opp.portal}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </Reveal>

        {/* ═══ OPERATING RHYTHM ═══ */}
        <Reveal delay={250}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: 3, color: 'rgba(0,240,255,0.5)', marginBottom: 12 }}>Operating Rhythm — Weekly</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 6, marginBottom: 40 }}>
            {rhythm.map((day, i) => (
              <div key={i} className="glass-card" style={{ padding: '12px 8px', textAlign: 'center', opacity: day.active ? 1 : 0.5 }}>
                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 12, color: day.active ? 'var(--cyan-400)' : 'var(--text-muted)', marginBottom: 3 }}>{day.day}</div>
                <div style={{ fontWeight: 600, fontSize: 10, color: 'var(--text-primary)', marginBottom: 3 }}>{day.task}</div>
                <div style={{ fontSize: 8, color: 'var(--text-tertiary)', lineHeight: 1.3 }}>{day.description}</div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* ═══ ALERTS + SCORING ═══ */}
        <Reveal delay={300}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 40 }}>
            <div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: 3, color: 'rgba(0,240,255,0.5)', marginBottom: 10 }}>Recent Alerts</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {alerts.map((a, i) => (
                  <div key={i} style={{ padding: '8px 12px', borderRadius: 8, background: 'rgba(0,240,255,0.02)', border: '1px solid rgba(0,240,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 8, color: a.type.includes('deadline') ? 'var(--red-400)' : 'var(--cyan-400)', textTransform: 'uppercase', marginRight: 6 }}>{a.type}</span>
                      <span style={{ fontSize: 10, color: 'var(--text-secondary)' }}>{a.preview}</span>
                    </div>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: 'var(--text-muted)', whiteSpace: 'nowrap', marginLeft: 8 }}>{a.time}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: 3, color: 'rgba(0,240,255,0.5)', marginBottom: 10 }}>Scoring · Autonomy 3/10</div>
              <div style={{ padding: '12px 16px', borderRadius: 10, background: 'rgba(0,240,255,0.02)', border: '1px solid rgba(0,240,255,0.05)', marginBottom: 12 }}>
                <div style={{ fontSize: 12, color: 'var(--text-primary)', marginBottom: 6 }}>{SCORING_MODEL}</div>
              </div>
              <div style={{ display: 'flex', gap: 3 }}>
                {[0,1,2,3,4,5,6,7,8,9,10].map(l => (
                  <div key={l} style={{ flex: 1, height: 5, borderRadius: 3, background: l <= 3 ? 'var(--cyan-400)' : 'rgba(0,240,255,0.08)' }} />
                ))}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 3 }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 8, color: 'var(--text-muted)' }}>MANUAL</span>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 8, color: 'var(--text-muted)' }}>VACATION</span>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ═══ COMPACT PORTAL INVENTORY ═══ */}
        <Reveal delay={350}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: 3, color: 'rgba(0,240,255,0.5)', marginBottom: 10 }}>Portals — {portals.length} Active</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 6 }}>
            {portals.map((p, i) => (
              <div key={i} style={{ padding: '8px 12px', borderRadius: 8, background: 'rgba(0,240,255,0.02)', border: '1px solid rgba(0,240,255,0.04)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{p.name}</span>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: TIER_COLORS[p.tier], opacity: 0.7 }} />
              </div>
            ))}
          </div>
        </Reveal>
      </div>
      {selectedOpp && <OpportunityModal opportunityId={selectedOpp} onClose={() => setSelectedOpp(null)} />}
    </section>
  );
}
