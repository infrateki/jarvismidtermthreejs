import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, Float } from '@react-three/drei';
import * as THREE from 'three';
import useTheme from '../hooks/useTheme';

const PARTICLE_COUNT = 500;
const LINE_MAX = 200;
const CHECK_COUNT = 80;

const sharedPos = { array: null };

function buildDarkColors() {
  const col = new Float32Array(PARTICLE_COUNT * 3);
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const r = Math.random();
    if (r > 0.9)      { col[i*3]=0;   col[i*3+1]=0.94; col[i*3+2]=1;    }
    else if (r > 0.8) { col[i*3]=1;   col[i*3+1]=0.7;  col[i*3+2]=0.28; }
    else               { col[i*3]=0.3; col[i*3+1]=0.4;  col[i*3+2]=0.6;  }
  }
  return col;
}

function buildLightColors() {
  const col = new Float32Array(PARTICLE_COUNT * 3);
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const r = Math.random();
    if (r > 0.75)     { col[i*3]=0.03; col[i*3+1]=0.57; col[i*3+2]=0.7;  }
    else if (r > 0.5) { col[i*3]=0.88; col[i*3+1]=0.48; col[i*3+2]=0.37; }
    else               { col[i*3]=0.6;  col[i*3+1]=0.55; col[i*3+2]=0.5;  }
  }
  return col;
}

// Soft circular particle texture
function makeParticleTexture() {
  const c = document.createElement('canvas');
  c.width = 64; c.height = 64;
  const ctx = c.getContext('2d');
  const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 28);
  g.addColorStop(0,   'rgba(255,255,255,1)');
  g.addColorStop(0.4, 'rgba(255,255,255,0.6)');
  g.addColorStop(1,   'rgba(255,255,255,0)');
  ctx.beginPath();
  ctx.arc(32, 32, 28, 0, Math.PI * 2);
  ctx.fillStyle = g;
  ctx.fill();
  return new THREE.CanvasTexture(c);
}

// ── Particles ──────────────────────────────────────────────────────────────
function Particles({ isDark }) {
  const ref = useRef();
  const velocities = useRef([]);
  const prevIsDark = useRef(null);

  const { positions, darkColors, lightColors, tex } = useMemo(() => {
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
    return { positions: pos, darkColors: buildDarkColors(), lightColors: buildLightColors(), tex: makeParticleTexture() };
  }, []);

  const initColors = useMemo(() => new Float32Array(darkColors), [darkColors]);

  useFrame(() => {
    if (!ref.current) return;
    if (prevIsDark.current !== isDark) {
      prevIsDark.current = isDark;
      const src = isDark ? darkColors : lightColors;
      ref.current.geometry.attributes.color.array.set(src);
      ref.current.geometry.attributes.color.needsUpdate = true;
      ref.current.material.blending = isDark ? THREE.AdditiveBlending : THREE.NormalBlending;
      ref.current.material.size = isDark ? 2 : 2.5;
      ref.current.material.needsUpdate = true;
    }
    const pos = ref.current.geometry.attributes.position.array;
    const vels = velocities.current;
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      pos[i*3] += vels[i].x; pos[i*3+1] += vels[i].y; pos[i*3+2] += vels[i].z;
      if (Math.abs(pos[i*3]) > 30) vels[i].x *= -1;
      if (Math.abs(pos[i*3+1]) > 20) vels[i].y *= -1;
      if (Math.abs(pos[i*3+2]) > 15) vels[i].z *= -1;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[initColors, 3]} />
      </bufferGeometry>
      <pointsMaterial map={tex} size={isDark ? 2 : 2.5} vertexColors transparent opacity={0.85} depthWrite={false} blending={isDark ? THREE.AdditiveBlending : THREE.NormalBlending} sizeAttenuation alphaTest={0.01} />
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
    const lp = ref.current.geometry.attributes.position.array;
    let idx = 0;
    outer: for (let i = 0; i < CHECK_COUNT; i++) {
      for (let j = i + 1; j < CHECK_COUNT; j++) {
        if (idx >= LINE_MAX) break outer;
        const dx = pos[i*3]-pos[j*3], dy = pos[i*3+1]-pos[j*3+1], dz = pos[i*3+2]-pos[j*3+2];
        if (dx*dx + dy*dy + dz*dz < 64) {
          lp[idx*6]=pos[i*3]; lp[idx*6+1]=pos[i*3+1]; lp[idx*6+2]=pos[i*3+2];
          lp[idx*6+3]=pos[j*3]; lp[idx*6+4]=pos[j*3+1]; lp[idx*6+5]=pos[j*3+2];
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
      <lineBasicMaterial color={isDark ? '#00F0FF' : '#0E7490'} transparent opacity={isDark ? 0.08 : 0.12} depthWrite={false} blending={isDark ? THREE.AdditiveBlending : THREE.NormalBlending} />
    </lineSegments>
  );
}

// ── Chrome Torus Knot (centerpiece) ─────────────────────────────────────────
function ChromeKnot({ isDark }) {
  const ref = useRef();
  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x += delta * 0.06;
    ref.current.rotation.y += delta * 0.08;
  });
  return (
    <Float speed={1} floatIntensity={0.3}>
      <mesh ref={ref}>
        <torusKnotGeometry args={[3, 0.8, 200, 32]} />
        <meshStandardMaterial metalness={1} roughness={0.05} color={isDark ? '#88ccff' : '#0E7490'} envMapIntensity={2} />
      </mesh>
    </Float>
  );
}

// ── Glass Orbiting Shape (safe version — no MeshTransmissionMaterial) ────────
function GlassOrbit({ isDark }) {
  const ref = useRef();
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime() * 0.3;
    ref.current.position.x = Math.cos(t) * 6;
    ref.current.position.z = Math.sin(t) * 6;
    ref.current.position.y = Math.sin(t * 0.7) * 2;
    ref.current.rotation.x += 0.005;
    ref.current.rotation.y += 0.008;
  });
  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[1.8, 2]} />
      <meshPhysicalMaterial
        transmission={0.92}
        thickness={0.5}
        roughness={0.08}
        metalness={0}
        ior={1.5}
        color={isDark ? '#00F0FF' : '#0891B2'}
        envMapIntensity={1.5}
        transparent
      />
    </mesh>
  );
}

// ── Metallic Floating Shapes ────────────────────────────────────────────────
function MetallicShapes({ isDark }) {
  const octaRef = useRef(), dodecRef = useRef(), tetraRef = useRef();

  useFrame(({ clock }, delta) => {
    const t = clock.getElapsedTime();
    if (octaRef.current) {
      octaRef.current.rotation.x += delta * 0.15;
      octaRef.current.rotation.y += delta * 0.12;
      octaRef.current.position.y = 4 + Math.sin(t * 0.6) * 0.6;
    }
    if (dodecRef.current) {
      dodecRef.current.rotation.x -= delta * 0.1;
      dodecRef.current.rotation.y -= delta * 0.13;
    }
    if (tetraRef.current) {
      tetraRef.current.rotation.x += delta * 0.18;
      tetraRef.current.rotation.z += delta * 0.12;
    }
  });

  return (
    <>
      <mesh ref={octaRef} position={[-8, 4, -6]}>
        <octahedronGeometry args={[1.2, 0]} />
        <meshStandardMaterial metalness={1} roughness={0.1} color="#FFB547" envMapIntensity={1.5} />
      </mesh>
      <mesh ref={dodecRef} position={[9, -3, -4]}>
        <dodecahedronGeometry args={[0.8, 0]} />
        <meshStandardMaterial metalness={0.9} roughness={0.15} color="#A855F7" envMapIntensity={1.5} />
      </mesh>
      <mesh ref={tetraRef} position={[-5, -5, 3]}>
        <tetrahedronGeometry args={[1, 0]} />
        <meshStandardMaterial metalness={1} roughness={0} color={isDark ? '#00F0FF' : '#0891B2'} envMapIntensity={2} />
      </mesh>
    </>
  );
}

// ── Metallic Orbital Rings ──────────────────────────────────────────────────
function OrbitalRings({ isDark }) {
  const r1 = useRef(), r2 = useRef();
  useFrame((_, delta) => {
    if (r1.current) r1.current.rotation.z += delta * 0.05;
    if (r2.current) r2.current.rotation.z -= delta * 0.04;
  });
  return (
    <>
      <mesh ref={r1} rotation={[Math.PI / 2.5, 0, 0]}>
        <torusGeometry args={[12, 0.12, 16, 100]} />
        <meshStandardMaterial metalness={0.8} roughness={0.2} color={isDark ? '#00F0FF' : '#0E7490'} transparent opacity={0.4} depthWrite={false} />
      </mesh>
      <mesh ref={r2} rotation={[Math.PI / 3, Math.PI / 6, 0]}>
        <torusGeometry args={[16, 0.08, 16, 120]} />
        <meshStandardMaterial metalness={0.8} roughness={0.2} color={isDark ? '#FFB547' : '#E07A5F'} transparent opacity={0.3} depthWrite={false} />
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

// ── Tone Mapping Setup (applied after Canvas init) ──────────────────────────
function ToneMapper({ isDark }) {
  const { gl } = useThree();
  gl.toneMapping = THREE.ACESFilmicToneMapping;
  gl.toneMappingExposure = isDark ? 1.0 : 0.8;
  return null;
}

// ── HeroScene ───────────────────────────────────────────────────────────────
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
        <ToneMapper isDark={isDark} />
        <Environment preset="city" background={false} />
        <ambientLight intensity={0.3} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#00F0FF" />

        <ScrollCamera scrollProgress={scrollProgress} />
        <Particles isDark={isDark} />
        <ConnectionLines isDark={isDark} />
        <ChromeKnot isDark={isDark} />
        <GlassOrbit isDark={isDark} />
        <MetallicShapes isDark={isDark} />
        <OrbitalRings isDark={isDark} />
      </Canvas>
    </div>
  );
}
