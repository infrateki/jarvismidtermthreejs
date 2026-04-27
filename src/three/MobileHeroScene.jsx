import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const PARTICLE_COUNT = 120;

function makeTexture() {
  const c = document.createElement('canvas');
  c.width = 32; c.height = 32;
  const ctx = c.getContext('2d');
  const g = ctx.createRadialGradient(16, 16, 0, 16, 16, 14);
  g.addColorStop(0, 'rgba(255,255,255,1)');
  g.addColorStop(0.4, 'rgba(255,255,255,0.5)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.beginPath(); ctx.arc(16, 16, 14, 0, Math.PI * 2);
  ctx.fillStyle = g; ctx.fill();
  return new THREE.CanvasTexture(c);
}

function Particles({ isDark }) {
  const ref = useRef();
  const vels = useRef([]);

  const { positions, colors, tex } = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    const col = new Float32Array(PARTICLE_COUNT * 3);
    const v = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15;
      v.push({ x: (Math.random() - 0.5) * 0.005, y: (Math.random() - 0.5) * 0.005, z: (Math.random() - 0.5) * 0.003 });
      const r = Math.random();
      if (r > 0.85) { col[i*3]=0; col[i*3+1]=0.9; col[i*3+2]=1; }
      else if (r > 0.75) { col[i*3]=1; col[i*3+1]=0.7; col[i*3+2]=0.3; }
      else { col[i*3]=0.3; col[i*3+1]=0.38; col[i*3+2]=0.55; }
    }
    vels.current = v;
    return { positions: pos, colors: col, tex: makeTexture() };
  }, []);

  useFrame(() => {
    if (!ref.current) return;
    const pos = ref.current.geometry.attributes.position.array;
    const v = vels.current;
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      pos[i*3] += v[i].x; pos[i*3+1] += v[i].y; pos[i*3+2] += v[i].z;
      if (Math.abs(pos[i*3]) > 15) v[i].x *= -1;
      if (Math.abs(pos[i*3+1]) > 20) v[i].y *= -1;
      if (Math.abs(pos[i*3+2]) > 8) v[i].z *= -1;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        map={tex} size={2.5} vertexColors transparent opacity={0.7}
        depthWrite={false} blending={isDark ? THREE.AdditiveBlending : THREE.NormalBlending}
        sizeAttenuation alphaTest={0.01}
      />
    </points>
  );
}

function Wireframe({ isDark }) {
  const ref = useRef();
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * 0.06;
      ref.current.rotation.y += delta * 0.08;
    }
  });
  return (
    <mesh ref={ref} position={[0, 0, 0]}>
      <icosahedronGeometry args={[3, 1]} />
      <meshBasicMaterial color={isDark ? '#00F0FF' : '#0E7490'} wireframe transparent opacity={0.08} depthWrite={false} />
    </mesh>
  );
}

function Ring({ isDark }) {
  const ref = useRef();
  useFrame((_, delta) => { if (ref.current) ref.current.rotation.z += delta * 0.03; });
  return (
    <mesh ref={ref} rotation={[Math.PI / 2.5, 0, 0]}>
      <torusGeometry args={[8, 0.04, 8, 60]} />
      <meshBasicMaterial color={isDark ? '#00F0FF' : '#0E7490'} transparent opacity={0.12} depthWrite={false} />
    </mesh>
  );
}

export default function MobileHeroScene({ isDark = true }) {
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
      <Canvas
        camera={{ position: [0, 0, 20], fov: 60 }}
        gl={{ alpha: true, antialias: false, powerPreference: 'low-power' }}
        dpr={[1, 1]}
      >
        <Particles isDark={isDark} />
        <Wireframe isDark={isDark} />
        <Ring isDark={isDark} />
      </Canvas>
    </div>
  );
}
