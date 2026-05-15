import { useState } from 'react';
import LivingMap from '../components/LivingMap';
import { IconSearch, IconLocation, IconTrending, IconShield, IconUsers, IconMoon } from '../components/Icon';
import { filterChips } from '../data/mockData';
import type { ScreenName } from '../App';

type Props = { onNavigate: (s: ScreenName) => void };

export default function MapScreen({ onNavigate }: Props) {
  const [activeChip, setActiveChip] = useState<string>('Café');

  return (
    <div style={{ position: 'relative', flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
      {/* Map fills the whole area */}
      <div style={{ position: 'absolute', inset: 0 }}>
        <LivingMap />
      </div>

      {/* Top overlay: header + search + chips */}
      <div
        style={{
          position: 'relative',
          zIndex: 20,
          paddingTop: 6,
          background: 'linear-gradient(180deg, rgba(5,5,16,0.72), rgba(5,5,16,0) 100%)'
        }}
      >
        <div className="screen-header" style={{ paddingBottom: 6 }}>
          <span className="city">
            <IconLocation size={14} stroke={2} /> Sioux Falls, SD
          </span>
          <h1>El mundo está vivo ahora.</h1>
          <span className="alive">
            <span className="live-dot" />
            12.4k personas activas
          </span>
        </div>

        <div className="search-bar">
          <IconSearch />
          <input placeholder="¿Qué quieres hacer hoy?" />
        </div>

        <div className="chip-row">
          {filterChips.map((c) => (
            <button
              key={c}
              className={`chip ${activeChip === c ? 'active' : ''}`}
              onClick={() => setActiveChip(c)}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Right side tools */}
      <div className="map-side-tools">
        <button className="tool-btn accent" aria-label="Mi ubicación">
          <IconLocation size={20} />
        </button>
        <button className="tool-btn warm" aria-label="Trending" onClick={() => onNavigate('stories')}>
          <IconTrending size={20} />
        </button>
        <button className="tool-btn mint" aria-label="Safe mode" onClick={() => onNavigate('safety')}>
          <IconShield size={20} />
        </button>
        <button className="tool-btn cyan" aria-label="Comunidades" onClick={() => onNavigate('communities')}>
          <IconUsers size={20} />
        </button>
        <button className="tool-btn violet" aria-label="Modo noche">
          <IconMoon size={20} />
        </button>
      </div>

      {/* Floating cards on map */}
      <div className="map-floating-cards">
        <button className="map-floating-card" onClick={() => onNavigate('join')} style={{ textAlign: 'left' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <span className="live-dot" />
            <span style={{ fontSize: 11, color: 'var(--live)', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              Ahora
            </span>
          </div>
          <div style={{ fontWeight: 700, fontSize: 14, color: '#fff' }}>
            12 personas cerca también buscan plan.
          </div>
          <div style={{ fontSize: 12, color: 'var(--text-soft)', marginTop: 4 }}>
            Toca para unirte a la conversación →
          </div>
        </button>

        <button className="map-floating-card" onClick={() => onNavigate('join')} style={{ textAlign: 'left' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: 'var(--glow-coral)',
                boxShadow: '0 0 10px var(--glow-coral)'
              }}
            />
            <span
              style={{
                fontSize: 11,
                color: 'var(--glow-coral)',
                fontWeight: 700,
                letterSpacing: '0.06em',
                textTransform: 'uppercase'
              }}
            >
              Esta noche
            </span>
          </div>
          <div style={{ fontWeight: 700, fontSize: 14, color: '#fff' }}>
            3 parches activos esta noche.
          </div>
          <div style={{ fontSize: 12, color: 'var(--text-soft)', marginTop: 4 }}>
            Burgers · Drive nocturno · Café tarde
          </div>
        </button>

        <button className="map-floating-card" onClick={() => onNavigate('communities')} style={{ textAlign: 'left' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: 'var(--glow-warm)',
                boxShadow: '0 0 10px var(--glow-warm)'
              }}
            />
            <span
              style={{
                fontSize: 11,
                color: 'var(--glow-warm)',
                fontWeight: 700,
                letterSpacing: '0.06em',
                textTransform: 'uppercase'
              }}
            >
              Latinos
            </span>
          </div>
          <div style={{ fontWeight: 700, fontSize: 14, color: '#fff' }}>
            2 comunidades latinas activas ahora.
          </div>
          <div style={{ fontSize: 12, color: 'var(--text-soft)', marginTop: 4 }}>
            Colombianos en USA · Latinos en SF
          </div>
        </button>
      </div>
    </div>
  );
}
