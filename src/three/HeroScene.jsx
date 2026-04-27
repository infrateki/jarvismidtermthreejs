import { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, Float, Text3D, Center } from '@react-three/drei';
import * as THREE from 'three';
import useTheme from '../hooks/useTheme';

const PARTICLE_COUNT = 600;
const LINE_MAX = 300;
const CHECK_COUNT = 100;
const sharedPos = { array: null };
const FONT_URL = 'https://cdn.jsdelivr.net/npm/three@0.170.0/examples/fonts/helvetiker_bold.typeface.json';

function buildDarkColors() {
  const col = new Float32Array(PARTICLE_COUNT * 3);
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const r = Math.random();
    if (r > 0.85)     { col[i*3]=0;   col[i*3+1]=0.94; col[i*3+2]=1;    } // cyan 15%
    else if (r > 0.75){ col[i*3]=1;   col[i*3+1]=0.7;  col[i*3+2]=0.28; } // amber 10%
    else if (r > 0.7) { col[i*3]=0.65;col[i*3+1]=0.23; col[i*3+2]=0.97; } // purple 5%
    else               { col[i*3]=0.25;col[i*3+1]=0.35; col[i*3+2]=0.55; } // steel 70%
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

function makeParticleTexture() {
  const c = document.createElement('canvas');
  c.width = 64; c.height = 64;
  const ctx = c.getContext('2d');
  const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 28);
  g.addColorStop(0, 'rgba(255,255,255,1)');
  g.addColorStop(0.3, 'rgba(255,255,255,0.7)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.beginPath(); ctx.arc(32, 32, 28, 0, Math.PI * 2);
  ctx.fillStyle = g; ctx.fill();
  return new THREE.CanvasTexture(c);
}

// ── 3D Chrome JARVIS Text + Wireframe Edge Overlay ──────────────────────────
function JarvisText({ isDark }) {
  const groupRef = useRef();
  const edgeRef = useRef();

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    groupRef.current.rotation.y = Math.sin(t * 0.12) * 0.2;
    groupRef.current.rotation.x = Math.sin(t * 0.08) * 0.06;
    groupRef.current.rotation.z = Math.cos(t * 0.1) * 0.025;
  });

  return (
    <Float speed={0.6} floatIntensity={0.5} rotationIntensity={0.05}>
      <group ref={groupRef} position={[0, 2, 0]}>
        <Center>
          {/* Solid chrome text */}
          <Text3D
            font={FONT_URL}
            size={5}
            height={2.2}
            bevelEnabled
            bevelThickness={0.2}
            bevelSize={0.1}
            bevelSegments={10}
            curveSegments={32}
            letterSpacing={0.4}
          >
            JARVIS
            <meshStandardMaterial
              metalness={1}
              roughness={0.02}
              color={isDark ? '#aaccff' : '#0E7490'}
              envMapIntensity={3}
            />
          </Text3D>
        </Center>
      </group>
    </Float>
  );
}

// ── Wireframe BIM Grid Floor ────────────────────────────────────────────────
function BIMGrid({ isDark }) {
  const ref = useRef();
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.z += delta * 0.008;
  });
  return (
    <group ref={ref} position={[0, -8, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <gridHelper
        args={[60, 30, isDark ? '#00F0FF' : '#0E7490', isDark ? 'rgba(0,240,255,0.06)' : 'rgba(14,116,144,0.08)']}
        rotation={[Math.PI / 2, 0, 0]}
        material-transparent={true}
        material-opacity={isDark ? 0.15 : 0.2}
      />
    </group>
  );
}

// ── Wireframe Construction Frame (BIM bounding box) ─────────────────────────
function ConstructionFrame({ isDark }) {
  const ref = useRef();
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.rotation.y = t * 0.02;
    ref.current.rotation.x = Math.sin(t * 0.05) * 0.03;
  });

  const edgeColor = isDark ? '#00F0FF' : '#0E7490';
  const edgeOpacity = isDark ? 0.12 : 0.18;

  return (
    <group ref={ref} position={[0, 1, 0]}>
      {/* Large wireframe box — like BIM bounding volume */}
      <mesh>
        <boxGeometry args={[22, 10, 14]} />
        <meshBasicMaterial color={edgeColor} wireframe transparent opacity={edgeOpacity * 0.5} depthWrite={false} />
      </mesh>
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(22, 10, 14)]} />
        <lineBasicMaterial color={edgeColor} transparent opacity={edgeOpacity} />
      </lineSegments>
      {/* Inner frame — structural grid */}
      <lineSegments position={[0, 0, 0]}>
        <edgesGeometry args={[new THREE.BoxGeometry(16, 7, 10)]} />
        <lineBasicMaterial color={edgeColor} transparent opacity={edgeOpacity * 0.7} />
      </lineSegments>
    </group>
  );
}

// ── Wireframe Architectural Elements (columns, beams) ───────────────────────
function ArchitecturalElements({ isDark }) {
  const groupRef = useRef();
  useFrame(({ clock }) => {
    if (groupRef.current) groupRef.current.rotation.y = clock.getElapsedTime() * 0.015;
  });

  const wireColor = isDark ? '#00F0FF' : '#0E7490';
  const wireOp = isDark ? 0.1 : 0.15;

  // Column positions (like a structural grid)
  const columns = [
    [-9, -3, -5], [-9, -3, 5], [9, -3, -5], [9, -3, 5],
    [-9, -3, 0], [9, -3, 0],
  ];

  return (
    <group ref={groupRef}>
      {/* Wireframe columns */}
      {columns.map((pos, i) => (
        <group key={i} position={pos}>
          <lineSegments>
            <edgesGeometry args={[new THREE.CylinderGeometry(0.2, 0.2, 10, 8)]} />
            <lineBasicMaterial color={wireColor} transparent opacity={wireOp} />
          </lineSegments>
        </group>
      ))}
      {/* Horizontal beam wireframes */}
      <lineSegments position={[0, 2, -5]}>
        <edgesGeometry args={[new THREE.BoxGeometry(18, 0.3, 0.3)]} />
        <lineBasicMaterial color={wireColor} transparent opacity={wireOp * 0.8} />
      </lineSegments>
      <lineSegments position={[0, 2, 5]}>
        <edgesGeometry args={[new THREE.BoxGeometry(18, 0.3, 0.3)]} />
        <lineBasicMaterial color={wireColor} transparent opacity={wireOp * 0.8} />
      </lineSegments>
      <lineSegments position={[0, 2, 0]}>
        <edgesGeometry args={[new THREE.BoxGeometry(18, 0.3, 0.3)]} />
        <lineBasicMaterial color={wireColor} transparent opacity={wireOp * 0.6} />
      </lineSegments>
    </group>
  );
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
      pos[i*3] = (Math.random() - 0.5) * 60;
      pos[i*3+1] = (Math.random() - 0.5) * 40;
      pos[i*3+2] = (Math.random() - 0.5) * 30;
      vels.push({ x: (Math.random()-0.5)*0.008, y: (Math.random()-0.5)*0.008, z: (Math.random()-0.5)*0.005 });
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
      ref.current.geometry.attributes.color.array.set(isDark ? darkColors : lightColors);
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
        if (dx*dx + dy*dy + dz*dz < 80) { // increased threshold for more lines
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
      <bufferGeometry><bufferAttribute attach="attributes-position" args={[linePositions, 3]} /></bufferGeometry>
      <lineBasicMaterial color={isDark ? '#00F0FF' : '#0E7490'} transparent opacity={isDark ? 0.1 : 0.14} depthWrite={false} blending={isDark ? THREE.AdditiveBlending : THREE.NormalBlending} />
    </lineSegments>
  );
}

// ── Chrome Sphere (orbiting mirror ball) ────────────────────────────────────
function ChromeSphere({ isDark }) {
  const ref = useRef();
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * 0.2;
    ref.current.position.x = Math.cos(t) * 10;
    ref.current.position.z = Math.sin(t) * 10;
    ref.current.position.y = Math.sin(t * 0.6) * 3 + 1;
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[1.2, 64, 64]} />
      <meshStandardMaterial metalness={1} roughness={0} color={isDark ? '#ffffff' : '#aabbcc'} envMapIntensity={3} />
    </mesh>
  );
}

// ── Glass Orbiting Icosahedron ──────────────────────────────────────────────
function GlassOrbit({ isDark }) {
  const ref = useRef();
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * 0.18;
    ref.current.position.x = Math.cos(t + Math.PI) * 9;
    ref.current.position.z = Math.sin(t + Math.PI) * 9;
    ref.current.position.y = Math.sin(t * 0.5) * 2 + 3;
    ref.current.rotation.x += 0.005;
    ref.current.rotation.y += 0.008;
  });
  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[1.5, 2]} />
      <meshPhysicalMaterial transmission={0.92} thickness={0.5} roughness={0.05} metalness={0} ior={1.5} color={isDark ? '#00F0FF' : '#0891B2'} envMapIntensity={2} transparent />
    </mesh>
  );
}

// ── Metallic Floating Shapes ────────────────────────────────────────────────
function MetallicShapes({ isDark }) {
  const refs = [useRef(), useRef(), useRef(), useRef(), useRef()];

  useFrame(({ clock }, delta) => {
    const t = clock.getElapsedTime();
    if (refs[0].current) { refs[0].current.rotation.x += delta*0.15; refs[0].current.rotation.y += delta*0.12; refs[0].current.position.y = 7 + Math.sin(t*0.6)*0.8; }
    if (refs[1].current) { refs[1].current.rotation.x -= delta*0.1; refs[1].current.rotation.y -= delta*0.13; }
    if (refs[2].current) { refs[2].current.rotation.x += delta*0.18; refs[2].current.rotation.z += delta*0.12; }
    if (refs[3].current) { refs[3].current.rotation.y += delta*0.08; refs[3].current.rotation.z -= delta*0.06; refs[3].current.position.y = -4 + Math.cos(t*0.4)*0.5; }
    if (refs[4].current) { refs[4].current.rotation.x += delta*0.07; refs[4].current.rotation.y += delta*0.1; }
  });

  return (
    <>
      {/* Gold octahedron */}
      <mesh ref={refs[0]} position={[-12, 7, -8]}>
        <octahedronGeometry args={[1.4, 0]} />
        <meshStandardMaterial metalness={1} roughness={0.08} color="#FFB547" envMapIntensity={2} />
      </mesh>
      {/* Purple dodecahedron */}
      <mesh ref={refs[1]} position={[13, -5, -6]}>
        <dodecahedronGeometry args={[1, 0]} />
        <meshStandardMaterial metalness={0.95} roughness={0.1} color="#A855F7" envMapIntensity={2} />
      </mesh>
      {/* Cyan tetrahedron — pure mirror */}
      <mesh ref={refs[2]} position={[-8, -7, 4]}>
        <tetrahedronGeometry args={[1.2, 0]} />
        <meshStandardMaterial metalness={1} roughness={0} color={isDark ? '#00F0FF' : '#0891B2'} envMapIntensity={3} />
      </mesh>
      {/* Chrome torus knot — small accent */}
      <mesh ref={refs[3]} position={[10, -4, 6]}>
        <torusKnotGeometry args={[0.8, 0.25, 80, 16]} />
        <meshStandardMaterial metalness={1} roughness={0.03} color={isDark ? '#88ccff' : '#0E7490'} envMapIntensity={2.5} />
      </mesh>
      {/* Wireframe + solid combo cube */}
      <group ref={refs[4]} position={[-13, -3, 7]}>
        <mesh>
          <boxGeometry args={[1.5, 1.5, 1.5]} />
          <meshStandardMaterial metalness={1} roughness={0.15} color={isDark ? '#00F0FF' : '#0E7490'} transparent opacity={0.3} />
        </mesh>
        <lineSegments>
          <edgesGeometry args={[new THREE.BoxGeometry(1.5, 1.5, 1.5)]} />
          <lineBasicMaterial color={isDark ? '#00F0FF' : '#0E7490'} transparent opacity={0.6} />
        </lineSegments>
      </group>
    </>
  );
}

// ── Metallic Orbital Rings ──────────────────────────────────────────────────
function OrbitalRings({ isDark }) {
  const r1 = useRef(), r2 = useRef(), r3 = useRef();
  useFrame((_, delta) => {
    if (r1.current) r1.current.rotation.z += delta * 0.04;
    if (r2.current) r2.current.rotation.z -= delta * 0.035;
    if (r3.current) r3.current.rotation.z += delta * 0.025;
  });
  return (
    <>
      <mesh ref={r1} rotation={[Math.PI / 2.5, 0, 0]}>
        <torusGeometry args={[14, 0.15, 16, 120]} />
        <meshStandardMaterial metalness={0.9} roughness={0.1} color={isDark ? '#00F0FF' : '#0E7490'} transparent opacity={0.5} depthWrite={false} />
      </mesh>
      <mesh ref={r2} rotation={[Math.PI / 3, Math.PI / 6, 0]}>
        <torusGeometry args={[18, 0.1, 16, 140]} />
        <meshStandardMaterial metalness={0.9} roughness={0.1} color={isDark ? '#FFB547' : '#E07A5F'} transparent opacity={0.35} depthWrite={false} />
      </mesh>
      {/* Third ring — tighter, more contrast */}
      <mesh ref={r3} rotation={[Math.PI / 4, -Math.PI / 5, Math.PI / 8]}>
        <torusGeometry args={[10, 0.08, 16, 100]} />
        <meshStandardMaterial metalness={1} roughness={0.05} color={isDark ? '#A855F7' : '#7C3AED'} transparent opacity={0.3} depthWrite={false} />
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

// ── Tone Mapping ────────────────────────────────────────────────────────────
function ToneMapper({ isDark }) {
  const { gl } = useThree();
  gl.toneMapping = THREE.ACESFilmicToneMapping;
  gl.toneMappingExposure = isDark ? 1.1 : 0.85;
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
        camera={{ position: [0, 2, 26], fov: 62, near: 0.1, far: 1000 }}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
        dpr={[1, 2]}
      >
        <ToneMapper isDark={isDark} />
        <Environment preset="city" background={false} />

        {/* Lighting rig — stronger for more reflections */}
        <ambientLight intensity={0.35} />
        <directionalLight position={[10, 12, 5]} intensity={1.5} />
        <directionalLight position={[-8, 5, 10]} intensity={0.6} color={isDark ? '#00F0FF' : '#0891B2'} />
        <pointLight position={[-12, -8, -8]} intensity={0.6} color={isDark ? '#00F0FF' : '#0891B2'} />
        <pointLight position={[12, 8, -5]} intensity={0.3} color={isDark ? '#FFB547' : '#D97706'} />

        <ScrollCamera scrollProgress={scrollProgress} />

        {/* Background layers */}
        <Particles isDark={isDark} />
        <ConnectionLines isDark={isDark} />

        {/* Structural wireframe layers */}
        <BIMGrid isDark={isDark} />
        <ConstructionFrame isDark={isDark} />
        <ArchitecturalElements isDark={isDark} />

        {/* Chrome JARVIS centerpiece */}
        <Suspense fallback={null}>
          <JarvisText isDark={isDark} />
        </Suspense>

        {/* Orbiting objects */}
        <ChromeSphere isDark={isDark} />
        <GlassOrbit isDark={isDark} />

        {/* Floating metallic shapes */}
        <MetallicShapes isDark={isDark} />

        {/* Orbital rings */}
        <OrbitalRings isDark={isDark} />
      </Canvas>
    </div>
  );
}
