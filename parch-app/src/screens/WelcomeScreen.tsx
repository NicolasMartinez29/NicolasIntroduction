import type { ScreenName } from '../App';
import { IconArrow } from '../components/Icon';

type Props = { onNavigate: (s: ScreenName) => void };

export default function WelcomeScreen({ onNavigate }: Props) {
  return (
    <div className="welcome">
      <div className="welcome-orb" />

      <div className="welcome-logo fade-in" style={{ position: 'relative', zIndex: 5, marginTop: 4 }}>
        ✦ PARCH
      </div>

      <div className="welcome-content">
        <div className="fade-up">
          <div className="welcome-title">
            No te quedes
            <br />
            solo hoy.
          </div>
        </div>

        <div className="welcome-sub fade-up-delay-1">
          Encuentra gente, comunidades y planes cerca de ti.
        </div>

        <div className="welcome-quote fade-up-delay-2">
          Una app para crear recuerdos, encontrar tu gente y salir del bloqueo.
        </div>

        <div className="welcome-buttons fade-up-delay-3">
          <button className="btn btn-primary btn-block" onClick={() => onNavigate('map')}>
            Entrar al mapa
            <IconArrow />
          </button>
          <button className="btn btn-secondary btn-block" onClick={() => onNavigate('create')}>
            Crear mi primer parche
          </button>
          <button className="btn btn-ghost btn-block" onClick={() => onNavigate('communities')}>
            Explorar comunidades
          </button>
        </div>

        <div
          style={{
            marginTop: 22,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            fontSize: 11,
            color: 'var(--text-muted)',
            letterSpacing: '0.06em',
            textTransform: 'uppercase'
          }}
        >
          <span className="live-dot" /> 12.4k personas activas ahora
        </div>
      </div>
    </div>
  );
}
