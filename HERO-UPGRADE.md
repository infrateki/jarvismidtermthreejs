# HERO UPGRADE — One Prompt, One Terminal

> Paste this into a single Claude Code terminal. It upgrades the hero from flat wireframes to premium 3D with metallic reflections, glass materials, environment lighting, and bloom.

---

## Prompt — paste into Claude Code

```
Read CLAUDE.md. I need you to dramatically upgrade the 3D hero scene.

Right now it's all MeshBasicMaterial wireframe with zero lighting — it looks flat
and cheap. I want metallic chrome reflections, glass materials, environment
lighting, bloom glow, and premium 3D objects that showcase real shader capabilities.

Do these steps:

STEP 1: Install post-processing

Run: npm install @react-three/postprocessing

STEP 2: Rewrite src/three/HeroScene.jsx

Keep the same export signature: default export HeroScene({ scrollProgress }).
Keep the same mounting behavior (hidden on mobile < 640px).
Keep the particle system and connection lines (but improve particles — see below).
Keep the scroll camera parallax.

But REPLACE the flat wireframe shapes with premium PBR materials:

PARTICLES — make them ROUND, not square:
  Create a small circular texture using Canvas2D at init time:
    const canvas = document.createElement('canvas');
    canvas.width = 64; canvas.height = 64;
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.arc(32, 32, 28, 0, Math.PI * 2);
    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 28);
    gradient.addColorStop(0, 'rgba(255,255,255,1)');
    gradient.addColorStop(0.5, 'rgba(255,255,255,0.5)');
    gradient.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = gradient;
    ctx.fill();
    const particleTexture = new THREE.CanvasTexture(canvas);
  
  Then use: <pointsMaterial map={particleTexture} size={2} ... />
  This makes particles soft glowing circles instead of ugly squares.

ENVIRONMENT LIGHTING — add to Canvas:
  Import { Environment } from '@react-three/drei'
  Add inside Canvas: <Environment preset="city" />
  This gives every reflective material something to reflect.
  Also add:
    <ambientLight intensity={0.3} />
    <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
    <pointLight position={[-10, -10, -5]} intensity={0.5} color="#00F0FF" />

CORE SHAPE — replace the flat wireframe icosahedron with a CHROME sphere:
  Use a TorusKnotGeometry(3, 0.8, 200, 32) instead of the icosahedron.
  Material: meshStandardMaterial with:
    metalness={1}
    roughness={0.05}
    color={isDark ? '#88ccff' : '#0E7490'}
    envMapIntensity={2}
  This creates a mirror-chrome knot that reflects the environment map.
  Keep the slow rotation (useFrame delta * 0.08 on x and y).

GLASS SHAPE — add a glass icosahedron orbiting the chrome knot:
  IcosahedronGeometry(2, 1)
  Import { MeshTransmissionMaterial } from '@react-three/drei'
  Use: <MeshTransmissionMaterial
    backside
    samples={8}
    thickness={0.5}
    chromaticAberration={0.2}
    anisotropy={0.3}
    distortion={0.2}
    distortionScale={0.2}
    temporalDistortion={0.1}
    ior={1.5}
    color={isDark ? '#00F0FF' : '#0891B2'}
    transmissionSampler={false}
  />
  Orbit it around the torus knot: position based on sin/cos of elapsed time,
  radius ~6, speed 0.3.

  If MeshTransmissionMaterial causes performance issues or errors, fall back to:
  <meshPhysicalMaterial
    transmission={0.9}
    thickness={0.5}
    roughness={0.05}
    metalness={0}
    ior={1.5}
    color={isDark ? '#00F0FF' : '#0891B2'}
    transparent
    opacity={0.8}
  />

METALLIC FLOATING SHAPES — replace the flat wireframe shapes:
  Shape 1: OctahedronGeometry(1.2, 0) at position [-8, 4, -6]
    meshStandardMaterial: metalness={1}, roughness={0.1}, color="#FFB547"
    Slow rotation + gentle float (sine wave on Y)

  Shape 2: DodecahedronGeometry(0.8, 0) at position [9, -3, -4]
    meshStandardMaterial: metalness={0.9}, roughness={0.15}, color="#A855F7"
    Rotating opposite direction

  Shape 3: TetrahedronGeometry(1, 0) at position [-5, -5, 3]
    meshStandardMaterial: metalness={1}, roughness={0}, color="#00F0FF"
    Pure mirror. Slow tumble.

WIREFRAME ACCENT RINGS — keep the orbital torus rings but make them thicker:
  Ring 1: TorusGeometry(12, 0.12, 16, 100) — slightly thicker tube
    meshStandardMaterial: metalness={0.8}, roughness={0.2}, color cyan, transparent opacity 0.4
  Ring 2: TorusGeometry(16, 0.08, 16, 120)
    meshStandardMaterial: metalness={0.8}, roughness={0.2}, color amber, transparent opacity 0.3

BLOOM POST-PROCESSING:
  Import { EffectComposer, Bloom } from '@react-three/postprocessing'
  Add AFTER all meshes inside Canvas:
    <EffectComposer>
      <Bloom
        luminanceThreshold={0.6}
        luminanceSmoothing={0.9}
        intensity={isDark ? 1.2 : 0.4}
        mipmapBlur
      />
    </EffectComposer>
  This makes the bright chrome edges and particle glow bloom outward.
  Lower intensity in light mode so it doesn't wash out.

COMPLETE CANVAS STRUCTURE should be:
  <Canvas camera={...} gl={{ alpha: true, antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: isDark ? 1.2 : 0.8 }} dpr={[1, 2]}>
    <Environment preset="city" />
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
    
    <EffectComposer>
      <Bloom luminanceThreshold={0.6} luminanceSmoothing={0.9} intensity={isDark ? 1.2 : 0.4} mipmapBlur />
    </EffectComposer>
  </Canvas>

THEME AWARENESS:
  Keep importing useTheme from '../hooks/useTheme'.
  isDark controls: material colors, bloom intensity, particle blending mode,
  tone mapping exposure. All existing theme logic stays.

PERFORMANCE:
  - Keep particle count at 500
  - MeshTransmissionMaterial samples: 8 (not 16 — 16 is too expensive)
  - If bloom causes frame drops, reduce mipmapBlur or lower intensity
  - Environment preset "city" is lightweight
  - TorusKnot segments: 200 tubular, 32 radial (smooth but not insane)

After rewriting, run npm run dev and verify:
  - Chrome torus knot reflects the environment
  - Glass icosahedron orbits with refraction/transparency
  - Metallic floating shapes catch light and reflect
  - Particles are soft circles, not squares
  - Bloom makes bright edges glow
  - Connection lines still work
  - Scroll parallax still works
  - Theme toggle still works (dark=bright glow, light=softer tones)
  - Steady 60fps on your machine

Run npm run build — must pass.
```
