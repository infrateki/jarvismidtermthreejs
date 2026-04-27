import { useState } from 'react';
import Reveal from '../components/Reveal';
import LinkIcon3D from '../three/LinkIcon3D';
import { LINKS } from '../data/links';

const accentMap = {
  cyan:   { color: 'var(--cyan-400)',   bg: 'rgba(0,240,255,0.06)',   border: 'rgba(0,240,255,0.15)'  },
  amber:  { color: 'var(--amber-400)',  bg: 'rgba(255,181,71,0.06)',  border: 'rgba(255,181,71,0.15)' },
  purple: { color: 'var(--purple-400)', bg: 'rgba(168,85,247,0.06)',  border: 'rgba(168,85,247,0.15)' },
  green:  { color: 'var(--green-400)',  bg: 'rgba(52,211,153,0.06)',  border: 'rgba(52,211,153,0.15)' },
};

function LinkCard({ link, index }) {
  const accent = accentMap[link.accent] || accentMap.cyan;
  const [hovered, setHovered] = useState(false);
  const isInternal = !!link.internal;

  return (
    <Reveal delay={Math.min(index * 80, 480)}>
      <a
        href={link.url}
        target={isInternal ? '_self' : '_blank'}
        rel={isInternal ? undefined : 'noopener noreferrer'}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: 'block',
          textDecoration: 'none',
          color: 'inherit',
          padding: '24px 28px',
          paddingRight: 120,
          background: accent.bg,
          border: `1px solid ${hovered ? accent.color : accent.border}`,
          borderRadius: 16,
          transition: 'transform 0.4s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s ease, border-color 0.3s ease, background 0.3s ease',
          position: 'relative',
          overflow: 'hidden',
          cursor: 'pointer',
          transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
          boxShadow: hovered
            ? `0 14px 44px rgba(0,0,0,0.32), 0 0 24px ${accent.border}`
            : 'none',
          minHeight: 196,
        }}
      >
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, height: 1,
          background: `linear-gradient(90deg, transparent, ${accent.border}, transparent)`,
        }} />

        <div style={{
          position: 'absolute',
          top: 16,
          right: 16,
          width: 80,
          height: 80,
          opacity: 0.95,
          filter: hovered ? `drop-shadow(0 0 12px ${accent.color}66)` : 'none',
          transition: 'filter 0.3s ease',
        }}>
          <LinkIcon3D type={link.iconType} accent={link.accent} hovered={hovered} />
        </div>

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
          marginBottom: 14,
        }}>
          {link.tag}
        </div>

        <div style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: 21,
          fontWeight: 700,
          lineHeight: 1.2,
          color: 'var(--text-primary)',
          marginBottom: 10,
          display: 'flex',
          alignItems: 'center',
          gap: 10,
        }}>
          <span>{link.title}</span>
          <span style={{
            fontSize: 14,
            opacity: hovered ? 0.9 : 0.4,
            color: hovered ? accent.color : 'inherit',
            transform: hovered ? 'translate(2px, -2px)' : 'translate(0,0)',
            transition: 'all 0.3s ease',
          }}>↗</span>
        </div>

        <div style={{
          fontSize: 13.5,
          lineHeight: 1.6,
          color: 'var(--text-secondary)',
          maxWidth: 520,
        }}>
          {link.description}
        </div>

        <div style={{
          marginTop: 14,
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 11,
          color: 'var(--text-muted)',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}>
          {isInternal ? `infratek.local${link.url}` : link.url}
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
          <p style={{
            maxWidth: 640,
            color: 'var(--text-secondary)',
            fontSize: 15,
            lineHeight: 1.7,
            marginTop: -8,
            marginBottom: 32,
          }}>
            Every active surface in the Jarvis × PDBM operating system — command centers, pipelines,
            CRMs, and strategic briefings. Each tile carries its own kinetic glyph.
          </p>
        </Reveal>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: 20,
        }}>
          {LINKS.map((link, i) => (
            <LinkCard key={link.url} link={link} index={i} />
          ))}
        </div>

        <Reveal delay={Math.min(LINKS.length * 80, 480) + 200}>
          <div style={{
            marginTop: 40,
            textAlign: 'center',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11,
            letterSpacing: 2,
            color: 'var(--text-muted)',
          }}>
            EDIT TITLES &amp; DESCRIPTIONS IN src/data/links.js
          </div>
        </Reveal>
      </div>
    </section>
  );
}
