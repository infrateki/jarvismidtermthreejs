import { PORTALS } from '../../data/portals';
import { OPPORTUNITIES } from '../data/opportunities';

const TIER_STYLES = {
  1: { bg: 'rgba(0,240,255,0.1)', color: 'var(--cyan-400)', border: 'rgba(0,240,255,0.25)' },
  2: { bg: 'rgba(255,181,71,0.1)', color: 'var(--amber-400)', border: 'rgba(255,181,71,0.25)' },
  3: { bg: 'rgba(168,85,247,0.1)', color: 'var(--purple-400)', border: 'rgba(168,85,247,0.25)' },
};

const TYPE_STYLES = {
  federal:   { bg: 'rgba(0,119,182,0.12)', color: 'var(--cyan-500)', border: 'rgba(0,119,182,0.3)' },
  municipal: { bg: 'rgba(5,150,105,0.1)',  color: '#10B981',          border: 'rgba(5,150,105,0.25)' },
  private:   { bg: 'rgba(255,181,71,0.08)', color: 'var(--amber-400)', border: 'rgba(255,181,71,0.2)' },
};

const METHOD_ICON = { browser: '◉', api: '⌗', manual: '✎' };

const PORTAL_KEY_MAP = {
  'Austin-Bergstrom (AUS)':     'AUS',
  'Broward County (FLL)':       'FLL',
  'DFW Airport':                'DFW',
  'Miami-Dade Aviation (MIA)':  'MIA',
  'Orlando Airport (MCO/GOAA)': 'MCO',
  'PANYNJ':                     'PANYNJ',
  'SAM.gov':                    'SAM.gov',
  'LinkedIn / Web Research':    'Research',
};

const sortedPortals = [...PORTALS].sort((a, b) =>
  a.tier !== b.tier ? a.tier - b.tier : a.name.localeCompare(b.name)
);

function getOppCount(portal) {
  if (portal.name === 'USACE Caribbean') {
    return OPPORTUNITIES.filter(o => o.owner && o.owner.includes('USACE')).length;
  }
  const key = PORTAL_KEY_MAP[portal.name];
  return key ? OPPORTUNITIES.filter(o => o.portal === key).length : 0;
}

function Pill({ label, bg, color, border }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center',
      padding: '2px 8px', borderRadius: 20,
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: 10, letterSpacing: '1px', textTransform: 'uppercase',
      background: bg, color, border: `1px solid ${border}`,
      whiteSpace: 'nowrap',
    }}>
      {label}
    </span>
  );
}

export default function PortalsPage() {
  const tier1Count = sortedPortals.filter(p => p.tier === 1).length;
  const tier2Count = sortedPortals.filter(p => p.tier === 2).length;
  const tier3Count = sortedPortals.filter(p => p.tier === 3).length;

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <h1 style={{
          fontFamily: "'Syne', sans-serif", fontWeight: 700,
          fontSize: 'clamp(24px, 3vw, 36px)', letterSpacing: '-1px',
          color: 'var(--text-primary)', marginBottom: 8,
        }}>
          Portal Health
        </h1>
        <div style={{
          fontFamily: "'JetBrains Mono', monospace", fontSize: 12,
          color: 'var(--text-tertiary)', letterSpacing: '1px',
        }}>
          12 active procurement sources
        </div>
      </div>

      {/* Portal Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: 16,
        marginBottom: 32,
      }}>
        {sortedPortals.map((portal, i) => {
          const tier = TIER_STYLES[portal.tier];
          const type = TYPE_STYLES[portal.type];
          const oppCount = getOppCount(portal);
          const isWeekly = portal.scanFrequency === 'weekly';

          return (
            <div key={i} className="glass-card" style={{ padding: 20, display: 'flex', flexDirection: 'column' }}>

              {/* Name + Tier */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                <div style={{
                  fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 15,
                  color: 'var(--text-primary)', lineHeight: 1.3, flex: 1, marginRight: 10,
                }}>
                  {portal.name}
                </div>
                <Pill label={`T${portal.tier}`} bg={tier.bg} color={tier.color} border={tier.border} />
              </div>

              {/* Badges */}
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 14 }}>
                <Pill label={portal.type} bg={type.bg} color={type.color} border={type.border} />
                <Pill
                  label={`⏱ ${isWeekly ? 'Weekly' : 'Biweekly'}`}
                  bg="rgba(200,214,229,0.05)"
                  color="var(--text-secondary)"
                  border="var(--border-subtle)"
                />
                <Pill
                  label={`${METHOD_ICON[portal.scanMethod]} ${portal.scanMethod}`}
                  bg="rgba(200,214,229,0.05)"
                  color="var(--text-secondary)"
                  border="var(--border-subtle)"
                />
              </div>

              {/* Status + Opp count */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                <div style={{
                  width: 7, height: 7, borderRadius: '50%',
                  background: '#10B981', boxShadow: '0 0 6px rgba(16,185,129,0.5)',
                  flexShrink: 0,
                }} />
                <span style={{
                  fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
                  color: '#10B981', letterSpacing: '0.5px',
                }}>
                  Healthy
                </span>
                <span style={{
                  fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
                  color: oppCount > 0 ? 'var(--text-tertiary)' : 'var(--text-muted)',
                  marginLeft: 'auto',
                }}>
                  {oppCount > 0 ? `${oppCount} opp${oppCount !== 1 ? 's' : ''} linked` : '—'}
                </span>
              </div>

              {/* Notes */}
              <div style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: 11,
                color: 'var(--text-tertiary)', lineHeight: 1.5,
                flex: 1, marginBottom: 14, minHeight: 16,
              }}>
                {portal.notes}
              </div>

              {/* Last scan bar */}
              <div style={{ height: 3, borderRadius: 2, background: 'var(--border-subtle)', overflow: 'hidden' }}>
                <div style={{
                  height: '100%',
                  width: isWeekly ? '100%' : '88%',
                  background: 'linear-gradient(90deg, var(--cyan-600), var(--cyan-400))',
                  borderRadius: 2,
                }} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary row */}
      <div style={{
        padding: '14px 20px',
        background: 'rgba(0,240,255,0.02)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 10,
        display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center',
        fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: '0.5px',
      }}>
        <span style={{ color: 'var(--text-secondary)' }}>{sortedPortals.length} portals</span>
        <span style={{ color: 'var(--border-medium)' }}>|</span>
        <span style={{ color: 'var(--text-tertiary)' }}>
          {tier1Count}&thinsp;<span style={{ color: 'var(--cyan-400)' }}>Tier 1</span>
        </span>
        <span style={{ color: 'var(--border-medium)' }}>|</span>
        <span style={{ color: 'var(--text-tertiary)' }}>
          {tier2Count}&thinsp;<span style={{ color: 'var(--amber-400)' }}>Tier 2</span>
        </span>
        <span style={{ color: 'var(--border-medium)' }}>|</span>
        <span style={{ color: 'var(--text-tertiary)' }}>
          {tier3Count}&thinsp;<span style={{ color: 'var(--purple-400)' }}>Tier 3</span>
        </span>
        <span style={{ color: 'var(--border-medium)' }}>|</span>
        <span style={{ color: 'var(--text-muted)' }}>Last scan: April 26, 2026</span>
      </div>
    </div>
  );
}
