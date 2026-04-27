export default function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: 'var(--bg-glass)', border: '1px solid var(--border-medium)',
      borderRadius: 8, padding: '10px 14px', fontFamily: "'DM Sans', sans-serif",
      fontSize: 13, color: 'var(--text-primary)', backdropFilter: 'blur(10px)',
    }}>
      <div style={{ color: 'var(--cyan-400)', fontWeight: 600, marginBottom: 4 }}>
        {label || payload[0]?.name}
      </div>
      {payload.map((p, i) => (
        <div key={i} style={{ color: p.color || '#fff' }}>
          {p.name}: <strong>{p.value?.toLocaleString()}</strong>
        </div>
      ))}
    </div>
  );
}
