import { useState } from 'react';
import { currentUser, statuses } from '../data/mockData';
import Avatar from '../components/Avatar';
import type { ScreenName } from '../App';

type Props = { onNavigate: (s: ScreenName) => void };

export default function ProfileScreen({ onNavigate }: Props) {
  const [status, setStatus] = useState(currentUser.status);

  return (
    <div className="fade-in">
      <div className="profile-hero" style={{ paddingTop: 24 }}>
        <div style={{ position: 'relative' }}>
          <Avatar initials={currentUser.initials} tone={currentUser.avatarTone} size="xl" />
          <span
            style={{
              position: 'absolute',
              bottom: 4,
              right: 4,
              width: 18,
              height: 18,
              borderRadius: '50%',
              background: 'var(--live)',
              border: '3px solid var(--bg-base)',
              boxShadow: '0 0 10px rgba(77, 255, 184, 0.7)'
            }}
          />
        </div>
        <div>
          <div className="name">{currentUser.name}</div>
          <div className="handle">{currentUser.handle} · {currentUser.city}</div>
        </div>
        <span className="status-bubble">
          <span className="live-dot" /> {status}
        </span>
      </div>

      <div style={{ padding: '14px 20px 4px' }}>
        <div
          style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--text-muted)',
            marginBottom: 8
          }}
        >
          Cambiar mi status
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {statuses.map((s) => (
            <button
              key={s}
              className={`chip ${status === s ? 'active' : ''}`}
              onClick={() => setStatus(s)}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="section-header">
        <h2>Tu energía</h2>
      </div>
      <div className="stat-row">
        <div className="stat-tile">
          <div className="big">{currentUser.stats.parches}</div>
          <div className="label">Parches</div>
        </div>
        <div className="stat-tile">
          <div className="big">{currentUser.stats.people}</div>
          <div className="label">Gente</div>
        </div>
        <div className="stat-tile">
          <div className="big">{currentUser.stats.communities}</div>
          <div className="label">Coms</div>
        </div>
        <div className="stat-tile">
          <div className="big">{currentUser.stats.stories}</div>
          <div className="label">Historias</div>
        </div>
      </div>

      <div className="profile-bio">
        <div className="label">Tu historia</div>
        {currentUser.bio}
      </div>

      <div className="section-header">
        <h2>Atajos</h2>
      </div>
      <div className="list">
        <button className="safety-row" style={{ width: '100%' }} onClick={() => onNavigate('business')}>
          <div className="icon-wrap" style={{ background: 'linear-gradient(135deg, var(--glow-warm), var(--glow-coral))' }}>
            ⚙️
          </div>
          <div className="body">
            <div className="title">Soy organizador / negocio</div>
            <div className="desc">Haz visible tu comunidad, café, gym o universidad.</div>
          </div>
        </button>
        <button className="safety-row" style={{ width: '100%' }} onClick={() => onNavigate('safety')}>
          <div className="icon-wrap">🛡️</div>
          <div className="body">
            <div className="title">Seguridad y confianza</div>
            <div className="desc">Verificación, safe mode, lugares públicos, reportes.</div>
          </div>
        </button>
        <button className="safety-row" style={{ width: '100%' }} onClick={() => onNavigate('stories')}>
          <div className="icon-wrap" style={{ background: 'linear-gradient(135deg, var(--glow-violet), var(--glow-coral))' }}>
            ✦
          </div>
          <div className="body">
            <div className="title">Historias de la comunidad</div>
            <div className="desc">Lee qué pasa cuando alguien decide no quedarse en casa.</div>
          </div>
        </button>
      </div>
    </div>
  );
}
