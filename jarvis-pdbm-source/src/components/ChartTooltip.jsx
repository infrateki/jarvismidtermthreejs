export default function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: 'rgba(10,14,28,0.95)', border: '1px solid rgba(0,240,255,0.2)',
      borderRadius: 8, padding: '10px 14px', fontFamily: "'DM Sans', sans-serif",
      fontSize: 13, color: '#C8D6E5', backdropFilter: 'blur(10px)',
    }}>
      <div style={{ color: '#00F0FF', fontWeight: 600, marginBottom: 4 }}>
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
