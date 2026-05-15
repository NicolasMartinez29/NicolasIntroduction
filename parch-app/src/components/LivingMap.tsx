import { useMemo } from 'react';
import { mapZones, mapPins, mapAvatars } from '../data/mockData';

/**
 * Living Map — fake animated planet/city view.
 * No real maps. Glowing zones, pulsing pins, floating avatars, particles.
 */
export default function LivingMap() {
  const particles = useMemo(() => {
    return Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      bottom: `${Math.random() * 30}%`,
      delay: Math.random() * 8,
      duration: 6 + Math.random() * 8,
      size: 1 + Math.random() * 3
    }));
  }, []);

  return (
    <div className="living-map">
      <div className="map-grid" />

      {/* Pulsing activity zones */}
      {mapZones.map((z) => (
        <div
          key={z.id}
          className={`map-zone ${z.tone} ${z.pulse ? 'pulse' : ''}`}
          style={{
            top: z.top,
            left: z.left,
            width: z.size,
            height: z.size,
            transform: 'translate(-50%, -50%)'
          }}
        />
      ))}

      {/* Floating particles */}
      {particles.map((p) => (
        <span
          key={p.id}
          className="particle"
          style={{
            left: p.left,
            bottom: p.bottom,
            width: p.size,
            height: p.size,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`
          }}
        />
      ))}

      {/* Floating user avatars */}
      {mapAvatars.map((a) => (
        <div
          key={a.id}
          className={`map-avatar`}
          style={{
            top: a.top,
            left: a.left,
            animationDelay: `${a.delay}s`,
            background:
              a.tone === 'coral'
                ? 'linear-gradient(135deg, #FF3D7F, #B14EFF)'
                : a.tone === 'cyan'
                ? 'linear-gradient(135deg, #00E5FF, #B14EFF)'
                : a.tone === 'mint'
                ? 'linear-gradient(135deg, #4DFFB8, #00E5FF)'
                : a.tone === 'warm'
                ? 'linear-gradient(135deg, #FF8A3D, #FF3D7F)'
                : 'linear-gradient(135deg, #B14EFF, #00E5FF)'
          }}
        >
          {a.initials}
        </div>
      ))}

      {/* Active pins */}
      {mapPins.map((p) => (
        <button key={p.id} className={`map-pin ${p.tone}`} style={{ top: p.top, left: p.left }}>
          <span className="dot" />
          {p.label}
        </button>
      ))}
    </div>
  );
}
