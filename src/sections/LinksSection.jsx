import Reveal from '../components/Reveal';
import { LINKS } from '../data/links';

const accentMap = {
  cyan: { color: 'var(--cyan-400)', bg: 'rgba(0,240,255,0.06)', border: 'rgba(0,240,255,0.15)' },
  amber: { color: 'var(--amber-400)', bg: 'rgba(255,181,71,0.06)', border: 'rgba(255,181,71,0.15)' },
  purple: { color: 'var(--purple-400)', bg: 'rgba(168,85,247,0.06)', border: 'rgba(168,85,247,0.15)' },
  green: { color: 'var(--green-400)', bg: 'rgba(52,211,153,0.06)', border: 'rgba(52,211,153,0.15)' },
};

function LinkCard({ link, index }) {
  const accent = accentMap[link.accent] || accentMap.cyan;

  return (
    <Reveal delay={index * 120}>
      <a
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'block',
          textDecoration: 'none',
          color: 'inherit',
          padding: '28px 32px',
          background: accent.bg,
          border: `1px solid ${accent.border}`,
          borderRadius: 16,
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          position: 'relative',
          overflow: 'hidden',
          cursor: 'pointer',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = 'translateY(-4px)';
          e.currentTarget.style.boxShadow = `0 12px 40px rgba(0,0,0,0.3), 0 0 20px ${accent.border}`;
          e.currentTarget.style.borderColor = accent.color;
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = 'none';
          e.currentTarget.style.borderColor = accent.border;
        }}
      >
        {/* Top highlight */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, transparent, ${accent.border}, transparent)` }} />

        {/* Tag badge */}
        <div style={{
          display: 'inline-block',
          padding: '4px 12px',
          borderRadius: 20,
          background: `${accent.color}15`,
          border: `1px solid ${accent.color}30`,
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 10,
          letterSpacing: 2,
          color: accent.color,
          marginBottom: 16,
        }}>
          {link.tag}
        </div>

        {/* Title */}
        <div style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: 22,
          fontWeight: 700,
          color: 'var(--text-primary)',
          marginBottom: 10,
          display: 'flex',
          alignItems: 'center',
          gap: 10,
        }}>
          {link.title}
          <span style={{ fontSize: 14, opacity: 0.4, transition: 'transform 0.3s' }}>↗</span>
        </div>

        {/* Description */}
        <div style={{
          fontSize: 14,
          lineHeight: 1.6,
          color: 'var(--text-secondary)',
          maxWidth: 500,
        }}>
          {link.description}
        </div>

        {/* URL preview */}
        <div style={{
          marginTop: 16,
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 11,
          color: 'var(--text-muted)',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}>
          {link.url}
        </div>
      </a>
    </Reveal>
  );
}

export default function LinksSection() {
  return (
    <section data-section="15" aria-label="Resources & Links" style={{ padding: '80px 0 120px' }}>
      <div className="container">
        <Reveal>
          <div className="section-label">Resources</div>
          <h2 className="section-heading" style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
            Live <span className="glow-text">Links</span>
          </h2>
        </Reveal>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 20,
        }}>
          {LINKS.map((link, i) => (
            <LinkCard key={link.url} link={link} index={i} />
          ))}
        </div>

        {/* Add more hint */}
        <Reveal delay={LINKS.length * 120 + 200}>
          <div style={{
            marginTop: 40,
            textAlign: 'center',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11,
            letterSpacing: 2,
            color: 'var(--text-muted)',
          }}>
            ADD MORE LINKS IN src/data/links.js
          </div>
        </Reveal>
      </div>
    </section>
  );
}
