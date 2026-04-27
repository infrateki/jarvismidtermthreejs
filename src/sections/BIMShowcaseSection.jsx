import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Reveal from '../components/Reveal';
import BIMBuilding from '../three/BIMBuilding';

const STATS = [
  { label: '12 Portals' },
  { label: '$500M Pipeline' },
  { label: '3-Tier Scoring' },
];

function StatPill({ label }) {
  return (
    <span style={{
      padding: '6px 14px',
      border: '1px solid rgba(0,240,255,0.2)',
      borderRadius: 20,
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: 11,
      letterSpacing: 2,
      textTransform: 'uppercase',
      color: 'rgba(0,240,255,0.7)',
      background: 'rgba(0,240,255,0.05)',
    }}>
      {label}
    </span>
  );
}

export default function BIMShowcaseSection() {
  return (
    <section
      data-section="15"
      aria-label="BIM Intelligence in 3D"
      style={{ padding: '120px 0' }}
    >
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 64,
          alignItems: 'center',
        }}
          className="bim-grid"
        >
          {/* Left: text */}
          <Reveal>
            <div>
              <div className="section-label">Three.JS Showcase</div>
              <h2 className="section-heading" style={{ fontSize: 'clamp(36px, 5vw, 64px)', marginBottom: 24 }}>
                <span className="glow-text">BIM</span>{' '}
                <span style={{ color: 'var(--text-primary)' }}>Intelligence in 3D</span>
              </h2>
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 16,
                lineHeight: 1.75,
                color: 'var(--text-secondary)',
                marginBottom: 32,
                maxWidth: 440,
              }}>
                Jarvis processes building information models, airport terminal designs,
                and infrastructure data. This procedural BIM visualization demonstrates
                the Three.js rendering capabilities powering the Jarvis visual layer.
              </p>
              <div style={{ display: 'inline-flex', flexWrap: 'wrap', gap: 10 }}>
                {STATS.map(s => <StatPill key={s.label} label={s.label} />)}
              </div>
            </div>
          </Reveal>

          {/* Right: 3D canvas */}
          <div style={{ width: '100%', aspectRatio: '4/3', minHeight: 300 }} className="bim-canvas-wrap">
            <Canvas
              camera={{ position: [15, 10, 15], fov: 45, near: 0.1, far: 1000 }}
              gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
              dpr={[1, 2]}
              style={{ width: '100%', height: '100%' }}
            >
              <ambientLight intensity={0.5} />
              <directionalLight position={[10, 15, 10]} intensity={0.8} />
              <Suspense fallback={null}>
                <BIMBuilding />
              </Suspense>
              <OrbitControls
                enableZoom={false}
                autoRotate
                autoRotateSpeed={0.5}
                enablePan={false}
                minPolarAngle={Math.PI / 6}
                maxPolarAngle={Math.PI / 2.2}
              />
            </Canvas>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .bim-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          .bim-canvas-wrap {
            aspect-ratio: auto !important;
            height: 300px !important;
          }
        }
      `}</style>
    </section>
  );
}
