import Reveal from '../components/Reveal';
import ChartTooltip from '../components/ChartTooltip';
import { SENTIMENT_OVERALL, SENTIMENT_COMPARISON } from '../data/sentiment';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function SentimentSection() {
  return (
    <section data-section="3" style={{ padding: '80px 0 120px' }}>
      <div className="container">
        <Reveal>
          <div className="section-label">Chapter III</div>
          <h2 className="section-heading" style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
            Sentiment <span className="glow-text">Pulse</span>
          </h2>
        </Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
          <Reveal delay={100}>
            <div className="glass-card" style={{ padding: 32 }}>
              <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: 18, marginBottom: 24 }}>Overall — 4,103 interactions</div>
              <ResponsiveContainer width="100%" height={240}>
                <PieChart>
                  <Pie data={SENTIMENT_OVERALL} cx="50%" cy="50%" innerRadius={55} outerRadius={90} paddingAngle={3} dataKey="value" stroke="none">
                    {SENTIMENT_OVERALL.map((d, i) => <Cell key={i} fill={d.color} />)}
                  </Pie>
                  <Tooltip content={<ChartTooltip />} />
                </PieChart>
              </ResponsiveContainer>
              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center', marginTop: 16 }}>
                {SENTIMENT_OVERALL.map((d, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--text-secondary)' }}>
                    <div style={{ width: 8, height: 8, borderRadius: 2, background: d.color }} />
                    {d.name} ({Math.round(d.value / 41)}%)
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={250}>
            <div className="glass-card" style={{ padding: 32 }}>
              <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: 18, marginBottom: 24 }}>Claude vs GPT-5.5</div>
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={SENTIMENT_COMPARISON} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <XAxis dataKey="name" tick={{ fill: 'rgba(200,214,229,0.35)', fontSize: 10 }} axisLine={{ stroke: 'rgba(0,240,255,0.08)' }} tickLine={false} />
                  <YAxis tick={{ fill: 'rgba(200,214,229,0.25)', fontSize: 10 }} axisLine={false} tickLine={false} />
                  <Tooltip content={<ChartTooltip />} />
                  <Bar dataKey="claude" fill="#00F0FF" radius={[4, 4, 0, 0]} name="Claude" />
                  <Bar dataKey="gpt" fill="#FFB547" radius={[4, 4, 0, 0]} name="GPT-5.5" />
                </BarChart>
              </ResponsiveContainer>
              <p style={{ fontSize: 12, color: 'var(--text-tertiary)', marginTop: 16, lineHeight: 1.5 }}>
                Anthropic carries relationship history. Frustration spikes cluster around tooling failures, not strategic misalignment.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
