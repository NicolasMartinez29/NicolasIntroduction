import { businessCategories, pricingTiers } from '../data/mockData';
import { IconCheck } from '../components/Icon';

export default function BusinessScreen() {
  return (
    <div className="fade-in">
      <div className="screen-header">
        <span className="city">Para organizadores</span>
        <h1>Haz visible tu comunidad</h1>
        <div className="subtitle">
          Universidades, bares, cafés, gyms, grupos latinos y eventos. Si tienes gente, te ayudamos a que se vea.
        </div>
      </div>

      <div className="section-header">
        <h2>¿Quién usa esto?</h2>
      </div>

      <div style={{ display: 'flex', gap: 8, overflowX: 'auto', padding: '0 20px 6px', scrollbarWidth: 'none' as const }}>
        {businessCategories.map((c) => (
          <div
            key={c.id}
            className="glass"
            style={{
              flexShrink: 0,
              padding: '14px 16px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 6,
              minWidth: 88,
              borderRadius: 16
            }}
          >
            <div style={{ fontSize: 24 }}>{c.icon}</div>
            <div style={{ fontSize: 12, color: 'var(--text-soft)', textAlign: 'center' }}>{c.name}</div>
          </div>
        ))}
      </div>

      <div className="section-header">
        <h2>Qué desbloqueas</h2>
      </div>

      <div className="list">
        <div className="glass" style={{ padding: 14, display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ fontSize: 22 }}>🌍</div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 14 }}>Aparece en el mapa</div>
            <div style={{ fontSize: 12, color: 'var(--text-soft)' }}>
              Tu local o comunidad como punto vivo en la ciudad.
            </div>
          </div>
        </div>
        <div className="glass" style={{ padding: 14, display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ fontSize: 22 }}>🎫</div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 14 }}>Promociona eventos</div>
            <div style={{ fontSize: 12, color: 'var(--text-soft)' }}>
              Notifica a tu gente cuando hay algo que vale la pena.
            </div>
          </div>
        </div>
        <div className="glass" style={{ padding: 14, display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ fontSize: 22 }}>📊</div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 14 }}>Analytics para organizadores</div>
            <div style={{ fontSize: 12, color: 'var(--text-soft)' }}>
              Qué tan vivo está tu grupo, retención, vibes, conversión.
            </div>
          </div>
        </div>
        <div className="glass" style={{ padding: 14, display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ fontSize: 22 }}>🏢</div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 14 }}>Sucursales por ciudad / país</div>
            <div style={{ fontSize: 12, color: 'var(--text-soft)' }}>
              Una sola comunidad madre con presencia en muchas ciudades.
            </div>
          </div>
        </div>
      </div>

      <div className="section-header">
        <h2>Planes</h2>
        <span className="link">* Mock pricing</span>
      </div>

      <div className="list" style={{ marginBottom: 24 }}>
        {pricingTiers.map((t) => (
          <div key={t.id} className={`pricing-card ${t.highlight ? 'highlight' : ''}`}>
            {t.highlight && (
              <span
                style={{
                  position: 'absolute',
                  top: 14,
                  right: 14,
                  fontSize: 10,
                  fontWeight: 800,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--glow-warm)'
                }}
              >
                ★ Recomendado
              </span>
            )}
            <div className="tier">{t.tier}</div>
            <div className="price">
              {t.price} <small>{t.period}</small>
            </div>
            <ul>
              {t.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <button
              className={`btn ${t.highlight ? 'btn-primary' : 'btn-secondary'} btn-block`}
              style={{ marginTop: 14 }}
            >
              <IconCheck size={16} /> {t.highlight ? 'Empezar prueba' : 'Elegir plan'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
