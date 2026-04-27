import Reveal from '../components/Reveal';
import ChartTooltip from '../components/ChartTooltip';
import { DAILY_MESSAGES } from '../data/daily-messages';
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
                    <stop offset="0%" stopColor="#00F0FF" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#00F0FF" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" tick={{ fill: 'rgba(200,214,229,0.25)', fontSize: 10 }} axisLine={{ stroke: 'rgba(0,240,255,0.08)' }} tickLine={false} />
                <YAxis tick={{ fill: 'rgba(200,214,229,0.25)', fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip content={<ChartTooltip />} />
                <Area type="monotone" dataKey="messages" stroke="#00F0FF" strokeWidth={2} fill="url(#msgGrad)" dot={false} activeDot={{ r: 4, fill: '#00F0FF', stroke: '#060A18', strokeWidth: 2 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
