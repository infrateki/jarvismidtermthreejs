import { OPPORTUNITIES } from '../data/opportunities';

export default function OpportunityModal({ opportunityId, onClose }) {
  const opp = OPPORTUNITIES.find(o => o.id === opportunityId);
  if (!opp) return null;

  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, zIndex: 200,
      background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 24,
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: 'var(--bg-secondary)', border: '1px solid var(--border-medium)',
        borderRadius: 20, maxWidth: 720, width: '100%', maxHeight: '85vh',
        overflowY: 'auto', padding: 32, position: 'relative',
      }}>
        {/* Close button */}
        <button onClick={onClose} style={{
          position: 'absolute', top: 16, right: 16,
          background: 'var(--bg-glass)', border: '1px solid var(--border-subtle)',
          borderRadius: '50%', width: 32, height: 32, cursor: 'pointer',
          color: 'var(--text-primary)', fontSize: 16,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>×</button>

        {/* Header badges */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
          <span style={{
            padding: '3px 10px', borderRadius: 8, fontSize: 11,
            fontFamily: "'JetBrains Mono', monospace",
            background: opp.tier === 1 ? 'rgba(0,240,255,0.1)' : opp.tier === 2 ? 'rgba(255,181,71,0.1)' : 'rgba(168,85,247,0.1)',
            color: opp.tier === 1 ? 'var(--cyan-400)' : opp.tier === 2 ? 'var(--amber-400)' : 'var(--purple-400)',
            border: `1px solid ${opp.tier === 1 ? 'rgba(0,240,255,0.2)' : opp.tier === 2 ? 'rgba(255,181,71,0.2)' : 'rgba(168,85,247,0.2)'}`,
          }}>TIER {opp.tier}</span>
          <span style={{
            padding: '3px 10px', borderRadius: 8, fontSize: 11,
            fontFamily: "'JetBrains Mono', monospace",
            background: 'rgba(0,240,255,0.1)', color: 'var(--cyan-400)',
          }}>SCORE {opp.score}</span>
          <span style={{
            padding: '3px 10px', borderRadius: 8, fontSize: 11,
            fontFamily: "'JetBrains Mono', monospace",
            background: 'var(--bg-glass)', color: 'var(--text-secondary)',
          }}>{opp.stage}</span>
        </div>

        <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 24, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8, lineHeight: 1.2 }}>
          {opp.title}
        </h2>

        {opp.solicitation && (
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: 'var(--cyan-400)', marginBottom: 16 }}>
            Solicitation: {opp.solicitation}
          </div>
        )}

        {/* Value + Deadline + Owner + Portal row */}
        <div style={{ display: 'flex', gap: 24, marginBottom: 24, flexWrap: 'wrap' }}>
          {opp.value && (
            <div>
              <div style={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", color: 'var(--text-muted)', marginBottom: 2 }}>ESTIMATED VALUE</div>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 28, fontWeight: 800, color: 'var(--cyan-400)' }}>
                {opp.value >= 1e9 ? '$' + (opp.value/1e9).toFixed(1) + 'B' : opp.value >= 1e6 ? '$' + (opp.value/1e6).toFixed(0) + 'M' : '$' + opp.value.toLocaleString()}
              </div>
            </div>
          )}
          {opp.deadline && (
            <div>
              <div style={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", color: 'var(--text-muted)', marginBottom: 2 }}>DEADLINE</div>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 20, fontWeight: 700, color: 'var(--amber-400)' }}>{opp.deadline}</div>
            </div>
          )}
          <div>
            <div style={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", color: 'var(--text-muted)', marginBottom: 2 }}>OWNER</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-primary)' }}>{opp.owner}</div>
          </div>
          <div>
            <div style={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", color: 'var(--text-muted)', marginBottom: 2 }}>PORTAL</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-primary)' }}>{opp.portal}</div>
          </div>
        </div>

        {/* Description */}
        {opp.description && (
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", color: 'var(--text-muted)', marginBottom: 6 }}>DESCRIPTION</div>
            <div style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6, padding: '12px 16px', background: 'var(--bg-glass)', borderRadius: 12, border: '1px solid var(--border-subtle)' }}>
              {opp.description}
            </div>
          </div>
        )}

        {/* PDBM Angle */}
        {opp.pdbmAngle && (
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", color: 'rgba(0,240,255,0.5)', marginBottom: 6 }}>PDBM ANGLE</div>
            <div style={{ fontSize: 14, color: 'var(--text-primary)', lineHeight: 1.6, padding: '12px 16px', background: 'rgba(0,240,255,0.04)', borderRadius: 12, border: '1px solid rgba(0,240,255,0.1)' }}>
              {opp.pdbmAngle}
            </div>
          </div>
        )}

        {/* Next Action */}
        {opp.nextAction && (
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", color: 'rgba(255,181,71,0.5)', marginBottom: 6 }}>NEXT ACTION / CONTACT</div>
            <div style={{ fontSize: 14, color: 'var(--amber-400)', lineHeight: 1.6, padding: '12px 16px', background: 'rgba(255,181,71,0.04)', borderRadius: 12, border: '1px solid rgba(255,181,71,0.1)' }}>
              → {opp.nextAction}
            </div>
          </div>
        )}

        {/* Source */}
        <div style={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", color: 'var(--text-muted)', marginBottom: 6 }}>SOURCE</div>
        <div style={{ fontSize: 12, color: 'var(--text-tertiary)', marginBottom: 20 }}>{opp.source}</div>

        {/* Metadata footer */}
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', paddingTop: 16, borderTop: '1px solid var(--border-subtle)' }}>
          <span style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: 'var(--text-muted)' }}>ID: {opp.id}</span>
          <span style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: 'var(--text-muted)' }}>Interest: {opp.interest}/5</span>
          <span style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: 'var(--text-muted)' }}>Mentions: {opp.mentions}</span>
          <span style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: 'var(--text-muted)' }}>Stage: {opp.stage}</span>
        </div>
      </div>
    </div>
  );
}
