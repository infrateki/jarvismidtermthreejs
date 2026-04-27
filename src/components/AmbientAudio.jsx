import { useState, useRef, useEffect } from 'react';

export default function AmbientAudio() {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = new Audio('/whitenoise.mp3');
    audio.loop = true;
    audio.volume = 0.4;
    audioRef.current = audio;
    return () => { audio.pause(); audio.src = ''; };
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
    } else {
      audio.play().catch(() => {});
    }
    setPlaying(!playing);
  };

  return (
    <button
      onClick={toggle}
      title={playing ? 'Mute ambient audio' : 'Play ambient audio'}
      aria-label={playing ? 'Mute ambient audio' : 'Play ambient audio'}
      style={{
        position: 'fixed', top: 20, left: 68, zIndex: 100,
        width: 40, height: 40, borderRadius: '50%',
        background: 'var(--bg-glass)',
        border: `1px solid ${playing ? 'var(--border-strong)' : 'var(--border-medium)'}`,
        backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
        cursor: 'pointer', fontSize: 16, lineHeight: 1,
        color: 'var(--text-primary)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'all 0.3s ease',
        boxShadow: playing ? '0 0 12px rgba(0,240,255,0.15)' : 'none',
      }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.1)'; }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
    >
      {playing ? '🔊' : '🔇'}
    </button>
  );
}
