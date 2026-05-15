import { IconMap, IconUsers, IconPlus, IconMessage, IconUser } from './Icon';
import type { ScreenName } from '../App';

type Props = {
  active: ScreenName;
  onNavigate: (s: ScreenName) => void;
};

export default function BottomNav({ active, onNavigate }: Props) {
  return (
    <nav className="bottom-nav">
      <button
        className={`nav-item ${active === 'map' ? 'active' : ''}`}
        onClick={() => onNavigate('map')}
      >
        <IconMap />
        <span>Mapa</span>
      </button>
      <button
        className={`nav-item ${active === 'communities' ? 'active' : ''}`}
        onClick={() => onNavigate('communities')}
      >
        <IconUsers />
        <span>Comunidades</span>
      </button>
      <button
        className="nav-item create"
        onClick={() => onNavigate('create')}
        aria-label="Crear parche"
      >
        <IconPlus />
      </button>
      <button
        className={`nav-item ${active === 'join' ? 'active' : ''}`}
        onClick={() => onNavigate('join')}
      >
        <IconMessage />
        <span>Mensajes</span>
      </button>
      <button
        className={`nav-item ${active === 'profile' ? 'active' : ''}`}
        onClick={() => onNavigate('profile')}
      >
        <IconUser />
        <span>Perfil</span>
      </button>
    </nav>
  );
}
