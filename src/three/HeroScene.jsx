import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const PARTICLE_COUNT = 500;
const LINE_MAX = 200;
const CHECK_COUNT = 80;

// Shared mutable ref so ConnectionLines can read Particles' position array
// without scene traversal (single scene instance assumption)
const sharedPos = { array: null };

function Particles() {
  const ref = useRef();
  const velocities = useRef([]);

  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    const col = new Float32Array(PARTICLE_COUNT * 3);
    const vels = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 60;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 30;
      vels.push({
        x: (Math.random() - 0.5) * 0.008,
        y: (Math.random() - 0.5) * 0.008,
        z: (Math.random() - 0.5) * 0.005,
      });
      const r = Math.random();
      if (r > 0.9)      { col[i*3]=0;   col[i*3+1]=0.94; col[i*3+2]=1;    } // cyan 10%
      else if (r > 0.8) { col[i*3]=1;   col[i*3+1]=0.7;  col[i*3+2]=0.28; } // amber 10%
      else               { col[i*3]=0.3; col[i*3+1]=0.4;  col[i*3+2]=0.6;  } // blue-grey 80%
    }
    velocities.current = vels;
    sharedPos.array = pos;
    return { positions: pos, colors: col };
  }, []);

  useFrame(() => {
    if (!ref.current) return;
    const pos = ref.current.geometry.attributes.position.array;
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
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color"    args={[colors,    3]} />
      </bufferGeometry>
      <pointsMaterial
        size={1.8}
        vertexColors
        transparent
        opacity={0.8}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}

function ConnectionLines() {
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
      <lineBasicMaterial color="#00F0FF" transparent opacity={0.08} depthWrite={false} blending={THREE.AdditiveBlending} />
    </lineSegments>
  );
}

function CoreGeometry() {
  const ref = useRef();
  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x += delta * 0.12;
    ref.current.rotation.y += delta * 0.08;
  });
  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[4, 1]} />
      <meshBasicMaterial color="#00F0FF" wireframe transparent opacity={0.12} depthWrite={false} />
    </mesh>
  );
}

function OrbitalRings() {
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
        <meshBasicMaterial color="#00F0FF" transparent opacity={0.15} depthWrite={false} />
      </mesh>
      <mesh ref={r2} rotation={[Math.PI / 3, Math.PI / 6, 0]}>
        <torusGeometry args={[16, 0.03, 8, 100]} />
        <meshBasicMaterial color="#FFB547" transparent opacity={0.08} depthWrite={false} />
      </mesh>
    </>
  );
}

function ScrollCamera({ scrollProgress = 0 }) {
  useFrame(({ camera }) => {
    camera.position.y += ((-scrollProgress * 3) - camera.position.y) * 0.05;
    camera.rotation.x += ((scrollProgress * 0.1) - camera.rotation.x) * 0.05;
  });
  return null;
}

export default function HeroScene({ scrollProgress = 0 }) {
  if (typeof window !== 'undefined' && window.innerWidth < 640) return null;

  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
      <Canvas
        camera={{ position: [0, 0, 30], fov: 60, near: 0.1, far: 1000 }}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
        dpr={[1, 2]}
      >
        <ScrollCamera scrollProgress={scrollProgress} />
        <Particles />
        <ConnectionLines />
        <CoreGeometry />
        <OrbitalRings />
      </Canvas>
    </div>
  );
}
