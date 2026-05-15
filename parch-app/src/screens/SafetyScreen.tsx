import { safetyFeatures } from '../data/mockData';
import { IconShield, IconFlag, IconLock, IconMap, IconShare, IconUsers } from '../components/Icon';

const iconMap: Record<string, React.ReactNode> = {
  shield: <IconShield size={20} color="#04141A" />,
  flag: <IconFlag size={20} color="#04141A" />,
  lock: <IconLock size={20} color="#04141A" />,
  map: <IconMap size={20} color="#04141A" />,
  share: <IconShare size={20} color="#04141A" />,
  users: <IconUsers size={20} color="#04141A" />
};

export default function SafetyScreen() {
  return (
    <div className="fade-in">
      <div className="screen-header">
        <span className="city">
          <IconShield size={14} /> Confianza y seguridad
        </span>
        <h1>Conectar debe sentirse seguro.</h1>
        <div className="subtitle">
          Parch existe para que conozcas gente real, en lugares reales, sin perder la paz.
        </div>
      </div>

      <div className="safety-grid">
        {safetyFeatures.map((f, i) => (
          <div key={f.id} className={`safety-row fade-up-delay-${(i % 3) + 1}`}>
            <div className="icon-wrap">{iconMap[f.icon]}</div>
            <div className="body">
              <div className="title">{f.title}</div>
              <div className="desc">{f.desc}</div>
            </div>
          </div>
        ))}
      </div>

      <div
        className="glass-strong"
        style={{
          margin: '20px 20px 0',
          padding: 18,
          borderRadius: 20,
          background: 'linear-gradient(135deg, rgba(77, 255, 184, 0.10), rgba(0, 229, 255, 0.08))',
          borderColor: 'rgba(77, 255, 184, 0.3)'
        }}
      >
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 16 }}>
          Si algo no se siente bien, dilo.
        </div>
        <div style={{ fontSize: 13, color: 'var(--text-soft)', marginTop: 6, lineHeight: 1.5 }}>
          Reportar es un tap. Bloquear, otro. La comunidad se cuida sola, y nosotros respondemos.
        </div>
        <button className="btn btn-secondary" style={{ marginTop: 14 }}>
          Reportar a alguien
        </button>
      </div>
    </div>
  );
}
