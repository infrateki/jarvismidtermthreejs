import { OPPORTUNITIES, KPI_SNAPSHOT } from '../data/opportunities';

// ── helpers ──────────────────────────────────────────────────────────────────

const mono = { fontFamily: "'JetBrains Mono', monospace" };
const syne = { fontFamily: "'Syne', sans-serif" };

const TIER_COLORS = {
  1: { bg: 'rgba(0,240,255,0.12)',  color: 'var(--cyan-400)',   label: 'T1' },
  2: { bg: 'rgba(255,181,71,0.12)', color: 'var(--amber-400)',  label: 'T2' },
  3: { bg: 'rgba(168,85,247,0.12)', color: 'var(--purple-400)', label: 'T3' },
};

const STAGE_CONFIG = [
  { key: 'Radar',        color: 'var(--text-tertiary)', dashed: false },
  { key: 'Monitoring',   color: 'var(--amber-400)',     dashed: false },
  { key: 'Qualified',    color: 'var(--cyan-400)',      dashed: false },
  { key: 'Jorge Review', color: 'var(--border-subtle)', dashed: true  },
  { key: 'Contact',      color: 'var(--border-subtle)', dashed: true  },
  { key: 'Proposal',     color: 'var(--border-subtle)', dashed: true  },
];

// ── sub-components ────────────────────────────────────────────────────────────

function KpiCard({ value, label }) {
  return (
    <div className="glass-card" style={{ padding: 20, textAlign: 'center' }}>
      <div style={{ ...syne, fontSize: 32, fontWeight: 700, color: 'var(--cyan-400)', lineHeight: 1.1 }}>
        {value}
      </div>
      <div style={{ ...mono, fontSize: 9, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--text-tertiary)', marginTop: 8 }}>
        {label}
      </div>
    </div>
  );
}

function TierBadge({ tier }) {
  const t = TIER_COLORS[tier] || TIER_COLORS[3];
  return (
    <span style={{
      ...mono,
      fontSize: 9, letterSpacing: 1, textTransform: 'uppercase',
      padding: '3px 8px', borderRadius: 10,
      background: t.bg, color: t.color, fontWeight: 600,
    }}>
      {t.label}
    </span>
  );
}

function MentionsBar({ value, max }) {
  const pct = Math.round((value / max) * 100);
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <div style={{ flex: 1, height: 4, background: 'var(--border-subtle)', borderRadius: 2, overflow: 'hidden', minWidth: 60 }}>
        <div style={{ width: `${pct}%`, height: '100%', background: 'var(--cyan-400)', borderRadius: 2 }} />
      </div>
      <span style={{ ...mono, fontSize: 10, color: 'var(--text-secondary)', minWidth: 28, textAlign: 'right' }}>{value}</span>
    </div>
  );
}

// ── main component ────────────────────────────────────────────────────────────

export default function DashboardPage() {
  // Section 2 — hot opportunities (interest 5 + active/research), sorted by mentions desc
  const hot = OPPORTUNITIES
    .filter(o => o.interest === 5 && o.status === 'active/research')
    .sort((a, b) => b.mentions - a.mentions);
  const maxMentions = Math.max(...hot.map(o => o.mentions), 1);

  // Section 3 — pipeline counts per stage
  const stageCounts = {};
  STAGE_CONFIG.forEach(s => { stageCounts[s.key] = 0; });
  OPPORTUNITIES.forEach(o => {
    const key = o.stage === 'Radar' && o.status === 'monitoring' ? 'Monitoring' : o.stage;
    if (stageCounts[key] !== undefined) stageCounts[key]++;
  });
  const totalStaged = Object.values(stageCounts).reduce((a, b) => a + b, 0) || 1;

  return (
    <div style={{ padding: '32px 0' }}>

      {/* ── SECTION 1: KPI Cards ─────────────────────────────────────── */}
      <div
        className="kpi-grid"
        style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 40 }}
      >
        <KpiCard value={KPI_SNAPSHOT.totalOpportunities} label="Opportunities" />
        <KpiCard value={KPI_SNAPSHOT.activeResearch}     label="Active Research" />
        <KpiCard value={KPI_SNAPSHOT.qualified}          label="Qualified" />
        <KpiCard value={KPI_SNAPSHOT.tier1Count}         label="Tier 1" />
        <KpiCard value={KPI_SNAPSHOT.portalsActive}      label="Portals" />
        <KpiCard value={KPI_SNAPSHOT.contactsFound}      label="Contacts" />
        <KpiCard value={KPI_SNAPSHOT.sourceFiles}        label="Source Files" />
        <KpiCard value="$7B+"                            label="Pipeline Value" />
      </div>

      {/* ── SECTION 2: Hot Opportunities Table ──────────────────────── */}
      <div className="glass-card" style={{ marginBottom: 32, overflow: 'hidden' }}>
        {/* Table heading */}
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-subtle)' }}>
          <div style={{ ...mono, fontSize: 9, letterSpacing: 3, textTransform: 'uppercase', color: 'var(--cyan-400)', opacity: 0.7 }}>
            Hot Opportunities
          </div>
          <div style={{ ...syne, fontSize: 17, fontWeight: 700, color: 'var(--text-primary)', marginTop: 4 }}>
            Interest 5 &mdash; Active Research
          </div>
        </div>

        {/* Column headers */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '36px 1fr 90px 52px 160px 72px 90px',
          padding: '10px 20px',
          borderBottom: '1px solid var(--border-subtle)',
        }}>
          {['RANK', 'NAME', 'OWNER', 'TIER', 'MENTIONS', 'PORTAL', 'STAGE'].map(h => (
            <div key={h} style={{ ...mono, fontSize: 9, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--text-muted)' }}>
              {h}
            </div>
          ))}
        </div>

        {/* Data rows */}
        {hot.map((opp, i) => (
          <div
            key={opp.id}
            style={{
              display: 'grid',
              gridTemplateColumns: '36px 1fr 90px 52px 160px 72px 90px',
              padding: '12px 20px',
              alignItems: 'center',
              fontSize: 13,
              background: i % 2 === 1 ? 'rgba(12,16,35,0.30)' : 'transparent',
              borderBottom: i < hot.length - 1 ? '1px solid var(--border-subtle)' : 'none',
              transition: 'background 0.2s',
              cursor: 'default',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--border-subtle)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = i % 2 === 1 ? 'rgba(12,16,35,0.30)' : 'transparent'; }}
          >
            <div style={{ ...mono, fontSize: 11, color: 'var(--text-tertiary)', fontWeight: 600 }}>
              {String(i + 1).padStart(2, '0')}
            </div>
            <div style={{ color: 'var(--text-primary)', fontWeight: 500, paddingRight: 12, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {opp.title}
            </div>
            <div style={{ ...mono, fontSize: 11, color: 'var(--text-secondary)' }}>
              {opp.owner}
            </div>
            <div>
              <TierBadge tier={opp.tier} />
            </div>
            <MentionsBar value={opp.mentions} max={maxMentions} />
            <div style={{ ...mono, fontSize: 11, color: 'var(--text-tertiary)' }}>
              {opp.portal}
            </div>
            <div style={{
              ...mono, fontSize: 10, fontWeight: 600,
              color: opp.stage === 'Qualified' ? 'var(--cyan-400)' : 'var(--amber-400)',
            }}>
              {opp.stage}
            </div>
          </div>
        ))}

        {hot.length === 0 && (
          <div style={{ padding: 32, textAlign: 'center', color: 'var(--text-tertiary)', ...mono, fontSize: 11 }}>
            No hot opportunities found
          </div>
        )}
      </div>

      {/* ── SECTION 3: Pipeline Summary Bar ─────────────────────────── */}
      <div className="glass-card" style={{ padding: '20px 24px', marginBottom: 20 }}>
        <div style={{ ...mono, fontSize: 9, letterSpacing: 3, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 14 }}>
          Pipeline Summary
        </div>

        {/* Segmented bar */}
        <div style={{ display: 'flex', height: 32, borderRadius: 6, gap: 3, marginBottom: 14 }}>
          {STAGE_CONFIG.map(({ key, color, dashed }) => {
            const count = stageCounts[key] || 0;
            const pct = (count / totalStaged) * 100;
            if (count === 0 && dashed) {
              return (
                <div key={key} style={{
                  flex: '0 0 52px', height: '100%',
                  border: '1px dashed var(--border-medium)',
                  borderRadius: 4,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <span style={{ ...mono, fontSize: 8, color: 'var(--text-muted)', letterSpacing: 1 }}>0</span>
                </div>
              );
            }
            return (
              <div key={key} style={{
                flex: `0 0 ${Math.max(pct, 5)}%`,
                height: '100%',
                background: color,
                borderRadius: 4,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                minWidth: 40,
              }}>
                <span style={{ ...mono, fontSize: 11, color: '#060A18', fontWeight: 700 }}>{count}</span>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
          {STAGE_CONFIG.map(({ key, color }) => (
            <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 8, height: 8, borderRadius: 2, background: color, flexShrink: 0 }} />
              <span style={{ ...mono, fontSize: 10, color: 'var(--text-tertiary)', letterSpacing: 0.5 }}>
                {key}: {stageCounts[key] || 0}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── SECTION 4: Quick Stats ───────────────────────────────────── */}
      <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap', paddingLeft: 2 }}>
        {[
          'Top Portal: MIA (9 opportunities)',
          'Last Scan: April 26, 2026',
          'Next Action: Monday 6AM supervised scan',
        ].map(stat => (
          <div key={stat} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--cyan-400)', opacity: 0.5, flexShrink: 0 }} />
            <span style={{ ...mono, fontSize: 11, color: 'var(--text-tertiary)', letterSpacing: 0.5 }}>
              {stat}
            </span>
          </div>
        ))}
      </div>

      {/* Responsive */}
      <style>{`
        @media (max-width: 768px) {
          .kpi-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </div>
  );
}
