import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import useTheme from '../hooks/useTheme';

// PlaneGeometry(30, 0.5, 100, 1) — 101×2 vertices, X from -15 to +15
// Each frame: set vertex Y = sin(x * 2 + time) * 0.1
// X values are never modified so they remain the original geometry X positions.
function WavePlane({ isDark }) {
  const ref = useRef();

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const pos = ref.current.geometry.attributes.position.array;
    const t   = clock.getElapsedTime();
    const count = pos.length / 3;
    for (let i = 0; i < count; i++) {
      const x = pos[i * 3]; // original X — never overwritten
      pos[i * 3 + 1] = Math.sin(x * 2 + t * 1.5) * 0.1;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <mesh ref={ref}>
      <planeGeometry args={[30, 0.5, 100, 1]} />
      <meshBasicMaterial
        color={isDark ? '#00F0FF' : '#0E7490'}
        wireframe
        transparent
        opacity={isDark ? 0.35 : 0.25}
        depthWrite={false}
        blending={isDark ? THREE.AdditiveBlending : THREE.NormalBlending}
      />
    </mesh>
  );
}

export default function SectionDivider() {
  const themeCtx = useTheme();
  const isDark = themeCtx ? themeCtx.isDark : true;

  return (
    <div style={{ width: '100%', height: 80, overflow: 'hidden' }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50, near: 0.1, far: 100 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 1.5]}
        style={{ width: '100%', height: '100%' }}
      >
        <WavePlane isDark={isDark} />
      </Canvas>
    </div>
  );
}
