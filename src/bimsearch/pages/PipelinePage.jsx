import { useState } from 'react';
import { OPPORTUNITIES, PIPELINE_STAGES } from '../data/opportunities';

const MAX_MENTIONS = Math.max(...OPPORTUNITIES.map(o => o.mentions), 1);

const TIER_COLORS = {
  1: 'var(--cyan-400)',
  2: 'var(--amber-400)',
  3: 'rgba(200,214,229,0.45)',
};

const FILTERS = [
  { label: 'All',        fn: () => true },
  { label: 'Tier 1',     fn: o => o.tier === 1 },
  { label: 'Tier 2',     fn: o => o.tier === 2 },
  { label: 'Tier 3',     fn: o => o.tier === 3 },
  { label: 'Interest 5', fn: o => o.interest === 5 },
];

function formatValue(n) {
  if (n >= 1_000_000_000) return '$' + (n / 1_000_000_000).toFixed(1) + 'B';
  if (n >= 1_000_000)     return '$' + (n / 1_000_000).toFixed(0) + 'M';
  return '$' + n.toLocaleString();
}

function TierBadge({ tier }) {
  return (
    <span style={{
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: 9,
      letterSpacing: '1px',
      padding: '2px 6px',
      borderRadius: 4,
      border: `1px solid ${TIER_COLORS[tier]}`,
      color: TIER_COLORS[tier],
      flexShrink: 0,
    }}>
      T{tier}
    </span>
  );
}

function InterestDots({ interest }) {
  return (
    <span style={{ display: 'flex', gap: 2 }}>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} style={{
          fontSize: 7,
          color: i < interest ? 'var(--cyan-400)' : 'var(--text-muted)',
          lineHeight: 1,
        }}>●</span>
      ))}
    </span>
  );
}

function OpportunityCard({ opp }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="glass-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: 14,
        marginBottom: 10,
        cursor: 'pointer',
        transition: 'transform 0.22s ease, border-color 0.22s ease',
        transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
        borderColor: hovered ? 'rgba(0,240,255,0.3)' : undefined,
      }}
    >
      {/* Top row: tier + interest */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <TierBadge tier={opp.tier} />
        <InterestDots interest={opp.interest} />
      </div>

      {/* Title */}
      <div style={{
        fontFamily: "'Syne', sans-serif",
        fontSize: 13,
        fontWeight: 600,
        color: 'var(--text-primary)',
        marginBottom: 3,
        lineHeight: 1.3,
        wordBreak: 'break-word',
      }}>
        {opp.name}
      </div>

      {/* Owner */}
      <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginBottom: 7, lineHeight: 1.3 }}>
        {opp.owner}
      </div>

      {/* Portal badge */}
      <div style={{ marginBottom: 7 }}>
        <span style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 9,
          letterSpacing: '1px',
          padding: '2px 8px',
          borderRadius: 10,
          border: '1px solid var(--border-medium)',
          color: 'var(--text-secondary)',
        }}>
          {opp.portal}
        </span>
      </div>

      {/* Mentions bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: opp.estimatedValue ? 7 : 6 }}>
        <div style={{
          flex: 1,
          height: 2,
          background: 'var(--text-muted)',
          borderRadius: 2,
          overflow: 'hidden',
        }}>
          <div style={{
            width: `${Math.min(100, (opp.mentions / MAX_MENTIONS) * 100)}%`,
            height: '100%',
            background: 'var(--cyan-400)',
            borderRadius: 2,
            opacity: 0.7,
          }} />
        </div>
        <span style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 10,
          color: 'var(--text-tertiary)',
          minWidth: 22,
          textAlign: 'right',
        }}>
          {opp.mentions}
        </span>
      </div>

      {/* Estimated value */}
      {opp.estimatedValue && (
        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 14,
          fontWeight: 700,
          color: 'var(--cyan-400)',
          marginBottom: 6,
          letterSpacing: '-0.5px',
        }}>
          {formatValue(opp.estimatedValue)}
        </div>
      )}

      {/* Description */}
      <div style={{
        fontSize: 11,
        color: 'var(--text-tertiary)',
        maxHeight: 40,
        overflow: 'hidden',
        lineHeight: 1.45,
      }}>
        {opp.description}
      </div>
    </div>
  );
}

function KanbanColumn({ stage, cards }) {
  return (
    <div style={{ minWidth: 260, flexShrink: 0 }}>
      {/* Column header */}
      <div style={{ marginBottom: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
          <span style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: 14,
            fontWeight: 700,
            color: 'var(--text-primary)',
          }}>
            {stage}
          </span>
          <span style={{
            width: 24,
            height: 24,
            borderRadius: '50%',
            background: 'rgba(0,240,255,0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 10,
            color: 'var(--cyan-400)',
            flexShrink: 0,
          }}>
            {cards.length}
          </span>
        </div>
        <div style={{ height: 1, background: 'var(--border-subtle)' }} />
      </div>

      {/* Cards */}
      <div>
        {cards.map(opp => <OpportunityCard key={opp.id} opp={opp} />)}
        {cards.length === 0 && (
          <div style={{
            padding: '24px 0',
            textAlign: 'center',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 10,
            color: 'var(--text-muted)',
            letterSpacing: '2px',
          }}>
            EMPTY
          </div>
        )}
      </div>
    </div>
  );
}

export default function PipelinePage() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filterFn = FILTERS.find(f => f.label === activeFilter).fn;
  const filteredOpps = OPPORTUNITIES.filter(filterFn);

  // Group by stage; unknown stages fall into Radar
  const grouped = {};
  PIPELINE_STAGES.forEach(s => { grouped[s] = []; });
  filteredOpps.forEach(o => {
    if (grouped[o.stage]) grouped[o.stage].push(o);
    else grouped['Radar'].push(o);
  });

  // Sort each column by mentions descending
  PIPELINE_STAGES.forEach(s => {
    grouped[s].sort((a, b) => b.mentions - a.mentions);
  });

  return (
    <div>
      {/* ── Header ── */}
      <div style={{ marginBottom: 24 }}>
        <h1 style={{
          fontFamily: "'Syne', sans-serif",
          fontWeight: 800,
          fontSize: 28,
          letterSpacing: '-1px',
          color: 'var(--text-primary)',
          marginBottom: 6,
        }}>
          Pipeline Kanban
        </h1>
        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 11,
          color: 'var(--text-secondary)',
          letterSpacing: '2px',
          textTransform: 'uppercase',
          marginBottom: 16,
        }}>
          33 opportunities across 7 stages
        </div>

        {/* Filter bar */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {FILTERS.map(f => {
            const isActive = activeFilter === f.label;
            return (
              <button
                key={f.label}
                onClick={() => setActiveFilter(f.label)}
                style={{
                  padding: '6px 14px',
                  borderRadius: 8,
                  border: isActive ? 'none' : '1px solid var(--border-medium)',
                  background: isActive ? 'var(--cyan-400)' : 'var(--bg-glass)',
                  backdropFilter: 'blur(12px)',
                  color: isActive ? '#060A18' : 'var(--text-secondary)',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 10,
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  fontWeight: isActive ? 700 : 400,
                }}
              >
                {f.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Kanban board ── */}
      <div style={{
        display: 'flex',
        gap: 16,
        overflowX: 'auto',
        paddingBottom: 12,
        alignItems: 'flex-start',
      }}>
        {PIPELINE_STAGES.map(stage => (
          <KanbanColumn key={stage} stage={stage} cards={grouped[stage]} />
        ))}
      </div>

      {/* ── Bottom stats ── */}
      <div style={{
        marginTop: 16,
        padding: '10px 16px',
        background: 'var(--bg-glass)',
        borderRadius: 8,
        border: '1px solid var(--border-subtle)',
        backdropFilter: 'blur(8px)',
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 10,
        color: 'var(--text-secondary)',
        letterSpacing: '1px',
        display: 'flex',
        flexWrap: 'wrap',
        gap: 4,
      }}>
        <span>Showing <strong style={{ color: 'var(--cyan-400)' }}>{filteredOpps.length}</strong> of 33 opportunities</span>
        <span style={{ color: 'var(--border-medium)' }}>&nbsp;|&nbsp;</span>
        <span>Radar: <strong style={{ color: 'var(--text-primary)' }}>{grouped['Radar'].length}</strong></span>
        <span style={{ color: 'var(--border-medium)' }}>&nbsp;|&nbsp;</span>
        <span>Monitoring: <strong style={{ color: 'var(--text-primary)' }}>{grouped['Monitoring'].length}</strong></span>
        <span style={{ color: 'var(--border-medium)' }}>&nbsp;|&nbsp;</span>
        <span>Qualified: <strong style={{ color: 'var(--text-primary)' }}>{grouped['Qualified'].length}</strong></span>
      </div>
    </div>
  );
}
