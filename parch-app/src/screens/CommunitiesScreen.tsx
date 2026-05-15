import { useState } from 'react';
import { communities, type Community } from '../data/mockData';
import { IconSearch, IconCheck } from '../components/Icon';

const toneToCorner: Record<Community['tone'], string> = {
  coral: 'radial-gradient(circle, rgba(255, 61, 127, 0.7), transparent 70%)',
  cyan: 'radial-gradient(circle, rgba(0, 229, 255, 0.6), transparent 70%)',
  mint: 'radial-gradient(circle, rgba(77, 255, 184, 0.55), transparent 70%)',
  warm: 'radial-gradient(circle, rgba(255, 138, 61, 0.6), transparent 70%)',
  violet: 'radial-gradient(circle, rgba(177, 78, 255, 0.7), transparent 70%)'
};

export default function CommunitiesScreen() {
  const [joined, setJoined] = useState<Record<string, boolean>>(
    Object.fromEntries(communities.filter((c) => c.joined).map((c) => [c.id, true]))
  );

  return (
    <div className="fade-in">
      <div className="screen-header">
        <h1>Comunidades vivas</h1>
        <div className="subtitle">Encuentra gente con tu misma energía.</div>
      </div>

      <div className="search-bar">
        <IconSearch />
        <input placeholder="Busca tu tribu — latinos, gym, café…" />
      </div>

      <div className="chip-row">
        <button className="chip active">Para ti</button>
        <button className="chip">Cerca</button>
        <button className="chip">Latinos</button>
        <button className="chip">Migrantes</button>
        <button className="chip">Gym</button>
        <button className="chip">Música</button>
        <button className="chip">Nuevas</button>
      </div>

      <div className="section-header">
        <h2>Activas ahora</h2>
        <span className="link">Ver todas</span>
      </div>

      <div className="list">
        {communities.map((c, i) => (
          <div key={c.id} className={`community-card fade-up-delay-${(i % 3) + 1}`}>
            <div className="glow-corner" style={{ background: toneToCorner[c.tone] }} />

            <div className="row">
              <div>
                <div className="name">{c.name}</div>
                <div className="vibe">
                  <span className="live-dot" /> {c.vibe}
                </div>
              </div>
              <div style={{ display: 'flex', gap: 6, flexDirection: 'column', alignItems: 'flex-end' }}>
                {c.tier === 'verified' && <span className="badge verified">✓ Verified</span>}
                {c.tier === 'featured' && <span className="badge featured">★ Featured</span>}
              </div>
            </div>

            <div className="meta">
              <span className="item">👥 {c.members.toLocaleString('es')} miembros</span>
              <span className="item" style={{ color: 'var(--live)' }}>
                <span className="live-dot" /> {c.activeNow} ahora
              </span>
              <span className="item">📍 {c.city}</span>
            </div>

            <div className="next">
              <span style={{ color: 'var(--text-muted)', fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                Próximo plan
              </span>
              <div style={{ marginTop: 2 }}>{c.nextPlan}</div>
            </div>

            <div className="footer-row">
              <div style={{ display: 'flex', gap: 6 }}>
                {c.tags.map((t) => (
                  <span key={t} className="badge" style={{ background: 'rgba(255,255,255,0.06)', color: 'var(--text-soft)' }}>
                    {t}
                  </span>
                ))}
              </div>
              <button
                className={`btn-join ${joined[c.id] ? 'joined' : ''}`}
                onClick={() => setJoined((j) => ({ ...j, [c.id]: !j[c.id] }))}
              >
                {joined[c.id] ? (
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                    <IconCheck size={14} /> Unido
                  </span>
                ) : (
                  'Unirme'
                )}
              </button>
            </div>
          </div>
        ))}

        {/* Premium banner */}
        <div
          className="community-card"
          style={{
            marginTop: 8,
            background:
              'linear-gradient(135deg, rgba(255, 61, 127, 0.10), rgba(177, 78, 255, 0.10))',
            borderColor: 'rgba(255, 61, 127, 0.35)'
          }}
        >
          <div className="row">
            <div>
              <div className="name" style={{ fontSize: 15 }}>¿Tienes una comunidad grande?</div>
              <div className="vibe">Hazla destacada · aparece en el mapa · analytics</div>
            </div>
            <span className="badge premium">PRO</span>
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 14, flexWrap: 'wrap' }}>
            <span className="chip">Aparece en el mapa</span>
            <span className="chip">Promociona eventos</span>
            <span className="chip">Analytics</span>
          </div>
        </div>
      </div>
    </div>
  );
}
