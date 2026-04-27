import Reveal from './Reveal';

export default function SectionHeader({ label, children }) {
  return (
    <Reveal>
      <div className="section-label">{label}</div>
      <h2
        className="section-heading"
        style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}
      >
        {children}
      </h2>
    </Reveal>
  );
}
