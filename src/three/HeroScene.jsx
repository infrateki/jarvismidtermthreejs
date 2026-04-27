import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import useTheme from '../hooks/useTheme';

const PARTICLE_COUNT = 500;
const LINE_MAX = 200;
const CHECK_COUNT = 80;
const FLOAT_BASE_Y = -6;

// Shared mutable ref so ConnectionLines reads Particles' live position array
// without scene traversal (single scene instance)
const sharedPos = { array: null };

function buildDarkColors() {
  const col = new Float32Array(PARTICLE_COUNT * 3);
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const r = Math.random();
    if (r > 0.9)      { col[i*3]=0;   col[i*3+1]=0.94; col[i*3+2]=1;    } // cyan   10%
    else if (r > 0.8) { col[i*3]=1;   col[i*3+1]=0.7;  col[i*3+2]=0.28; } // amber  10%
    else               { col[i*3]=0.3; col[i*3+1]=0.4;  col[i*3+2]=0.6;  } // grey   80%
  }
  return col;
}

function buildLightColors() {
  const col = new Float32Array(PARTICLE_COUNT * 3);
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const r = Math.random();
    if (r > 0.75)     { col[i*3]=0.03; col[i*3+1]=0.57; col[i*3+2]=0.7;  } // teal  25%
    else if (r > 0.5) { col[i*3]=0.88; col[i*3+1]=0.48; col[i*3+2]=0.37; } // peach 25%
    else               { col[i*3]=0.6;  col[i*3+1]=0.55; col[i*3+2]=0.5;  } // warm  50%
  }
  return col;
}

// ── Particles ──────────────────────────────────────────────────────────────
function Particles({ isDark }) {
  const ref = useRef();
  const velocities = useRef([]);
  const prevIsDark = useRef(null);

  const { positions, darkColors, lightColors } = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    const vels = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      pos[i*3]   = (Math.random() - 0.5) * 60;
      pos[i*3+1] = (Math.random() - 0.5) * 40;
      pos[i*3+2] = (Math.random() - 0.5) * 30;
      vels.push({
        x: (Math.random() - 0.5) * 0.008,
        y: (Math.random() - 0.5) * 0.008,
        z: (Math.random() - 0.5) * 0.005,
      });
    }
    velocities.current = vels;
    sharedPos.array = pos;
    return { positions: pos, darkColors: buildDarkColors(), lightColors: buildLightColors() };
  }, []);

  // Initial color buffer starts as a copy of darkColors
  const initColors = useMemo(() => new Float32Array(darkColors), [darkColors]);

  useFrame(() => {
    if (!ref.current) return;

    // Swap color buffer + material settings on theme change (not every frame)
    if (prevIsDark.current !== isDark) {
      prevIsDark.current = isDark;
      const src = isDark ? darkColors : lightColors;
      ref.current.geometry.attributes.color.array.set(src);
      ref.current.geometry.attributes.color.needsUpdate = true;
      ref.current.material.blending  = isDark ? THREE.AdditiveBlending : THREE.NormalBlending;
      ref.current.material.size      = isDark ? 1.8 : 2.2;
      ref.current.material.needsUpdate = true;
    }

    // Animate positions with boundary bounce
    const pos  = ref.current.geometry.attributes.position.array;
    const vels = velocities.current;
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      pos[i*3]   += vels[i].x;
      pos[i*3+1] += vels[i].y;
      pos[i*3+2] += vels[i].z;
      if (Math.abs(pos[i*3])   > 30) vels[i].x *= -1;
      if (Math.abs(pos[i*3+1]) > 20) vels[i].y *= -1;
      if (Math.abs(pos[i*3+2]) > 15) vels[i].z *= -1;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions,  3]} />
        <bufferAttribute attach="attributes-color"    args={[initColors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={isDark ? 1.8 : 2.2}
        vertexColors
        transparent
        opacity={0.8}
        depthWrite={false}
        blending={isDark ? THREE.AdditiveBlending : THREE.NormalBlending}
        sizeAttenuation
      />
    </points>
  );
}

// ── Connection Lines ────────────────────────────────────────────────────────
function ConnectionLines({ isDark }) {
  const ref = useRef();
  const linePositions = useMemo(() => new Float32Array(LINE_MAX * 6), []);

  useFrame(() => {
    if (!ref.current || !sharedPos.array) return;
    const pos = sharedPos.array;
    const lp  = ref.current.geometry.attributes.position.array;
    let idx = 0;
    outer: for (let i = 0; i < CHECK_COUNT; i++) {
      for (let j = i + 1; j < CHECK_COUNT; j++) {
        if (idx >= LINE_MAX) break outer;
        const dx = pos[i*3] - pos[j*3];
        const dy = pos[i*3+1] - pos[j*3+1];
        const dz = pos[i*3+2] - pos[j*3+2];
        if (dx*dx + dy*dy + dz*dz < 64) {
          lp[idx*6]   = pos[i*3];   lp[idx*6+1] = pos[i*3+1]; lp[idx*6+2] = pos[i*3+2];
          lp[idx*6+3] = pos[j*3];   lp[idx*6+4] = pos[j*3+1]; lp[idx*6+5] = pos[j*3+2];
          idx++;
        }
      }
    }
    ref.current.geometry.setDrawRange(0, idx * 2);
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <lineSegments ref={ref} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
      </bufferGeometry>
      <lineBasicMaterial
        color={isDark ? '#00F0FF' : '#0E7490'}
        transparent
        opacity={isDark ? 0.08 : 0.1}
        depthWrite={false}
        blending={isDark ? THREE.AdditiveBlending : THREE.NormalBlending}
      />
    </lineSegments>
  );
}

// ── Core Icosahedron ────────────────────────────────────────────────────────
function CoreGeometry({ isDark }) {
  const ref = useRef();
  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x += delta * 0.12;
    ref.current.rotation.y += delta * 0.08;
  });
  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[4, 1]} />
      <meshBasicMaterial
        color={isDark ? '#00F0FF' : '#0E7490'}
        wireframe transparent
        opacity={isDark ? 0.12 : 0.08}
        depthWrite={false}
      />
    </mesh>
  );
}

// ── Orbital Rings ───────────────────────────────────────────────────────────
function OrbitalRings({ isDark }) {
  const r1 = useRef();
  const r2 = useRef();
  useFrame((_, delta) => {
    if (r1.current) r1.current.rotation.z += delta * 0.05;
    if (r2.current) r2.current.rotation.z -= delta * 0.04;
  });
  return (
    <>
      <mesh ref={r1} rotation={[Math.PI / 2.5, 0, 0]}>
        <torusGeometry args={[12, 0.05, 8, 80]} />
        <meshBasicMaterial
          color={isDark ? '#00F0FF' : '#0E7490'}
          transparent opacity={isDark ? 0.15 : 0.1}
          depthWrite={false}
        />
      </mesh>
      <mesh ref={r2} rotation={[Math.PI / 3, Math.PI / 6, 0]}>
        <torusGeometry args={[16, 0.03, 8, 100]} />
        <meshBasicMaterial
          color={isDark ? '#FFB547' : '#E07A5F'}
          transparent opacity={isDark ? 0.08 : 0.06}
          depthWrite={false}
        />
      </mesh>
    </>
  );
}

// ── Floating Architectural Shapes (B4 + B5) ─────────────────────────────────
function FloatingShapes({ isDark }) {
  const torusRef = useRef();
  const octaRef  = useRef();
  const icoRef   = useRef();

  useFrame(({ clock }, delta) => {
    const t = clock.getElapsedTime();
    if (torusRef.current) {
      torusRef.current.rotation.x += delta * 0.1;
      torusRef.current.rotation.y += delta * 0.1;
      torusRef.current.rotation.z += delta * 0.1;
    }
    if (octaRef.current) {
      octaRef.current.rotation.x -= delta * 0.1;
      octaRef.current.rotation.y -= delta * 0.1;
      octaRef.current.rotation.z -= delta * 0.07;
    }
    if (icoRef.current) {
      icoRef.current.position.y = FLOAT_BASE_Y + Math.sin(t * 0.8) * 0.5;
      icoRef.current.rotation.y += delta * 0.08;
    }
  });

  return (
    <>
      {/* TorusKnot — r=2, tube=0.3, 100 tubular, 16 radial */}
      <mesh ref={torusRef} position={[-10, 5, -5]}>
        <torusKnotGeometry args={[2, 0.3, 100, 16]} />
        <meshBasicMaterial
          color={isDark ? '#00F0FF' : '#0E7490'}
          wireframe transparent opacity={isDark ? 0.08 : 0.1}
          depthWrite={false}
        />
      </mesh>

      {/* Octahedron — r=1.5, no detail */}
      <mesh ref={octaRef} position={[12, -4, -8]}>
        <octahedronGeometry args={[1.5, 0]} />
        <meshBasicMaterial
          color={isDark ? '#FFB547' : '#E07A5F'}
          wireframe transparent opacity={isDark ? 0.06 : 0.08}
          depthWrite={false}
        />
      </mesh>

      {/* Small Icosahedron — r=0.8, floating sine wave on Y */}
      <mesh ref={icoRef} position={[-8, FLOAT_BASE_Y, 5]}>
        <icosahedronGeometry args={[0.8, 1]} />
        <meshBasicMaterial
          color={isDark ? '#A855F7' : '#7A9E7E'}
          wireframe transparent opacity={0.06}
          depthWrite={false}
        />
      </mesh>
    </>
  );
}

// ── Scroll Camera ───────────────────────────────────────────────────────────
function ScrollCamera({ scrollProgress = 0 }) {
  useFrame(({ camera }) => {
    camera.position.y += ((-scrollProgress * 3) - camera.position.y) * 0.05;
    camera.rotation.x += ((scrollProgress * 0.1) - camera.rotation.x) * 0.05;
  });
  return null;
}

// ── HeroScene (default export) ──────────────────────────────────────────────
export default function HeroScene({ scrollProgress = 0 }) {
  const themeCtx = useTheme();
  const isDark = themeCtx ? themeCtx.isDark : true;

  if (typeof window !== 'undefined' && window.innerWidth < 640) return null;

  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
      <Canvas
        camera={{ position: [0, 0, 30], fov: 60, near: 0.1, far: 1000 }}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
        dpr={[1, 2]}
      >
        <ScrollCamera scrollProgress={scrollProgress} />
        <Particles        isDark={isDark} />
        <ConnectionLines  isDark={isDark} />
        <CoreGeometry     isDark={isDark} />
        <OrbitalRings     isDark={isDark} />
        <FloatingShapes   isDark={isDark} />
      </Canvas>
    </div>
  );
}
