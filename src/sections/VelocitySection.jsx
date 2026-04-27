import Reveal from '../components/Reveal';
import ChartTooltip from '../components/ChartTooltip';
import { DAILY_MESSAGES } from '../data/daily-messages';
import { ERA_VOLUME } from '../data/era-volume';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function VelocitySection() {
  return (
    <section data-section="2" style={{ padding: '80px 0 120px' }}>
      <div className="container">
        <Reveal>
          <div className="section-label">Signal Density</div>
          <h2 className="section-heading" style={{ fontSize: 'clamp(28px, 4vw, 48px)', marginBottom: 12 }}>
            Daily Message <span className="glow-text">Velocity</span>
          </h2>
          <p style={{ color: 'var(--text-tertiary)', marginBottom: 48, maxWidth: 500, lineHeight: 1.6 }}>
            75 days of interaction. Peak: 1,078 messages on April 25 — GPT-5.5 migration day.
          </p>
        </Reveal>
        <Reveal delay={200}>
          <div className="glass-card" style={{ padding: '32px 16px 16px' }}>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={DAILY_MESSAGES} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="msgGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--cyan-400)" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="var(--cyan-400)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" tick={{ fill: 'var(--text-muted)', fontSize: 10 }} axisLine={{ stroke: 'var(--border-subtle)' }} tickLine={false} />
                <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip content={<ChartTooltip />} />
                <Area type="monotone" dataKey="messages" stroke="var(--cyan-400)" strokeWidth={2} fill="url(#msgGrad)" dot={false} activeDot={{ r: 4, fill: 'var(--cyan-400)', stroke: 'var(--bg-primary)', strokeWidth: 2 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Reveal>
        <Reveal delay={350}>
          <div style={{ marginTop: 24 }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--text-tertiary)', marginBottom: 16 }}>
              Anthropic vs OpenAI — Model Era Volume
            </div>
            <div className="glass-card" style={{ padding: '32px 16px 16px' }}>
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={ERA_VOLUME} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="anthropicGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--cyan-400)" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="var(--cyan-400)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="openaiGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--amber-400)" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="var(--amber-400)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="date" tick={{ fill: 'var(--text-muted)', fontSize: 9 }} axisLine={{ stroke: 'var(--border-subtle)' }} tickLine={false} />
                  <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 10 }} axisLine={false} tickLine={false} />
                  <Tooltip content={<ChartTooltip />} />
                  <Area type="monotone" dataKey="anthropic" name="Anthropic" stroke="var(--cyan-400)" strokeWidth={2} fill="url(#anthropicGrad)" dot={false} activeDot={{ r: 4, fill: 'var(--cyan-400)', stroke: 'var(--bg-primary)', strokeWidth: 2 }} stackId="era" />
                  <Area type="monotone" dataKey="openai" name="OpenAI" stroke="var(--amber-400)" strokeWidth={2} fill="url(#openaiGrad)" dot={false} activeDot={{ r: 4, fill: 'var(--amber-400)', stroke: 'var(--bg-primary)', strokeWidth: 2 }} stackId="era" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
