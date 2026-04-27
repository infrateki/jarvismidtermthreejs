import Reveal from '../components/Reveal';
import ChartTooltip from '../components/ChartTooltip';
import { SENTIMENT_OVERALL, SENTIMENT_COMPARISON } from '../data/sentiment';
import { DAILY_SENTIMENT } from '../data/sentiment-daily';
import { PieChart, Pie, Cell, BarChart, Bar, AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const SENTIMENT_COLORS = {
  Productive: 'var(--cyan-400)',
  Neutral: '#3A4A6B',
  Frustrated: 'var(--red-400)',
  Exploratory: 'var(--amber-400)',
};

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
                    {SENTIMENT_OVERALL.map((d, i) => <Cell key={i} fill={SENTIMENT_COLORS[d.name] || d.color} />)}
                  </Pie>
                  <Tooltip content={<ChartTooltip />} />
                </PieChart>
              </ResponsiveContainer>
              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center', marginTop: 16 }}>
                {SENTIMENT_OVERALL.map((d, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--text-secondary)' }}>
                    <div style={{ width: 8, height: 8, borderRadius: 2, background: SENTIMENT_COLORS[d.name] || d.color }} />
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
                  <XAxis dataKey="name" tick={{ fill: 'var(--text-tertiary)', fontSize: 10 }} axisLine={{ stroke: 'var(--border-subtle)' }} tickLine={false} />
                  <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 10 }} axisLine={false} tickLine={false} />
                  <Tooltip content={<ChartTooltip />} />
                  <Bar dataKey="claude" fill="var(--cyan-400)" radius={[4, 4, 0, 0]} name="Claude" />
                  <Bar dataKey="gpt" fill="var(--amber-400)" radius={[4, 4, 0, 0]} name="GPT-5.5" />
                </BarChart>
              </ResponsiveContainer>
              <p style={{ fontSize: 12, color: 'var(--text-tertiary)', marginTop: 16, lineHeight: 1.5 }}>
                Anthropic carries relationship history. Frustration spikes cluster around tooling failures, not strategic misalignment.
              </p>
            </div>
          </Reveal>
        </div>
        <Reveal delay={400}>
          <div style={{ marginTop: 24 }}>
            <div className="glass-card" style={{ padding: 32 }}>
              <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: 18, marginBottom: 24 }}>Daily Sentiment — April</div>
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={DAILY_SENTIMENT} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="prodGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--cyan-400)" stopOpacity={0.5} />
                      <stop offset="100%" stopColor="var(--cyan-400)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="neutGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3A4A6B" stopOpacity={0.5} />
                      <stop offset="100%" stopColor="#3A4A6B" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="frustGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--red-400)" stopOpacity={0.5} />
                      <stop offset="100%" stopColor="var(--red-400)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="explorGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--amber-400)" stopOpacity={0.5} />
                      <stop offset="100%" stopColor="var(--amber-400)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="date" tick={{ fill: 'var(--text-muted)', fontSize: 9 }} axisLine={{ stroke: 'var(--border-subtle)' }} tickLine={false} />
                  <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 10 }} axisLine={false} tickLine={false} />
                  <Tooltip content={<ChartTooltip />} />
                  <Area type="monotone" dataKey="neutral" name="Neutral" stroke="#3A4A6B" strokeWidth={1.5} fill="url(#neutGrad)" dot={false} stackId="s" />
                  <Area type="monotone" dataKey="productive" name="Productive" stroke="var(--cyan-400)" strokeWidth={1.5} fill="url(#prodGrad)" dot={false} stackId="s" />
                  <Area type="monotone" dataKey="exploratory" name="Exploratory" stroke="var(--amber-400)" strokeWidth={1.5} fill="url(#explorGrad)" dot={false} stackId="s" />
                  <Area type="monotone" dataKey="frustrated" name="Frustrated" stroke="var(--red-400)" strokeWidth={1.5} fill="url(#frustGrad)" dot={false} stackId="s" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
