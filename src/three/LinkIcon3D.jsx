import { useRef, useMemo, Suspense, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import useTheme from '../hooks/useTheme.jsx';

const ACCENT_COLORS = {
  cyan:   { dark: '#00F0FF', light: '#0891B2' },
  amber:  { dark: '#FFB547', light: '#D97706' },
  purple: { dark: '#A855F7', light: '#7C3AED' },
  green:  { dark: '#34D399', light: '#059669' },
};

function buildGeometry(type) {
  switch (type) {
    case 'cube':         return new THREE.BoxGeometry(1.1, 1.1, 1.1);
    case 'torus':        return new THREE.TorusGeometry(0.7, 0.25, 16, 48);
    case 'octahedron':   return new THREE.OctahedronGeometry(0.95, 0);
    case 'knot':         return new THREE.TorusKnotGeometry(0.55, 0.18, 80, 12);
    case 'sphere':       return new THREE.SphereGeometry(0.9, 24, 16);
    case 'tetrahedron':  return new THREE.TetrahedronGeometry(1.05, 0);
    case 'dodecahedron': return new THREE.DodecahedronGeometry(0.95, 0);
    case 'icosahedron':  return new THREE.IcosahedronGeometry(0.95, 0);
    default:             return new THREE.OctahedronGeometry(0.95, 0);
  }
}

function Glyph({ type, color, hovered }) {
  const groupRef = useRef();
  const geometry = useMemo(() => buildGeometry(type), [type]);
  const edgesGeo = useMemo(() => new THREE.EdgesGeometry(geometry), [geometry]);

  useFrame((_, dt) => {
    if (!groupRef.current) return;
    const speed = hovered ? 1.6 : 0.45;
    groupRef.current.rotation.x += dt * speed * 0.7;
    groupRef.current.rotation.y += dt * speed;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.6}>
      <group ref={groupRef}>
        <mesh geometry={geometry}>
          <meshBasicMaterial color={color} wireframe transparent opacity={0.55} />
        </mesh>
        <lineSegments geometry={edgesGeo}>
          <lineBasicMaterial color={color} transparent opacity={0.95} />
        </lineSegments>
        <mesh geometry={geometry} scale={0.7}>
          <meshBasicMaterial color={color} transparent opacity={0.12} depthWrite={false} />
        </mesh>
      </group>
    </Float>
  );
}

function useIsCoarsePointer() {
  const [coarse, setCoarse] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(pointer: coarse), (max-width: 640px)');
    setCoarse(mq.matches);
    const onChange = (e) => setCoarse(e.matches);
    mq.addEventListener?.('change', onChange);
    return () => mq.removeEventListener?.('change', onChange);
  }, []);
  return coarse;
}

function StaticGlyph({ type, color }) {
  const paths = {
    cube:         <rect x="14" y="14" width="36" height="36" rx="2" />,
    torus:        <circle cx="32" cy="32" r="16" />,
    octahedron:   <polygon points="32,10 54,32 32,54 10,32" />,
    knot:         <path d="M14 32 C14 18, 50 18, 50 32 C50 46, 14 46, 14 32 M22 22 L42 42 M22 42 L42 22" />,
    sphere:       <g><circle cx="32" cy="32" r="18" /><ellipse cx="32" cy="32" rx="18" ry="7" /><line x1="14" y1="32" x2="50" y2="32" /></g>,
    tetrahedron:  <polygon points="32,10 54,50 10,50" />,
    dodecahedron: <polygon points="32,10 52,22 48,46 16,46 12,22" />,
    icosahedron:  <g><polygon points="32,10 54,32 32,54 10,32" /><line x1="32" y1="10" x2="32" y2="54" /><line x1="10" y1="32" x2="54" y2="32" /></g>,
  };
  return (
    <svg viewBox="0 0 64 64" width="56" height="56"
      style={{ overflow: 'visible' }}
      fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round">
      {paths[type] || paths.octahedron}
    </svg>
  );
}

export default function LinkIcon3D({ type = 'octahedron', accent = 'cyan', hovered = false }) {
  const { isDark } = useTheme();
  const coarse = useIsCoarsePointer();
  const palette = ACCENT_COLORS[accent] || ACCENT_COLORS.cyan;
  const color = isDark ? palette.dark : palette.light;

  if (coarse) {
    return (
      <div style={{ width: 64, height: 64, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <StaticGlyph type={type} color={color} />
      </div>
    );
  }

  return (
    <div style={{ width: 80, height: 80, pointerEvents: 'none' }}>
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 3.4], fov: 40 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <Glyph type={type} color={color} hovered={hovered} />
        </Suspense>
      </Canvas>
    </div>
  );
}
