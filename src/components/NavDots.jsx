import { SECTIONS } from '../data/meta';

const dotSize = SECTIONS.length > 10 ? 6 : 8;

export default function NavDots({ activeIndex, onNavigate }) {
  return (
    <div className="hide-mobile" style={{
      position: 'fixed', right: 20, top: '50%', transform: 'translateY(-50%)',
      display: 'flex', flexDirection: 'column', gap: 10, zIndex: 100,
    }}>
      {SECTIONS.map((s, i) => (
        <button
          key={s.id}
          className={`nav-dot ${activeIndex === i ? 'active' : ''}`}
          title={s.label}
          onClick={() => onNavigate(i)}
          aria-label={`Navigate to ${s.label}`}
          style={{ width: dotSize, height: dotSize }}
        />
      ))}
    </div>
  );
}
