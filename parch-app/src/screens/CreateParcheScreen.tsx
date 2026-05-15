import { useState } from 'react';
import { planTypes, vibes, communities } from '../data/mockData';
import { IconSparkle, IconShare, IconCheck } from '../components/Icon';
import type { ScreenName } from '../App';

type Props = { onNavigate: (s: ScreenName) => void };

export default function CreateParcheScreen({ onNavigate }: Props) {
  const [selectedPlan, setSelectedPlan] = useState('cafe');
  const [name, setName] = useState('Café de la tarde');
  const [city, setCity] = useState('Sioux Falls, SD');
  const [time, setTime] = useState('Hoy · 5:00pm');
  const [max, setMax] = useState('4');
  const [privacy, setPrivacy] = useState<'public' | 'private'>('public');
  const [community, setCommunity] = useState(communities[1].name);
  const [budget, setBudget] = useState('$8 - $15');
  const [vibe, setVibe] = useState('tranquilo');
  const [created, setCreated] = useState(false);

  if (created) {
    return (
      <div className="fade-in" style={{ padding: '40px 24px 24px', textAlign: 'center' }}>
        <div
          style={{
            width: 96,
            height: 96,
            borderRadius: '50%',
            margin: '20px auto 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, var(--glow-coral), var(--glow-violet))',
            boxShadow: '0 12px 40px rgba(255, 61, 127, 0.5)'
          }}
        >
          <IconCheck size={48} stroke={3} />
        </div>
        <h1 className="t-display" style={{ fontSize: 28, lineHeight: 1.1 }}>Tu parche está vivo</h1>
        <div className="t-soft" style={{ marginTop: 10, fontSize: 14 }}>
          Comparte este link para que otros se unan.
        </div>

        <div
          className="glass"
          style={{ margin: '24px 0 18px', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 10 }}
        >
          <div style={{ flex: 1, fontFamily: 'monospace', fontSize: 13, color: 'var(--text)', textAlign: 'left' }}>
            parch.app/p/2k9n-cafe-tarde
          </div>
          <button className="tool-btn accent" style={{ width: 36, height: 36 }} aria-label="Compartir">
            <IconShare size={16} />
          </button>
        </div>

        <button className="btn btn-primary btn-block" onClick={() => onNavigate('join')}>
          Ver mi parche
        </button>
        <button className="btn btn-ghost btn-block" style={{ marginTop: 6 }} onClick={() => setCreated(false)}>
          Crear otro
        </button>
      </div>
    );
  }

  return (
    <div className="fade-in" style={{ paddingBottom: 24 }}>
      <div className="screen-header">
        <h1>Crear un parche</h1>
        <div className="subtitle">¿Qué plan quieres armar?</div>
      </div>

      <div className="plan-grid">
        {planTypes.map((p) => (
          <button
            key={p.id}
            className={`plan-tile ${selectedPlan === p.id ? 'selected' : ''}`}
            onClick={() => setSelectedPlan(p.id)}
          >
            <div className="icon" style={{ fontSize: 18 }}>{p.icon}</div>
            <div className="label">{p.label}</div>
            <div className="hint">{p.hint}</div>
          </button>
        ))}
      </div>

      <div className="divider" />

      <div className="field-group">
        <div className="field">
          <label>Nombre del parche</label>
          <input className="field-input" value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <div className="field" style={{ display: 'flex', flexDirection: 'row', gap: 10 }}>
          <div className="field" style={{ flex: 1 }}>
            <label>Ciudad</label>
            <input className="field-input" value={city} onChange={(e) => setCity(e.target.value)} />
          </div>
          <div className="field" style={{ flex: 1 }}>
            <label>Hora</label>
            <input className="field-input" value={time} onChange={(e) => setTime(e.target.value)} />
          </div>
        </div>

        <div className="field" style={{ display: 'flex', flexDirection: 'row', gap: 10 }}>
          <div className="field" style={{ flex: 1 }}>
            <label>Máx. personas</label>
            <input className="field-input" value={max} onChange={(e) => setMax(e.target.value)} />
          </div>
          <div className="field" style={{ flex: 1 }}>
            <label>Presupuesto</label>
            <input className="field-input" value={budget} onChange={(e) => setBudget(e.target.value)} />
          </div>
        </div>

        <div className="field">
          <label>Privacidad</label>
          <div className="toggle-row">
            <button
              className={`toggle ${privacy === 'public' ? 'active' : ''}`}
              onClick={() => setPrivacy('public')}
            >
              🌎 Público
            </button>
            <button
              className={`toggle ${privacy === 'private' ? 'active' : ''}`}
              onClick={() => setPrivacy('private')}
            >
              🔒 Privado
            </button>
          </div>
        </div>

        <div className="field">
          <label>Comunidad relacionada</label>
          <select className="field-select" value={community} onChange={(e) => setCommunity(e.target.value)}>
            <option style={{ background: '#0A0A1F' }}>Ninguna</option>
            {communities.map((c) => (
              <option key={c.id} style={{ background: '#0A0A1F' }}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div className="field">
          <label>Vibe</label>
          <div className="vibe-pills">
            {vibes.map((v) => (
              <button
                key={v}
                className={`vibe-pill ${vibe === v ? 'selected' : ''}`}
                onClick={() => setVibe(v)}
              >
                {v}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ padding: '20px 20px 0' }}>
        <button className="btn btn-primary btn-block" onClick={() => setCreated(true)}>
          <IconSparkle size={18} /> Crear parche
        </button>
      </div>
    </div>
  );
}
