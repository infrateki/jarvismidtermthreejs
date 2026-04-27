import Reveal from '../components/Reveal';
import { PIPELINE_STAGES, AUTONOMY_KNOB } from '../data/pipeline';
import { PORTALS } from '../data/portals';

const stages = PIPELINE_STAGES || [];
const knob = AUTONOMY_KNOB || [];
const portals = PORTALS || [];

const TIER_COLORS = { 1: 'var(--cyan-400)', 2: 'var(--amber-400)', 3: 'var(--purple-400)' };

export default function PipelineSection() {
  return (
    <section data-section="8" style={{ padding: '80px 0 120px' }}>
      <div className="container">
        <Reveal>
          <div className="section-label">Chapters IX &amp; X</div>
          <h2 className="section-heading" style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
            Command <span className="glow-text">Center</span>
          </h2>
        </Reveal>

        {/* Pipeline Flow */}
        <Reveal delay={100}>
          <div style={{ marginBottom: 56 }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(0,240,255,0.5)', marginBottom: 20 }}>
              Pipeline Flow
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 0, alignItems: 'center' }}>
              {stages.map((stage, i) => {
                const isLast = i === stages.length - 1;
                const isWon = stage === 'Won';
                const isLost = stage === 'Lost';
                return (
                  <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{
                      padding: '8px 18px',
                      borderRadius: 20,
                      background: isWon ? 'rgba(52,211,153,0.1)' : isLost ? 'rgba(255,77,106,0.1)' : 'rgba(0,240,255,0.06)',
                      border: `1px solid ${isWon ? 'rgba(52,211,153,0.3)' : isLost ? 'rgba(255,77,106,0.3)' : 'rgba(0,240,255,0.15)'}`,
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 11,
                      letterSpacing: '1px',
                      color: isWon ? '#34D399' : isLost ? 'var(--red-400)' : 'var(--text-secondary)',
                      whiteSpace: 'nowrap',
                    }}>
                      {stage}
                    </div>
                    {!isLast && (
                      <div style={{ width: 24, height: 1, background: 'linear-gradient(90deg, rgba(0,240,255,0.4), rgba(0,240,255,0.1))', flexShrink: 0 }} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>

        {/* The Knob — Autonomy Levels */}
        <Reveal delay={200}>
          <div style={{ marginBottom: 56 }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(0,240,255,0.5)', marginBottom: 20 }}>
              Autonomy Knob — Current: Conservative (Level 3)
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12 }}>
              {knob.map((k, i) => {
                const isActive = k.level === 3;
                return (
                  <div key={i} className="glass-card" style={{
                    padding: '16px 18px',
                    border: isActive ? '1px solid rgba(0,240,255,0.4)' : '1px solid rgba(0,240,255,0.06)',
                    boxShadow: isActive ? '0 0 20px rgba(0,240,255,0.08)' : 'none',
                  }}>
                    <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 28, color: isActive ? 'var(--cyan-400)' : 'var(--text-tertiary)', marginBottom: 4 }}>
                      {k.level}
                    </div>
                    <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: 13, color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)', marginBottom: 6 }}>
                      {k.mode}
                    </div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: 'var(--text-tertiary)', lineHeight: 1.5 }}>
                      {k.description}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>

        {/* Portal Inventory */}
        <Reveal delay={300}>
          <div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(0,240,255,0.5)', marginBottom: 20 }}>
              Portal Inventory — {portals.length} Active Sources
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 12 }}>
              {portals.map((portal, i) => {
                const tierColor = TIER_COLORS[portal.tier] || 'var(--text-tertiary)';
                return (
                  <Reveal key={i} delay={i * 40}>
                    <div className="glass-card" style={{ padding: '16px 18px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                        <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: 13, color: 'var(--text-primary)', flex: 1, paddingRight: 8 }}>
                          {portal.name}
                        </div>
                        <div style={{
                          padding: '3px 8px',
                          borderRadius: 10,
                          background: `${tierColor}15`,
                          border: `1px solid ${tierColor}30`,
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: 9,
                          letterSpacing: '1px',
                          color: tierColor,
                          whiteSpace: 'nowrap',
                        }}>
                          TIER {portal.tier}
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: 12 }}>
                        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>
                          {portal.scanFrequency}
                        </span>
                        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                          {portal.scanMethod}
                        </span>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
