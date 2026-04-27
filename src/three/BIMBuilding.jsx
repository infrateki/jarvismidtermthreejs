import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import useTheme from '../hooks/useTheme.jsx';

function EdgedMesh({ geometry, color, opacity, wireframe }) {
  const edgesGeo = useMemo(() => new THREE.EdgesGeometry(geometry), [geometry]);
  return (
    <group>
      <mesh geometry={geometry}>
        {wireframe
          ? <meshBasicMaterial color={color} wireframe transparent opacity={opacity} depthWrite={false} />
          : <meshStandardMaterial color={color} transparent opacity={opacity} depthWrite={false} side={THREE.DoubleSide} />
        }
      </mesh>
      {!wireframe && (
        <lineSegments geometry={edgesGeo}>
          <lineBasicMaterial color="#0E7490" transparent opacity={0.4} depthWrite={false} />
        </lineSegments>
      )}
    </group>
  );
}

function Building({ isDark }) {
  const mat = isDark
    ? { color: '#00F0FF', opacity: 0.25, wireframe: true }
    : { color: '#0891B2', opacity: 0.15, wireframe: false };

  const mainBodyGeo   = useMemo(() => new THREE.BoxGeometry(20, 4, 10), []);
  const floorGeo      = useMemo(() => new THREE.BoxGeometry(20, 0.1, 10), []);
  const atriumGeo     = useMemo(() => new THREE.BoxGeometry(6, 6, 6), []);
  const wingGeo       = useMemo(() => new THREE.BoxGeometry(4, 3, 16), []);
  const canopyGeo     = useMemo(() => new THREE.BoxGeometry(8, 0.1, 4), []);
  const columnGeo     = useMemo(() => new THREE.CylinderGeometry(0.15, 0.15, 4, 8), []);
  const mechRoomGeo   = useMemo(() => new THREE.BoxGeometry(2.5, 1.5, 2.5), []);
  const groundGeo     = useMemo(() => new THREE.PlaneGeometry(30, 30), []);

  const columnPositions = useMemo(() => {
    const positions = [];
    for (let x = -9; x <= 9; x += 6) {
      positions.push([x, 0, -5]);
      positions.push([x, 0, 5]);
    }
    return positions;
  }, []);

  return (
    <group>
      {/* Ground plane — light mode only */}
      {!isDark && (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]}>
          <primitive object={groundGeo} />
          <meshStandardMaterial color="#F5E6C8" transparent opacity={0.3} depthWrite={false} />
        </mesh>
      )}

      {/* Main body */}
      <group position={[0, 0, 0]}>
        <EdgedMesh geometry={mainBodyGeo} {...mat} />
      </group>

      {/* Floor slabs */}
      {[0, 1.5, 3].map((y, i) => (
        <group key={i} position={[0, y - 1.95, 0]}>
          <EdgedMesh geometry={floorGeo} {...mat} />
        </group>
      ))}

      {/* Central atrium */}
      <group position={[0, 1, 0]}>
        <EdgedMesh geometry={atriumGeo} {...mat} />
      </group>

      {/* Wing corridors */}
      <group position={[-12, -0.5, 0]}>
        <EdgedMesh geometry={wingGeo} {...mat} />
      </group>
      <group position={[12, -0.5, 0]}>
        <EdgedMesh geometry={wingGeo} {...mat} />
      </group>

      {/* Entrance canopy */}
      <group position={[0, 0.5, 7.5]}>
        <EdgedMesh geometry={canopyGeo} {...mat} />
      </group>

      {/* Columns */}
      {columnPositions.map(([x, , z], i) => (
        <group key={i} position={[x, 0, z]}>
          <EdgedMesh geometry={columnGeo} {...mat} />
        </group>
      ))}

      {/* Rooftop mechanical room */}
      <group position={[0, 5.25, 0]}>
        <EdgedMesh geometry={mechRoomGeo} {...mat} />
      </group>
    </group>
  );
}

function RotatingBuilding({ isDark }) {
  const groupRef = useRef();
  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.08;
  });
  return (
    <group ref={groupRef}>
      <Building isDark={isDark} />
    </group>
  );
}

export default function BIMBuilding() {
  const themeCtx = useTheme();
  const isDark = themeCtx ? themeCtx.isDark : true;

  return (
    <Float speed={1} floatIntensity={0.3} rotationIntensity={0}>
      <RotatingBuilding isDark={isDark} />
    </Float>
  );
}
