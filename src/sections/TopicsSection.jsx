import Reveal from '../components/Reveal';
import ChartTooltip from '../components/ChartTooltip';
import { TOPICS } from '../data/topics';
import { ACTION_VERBS } from '../data/verbs';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';

export default function TopicsSection() {
  return (
    <section data-section="4" style={{ padding: '80px 0 120px' }}>
      <div className="container">
        <Reveal>
          <div className="section-label">Chapter IV</div>
          <h2 className="section-heading" style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
            What Jorge <span className="glow-text">Asks</span>
          </h2>
        </Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
          <Reveal delay={100}>
            <div className="glass-card" style={{ padding: 32 }}>
              <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: 18, marginBottom: 24 }}>Topic Distribution</div>
              <ResponsiveContainer width="100%" height={320}>
                <BarChart layout="vertical" data={TOPICS} margin={{ top: 0, right: 10, left: 20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="topicGrad" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="var(--cyan-600)" />
                      <stop offset="100%" stopColor="var(--cyan-400)" />
                    </linearGradient>
                  </defs>
                  <XAxis type="number" tick={{ fill: 'var(--text-muted)', fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis type="category" dataKey="topic" tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} axisLine={false} tickLine={false} width={85} />
                  <Tooltip content={<ChartTooltip />} />
                  <Bar dataKey="mentions" fill="url(#topicGrad)" radius={[0, 6, 6, 0]} name="Mentions" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Reveal>
          <Reveal delay={250}>
            <div className="glass-card" style={{ padding: 32 }}>
              <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: 18, marginBottom: 24 }}>Action Verbs — Radar</div>
              <ResponsiveContainer width="100%" height={320}>
                <RadarChart data={ACTION_VERBS}>
                  <PolarGrid stroke="var(--border-medium)" />
                  <PolarAngleAxis dataKey="verb" tick={{ fill: 'var(--text-secondary)', fontSize: 11 }} />
                  <PolarRadiusAxis tick={false} axisLine={false} domain={[0, 10]} />
                  <Radar name="Weight" dataKey="weight" stroke="var(--cyan-400)" fill="var(--cyan-400)" fillOpacity={0.15} strokeWidth={2} />
                </RadarChart>
              </ResponsiveContainer>
              <p style={{ fontSize: 12, color: 'var(--text-tertiary)', marginTop: 16, lineHeight: 1.5 }}>
                Execution-oriented commands dominate. "Send" and "Draft" lead the action vocabulary.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
