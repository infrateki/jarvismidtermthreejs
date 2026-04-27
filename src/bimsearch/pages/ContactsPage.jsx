import { useState, useMemo } from 'react';
import { CONTACTS } from '../data/contacts';

const TIER_COLORS = {
  internal: 'var(--cyan-400)',
  agency:   'var(--amber-400)',
  teaming:  'var(--purple-400)',
};

const TIER_LABELS = {
  internal: 'INTERNAL',
  agency:   'AGENCY',
  teaming:  'TEAMING',
};

const FILTER_TABS = ['All', 'Internal', 'Agency', 'Teaming'];

const sorted = [...CONTACTS].sort((a, b) => b.mentions - a.mentions);

function TierBadge({ tier }) {
  const color = TIER_COLORS[tier] || 'var(--text-tertiary)';
  return (
    <span style={{
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: 9,
      letterSpacing: '1px',
      padding: '2px 7px',
      borderRadius: 10,
      border: `1px solid ${color}`,
      color,
      background: `${color}12`,
      whiteSpace: 'nowrap',
      flexShrink: 0,
    }}>
      {TIER_LABELS[tier] || tier.toUpperCase()}
    </span>
  );
}

function Avatar({ name, tier }) {
  const color = TIER_COLORS[tier] || 'var(--text-tertiary)';
  const initial = name.charAt(0).toUpperCase();
  return (
    <div style={{
      width: 40,
      height: 40,
      borderRadius: '50%',
      background: `${color}18`,
      border: `1px solid ${color}30`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'Syne', sans-serif",
      fontWeight: 700,
      fontSize: 16,
      color,
      flexShrink: 0,
    }}>
      {initial}
    </div>
  );
}

function ContactCard({ contact }) {
  const [hovered, setHovered] = useState(false);
  const color = TIER_COLORS[contact.tier] || 'var(--text-tertiary)';

  return (
    <div
      className="glass-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: 18,
        transition: 'transform 0.22s ease, border-color 0.22s ease',
        transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
        borderColor: hovered ? `${color}40` : undefined,
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
      }}
    >
      {/* Top row: avatar + name/title */}
      <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
        <Avatar name={contact.name} tier={contact.tier} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 600,
            fontSize: 14,
            color: 'var(--text-primary)',
            marginBottom: 2,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}>
            {contact.name}
          </div>
          <div style={{
            fontSize: 12,
            color: 'var(--text-secondary)',
            lineHeight: 1.4,
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}>
            {contact.title}
          </div>
        </div>
      </div>

      {/* Company */}
      <div style={{
        fontSize: 12,
        color: 'var(--text-tertiary)',
        lineHeight: 1.35,
      }}>
        {contact.company}
      </div>

      {/* Email */}
      <a
        href={`mailto:${contact.email}`}
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 11,
          color: 'var(--cyan-400)',
          textDecoration: 'none',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          display: 'block',
        }}
        title={contact.email}
      >
        {contact.email}
      </a>

      {/* Bottom row: tier badge + mentions */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <TierBadge tier={contact.tier} />
        <span style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 10,
          color: 'var(--text-muted)',
          letterSpacing: '1px',
        }}>
          {contact.mentions} mentions
        </span>
      </div>
    </div>
  );
}

export default function ContactsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('All');
  const [focused, setFocused] = useState(false);

  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return sorted.filter(c => {
      const matchesTab = activeTab === 'All' || c.tier === activeTab.toLowerCase();
      const matchesSearch = !q || (
        c.name.toLowerCase().includes(q) ||
        c.company.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.title.toLowerCase().includes(q)
      );
      return matchesTab && matchesSearch;
    });
  }, [searchQuery, activeTab]);

  const counts = useMemo(() => ({
    all:      CONTACTS.length,
    internal: CONTACTS.filter(c => c.tier === 'internal').length,
    agency:   CONTACTS.filter(c => c.tier === 'agency').length,
    teaming:  CONTACTS.filter(c => c.tier === 'teaming').length,
  }), []);

  return (
    <div>
      {/* ── Header ── */}
      <div style={{ marginBottom: 20 }}>
        <h1 style={{
          fontFamily: "'Syne', sans-serif",
          fontWeight: 800,
          fontSize: 28,
          letterSpacing: '-1px',
          color: 'var(--text-primary)',
          marginBottom: 6,
        }}>
          Contacts
        </h1>
        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 11,
          color: 'var(--text-secondary)',
          letterSpacing: '2px',
          textTransform: 'uppercase',
          marginBottom: 20,
        }}>
          {CONTACTS.length} key contacts from 603 discovered
        </div>

        {/* Search bar */}
        <input
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="Search contacts by name, company, email..."
          style={{
            width: '100%',
            background: 'var(--bg-glass)',
            border: `1px solid ${focused ? 'var(--cyan-400)' : 'var(--border-medium)'}`,
            borderRadius: 12,
            padding: '12px 20px',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 13,
            color: 'var(--text-primary)',
            outline: 'none',
            backdropFilter: 'blur(12px)',
            transition: 'border-color 0.2s ease',
            marginBottom: 16,
            boxSizing: 'border-box',
          }}
        />

        {/* Filter tabs */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {FILTER_TABS.map(tab => {
            const isActive = activeTab === tab;
            const tabColor = tab === 'All' ? 'var(--cyan-400)' : TIER_COLORS[tab.toLowerCase()];
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: '6px 14px',
                  borderRadius: 8,
                  border: isActive ? 'none' : '1px solid var(--border-medium)',
                  background: isActive ? tabColor : 'var(--bg-glass)',
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
                {tab}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Contact grid ── */}
      {filtered.length > 0 ? (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: 14,
          marginBottom: 16,
        }}>
          {filtered.map(contact => (
            <ContactCard key={contact.email} contact={contact} />
          ))}
        </div>
      ) : (
        <div style={{
          padding: '48px 0',
          textAlign: 'center',
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 11,
          color: 'var(--text-muted)',
          letterSpacing: '2px',
        }}>
          NO CONTACTS MATCH
        </div>
      )}

      {/* ── Stats bar ── */}
      <div style={{
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
        alignItems: 'center',
      }}>
        <span><strong style={{ color: 'var(--cyan-400)' }}>{filtered.length}</strong> contacts shown</span>
        <span style={{ color: 'var(--border-medium)' }}>&nbsp;|&nbsp;</span>
        <span><strong style={{ color: 'var(--cyan-400)' }}>{counts.internal}</strong> internal</span>
        <span style={{ color: 'var(--border-medium)' }}>&nbsp;|&nbsp;</span>
        <span><strong style={{ color: 'var(--amber-400)' }}>{counts.agency}</strong> agency</span>
        <span style={{ color: 'var(--border-medium)' }}>&nbsp;|&nbsp;</span>
        <span><strong style={{ color: 'var(--purple-400)' }}>{counts.teaming}</strong> teaming</span>
        <span style={{ color: 'var(--border-medium)' }}>&nbsp;|&nbsp;</span>
        <span>from <strong style={{ color: 'var(--text-primary)' }}>603</strong> total discovered</span>
      </div>
    </div>
  );
}
