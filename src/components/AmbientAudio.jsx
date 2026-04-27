import { useState, useRef, useCallback, useEffect } from 'react';

/**
 * Ambient audio player — generates white noise or ocean waves
 * using Web Audio API. No external files needed.
 */

function createWhiteNoise(audioCtx) {
  const bufferSize = audioCtx.sampleRate * 4; // 4 seconds loop
  const buffer = audioCtx.createBuffer(2, bufferSize, audioCtx.sampleRate);
  for (let ch = 0; ch < 2; ch++) {
    const data = buffer.getChannelData(ch);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.15; // quiet white noise
    }
  }
  const source = audioCtx.createBufferSource();
  source.buffer = buffer;
  source.loop = true;
  return source;
}

function createOceanWaves(audioCtx) {
  // Longer buffer for more natural feel
  const bufferSize = audioCtx.sampleRate * 8;
  const buffer = audioCtx.createBuffer(2, bufferSize, audioCtx.sampleRate);

  for (let ch = 0; ch < 2; ch++) {
    const data = buffer.getChannelData(ch);
    for (let i = 0; i < bufferSize; i++) {
      const t = i / audioCtx.sampleRate;
      // Layer multiple wave-like volume envelopes
      const wave1 = Math.sin(t * 0.4) * 0.5 + 0.5;   // slow swell ~2.5s period
      const wave2 = Math.sin(t * 0.15) * 0.3 + 0.7;   // slower tide ~6.7s
      const wave3 = Math.sin(t * 1.2) * 0.15 + 0.85;   // small ripples
      const envelope = wave1 * wave2 * wave3;
      // Noise shaped by envelope = ocean-like wash
      const noise = (Math.random() * 2 - 1);
      data[i] = noise * envelope * 0.18;
    }
  }

  const source = audioCtx.createBufferSource();
  source.buffer = buffer;
  source.loop = true;

  // Low-pass filter to remove harsh highs — sounds more like water
  const lpf = audioCtx.createBiquadFilter();
  lpf.type = 'lowpass';
  lpf.frequency.value = 800;
  lpf.Q.value = 0.5;

  // Subtle high-shelf cut for warmth
  const hsf = audioCtx.createBiquadFilter();
  hsf.type = 'highshelf';
  hsf.frequency.value = 2000;
  hsf.gain.value = -6;

  source.connect(lpf);
  lpf.connect(hsf);

  return { source, output: hsf };
}

const TRACKS = [
  { id: 'off', label: 'Off', icon: '🔇' },
  { id: 'ocean', label: 'Ocean Waves', icon: '🌊' },
  { id: 'white', label: 'White Noise', icon: '🔈' },
];

export default function AmbientAudio() {
  const [trackIndex, setTrackIndex] = useState(0); // 0=off, 1=ocean, 2=white
  const [showMenu, setShowMenu] = useState(false);
  const audioCtxRef = useRef(null);
  const sourceRef = useRef(null);
  const gainRef = useRef(null);

  const stopCurrent = useCallback(() => {
    try {
      if (sourceRef.current) {
        if (sourceRef.current.source) sourceRef.current.source.stop();
        else sourceRef.current.stop();
      }
    } catch (e) { /* already stopped */ }
    sourceRef.current = null;
  }, []);

  const playTrack = useCallback((id) => {
    stopCurrent();

    if (id === 'off') return;

    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    const ctx = audioCtxRef.current;

    if (ctx.state === 'suspended') ctx.resume();

    if (!gainRef.current) {
      gainRef.current = ctx.createGain();
      gainRef.current.gain.value = 0.6;
      gainRef.current.connect(ctx.destination);
    }

    if (id === 'white') {
      const src = createWhiteNoise(ctx);
      src.connect(gainRef.current);
      src.start();
      sourceRef.current = src;
    } else if (id === 'ocean') {
      const { source, output } = createOceanWaves(ctx);
      output.connect(gainRef.current);
      source.start();
      sourceRef.current = { source, output };
    }
  }, [stopCurrent]);

  const cycleTrack = useCallback(() => {
    const next = (trackIndex + 1) % TRACKS.length;
    setTrackIndex(next);
    playTrack(TRACKS[next].id);
  }, [trackIndex, playTrack]);

  const selectTrack = useCallback((idx) => {
    setTrackIndex(idx);
    playTrack(TRACKS[idx].id);
    setShowMenu(false);
  }, [playTrack]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopCurrent();
      if (audioCtxRef.current) audioCtxRef.current.close().catch(() => {});
    };
  }, [stopCurrent]);

  const currentTrack = TRACKS[trackIndex];

  return (
    <div style={{ position: 'fixed', top: 20, left: 68, zIndex: 100 }}>
      {/* Main button */}
      <button
        onClick={cycleTrack}
        onContextMenu={(e) => { e.preventDefault(); setShowMenu(!showMenu); }}
        title={`Ambient: ${currentTrack.label} (click to cycle, right-click for menu)`}
        aria-label={`Ambient audio: ${currentTrack.label}`}
        style={{
          width: 40, height: 40, borderRadius: '50%',
          background: 'var(--bg-glass)',
          border: `1px solid ${trackIndex > 0 ? 'var(--border-strong)' : 'var(--border-medium)'}`,
          backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
          cursor: 'pointer', fontSize: 16, lineHeight: 1,
          color: 'var(--text-primary)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'all 0.3s ease',
          boxShadow: trackIndex > 0 ? '0 0 12px rgba(0,240,255,0.15)' : 'none',
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.1)'; }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
      >
        {currentTrack.icon}
      </button>

      {/* Dropdown menu (right-click) */}
      {showMenu && (
        <div style={{
          position: 'absolute', top: 48, left: 0,
          background: 'var(--bg-glass)', border: '1px solid var(--border-medium)',
          borderRadius: 12, padding: 8, backdropFilter: 'blur(12px)',
          minWidth: 150, boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
        }}>
          {TRACKS.map((track, i) => (
            <button
              key={track.id}
              onClick={() => selectTrack(i)}
              style={{
                display: 'flex', alignItems: 'center', gap: 10,
                width: '100%', padding: '8px 12px', border: 'none',
                background: i === trackIndex ? 'var(--border-subtle)' : 'transparent',
                color: 'var(--text-primary)', cursor: 'pointer',
                borderRadius: 8, fontSize: 13,
                fontFamily: "'DM Sans', sans-serif",
                transition: 'background 0.2s',
              }}
              onMouseEnter={e => { if (i !== trackIndex) e.currentTarget.style.background = 'var(--border-subtle)'; }}
              onMouseLeave={e => { if (i !== trackIndex) e.currentTarget.style.background = 'transparent'; }}
            >
              <span style={{ fontSize: 16 }}>{track.icon}</span>
              <span>{track.label}</span>
              {i === trackIndex && <span style={{ marginLeft: 'auto', color: 'var(--cyan-400)', fontSize: 11 }}>✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
